"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Toaster, toast } from 'sonner'
import { db, storage } from '../../../lib/firebase'
import { doc, getDoc, setDoc, updateDoc, onSnapshot } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import imageCompression from 'browser-image-compression'
import { Image as ImageIcon, Trash, UploadSimple, CircleNotch, CheckCircle } from '@phosphor-icons/react'

type PageKey = 'services' | 'portugal' | 'about' | 'portfolio' | 'properties' | 'blog' | 'find_property'

const PAGES: { key: PageKey; label: string }[] = [
    { key: 'services', label: 'Services' },
    { key: 'portugal', label: 'About Portugal' },
    { key: 'about', label: 'About Us' },
    { key: 'portfolio', label: 'Portfolio' },
    { key: 'properties', label: 'Properties' },
    { key: 'blog', label: 'Blog' },
    { key: 'find_property', label: 'Find Property' }
]

export default function HeroImagesPage() {
    const [images, setImages] = useState<Record<string, string>>({})
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState<Record<string, boolean>>({})

    useEffect(() => {
        // Subscribe to changes in the hero_images document
        const unsubscribe = onSnapshot(doc(db, 'site_settings', 'hero_images'), (doc) => {
            if (doc.exists()) {
                setImages(doc.data() as Record<string, string>)
            }
            setLoading(false)
        }, (error) => {
            console.error("Error fetching hero images:", error)
            toast.error("Failed to load hero images")
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const handleImageUpload = async (pageKey: string, file: File) => {
        if (!file) return

        try {
            setUploading(prev => ({ ...prev, [pageKey]: true }))

            // 1. Compress Image
            const options = {
                maxSizeMB: 1, // Max 1MB
                maxWidthOrHeight: 1920, // Max 1920px width/height
                useWebWorker: true,
                fileType: 'image/webp' // Convert to WebP for better compression
            }

            const compressedFile = await imageCompression(file, options)

            // 2. Upload to Firebase Storage
            // Path: hero-images/{pageKey}/{timestamp}-{filename}
            const filename = `${Date.now()}-${file.name.split('.')[0]}.webp`
            const storageRef = ref(storage, `hero-images/${pageKey}/${filename}`)

            await uploadBytes(storageRef, compressedFile)
            const downloadURL = await getDownloadURL(storageRef)

            // 3. Delete old image from storage if exists (Implementation detail: we'd need to store the path or derive it to strictly delete old files. 
            // For simplicity here, we just overwrite the URL in Firestore. To avoid storage clutter, we could try to delete the old one if we knew its path.)
            // Strategy: Use the old URL to get a ref and delete? The download URL contains the path but it's encoded. 
            // A better way is to rely on overwriting if we used a fixed filename, but we use a timestamp to avoid caching issues.
            // Let's try to delete the old one if we can extract ref from the old URL.
            if (images[pageKey]) {
                try {
                    const oldRef = ref(storage, images[pageKey])
                    // This works if the URL is a direct storage reference or if passing the full HTTPS URL works with ref() (it usually handles it).
                    await deleteObject(oldRef).catch(e => console.log("Could not delete old image (might not exist or different bucket path):", e))
                } catch (e) {
                    // Ignore delete errors
                }
            }

            // 4. Update Firestore
            const docRef = doc(db, 'site_settings', 'hero_images')
            // Use setDoc with merge to ensure document exists
            await setDoc(docRef, {
                [pageKey]: downloadURL
            }, { merge: true })

            toast.success(`${PAGES.find(p => p.key === pageKey)?.label} image updated successfully!`)

        } catch (error) {
            console.error("Error uploading image:", error)
            toast.error("Failed to upload image")
        } finally {
            setUploading(prev => ({ ...prev, [pageKey]: false }))
        }
    }

    const handleDeleteImage = async (pageKey: string) => {
        if (!images[pageKey] || !confirm("Are you sure you want to remove this image?")) return

        try {
            setUploading(prev => ({ ...prev, [pageKey]: true }))

            // 1. Delete from Storage
            const imageRef = ref(storage, images[pageKey])
            await deleteObject(imageRef).catch(e => console.log("Reference delete error:", e))

            // 2. Remove from Firestore (set to empty string or null, or delete field)
            // We'll set it to null or remove the field
            const docRef = doc(db, 'site_settings', 'hero_images')
            // Note: deleting a field in Firestore requires importing deleteField
            // But for simplicity/compatibility we can just update with { [pageKey]: deleteField() } if we import it.
            // Or just empty string for now if I don't import deleteField (I haven't imported it in the top block).
            // Let's import deleteField implicitly or just set to null?
            // I'll update the import list first.

            // Actually, I can allow replacing with default logic.
            // Let's just set it to null for now. 
            await updateDoc(docRef, {
                [pageKey]: null
            })

            toast.success("Image removed successfully")
        } catch (error) {
            console.error("Error removing image:", error)
            toast.error("Failed to remove image")
        } finally {
            setUploading(prev => ({ ...prev, [pageKey]: false }))
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <CircleNotch className="w-8 h-8 animate-spin text-black/60" />
            </div>
        )
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-black mb-2">Hero Images Management</h1>
                <p className="text-black/60">Manage the banner images for the main pages of the website.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {PAGES.map((page) => (
                    <div key={page.key} className="bg-white rounded-2xl p-6 border border-black/10 shadow-sm">
                        <h3 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
                            <ImageIcon className="w-5 h-5" />
                            {page.label}
                        </h3>

                        <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 mb-6 group border border-black/5">
                            {images[page.key] ? (
                                <>
                                    <img
                                        src={images[page.key]}
                                        alt={page.label}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                        <button
                                            onClick={() => handleDeleteImage(page.key)}
                                            disabled={uploading[page.key]}
                                            className="p-2 bg-red-500 rounded-lg text-white hover:bg-red-600 transition-colors"
                                            title="Delete Image"
                                        >
                                            <Trash className="w-5 h-5" />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-black/40 gap-2">
                                    <ImageIcon className="w-8 h-8" />
                                    <span className="text-sm">No image set</span>
                                </div>
                            )}

                            {uploading[page.key] && (
                                <div className="absolute inset-0 bg-black/60 z-10 flex flex-col items-center justify-center text-white">
                                    <CircleNotch className="w-8 h-8 animate-spin mb-2" />
                                    <span className="text-sm font-medium">Processing...</span>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <input
                                    type="file"
                                    id={`file-${page.key}`}
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0]
                                        if (file) handleImageUpload(page.key, file)
                                    }}
                                    disabled={uploading[page.key]}
                                />
                                <label
                                    htmlFor={`file-${page.key}`}
                                    className={`inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium cursor-pointer hover:bg-black/80 transition-colors ${uploading[page.key] ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <UploadSimple className="w-4 h-4" />
                                    {images[page.key] ? 'Change Image' : 'Upload Image'}
                                </label>
                            </div>

                            {images[page.key] && (
                                <span className="text-xs text-green-600 font-medium flex items-center gap-1.5 bg-green-50 px-2 py-1 rounded-md">
                                    <CheckCircle className="w-3.5 h-3.5" weight="fill" />
                                    Active
                                </span>
                            )}
                        </div>

                        <p className="text-xs text-black/40 mt-4 leading-relaxed">
                            Recommended: 1920x1080px. Supported formats: JPG, PNG, WEBP.
                            <br />Image will be automatically optimized.
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

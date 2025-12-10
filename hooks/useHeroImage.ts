import { useState, useEffect } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../lib/firebase'

export function useHeroImage(pageKey: string, defaultImage: string) {
    const [image, setImage] = useState(defaultImage)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        if (!db) {
            setIsLoaded(true)
            return
        }

        const unsubscribe = onSnapshot(doc(db, 'site_settings', 'hero_images'), (doc) => {
            if (doc.exists()) {
                const data = doc.data()
                if (data && data[pageKey]) {
                    setImage(data[pageKey])
                } else {
                    setImage(defaultImage)
                }
            }
            setIsLoaded(true)
        }, (error) => {
            console.error("Error fetching hero image:", error)
            setIsLoaded(true)
        })

        return () => unsubscribe()
    }, [pageKey, defaultImage])

    return image
}

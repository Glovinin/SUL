"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
  Plus,
  Pencil,
  Trash,
  Buildings,
  MapPin,
  Bed,
  Bathtub,
  Ruler,
  Star,
} from '@phosphor-icons/react'
import { Button } from '../../../components/ui/button'
import { getPortfolioItems, deletePortfolioItem, updatePortfolioItemOrder } from '../../../lib/admin-helpers'
import { PortfolioItem } from '../../../lib/admin-types'
import { formatPrice } from '../../../lib/format-price'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import { SortableItem } from '../../../components/admin/SortableItem'

export default function PortfolioPage() {
  const router = useRouter()
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPortfolioItems()
  }, [])

  const loadPortfolioItems = async () => {
    try {
      setLoading(true)
      const data = await getPortfolioItems()
      setPortfolioItems(data)
    } catch (error) {
      console.error('Error loading portfolio items:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    toast('Tem certeza que deseja excluir este item do portfólio?', {
      description: 'Esta ação não pode ser desfeita.',
      action: {
        label: 'Excluir',
        onClick: async () => {
          try {
            await deletePortfolioItem(id)
            await loadPortfolioItems()
            toast.success('Item excluído com sucesso!', {
              description: 'O item foi removido permanentemente.',
            })
          } catch (error) {
            console.error('Error deleting portfolio item:', error)
            toast.error('Erro ao excluir item', {
              description: 'Tente novamente ou verifique sua conexão.',
            })
          }
        },
      },
      cancel: {
        label: 'Cancelar',
        onClick: () => { },
      },
      duration: 5000,
    })
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Require 8px movement to start drag, prevents accidental drags on clicks
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setPortfolioItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)

        const newItems = arrayMove(items, oldIndex, newIndex)

        // Prepare updates for Firebase
        const updates = newItems.map((item, index) => ({
          id: item.id!,
          order: index
        }))

        // Fire and forget (or handle error with toast)
        updatePortfolioItemOrder(updates).catch(err => {
          console.error('Failed to update order', err)
          toast.error('Failed to save new order')
        })

        return newItems
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-black/60">Loading portfolio...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center">
              <Buildings className="w-5 h-5 text-black" weight="duotone" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-black">Portfolio</h1>
            </div>
          </div>
          <p className="text-black/60 ml-[52px]">Manage your sold properties portfolio</p>
        </div>
        <Button
          onClick={() => router.push('/admin/portfolio/new')}
          className="bg-black text-white hover:bg-black/90 flex items-center gap-2 px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition-all"
        >
          <Plus className="w-5 h-5" weight="bold" />
          Add Portfolio Item
        </Button>
      </div>

      {/* Stats Bar */}
      {portfolioItems.length > 0 && (
        <div className="bg-white rounded-2xl border border-black/10 p-4 shadow-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Buildings className="w-5 h-5 text-black/60" weight="duotone" />
              <span className="text-sm font-medium text-black/60">
                Total: <span className="text-black font-semibold">{portfolioItems.length}</span> items
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-black/60" weight="duotone" />
              <span className="text-sm font-medium text-black/60">
                Featured: <span className="text-black font-semibold">{portfolioItems.filter(p => p.featured).length}</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Portfolio Grid */}
      {portfolioItems.length === 0 ? (
        <div className="bg-white rounded-2xl border border-black/10 p-16 text-center shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-black/5 flex items-center justify-center mx-auto mb-4">
            <Buildings className="w-8 h-8 text-black/40" weight="duotone" />
          </div>
          <h3 className="text-xl font-semibold text-black mb-2">No portfolio items yet</h3>
          <p className="text-black/60 mb-6">Get started by adding your first sold property to the portfolio</p>
          <Button
            onClick={() => router.push('/admin/portfolio/new')}
            className="bg-black text-white hover:bg-black/90 px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            <Plus className="w-5 h-5 mr-2" weight="bold" />
            Add First Portfolio Item
          </Button>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={portfolioItems.map(p => p.id!)}
            strategy={rectSortingStrategy}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioItems.map((item) => {
                const tags = item.tag ? item.tag.split(',').map(t => t.trim()).filter(Boolean) : []

                return (
                  <SortableItem key={item.id} id={item.id!}>
                    {/* Existing Card Content Wrapper */}
                    <div
                      className="bg-white rounded-2xl border border-black/10 overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-grab active:cursor-grabbing"
                    >
                      {/* Image Section */}
                      <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-black/20 bg-gradient-to-br from-black/5 to-black/10">
                            <Buildings className="w-12 h-12" weight="duotone" />
                          </div>
                        )}

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                          {item.featured && (
                            <div className="bg-black text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                              <Star className="w-3 h-3" weight="fill" />
                              Featured
                            </div>
                          )}
                          {tags.slice(0, 2).map((tag, idx) => (
                            <div key={idx} className="bg-white/95 backdrop-blur-sm text-black text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                              {tag}
                            </div>
                          ))}
                        </div>

                        {/* Quick Actions on Hover */}
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent drag
                              router.push(`/admin/portfolio/${item.id}`)
                            }}
                            onPointerDown={(e) => e.stopPropagation()} // Prevent drag start
                            className="w-9 h-9 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white shadow-md transition-all hover:scale-110"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4 text-black" weight="bold" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent drag
                              handleDelete(item.id!)
                            }}
                            onPointerDown={(e) => e.stopPropagation()} // Prevent drag start
                            className="w-9 h-9 bg-red-500/95 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-500 shadow-md transition-all hover:scale-110"
                            title="Delete"
                          >
                            <Trash className="w-4 h-4 text-white" weight="bold" />
                          </button>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-5">
                        {/* Location */}
                        <div className="flex items-center gap-1.5 mb-2">
                          <MapPin className="w-4 h-4 text-black/40" weight="fill" />
                          <span className="text-xs font-medium text-black/50 uppercase tracking-wider">
                            {item.location}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-semibold text-black mb-3 line-clamp-2 text-lg leading-tight group-hover:text-black/70 transition-colors">
                          {item.title}
                        </h3>

                        {/* Property Details */}
                        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-black/5">
                          <div className="flex items-center gap-1.5">
                            <div className="w-7 h-7 rounded-lg bg-black/5 flex items-center justify-center">
                              <Bed className="w-3.5 h-3.5 text-black/50" weight="duotone" />
                            </div>
                            <span className="text-sm font-medium text-black/70">{item.beds}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className="w-7 h-7 rounded-lg bg-black/5 flex items-center justify-center">
                              <Bathtub className="w-3.5 h-3.5 text-black/50" weight="duotone" />
                            </div>
                            <span className="text-sm font-medium text-black/70">{item.baths}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className="w-7 h-7 rounded-lg bg-black/5 flex items-center justify-center">
                              <Ruler className="w-3.5 h-3.5 text-black/50" weight="duotone" />
                            </div>
                            <span className="text-sm font-medium text-black/70">{item.area} sqft</span>
                          </div>
                        </div>

                        {/* Sold Date */}
                        {item.soldDate && (
                          <div className="mb-4 pb-4 border-b border-black/5">
                            <p className="text-xs text-black/40 mb-1">Sold Date</p>
                            <p className="text-sm font-medium text-black/70">{item.soldDate}</p>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/admin/portfolio/${item.id}`)
                            }}
                            onPointerDown={(e) => e.stopPropagation()}
                            className="flex-1 bg-black/5 text-black hover:bg-black/10 rounded-xl transition-all"
                            size="sm"
                          >
                            <Pencil className="w-4 h-4 mr-2" weight="bold" />
                            Edit
                          </Button>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(item.id!)
                            }}
                            onPointerDown={(e) => e.stopPropagation()}
                            className="bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-all"
                            size="sm"
                          >
                            <Trash className="w-4 h-4" weight="bold" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </SortableItem>
                )
              })}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  )
}

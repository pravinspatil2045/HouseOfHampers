import { useEffect, useState } from 'react'
import { products, ribbons, type Product, type Ribbon } from '../data/products'

export interface BagItem {
  id: string
  productId: string
  quantity: number
  ribbon: Ribbon
  note: string
}
const storageKey = 'hoh-bag-v1'

function readBag(): BagItem[] {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(storageKey) ?? '[]')
    if (!Array.isArray(raw)) return []
    const ids = new Set<string>()
    return raw.filter((item): item is BagItem => {
      if (!item || typeof item !== 'object') return false
      const valid = typeof item.id === 'string' && item.id.length < 100 && !ids.has(item.id)
        && products.some((p) => p.id === item.productId)
        && Number.isInteger(item.quantity) && item.quantity > 0 && item.quantity <= 20
        && ribbons.includes(item.ribbon) && typeof item.note === 'string' && item.note.length <= 240
      if (valid) ids.add(item.id)
      return valid
    }).slice(0, 50)
  } catch { return [] }
}

export function useBag() {
  const [items, setItems] = useState<BagItem[]>(readBag)
  useEffect(() => {
    try {
      // Keep choices, never personal gift messages, after the browser session ends.
      localStorage.setItem(storageKey, JSON.stringify(items.map((item) => ({ ...item, note: '' }))))
    } catch { /* Bag interactions remain available when storage is blocked. */ }
  }, [items])

  function add(product: Product, ribbon: Ribbon, note: string) {
    setItems((current) => {
      const existing = current.find((item) => item.productId === product.id && item.ribbon === ribbon && item.note === note && item.quantity < 20)
      if (existing) return current.map((item) => item.id === existing.id ? { ...item, quantity: item.quantity + 1 } : item)
      return [...current, { id: crypto.randomUUID(), productId: product.id, quantity: 1, ribbon, note }]
    })
  }
  function changeQuantity(id: string, quantity: number) {
    setItems((current) => current.map((item) => item.id === id ? { ...item, quantity: Math.min(20, Math.max(1, quantity)) } : item))
  }
  function remove(id: string) { setItems((current) => current.filter((item) => item.id !== id)) }

  const count = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + (products.find((p) => p.id === item.productId)?.price ?? 0) * item.quantity, 0)
  return { items, add, changeQuantity, remove, count, subtotal }
}

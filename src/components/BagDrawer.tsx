import { ArrowUpRight, Gift, Minus, Plus, Trash, ShoppingBag } from '@phosphor-icons/react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { money, products } from '../data/products'
import type { BagItem } from '../hooks/useBag'

interface BagDrawerProps { items: BagItem[]; subtotal: number; changeQuantity: (id: string, quantity: number) => void; remove: (id: string) => void; close: () => void }
export function BagDrawer({ items, subtotal, changeQuantity, remove, close }: BagDrawerProps) {
  const reduce = useReducedMotion()
  const count = items.reduce((sum, item) => sum + item.quantity, 0)
  return <div className="bag-drawer-content">
    <div className="bag-heading"><ShoppingBag size={28} weight="light" /><h2>Your happy bag <span>{count}</span></h2></div>
    {items.length === 0 ? <div className="empty-bag"><Gift size={74} weight="thin" /><h3>A little empty.<br />A lot of possibility.</h3><p>Let’s find something that feels like them.</p><a className="button button-primary" href="#collection" onClick={close}>Find their happy <ArrowUpRight size={20} /></a></div> : <>
      <div className="bag-items"><AnimatePresence initial={false}>{items.map((item) => {
        const product = products.find((p) => p.id === item.productId)!
        return <motion.article className="bag-item" key={item.id} layout={!reduce} exit={{ opacity: 0, x: reduce ? 0 : 20 }} transition={{ duration: 0.18 }}>
          <img src={product.image} alt={product.imageAlt} width="96" height="110" />
          <div className="bag-item-details"><h3>{product.name}</h3><p>{item.ribbon} ribbon</p>{item.note && <p className="bag-note">“{item.note}”</p>}<strong>{money(product.price * item.quantity)}</strong>
            <div className="bag-item-controls"><div className="quantity-control" role="group" aria-label={`Quantity of ${product.name}`}><button aria-label={`Decrease ${product.name} quantity`} onClick={() => changeQuantity(item.id, item.quantity - 1)} disabled={item.quantity === 1}><Minus size={15} /></button><span aria-live="polite">{item.quantity}</span><button aria-label={`Increase ${product.name} quantity`} onClick={() => changeQuantity(item.id, item.quantity + 1)} disabled={item.quantity === 20}><Plus size={15} /></button></div><button className="icon-button remove-item" aria-label={`Remove ${product.name}`} onClick={() => remove(item.id)}><Trash size={18} /></button></div>
          </div>
        </motion.article>
      })}</AnimatePresence></div>
      <div className="bag-summary"><div className="subtotal"><span>Subtotal</span><strong>{money(subtotal)}</strong></div><p>Illustrative pricing. Shipping and taxes are not calculated.</p><div className="checkout-notice"><Gift size={23} /><div><strong>A little preview of what’s to come.</strong><p>Live checkout isn’t open yet. You can explore and personalise, but no order will be placed.</p></div></div><button className="button button-outline full-width" onClick={close}>Keep exploring <ArrowUpRight size={19} /></button></div>
    </>}
  </div>
}

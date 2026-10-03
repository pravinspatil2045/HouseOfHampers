import { ArrowUpRight, Cake, Confetti, Heart, Sparkle, HandHeart } from '@phosphor-icons/react'
import { motion, useReducedMotion } from 'motion/react'
import { occasions, products, money, type Occasion, type Product } from '../data/products'

const occasionIcons = [Sparkle, Cake, Heart, HandHeart, Confetti]
interface CollectionProps { selected: Occasion; setSelected: (occasion: Occasion) => void; openProduct: (product: Product) => void }
export function Collection({ selected, setSelected, openProduct }: CollectionProps) {
  const reduce = useReducedMotion()
  const filtered = products.filter((product) => selected === 'All hampers' || product.occasions.includes(selected))
  return <section className="collection section-shell" id="collection" aria-labelledby="collection-heading">
    <div className="collection-heading">
      <div><p className="eyebrow">The happiness collection</p><h2 id="collection-heading">Their next favourite thing.</h2><p className="section-description">Picked with care. Given with a whole lot of love.</p></div>
      <a href="#personalise" className="text-link collection-custom-link">Add your own touch <ArrowUpRight size={19} /></a>
    </div>
    <div className="occasion-filters" role="group" aria-label="Filter hampers by occasion">
      {occasions.map((occasion, i) => { const Icon = occasionIcons[i]; return <button key={occasion} className={`filter-button ${selected === occasion ? 'selected' : ''}`} aria-pressed={selected === occasion} onClick={() => setSelected(occasion)}><Icon size={18} />{occasion}</button> })}
    </div>
    <p className="sr-only" role="status">{filtered.length} {filtered.length === 1 ? 'hamper' : 'hampers'} shown for {selected.toLowerCase()}.</p>
    <div className="product-grid">
      {filtered.map((product, i) => <motion.article key={product.id} initial={reduce ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.45, delay: i * 0.08 }}>
        <button className="product-card" onClick={() => openProduct(product)} aria-label={`Explore ${product.name}`}>
          <div className={`product-image product-image-${product.id}`}><img src={product.image} alt={product.imageAlt} width="720" height="760" loading="lazy" /></div>
          <div className="product-category">{product.category}</div>
          <div className="product-title-row"><h3>{product.name}</h3><span className="product-arrow"><ArrowUpRight size={23} /></span></div>
          <p className="product-description">{product.description}</p>
          <div className="product-price">{money(product.price)}<span>including a little note from you</span></div>
        </button>
      </motion.article>)}
    </div>
    {filtered.length === 0 && <div className="collection-empty"><h3>A different kind of occasion?</h3><p>Start with our full collection and make it personal.</p><button className="button button-primary" onClick={() => setSelected('All hampers')}>View all hampers</button></div>}
    <p className="catalog-note">A taste of what’s possible. Preview collection with illustrative contents, photography, and prices.</p>
  </section>
}

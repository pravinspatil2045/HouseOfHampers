import { useState } from 'react'
import { ArrowRight, Check, Gift } from '@phosphor-icons/react'
import { money, type Product, type Ribbon } from '../data/products'
import { RibbonPicker } from './Personalise'

interface ProductDialogProps { product: Product; initialNote: string; initialRibbon: Ribbon; add: (product: Product, ribbon: Ribbon, note: string) => void }
export function ProductDialog({ product, initialNote, initialRibbon, add }: ProductDialogProps) {
  const [note, setNote] = useState(initialNote)
  const [ribbon, setRibbon] = useState(initialRibbon)
  return <div className="product-dialog-layout">
    <div className="product-dialog-image"><img src={product.image} width="720" height="760" alt={product.imageAlt} /><span><Gift size={18} /> A good feeling, all wrapped up.</span></div>
    <div className="product-dialog-info">
      <p className="eyebrow">{product.category}</p><h2>{product.name}</h2><p className="dialog-price">{money(product.price)}</p><p className="dialog-body">{product.detail}</p>
      <h3 className="contents-heading">A peek inside</h3><ul className="product-contents">{product.contents.map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul>
      <RibbonPicker value={ribbon} change={setRibbon} id="product-ribbon" />
      <div className="note-input-wrap"><label htmlFor="product-note">Add your personal note <span>(optional)</span></label><textarea id="product-note" rows={2} maxLength={240} value={note} onChange={(event) => setNote(event.target.value)} placeholder="A few words that could only come from you." aria-describedby="product-note-help" /><span className="input-help" id="product-note-help">Kept in this session only.<span>{note.length}/240</span></span></div>
      <button className="button button-primary full-width" onClick={() => add(product, ribbon, note)}>Add to your bag <ArrowRight size={19} /></button>
      <p className="dialog-disclaimer">Preview hamper. Contents, ribbon, photography, and pricing are illustrative. Live ordering isn’t available yet.</p>
    </div>
  </div>
}

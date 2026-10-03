import { Check, ArrowUpRight, Heart } from '@phosphor-icons/react'
import { motion, useReducedMotion } from 'motion/react'
import { ribbons, type Ribbon } from '../data/products'

export function RibbonPicker({ value, change, id }: { value: Ribbon; change: (value: Ribbon) => void; id: string }) {
  return <fieldset className="ribbon-picker"><legend>Pick a ribbon <span>{value}</span></legend><div className="ribbon-options">
    {ribbons.map((ribbon) => <label key={ribbon} className={`ribbon-option ribbon-${ribbon.toLowerCase()} ${value === ribbon ? 'chosen' : ''}`}>
      <input type="radio" name={id} value={ribbon} checked={value === ribbon} onChange={() => change(ribbon)} /><span className="sr-only">{ribbon}</span>{value === ribbon && <Check size={17} weight="bold" aria-hidden="true" />}
    </label>)}
  </div></fieldset>
}
interface PersonaliseProps { note: string; setNote: (note: string) => void; ribbon: Ribbon; setRibbon: (ribbon: Ribbon) => void; start: () => void }
export function Personalise({ note, setNote, ribbon, setRibbon, start }: PersonaliseProps) {
  const reduce = useReducedMotion()
  return <section className="personalise" id="personalise" aria-labelledby="personalise-heading">
    <div className="personalise-inner section-shell">
      <div className={`note-scene scene-${ribbon.toLowerCase()}`}>
        <div className="note-ribbon ribbon-one" aria-hidden="true" /><div className="note-ribbon ribbon-two" aria-hidden="true" />
        <motion.div className="note-card" initial={reduce ? false : { rotate: -9, opacity: 0 }} whileInView={{ rotate: -5, opacity: 1 }} viewport={{ once: true, amount: 0.4 }} transition={{ type: 'spring', stiffness: 90, damping: 16 }}>
          <Heart size={39} weight="light" aria-hidden="true" />
          <p className="note-to">A little something, just for you.</p>
          <p className={`note-message ${note.length > 100 ? 'note-message-long' : ''}`}>{note || 'For all the ways you make life a little lovelier.'}</p>
          <div className="note-card-bottom"><span>With a whole lot of love.</span><span className="note-monogram" aria-hidden="true">hoh.</span></div>
        </motion.div>
        <span className="note-scene-caption">Your words. The best part of the box.</span>
      </div>
      <div className="personalise-copy">
        <h2 id="personalise-heading">A little more you.<br />A lot more them.</h2>
        <p>The good stuff is inside. The magic is in the details. Choose a ribbon and say it in your own words.</p>
        <RibbonPicker id="preview-ribbon" value={ribbon} change={setRibbon} />
        <div className="note-input-wrap"><label htmlFor="preview-note">Your little note</label><textarea id="preview-note" value={note} maxLength={240} onChange={(event) => setNote(event.target.value)} rows={3} placeholder="You make ordinary days feel like the good days." aria-describedby="note-preview-help" /><span id="note-preview-help" className="input-help">Watch your card come to life.<span>{note.length}/240</span></span></div>
        <button className="button button-primary" onClick={start}>Make it yours <ArrowUpRight size={20} /></button>
        <p className="personalise-disclaimer">Preview your finishing touches. Your note stays in this session.</p>
      </div>
    </div>
  </section>
}

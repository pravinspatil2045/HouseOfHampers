import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowDownRight, ArrowRight, ArrowUpRight, Asterisk, Gift, Heart, PencilLine } from '@phosphor-icons/react'

export function Hero() {
  const [unwrapped, setUnwrapped] = useState(false)
  const reduce = useReducedMotion()
  return <section className="hero" aria-labelledby="hero-heading">
    <div className="hero-inner">
      <motion.div className="hero-copy" initial={reduce ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }}>
        <p className="hero-intro">Not just a gift. A whole feeling.</p>
        <h1 id="hero-heading"><span>Good things.</span><span>Great feelings.</span></h1>
        <p className="hero-description">Thoughtful hampers for your favourite people.<br className="desktop-break" /> And all the little reasons to make their day.</p>
        <div className="hero-actions">
          <a href="#collection" className="button button-primary">Find their happy <ArrowUpRight size={20} /></a>
          <a href="#personalise" className="text-link">Make it yours <ArrowRight size={19} /></a>
        </div>
      </motion.div>
      <motion.div className="hero-art" initial={reduce ? false : { opacity: 0, scale: 0.94, rotate: 3 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
        <Asterisk className="hero-asterisk" size={98} weight="bold" aria-hidden="true" />
        <button className={`gift-stage ${unwrapped ? 'is-unwrapped' : ''}`} onClick={() => setUnwrapped((value) => !value)} aria-label={unwrapped ? 'Wrap the gift again' : 'Unwrap a little happy'} aria-pressed={unwrapped}>
          <AnimatePresence initial={false} mode="wait">
            {!unwrapped ? <motion.div className="gift-image-wrap" key="wrapped" initial={{ opacity: 0, scale: reduce ? 1 : 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: reduce ? 1 : 1.08 }} transition={{ duration: 0.3 }}>
              <img className="hero-image" src="/images/hero.webp" width="1000" height="691" alt="A bright pink present with a golden satin bow, surrounded by little heart confetti" fetchPriority="high" />
            </motion.div> : <motion.div className="gift-reveal" key="unwrapped" initial={{ opacity: 0, rotate: reduce ? 0 : -4 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
              <Heart size={50} weight="light" />
              <span className="gift-reveal-small">A little reminder, just for you.</span>
              <span className="gift-reveal-title">You deserve<br />good things.</span>
              <span className="gift-reveal-signature">Love, House of Hampers</span>
            </motion.div>}
          </AnimatePresence>
        </button>
        <div className="hero-art-caption"><ArrowDownRight size={29} weight="light" /><span>{unwrapped ? 'A little love goes a long way.' : 'Go on, open a little happy.'}</span><span className="caption-action">{unwrapped ? 'Tap to wrap' : 'Tap the gift'}</span></div>
      </motion.div>
    </div>
  </section>
}

export function GiftingValues() {
  return <section className="gifting-values" aria-label="A more personal way to gift">
    <div><Gift size={27} weight="light" /><span>Good things, thoughtfully paired</span></div>
    <div><PencilLine size={27} weight="light" /><span>Your words make it theirs</span></div>
    <div><Heart size={27} weight="light" /><span>Small gestures. Big feelings.</span></div>
  </section>
}

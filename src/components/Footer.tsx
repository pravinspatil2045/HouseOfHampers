import { ArrowUpRight, Asterisk, Heart, Plus } from '@phosphor-icons/react'
import { Wordmark } from './Header'

export function BrandStory() {
  return <section className="brand-story section-shell" id="our-story" aria-labelledby="story-heading">
    <Asterisk size={56} weight="light" aria-hidden="true" /><p className="story-intro">Around here, it’s the thought that counts.</p><h2 id="story-heading">Not “what should I get?”<br />More “this is so them.”</h2><p className="story-description">That’s the feeling we’re here for. The inside jokes, the little favourites, the things that say you really know someone. A hamper is just how we put it all together.</p><span className="story-signature"><Heart size={20} weight="light" />That’s our kind of gifting.</span>
  </section>
}
const questions = [
  { question: 'Can I make a hamper more personal?', answer: 'Absolutely. Pick a hamper, choose a ribbon colour, and write a personal note. The card preview lets you see your words before adding the hamper to your bag. This is a design preview; final packaging options will be confirmed when the shop launches.' },
  { question: 'What comes inside each hamper?', answer: 'Open any hamper to see its suggested collection of treats and keepsakes. The current products, contents, photographs, and prices are illustrative, not a live inventory.' },
  { question: 'Do you do gifts for teams?', answer: 'That’s what our corporate gifting section is for. You can tell us about your team and occasion, then download an enquiry draft. This preview doesn’t send enquiries yet.' },
  { question: 'Can I place an order right now?', answer: 'Not just yet. You can explore the collection, try personalisation, and build your bag. Payments and order fulfilment are not connected. Delivery timings, shipping costs, and returns information will be confirmed before the shop goes live.' },
]
export function FAQ() {
  return <section className="faq section-shell" id="faq" aria-labelledby="faq-heading"><div className="faq-heading"><h2 id="faq-heading">Good questions.<br />Thoughtful answers.</h2><p>A few things you might be wondering.</p></div><div className="faq-list">{questions.map((item) => <details key={item.question}><summary>{item.question}<Plus size={20} aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div></section>
}
export function Footer({ openEnquiry, openPrivacy }: { openEnquiry: () => void; openPrivacy: () => void }) {
  return <footer className="footer"><div className="section-shell"><div className="footer-top"><div className="footer-brand"><Wordmark footer /><p>Thoughtfully put together.<br />Happily given.</p></div><nav aria-label="Explore"><h3>Find a little happy</h3><a href="#collection">Shop hampers</a><a href="#personalise">Make it yours</a><a href="#corporate">Corporate gifting</a></nav><nav aria-label="About and help"><h3>A little more HoH</h3><a href="#our-story">Our kind of gifting</a><a href="#faq">Good questions</a><button onClick={openPrivacy}>Privacy & this preview</button></nav><div className="footer-contact"><h3>Something in mind?</h3><p>Let’s make someone’s day.</p><button className="text-link" onClick={openEnquiry}>Let’s talk gifting <ArrowUpRight size={19} /></button></div></div><p className="footer-manifesto" aria-hidden="true">give a little happy<span>.</span></p><div className="footer-bottom"><span>© {new Date().getFullYear()} House of Hampers</span><span>A thoughtful beginning. This shop is a preview.</span><a href="#home">Back to the good stuff <ArrowUpRight size={15} /></a></div></div></footer>
}

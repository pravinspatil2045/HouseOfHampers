import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Check, X } from '@phosphor-icons/react'
import { Header } from './components/Header'
import { Hero, GiftingValues } from './components/Hero'
import { Collection } from './components/Collection'
import { Personalise } from './components/Personalise'
import { ProductDialog } from './components/ProductDialog'
import { BagDrawer } from './components/BagDrawer'
import { CorporateSection, CorporateEnquiry } from './components/CorporateSection'
import { BrandStory, FAQ, Footer } from './components/Footer'
import { Modal } from './components/Modal'
import { useBag } from './hooks/useBag'
import { useTheme } from './hooks/useTheme'
import { products, type Occasion, type Product, type Ribbon } from './data/products'

type Overlay = { type: 'product'; product: Product; personalised: boolean } | { type: 'bag' | 'enquiry' | 'menu' | 'privacy' } | null
export default function App() {
  const bag = useBag()
  const { theme, toggle } = useTheme()
  const [selected, setSelected] = useState<Occasion>('All hampers')
  const [overlay, setOverlay] = useState<Overlay>(null)
  const [note, setNote] = useState('')
  const [ribbon, setRibbon] = useState<Ribbon>('Cobalt')
  const [notification, setNotification] = useState('')
  const returnFocus = useRef<HTMLElement | null>(null)

  function open(next: Exclude<Overlay, null>) {
    returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    setOverlay(next)
  }
  function close() { setOverlay(null) }
  function add(product: Product, chosenRibbon: Ribbon, chosenNote: string) {
    bag.add(product, chosenRibbon, chosenNote)
    close()
    setNotification(`${product.name} is in your bag.`)
  }
  useEffect(() => {
    if (!notification) return
    const timer = window.setTimeout(() => setNotification(''), 6500)
    return () => window.clearTimeout(timer)
  }, [notification])

  return <div id="home">
    <Header count={bag.count} theme={theme} toggleTheme={toggle} openBag={() => open({ type: 'bag' })} openMenu={() => open({ type: 'menu' })} />
    <main id="main">
      <Hero /><GiftingValues />
      <Collection selected={selected} setSelected={setSelected} openProduct={(product) => open({ type: 'product', product, personalised: false })} />
      <Personalise note={note} setNote={setNote} ribbon={ribbon} setRibbon={setRibbon} start={() => open({ type: 'product', product: products[1], personalised: true })} />
      <CorporateSection openEnquiry={() => open({ type: 'enquiry' })} /><BrandStory /><FAQ />
    </main>
    <Footer openEnquiry={() => open({ type: 'enquiry' })} openPrivacy={() => open({ type: 'privacy' })} />
    {overlay?.type === 'product' && <Modal title={overlay.product.name} description="Explore the hamper, choose a ribbon, and add a personal note." className="product-modal" close={close} returnFocus={returnFocus}><ProductDialog product={overlay.product} initialNote={overlay.personalised ? note : ''} initialRibbon={overlay.personalised ? ribbon : 'Cobalt'} add={add} /></Modal>}
    {overlay?.type === 'bag' && <Modal title="Your gift bag" description="Review your selected gifts. This preview does not accept orders." className="drawer-modal" close={close} returnFocus={returnFocus}><BagDrawer items={bag.items} subtotal={bag.subtotal} changeQuantity={bag.changeQuantity} remove={bag.remove} close={close} /></Modal>}
    {overlay?.type === 'enquiry' && <Modal title="Corporate gifting enquiry" description="Create and download a local draft of your gifting enquiry." className="enquiry-modal" close={close} returnFocus={returnFocus}><CorporateEnquiry /></Modal>}
    {overlay?.type === 'menu' && <Modal title="Explore House of Hampers" description="Main navigation" className="menu-modal" close={close} returnFocus={returnFocus}><nav className="mobile-navigation" aria-label="Mobile navigation"><span className="menu-label">A little happiness starts here.</span>{[['#collection', 'Shop hampers'], ['#personalise', 'Make it yours'], ['#corporate', 'Corporate gifting'], ['#our-story', 'Our kind of gifting'], ['#faq', 'Good questions']].map(([href, label]) => <a key={href} href={href} onClick={close}>{label}<ArrowUpRight size={23} /></a>)}</nav></Modal>}
    {overlay?.type === 'privacy' && <Modal title="Privacy and this preview" description="How this frontend preview handles your information." className="privacy-modal" close={close} returnFocus={returnFocus}><div className="privacy-content"><h2>Your thoughts<br />stay yours.</h2><p>This is a frontend preview, not a live shop. There are no payments, accounts, analytics, or server-side form submissions.</p><h3>On your device</h3><p>Your theme preference and bag choices are saved in your browser when storage is available. Gift notes are kept in memory only and are cleared when you reload the page. Clear this site’s browser data to remove saved choices.</p><h3>Your enquiry</h3><p>The enquiry form creates a text file only when you choose to download it. It is not sent to House of Hampers. The form clears when you close it.</p><h3>Before launch</h3><p>Real products, policies, business contact details, shipping information, and a payment provider must be added before orders can be accepted.</p></div></Modal>}
    <div className="toast-region" aria-live="polite" aria-atomic="true"><AnimatePresence>{notification && <motion.div className="toast" key={notification} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}><Check size={20} /><span>{notification}</span><button onClick={() => { setNotification(''); open({ type: 'bag' }) }}>View bag</button><button className="toast-close" aria-label="Dismiss notification" onClick={() => setNotification('')}><X size={17} /></button></motion.div>}</AnimatePresence></div>
  </div>
}

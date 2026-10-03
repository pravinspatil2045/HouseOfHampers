import { List, Moon, ShoppingBag, Sun, ArrowUpRight } from '@phosphor-icons/react'

interface HeaderProps {
  count: number
  theme: 'light' | 'dark'
  toggleTheme: () => void
  openBag: () => void
  openMenu: () => void
}
export function Wordmark({ footer = false }: { footer?: boolean }) {
  return <a className={`wordmark ${footer ? 'wordmark-footer' : ''}`} href="#home" aria-label="House of Hampers home">
    <span className="wordmark-mark">hoh<span className="wordmark-period">.</span></span>
    <span className="wordmark-name">house of<br />hampers</span>
  </a>
}
export function Header({ count, theme, toggleTheme, openBag, openMenu }: HeaderProps) {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="announcement"><span>A little thought. A lot of happy.</span><a href="#personalise">Make it personal <ArrowUpRight size={13} /></a></div>
    <header className="header">
      <div className="header-inner">
        <Wordmark />
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#collection">Shop hampers</a>
          <a href="#personalise">Make it yours</a>
          <a href="#corporate">Corporate gifting</a>
          <a href="#our-story">Our kind of gifting</a>
        </nav>
        <div className="header-actions">
          <button className="icon-button theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button className="bag-button" onClick={openBag} data-bag-trigger aria-label={`Open gift bag, ${count} items`}>
            <ShoppingBag size={21} /><span className="bag-label">Your bag</span><span className="bag-count">{count}</span>
          </button>
          <button className="icon-button mobile-menu-toggle" aria-label="Open navigation" onClick={openMenu}><List /></button>
        </div>
      </div>
    </header>
  </>
}

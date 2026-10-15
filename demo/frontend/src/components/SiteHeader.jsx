import { ShoppingBag } from 'lucide-react'

export default function SiteHeader({ itemCount, onOpenCart }) {
  return (
    <>
      <div className="announcement"><span className="announcement-dot" /> Good things are on the way. <strong>Free delivery over $35</strong></div>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Quickbite home"><span className="brand-mark">q</span>Street Food Store<span className="brand-period">.</span></a>
        <nav className="main-nav" aria-label="Main navigation"><a className="nav-active" href="#menu">Order food</a><a href="#how-it-works">How it works</a></nav>
        <div className="header-actions">
          <span className="delivery-location"><span className="location-dot" /> Delivering to <strong>your neighborhood</strong></span>
          <button className="cart-button" type="button" onClick={onOpenCart} aria-label={`Open bag, ${itemCount} items`}><ShoppingBag size={18} strokeWidth={1.8} /><span>Bag</span>{itemCount > 0 && <b>{itemCount}</b>}</button>
        </div>
      </header>
    </>
  )
}
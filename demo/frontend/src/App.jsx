import { useEffect, useState } from 'react'
import { ArrowRight, ShoppingBag } from 'lucide-react'
import CartDrawer from './components/CartDrawer.jsx'
import CheckoutModal from './components/CheckoutModal.jsx'
import Hero from './components/Hero.jsx'
import MenuSection from './components/MenuSection.jsx'
import OrderToast from './components/OrderToast.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import SiteHeader from './components/SiteHeader.jsx'
import { money, previewMenu } from './data/menu.js'

function filterMenuItems(menuItems, category, search) {
  const searchText = search.trim().toLowerCase()

  return menuItems.filter((item) => {
    const matchesCategory = category === 'Everything' || item.category === category
    const itemText = `${item.name} ${item.description} ${item.category}`.toLowerCase()
    const matchesSearch = searchText === '' || itemText.includes(searchText)

    return matchesCategory && matchesSearch
  })
}

export default function App() {
  const [menu, setMenu] = useState(previewMenu)
  const [apiOnline, setApiOnline] = useState(false)
  const [category, setCategory] = useState('Everything')
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState({})
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [order, setOrder] = useState(null)
  const [checkoutError, setCheckoutError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function loadMenu() {
      try {
        const response = await fetch('/api/menu')
        if (!response.ok) throw new Error('Menu unavailable')
        const items = await response.json()
        if (items.length) setMenu(items)
        setApiOnline(true)
      } catch {
        setApiOnline(false)
      }
    }

    loadMenu()
  }, [])

  const visibleMenu = filterMenuItems(menu, category, search)
  const cartItems = menu.filter((item) => cart[item.id]).map((item) => ({ ...item, quantity: cart[item.id] }))
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = subtotal > 0 && subtotal < 35 ? 2.5 : 0
  const total = subtotal + deliveryFee

  function updateQuantity(id, amount) {
    setCart((current) => {
      const quantity = (current[id] || 0) + amount
      const next = { ...current }
      if (quantity > 0) next[id] = quantity
      else delete next[id]
      return next
    })
  }

  async function placeOrder(customer) {
    setCheckoutError('')
    setSubmitting(true)
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...customer,
          items: cartItems.map(({ id, quantity }) => ({ foodItemId: id, quantity })),
        }),
      })
      if (!response.ok) throw new Error((await response.text()) || 'Could not place your order.')
      setOrder(await response.json())
      setCart({})
      setCheckoutOpen(false)
      setCartOpen(false)
    } catch (error) {
      setCheckoutError(apiOnline ? error.message : 'Start the Spring Boot server and connect MySQL to place an order.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="app-shell">
      <SiteHeader itemCount={itemCount} onOpenCart={() => setCartOpen(true)} />
      <main id="top">
        <Hero />
        <MenuSection
          items={visibleMenu}
          cart={cart}
          category={category}
          search={search}
          onCategoryChange={setCategory}
          onSearchChange={setSearch}
          onAdd={(id) => updateQuantity(id, 1)}
        />
        <section className="little-promise" id="how-it-works">
          <div className="promise-spark">✳</div>
          <div><span className="eyebrow">A LITTLE PROMISE</span><h2>Made nearby. <em>Meant to be shared.</em></h2></div>
          <p>Freshly made by neighborhood kitchens and brought straight to your door. That's the whole idea.</p>
          <a href="#menu" aria-label="Browse the menu"><ArrowRight size={19} /></a>
        </section>
      </main>
      <SiteFooter />

      {itemCount > 0 && !cartOpen && (
        <button className="mobile-cart" type="button" onClick={() => setCartOpen(true)}>
          <ShoppingBag size={18} /> Your bag <span>{itemCount}</span><strong>{money(total)}</strong>
        </button>
      )}
      {cartOpen && (
        <CartDrawer
          items={cartItems}
          itemCount={itemCount}
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          total={total}
          onQuantityChange={updateQuantity}
          onClose={() => setCartOpen(false)}
          onCheckout={() => { setCheckoutError(''); setCheckoutOpen(true) }}
        />
      )}
      {checkoutOpen && (
        <CheckoutModal
          total={total}
          error={checkoutError}
          submitting={submitting}
          onClose={() => setCheckoutOpen(false)}
          onSubmit={placeOrder}
        />
      )}
      <OrderToast order={order} onDismiss={() => setOrder(null)} />
    </div>
  )
}

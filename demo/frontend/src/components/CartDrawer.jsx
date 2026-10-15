import { ArrowRight, Minus, Plus, ShoppingBag, X } from 'lucide-react'
import { money } from '../data/menu.js'

function CartLine({ item, onQuantityChange }) {
  return (
    <div className="cart-line">
      <img src={item.imageUrl} alt="" />
      <div className="cart-line-detail">
        <strong>{item.name}</strong>
        <span>{money(item.price)}</span>
        <div className="quantity-control">
          <button type="button" onClick={() => onQuantityChange(item.id, -1)} aria-label={`Remove one ${item.name}`}><Minus size={13} /></button>
          <span>{item.quantity}</span>
          <button type="button" onClick={() => onQuantityChange(item.id, 1)} aria-label={`Add one ${item.name}`}><Plus size={13} /></button>
        </div>
      </div>
    </div>
  )
}

function EmptyCart({ onClose }) {
  return (
    <div className="empty-cart">
      <span className="empty-bag-icon"><ShoppingBag size={24} /></span>
      <h3>Your bag is taking a little break.</h3>
      <p>Find something delicious and we'll take it from there.</p>
      <button className="checkout-button" type="button" onClick={onClose}>Explore the menu <ArrowRight size={17} /></button>
    </div>
  )
}

function CartSummary({ subtotal, deliveryFee, total, onCheckout }) {
  return (
    <div className="cart-summary">
      <div><span>Subtotal</span><span>{money(subtotal)}</span></div>
      <div><span>Delivery</span><span>{deliveryFee ? money(deliveryFee) : 'On us'}</span></div>
      <div className="summary-total"><strong>Total</strong><strong>{money(total)}</strong></div>
      <button className="checkout-button" type="button" onClick={onCheckout}>Go to checkout <ArrowRight size={17} /></button>
      <p>Small kitchens, big love. Thanks for ordering local.</p>
    </div>
  )
}

export default function CartDrawer({ items, itemCount, subtotal, deliveryFee, total, onQuantityChange, onClose, onCheckout }) {
  return (
    <div className="scrim" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <aside className="cart-drawer" aria-label="Your bag">
        <div className="drawer-heading">
          <div><span className="eyebrow">THE GOOD STUFF</span><h2>Your bag <span>({itemCount})</span></h2></div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close bag"><X size={20} /></button>
        </div>
        {items.length ? <>
          <div className="cart-lines">{items.map((item) => <CartLine key={item.id} item={item} onQuantityChange={onQuantityChange} />)}</div>
          <CartSummary subtotal={subtotal} deliveryFee={deliveryFee} total={total} onCheckout={onCheckout} />
        </> : <EmptyCart onClose={onClose} />}
      </aside>
    </div>
  )
}
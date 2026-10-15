import { ArrowRight, X } from 'lucide-react'
import { money } from '../data/menu.js'

export default function CheckoutModal({ total, error, submitting, onClose, onSubmit }) {
  function submitForm(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    onSubmit({ customerName: form.get('customerName'), deliveryAddress: form.get('deliveryAddress') })
  }

  return (
    <div className="modal-scrim" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="checkout-modal" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
        <div className="drawer-heading">
          <div><span className="eyebrow">ALMOST THERE</span><h2 id="checkout-title">Delivery details</h2></div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close checkout"><X size={20} /></button>
        </div>
        <form onSubmit={submitForm}>
          <label>Your name<input name="customerName" autoComplete="name" placeholder="Jamie Taylor" required maxLength="100" /></label>
          <label>Delivery address<input name="deliveryAddress" autoComplete="street-address" placeholder="42 Market Street, Apt 3" required maxLength="250" /></label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <div className="checkout-total"><span>Order total</span><strong>{money(total)}</strong></div>
          <button className="checkout-button" type="submit" disabled={submitting}>{submitting ? 'Placing your order…' : 'Place my order'} <ArrowRight size={17} /></button>
        </form>
      </section>
    </div>
  )
}
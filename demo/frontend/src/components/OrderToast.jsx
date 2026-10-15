import { Check, X } from 'lucide-react'

export default function OrderToast({ order, onDismiss }) {
  if (!order) return null

  return (
    <div className="toast" role="status">
      <span><Check size={18} /></span>
      <div><strong>Order #{order.id} is in!</strong><small>Your neighborhood kitchen is getting started.</small></div>
      <button className="icon-button" type="button" onClick={onDismiss} aria-label="Dismiss notification"><X size={17} /></button>
    </div>
  )
}
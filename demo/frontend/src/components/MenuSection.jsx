import { Check, Clock3, Plus, Search, Star, X } from 'lucide-react'
import { categories, money } from '../data/menu.js'

function FoodCard({ item, quantity, onAdd }) {
  return (
    <article className="food-card">
      <div className="food-photo">
        <img src={item.imageUrl} alt={item.name} loading="lazy" />
        {item.popular && <span className="popular-label">LOCAL FAVE</span>}
        <span className="food-rating"><Star size={13} fill="currentColor" /> {item.rating.toFixed(1)}</span>
      </div>
      <div className="food-info">
        <div className="food-title-row">
          <h3>{item.name}</h3>
          <strong>{money(item.price)}</strong>
        </div>
        <p>{item.description}</p>
        <div className="food-meta">
          <span><Clock3 size={14} /> {item.prepTime} min</span>
          <span>{item.category}</span>
        </div>
        <button className={quantity ? 'add-button added' : 'add-button'} type="button" onClick={onAdd}>
          {quantity ? <><Check size={16} /> Added <span className="add-quantity">{quantity}</span></> : <><Plus size={16} /> Add to bag</>}
        </button>
      </div>
    </article>
  )
}

function EmptyMenu({ onReset }) {
  return (
    <div className="empty-menu">
      <span>Nothing on the menu by that name just yet.</span>
      <button type="button" onClick={onReset}>See everything</button>
    </div>
  )
}

export default function MenuSection({ items, cart, category, search, onCategoryChange, onSearchChange, onAdd }) {
  return (
    <section className="menu-section" id="menu">
      <div className="section-heading">
        <div><div className="eyebrow"><span className="eyebrow-line" /> THE NEIGHBORHOOD MENU</div><h2>What sounds <em>good?</em></h2></div>
        <label className="search-box">
          <Search size={18} />
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Find something delicious"
            aria-label="Search menu"
          />
          {search && <button type="button" onClick={() => onSearchChange('')} aria-label="Clear search"><X size={16} /></button>}
        </label>
      </div>
      <div className="menu-toolbar">
        <div className="category-list" role="tablist" aria-label="Food categories">
          {categories.map((item) => (
            <button
              key={item}
              role="tab"
              aria-selected={category === item}
              className={category === item ? 'category-chip selected' : 'category-chip'}
              onClick={() => onCategoryChange(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <span className="menu-count">{items.length} good things</span>
      </div>
      {items.length ? (
        <div className="food-grid">
          {items.map((item) => (
            <FoodCard
              key={item.id}
              item={item}
              quantity={cart[item.id] || 0}
              onAdd={() => onAdd(item.id)}
            />
          ))}
        </div>
      ) : <EmptyMenu onReset={() => { onSearchChange(''); onCategoryChange('Everything') }} />}
    </section>
  )
}
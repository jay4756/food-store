import { ArrowRight, Clock3 } from 'lucide-react'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-line" /> YOUR NEXT GREAT MEAL</div>
        <h1>Good food.<br /><em>Good mood.</em></h1>
        <p>Little neighborhood favorites, made fresh and delivered with a little extra love.</p>
        <a className="hero-cta" href="#menu">Find your favorite <ArrowRight size={17} /></a>
        <div className="hero-note"><span className="avatar-stack"><i>J</i><i>M</i><i>A</i></span><span><strong>Loved around the block</strong><small>4.9 average from happy locals</small></span></div>
      </div>
      <div className="hero-art">
        <img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1400&q=90" alt="A colorful fresh meal ready to share" />
        <div className="hero-sticker"><span>FRESH</span><strong>made<br />for you</strong><span className="sticker-spark">✳</span></div>
        <div className="delivery-tag"><span className="delivery-tag-icon"><Clock3 size={17} /></span><span><strong>At your door in</strong><b>25–35 min</b></span></div>
      </div>
    </section>
  )
}
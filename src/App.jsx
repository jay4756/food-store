import './App.css'

 {/* you can add more items*/}
const menuItems = [
  { name: 'Pav Bhaji', image: '/images/pavbhaji.jpg', price: '₹80' },
  { name: 'Dabeli', image: '/images/dabeli.jpg', price: '₹50' },
  { name: 'Vada Pav', image: '/images/vadapav.jpg', price: '₹40' },
  { name: 'sevpuri', image: '/images/sevpuri.jpg', price: '₹60' },
  { name: 'dahipuri', image: '/images/dahipuri.jpg', price: '₹80' },
  { name: 'Puff', image: '/images/puff.jpg', price: '₹30' },
  { name: 'samosa', image: '/images/samosa.jpg', price: '₹30' },
  { name: 'cold coco', image: '/images/coco.jpg', price: '₹120' },
  { name: 'ice cream', image: '/images/ice_cream.jpg', price: '₹30' }
];

function App() {
  const ck = () => {
    alert('Successfully');
  }
  return (
    <div className="font-sans text-gray-800">
      {/* Header */}
      <header className="bg-yellow-400 p-6 text-center text-2xl font-bold">
        Street Food Store
      </header>

      {/* Featured Items */}
      <section className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {menuItems.map((item, index) => (
          <div key={index} className="bg-white shadow-md rounded-md p-4">
            <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded" />
            <h2 className="mt-2 text-xl font-semibold">{item.name}</h2>
            <p className="text-gray-600">{item.price}</p>
            <button onClick={ck} className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Add to Cart
            </button>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-center p-4 text-sm">
        &copy; 2025 Street Food Store. Taste the Tradition!
      </footer>
    </div>
  );
}


export default App;



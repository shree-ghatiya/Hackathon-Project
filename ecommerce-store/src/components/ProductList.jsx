export default function ProductList({ addToCart }) {
  const products = [
    { id: 1, name: "T-Shirt", price: 500 },
    { id: 2, name: "Shoes", price: 1500 },
    { id: 3, name: "Watch", price: 2000 },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Products</h2>
      <div className="grid grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p.id} className="p-4 border rounded shadow">
            <h3 className="font-semibold">{p.name}</h3>
            <p>₹{p.price}</p>
            <button
              className="bg-green-500 text-white px-3 py-1 mt-2 rounded"
              onClick={() => addToCart(p)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

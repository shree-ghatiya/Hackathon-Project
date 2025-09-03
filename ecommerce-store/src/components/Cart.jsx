import { Link } from "react-router-dom";

export default function Cart({ cart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <ul>
          {cart.map((item, idx) => (
            <li key={idx} className="border-b py-2">
              {item.name} - ₹{item.price}
            </li>
          ))}
        </ul>
      )}
      <h3 className="mt-4 font-bold">Total: ₹{total}</h3>
      <Link
        to="/checkout"
        className="bg-blue-500 text-white px-3 py-1 mt-2 inline-block rounded"
      >
        Checkout
      </Link>
    </div>
  );
}

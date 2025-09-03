export default function Checkout({ cart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handlePayment = () => {
    alert("✅ Payment Successful! Order Placed.");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>
      <p>Total Payable: ₹{total}</p>
      <button
        onClick={handlePayment}
        className="bg-green-600 text-white px-4 py-2 mt-4 rounded"
      >
        Pay Now
      </button>
    </div>
  );
}

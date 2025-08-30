import React, { useState } from "react";

function App() {
  const [count, setCount] = useState(4);
  const [text, setText] = useState("Blue");

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {/* Counter Section */}
      <h2>Counter</h2>
      <p style={{ fontSize: "24px" }}>{count}</p>
      <button onClick={decrement}> - </button>
      <button onClick={increment}> + </button>

      <hr style={{ margin: "30px 0" }} />

      {/* Live Text Preview Section */}
      <h2>Live Text Preview</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
      />
      <p>Preview: {text ? text : "(nothing yet)"}</p>
    </div>
  );
}

export default App;

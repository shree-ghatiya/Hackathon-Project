import React from "react";
import ProfileCardDemo from "./components/ProfileCardDemo";  // 👈 नया component import

function App() {
  return (
    <div className="App">
      <ProfileCardDemo />   {/* 👈 यहां हमारा Profile Card render होगा */}
    </div>
  );
}

export default App;

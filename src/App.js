import React from "react";
import "./App.css";

import Transactions from "./components/transactions";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Transactions />
      </header>
    </div>
  );
};

export default App;

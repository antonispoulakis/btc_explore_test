import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import Transactions from "./components/Transactions";

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

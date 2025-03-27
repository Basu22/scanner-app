import React, { useState } from "react";
import BarcodeScanner from "./BarcodeScanner";

const App = () => {

  const [scannedCode, setScannedCode] = useState("");

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Escáner de Códigos de Barras</h1>
      <BarcodeScanner onDetected={setScannedCode} />
      {scannedCode && <h2>Código escaneado: {scannedCode}</h2>}
    </div>
  );
};

export default App;

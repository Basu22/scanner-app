import React, { useEffect, useRef, useState } from "react";

const BarcodeScanner = ({ onDetected }) => {
  const scannerRef = useRef(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let Quagga;
    
    import("quagga").then((module) => {
      Quagga = module.default;

      if (!scannerRef.current) return;

      Quagga.init(
        {
          inputStream: {
            type: "LiveStream",
            constraints: {
              width: 640,
              height: 480,
              facingMode: "environment", // Usa la cámara trasera
            },
            target: scannerRef.current, // Dónde se mostrará la cámara
          },
          decoder: {
            readers: ["ean_reader"], // Tipos de códigos a leer
          },
        },
        (err) => {
          if (err) {
            console.error("Error al iniciar Quagga:", err);
            setError("No se pudo iniciar la cámara.");
            return;
          }
          Quagga.start();
        }
      );

      Quagga.onDetected((data) => {
        onDetected(data.codeResult.code);
      });
    });

    return () => {
      if (Quagga) Quagga.stop();
    };
  }, [onDetected]);

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div ref={scannerRef} style={{ width: "100%", height: "auto" }} />
    </div>
  );
};

export default BarcodeScanner;


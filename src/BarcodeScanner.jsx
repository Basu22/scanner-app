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
              width: 1280, 
              height: 720,
              facingMode: "environment", 
            },
            target: scannerRef.current,
          },
          decoder: {
            readers: ["ean_reader"],
          },
          locator: {
            patchSize: "small", // Prueba "medium" o "large" si sigue sin detectar
            halfSample: false,
          },
          locate: false, // Desactiva la localización automática
          numOfWorkers: navigator.hardwareConcurrency || 4, // Usa múltiples hilos para mejorar rendimiento
        },
        (err) => {
          if (err) {
            console.error("Error al iniciar Quagga:", err);
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


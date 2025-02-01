import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const MainApp: React.FC = () => {
  useEffect(() => {
    // Any side effects can go here
  }, []);

  return <App />;
};

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement as HTMLElement);
  root.render(<MainApp />);
} else {
  console.error("Root element not found");
}

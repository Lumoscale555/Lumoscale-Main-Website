import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { AuditModalProvider } from "./context/AuditModalContext";

createRoot(document.getElementById("root")!).render(
    <AuditModalProvider>
        <App />
    </AuditModalProvider>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { RootProvider } from "@/providers/root-provider";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<RootProvider>
			<App />
		</RootProvider>
	</React.StrictMode>,
);

import { EntryList } from "./layout/entry-list";
import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
	return (
		<ThemeProvider defaultTheme="system">
			<EntryList />
		</ThemeProvider>
	);
}

export default App;

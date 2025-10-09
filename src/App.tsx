import "./App.css";
import { useAtomValue } from "jotai";
import { EntryList } from "@/layout/entry-list";
import { PasswordPrompt } from "@/layout/password-prompt";
import { loadedAtom } from "@/lib/jotai/state/password-prompt-atoms";

function App() {
	const loaded = useAtomValue(loadedAtom);

	if (!loaded) {
		return <PasswordPrompt />;
	}

	return <EntryList />;
}

export default App;

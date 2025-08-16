import "./App.css";
import { useAtom } from "jotai";
import { EntryList } from "@/layout/entry-list";
import { PasswordPrompt } from "@/layout/password-prompt";
import { strongholdLoaded } from "@/lib/jotai/atoms";

function App() {
	const [loaded] = useAtom(strongholdLoaded);

	return loaded ? <EntryList /> : <PasswordPrompt />;
}

export default App;

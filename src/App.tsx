import "./App.css";
import { useAtom } from "jotai";
import { EntryList } from "@/layout/entry-list";
import { PasswordPrompt } from "@/layout/password-prompt";
import { strongholdLoadedAtom } from "@/lib/jotai/state/stronghold-atoms";

function App() {
	const [loaded] = useAtom(strongholdLoadedAtom);

	return loaded ? <EntryList /> : <PasswordPrompt />;
}

export default App;

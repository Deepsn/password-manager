import { EntryCard } from "../components/entry-card";

export function EntryList() {
	return (
		<div className="flex flex-col gap-4 p-5">
			<EntryCard name="TestEntry" type="password" />
		</div>
	);
}

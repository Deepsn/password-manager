import { useAtomValue } from "jotai";
import { AddEntry } from "@/components/add-entry";
import { entriesAtom } from "@/lib/jotai/state/entries-atoms";
import { EntryCard } from "../components/entry-card";

export function EntryList() {
	const entries = useAtomValue(entriesAtom);

	return (
		<>
			<div className="flex flex-col gap-4 p-5">
				{entries.length !== 0 ? (
					entries.map((entry) => <EntryCard key={entry.id} name="TestEntry" type="password" />)
				) : (
					<p className="text-center">No entries found. Please add some entries to get started.</p>
				)}
			</div>
			<AddEntry />
		</>
	);
}

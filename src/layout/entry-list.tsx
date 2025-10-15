import { useAtomValue } from "jotai";
import { AddEntry } from "@/components/add-entry";
import { LockVault } from "@/components/lock-vault";
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

			<div className="fixed bottom-4 right-4 flex items-center justify-center gap-2">
				<AddEntry />
				<LockVault />
			</div>
		</>
	);
}

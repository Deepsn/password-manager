import { atom } from "jotai";
import { store } from "@/lib/jotai/store";
import { type Entry, vaultManager } from "@/lib/vault";

export const baseEntriesAtom = atom<Entry[]>([]);

export const entriesAtom = atom(
	(get) => get(baseEntriesAtom),
	async (_, set, newEntry: Entry) => {
		const entries = await vaultManager.addEntry(newEntry);
		set(baseEntriesAtom, entries);
	},
);

entriesAtom.onMount = () => {
	vaultManager.getEntries().then((entries) => {
		store.set(baseEntriesAtom, entries);
	});
};

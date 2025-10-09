import { invoke } from "@tauri-apps/api/core";
import { baseEntriesAtom } from "@/lib/jotai/state/entries-atoms";
import { store } from "@/lib/jotai/store";

export interface Entry {
	id: string;
	name: string;
	content: string;

	created_at: string;
	updated_at: string;
}

class VaultManager {
	public async unlock(password: string) {
		// encrypt password with public key
		// todo: implement encryption

		return invoke("unlock_vault", { password });
	}

	public async lock(password: string) {
		return invoke("lock_vault", { password });
	}

	public async addEntry(entry: Entry) {
		await invoke("add_entry", { entry });
		return this.getEntries();
	}

	public async getEntries() {
		const entries = (await invoke("list_entries")) as Entry[];
		store.set(baseEntriesAtom, entries);
		return entries;
	}
}

export const vaultManager = new VaultManager();

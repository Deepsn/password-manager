import { appDataDir } from "@tauri-apps/api/path";
import { type Client, Stronghold } from "@tauri-apps/plugin-stronghold";
import { strongholdLoadedAtom } from "@/lib/jotai/state/stronghold-atoms";
import { store } from "@/lib/jotai/store";

class StrongholdManager {
	public stronghold: Stronghold | undefined;
	public client: Client | undefined;

	public async init(vaultPassword: string) {
		const vaultPath = `${await appDataDir()}/vault.hold`;
		const stronghold = await Stronghold.load(vaultPath, vaultPassword);

		const clientName = "password-manager"; // future: profile support
		let client: Client;

		try {
			client = await stronghold.loadClient(clientName);
		} catch {
			client = await stronghold.createClient(clientName);
		}

		this.stronghold = stronghold;
		this.client = client;
		store.set(strongholdLoadedAtom, true);
	}

	public async getEntries(): Promise<string[]> {
		const entriesJson = await this.read("entries").catch(() => null);
		if (!entriesJson) return [];

		try {
			const entries = JSON.parse(entriesJson);
			if (!Array.isArray(entries)) throw new Error("Entries data is not an array");
			return entries;
		} catch (error) {
			console.error("Failed to parse entries:", error);
			return [];
		}
	}

	public async addEntry(entry: string): Promise<void> {
		if (!this.client) throw new Error("Stronghold client is not initialized");

		const store = this.client.getStore();
		const entries = await this.getEntries();
		entries.push(entry);

		const entriesJson = JSON.stringify(entries);
		const data = Array.from(new TextEncoder().encode(entriesJson));

		await store.insert("entries", data);
	}

	private async read(key: string) {
		if (!this.client) throw new Error("Stronghold client is not initialized");

		const store = this.client.getStore();
		const data = await store.get(key).catch(() => null);

		if (!data) throw new Error(`Key "${key}" not found in Stronghold store`);

		const decoder = new TextDecoder();
		return decoder.decode(new Uint8Array(data));
	}
}

export const strongholdService = new StrongholdManager();

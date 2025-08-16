import { strongholdLoaded } from "@/lib/jotai/atoms";
import { store } from "@/lib/jotai/store";
import { appDataDir } from "@tauri-apps/api/path";
import { type Client, Stronghold } from "@tauri-apps/plugin-stronghold";

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
        store.set(strongholdLoaded, true);
    }
}

export const strongholdService = new StrongholdManager();

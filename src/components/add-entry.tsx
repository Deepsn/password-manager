import { LockIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Entry, vaultManager } from "@/lib/vault";

export function AddEntry() {
	const handleAddEntry = async () => {
		const newEntry = {
			id: crypto.randomUUID(),
			name: "New Entry",
			content: "Enter your password here",
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		} satisfies Entry;

		vaultManager.addEntry(newEntry);
	};

	const handleLockVault = async () => {
		// todo: change to modal prompt
		const password = prompt("Enter your password to lock the vault:");
		if (!password) return;
		await vaultManager.lock(password);
		window.location.reload();
	};

	return (
		<div className="fixed bottom-4 right-4 flex items-center justify-center gap-2">
			<Button onClick={handleAddEntry} className="btn btn-primary">
				<PlusIcon />
			</Button>
			<Button onClick={handleLockVault} className="btn btn-primary">
				<LockIcon />
			</Button>
		</div>
	);
}

import { LockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { vaultManager } from "@/lib/vault";

export function LockVault() {
	const handleLockVault = async () => {
		// todo: change to modal prompt
		const password = prompt("Enter your password to lock the vault:");
		if (!password) return;
		await vaultManager.lock(password);
		window.location.reload();
	};

	return (
		<Button onClick={handleLockVault} className="btn btn-primary">
			<LockIcon />
		</Button>
	);
}

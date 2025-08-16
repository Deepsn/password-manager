import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { strongholdService } from "@/lib/stronghold";

const formSchema = z.object({
	password: z
		.string()
		.min(1, "Password is required")
		.min(2, "Password must be at least 8 characters")
		.max(64, "Password must be at most 64 characters"),
});

export function PasswordPrompt() {
	const form = useForm({
		resolver: zodResolver(formSchema),
	});

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | undefined>(undefined);

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setLoading(true);
		setError(undefined);

		await strongholdService.init(values.password).catch((err) => {
			if (err instanceof Error) {
				setError(err.message);
				return;
			}

			setError("An unknown error occurred");
		});

		setLoading(false);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col justify-center space-y-8 h-full p-8"
				aria-disabled={loading}
			>
				<h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Enter Vault Password</h2>
				<FormField
					defaultValue=""
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input type="password" placeholder="Password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button disabled={loading} type="submit">
					Unlock Vault
					{loading && <Loader2Icon className="animate-spin" />}
				</Button>
				{error && <p className="text-sm text-red-600">{error}</p>}
			</form>
		</Form>
	);
}

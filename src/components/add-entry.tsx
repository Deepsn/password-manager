import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useId, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { type Entry, vaultManager } from "@/lib/vault";

const formEntrySchema = z.object({
	name: z.string().min(1, "Name is required"),
	content: z.string().min(1, "Content is required"),
});

type FormEntry = z.infer<typeof formEntrySchema>;

export function AddEntry() {
	const usernameId = useId();
	const passwordId = useId();
	const [open, setOpen] = useState(false);
	const dialogCloseRef = useRef<HTMLButtonElement>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormEntry>({
		resolver: zodResolver(formEntrySchema),
		defaultValues: {
			name: "",
			content: "",
		},
	});

	const onSubmit = (data: FormEntry) => {
		try {
			const newEntry = {
				id: crypto.randomUUID(), // todo: generate id on backend
				name: data.name,
				content: data.content,
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
			} satisfies Entry;

			vaultManager.addEntry(newEntry);
			toast.success("Entry added successfully!");
			reset();
			setOpen(false);
		} catch (_) {
			toast.error("Failed to add entry.");
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="btn btn-primary">
					<PlusIcon />
				</Button>
			</DialogTrigger>

			<DialogContent showCloseButton={false}>
				<DialogHeader>
					<DialogTitle>Add Entry</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit(onSubmit)}>
					<FieldGroup>
						<FieldSet>
							<FieldGroup>
								<Field>
									<FieldLabel htmlFor={usernameId}>Username</FieldLabel>
									<Input id={usernameId} type="text" placeholder="John doe" {...register("name")} />
									{errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
								</Field>

								<Field>
									<FieldLabel htmlFor={passwordId}>Password</FieldLabel>
									<Input id={passwordId} type="password" placeholder="********" {...register("content")} />
									{errors.content && <span className="text-red-500 text-xs">{errors.content.message}</span>}
								</Field>
							</FieldGroup>
						</FieldSet>

						<Field orientation="horizontal">
							<Button type="submit">Submit</Button>
							<DialogClose asChild>
								<Button type="button" variant="outline" ref={dialogCloseRef}>
									Cancel
								</Button>
							</DialogClose>
						</Field>
					</FieldGroup>
				</form>
			</DialogContent>
		</Dialog>
	);
}

import { CopyIcon, EllipsisIcon, KeyRoundIcon, PencilIcon, PinIcon, Trash2Icon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface EntryCardProps {
	name: string;
	type: "password";
}

export function EntryCard({ name, type }: EntryCardProps) {
	function handleEntryAction(action: string) {}

	return (
		<Card onClick={() => console.log("Card clicked")}>
			<CardHeader>
				<CardTitle>{name}</CardTitle>

				<CardDescription>testemail@email.com</CardDescription>

				<CardAction className="flex flex-col align-middle">
					<Button variant={"ghost"} onClick={() => handleEntryAction("copy")}>
						<CopyIcon />
					</Button>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant={"ghost"} className="cursor-pointer">
								<EllipsisIcon />
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent className="w-56" align="start">
							<DropdownMenuItem onClick={() => handleEntryAction("edit")}>
								<PencilIcon />
								Edit
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => handleEntryAction("pin")}>
								<PinIcon />
								Pin
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => handleEntryAction("delete")}>
								<Trash2Icon />
								Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</CardAction>
			</CardHeader>

			<CardFooter>
				{type === "password" && (
					<Badge variant={"secondary"} className="bg-blue-500 text-white dark:bg-blue-600">
						<KeyRoundIcon />
						Password
					</Badge>
				)}
			</CardFooter>
		</Card>
	);
}

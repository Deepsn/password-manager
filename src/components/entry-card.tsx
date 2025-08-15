import {
	EllipsisIcon,
	KeyRoundIcon,
	PencilIcon,
	PinIcon,
	Trash2Icon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardAction,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface EntryCardProps {
	name: string;
	type: "password";
}

export function EntryCard({ name, type }: EntryCardProps) {
	return (
		<Card onClick={() => console.log("Card clicked")}>
			<CardHeader>
				<CardTitle>{name}</CardTitle>

				<CardDescription>testemail@email.com</CardDescription>

				<CardAction>
					<DropdownMenu>
						<DropdownMenuTrigger className="cursor-pointer">
							<EllipsisIcon />
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56" align="start">
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<PencilIcon />
								Edit
							</DropdownMenuItem>
							<DropdownMenuItem>
								<PinIcon />
								Pin
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Trash2Icon />
								Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</CardAction>
			</CardHeader>

			<CardFooter>
				{type === "password" && (
					<Badge
						variant={"secondary"}
						className="bg-blue-500 text-white dark:bg-blue-600"
					>
						<KeyRoundIcon />
						Password
					</Badge>
				)}
			</CardFooter>
		</Card>
	);
}

import { Provider } from "jotai";
import type { PropsWithChildren } from "react";
import { Toaster } from "@/components/ui/sonner";
import { store } from "@/lib/jotai/store";
import { ThemeProvider } from "@/providers/theme-provider";

export function RootProvider({ children }: PropsWithChildren) {
	return (
		<ThemeProvider defaultTheme="system">
			<Toaster />
			<Provider store={store}>{children}</Provider>
		</ThemeProvider>
	);
}

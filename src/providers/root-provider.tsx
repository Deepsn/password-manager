import { Provider } from "jotai";
import type { PropsWithChildren } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { store } from "@/lib/jotai/store";

export function RootProvider({ children }: PropsWithChildren) {
	return (
		<ThemeProvider defaultTheme="system">
			<Provider store={store}>{children}</Provider>
		</ThemeProvider>
	);
}

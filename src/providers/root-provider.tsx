import { ThemeProvider } from "@/components/theme-provider";
import { store } from "@/lib/jotai/store";
import { Provider } from "jotai";
import { PropsWithChildren } from "react";

export function RootProvider({ children }: PropsWithChildren) {
    return (
        <ThemeProvider defaultTheme="system">
			<Provider store={store}>
                {children}
            </Provider>
        </ThemeProvider>
    )
}
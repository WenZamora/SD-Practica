"use client"; // voy a usar los hooks -> por eso no lo hago en el layout que es server component

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export function Providers({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient()); // instancia de QueryClient, para  que no se recree en cada renderizado

    return (
        <html lang="es">
            <body>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </body>
        </html>
    );
}
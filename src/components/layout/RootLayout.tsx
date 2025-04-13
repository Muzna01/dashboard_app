"use client";

import { usePathname } from "next/navigation";
import { VerticalNav } from "./VerticalNav";
import { BreadcrumbNav } from "./BreadcrumbNav";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function RootLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuthRoute = pathname.startsWith("/login") || pathname === "/";
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

    if (isAuthRoute) {
        return <div className="min-h-screen bg-background">{children}</div>;
    }

    return (
        <div className="min-h-screen bg-background">
            <VerticalNav onSidePanelToggle={setIsSidePanelOpen} />
            <BreadcrumbNav />
            <main
                className={cn(
                    "transition-all duration-300 pt-16",
                    isSidePanelOpen ? "ml-80" : "ml-16"
                )}
            >
                <div className="p-6">{children}</div>
            </main>
        </div>
    );
} 
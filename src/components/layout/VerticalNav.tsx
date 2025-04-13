"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Users,
    Settings,
    HelpCircle,
    Search,
    FileText,
    BarChart,
    Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Users, label: "Users", href: "/users" },
    { icon: FileText, label: "Documents", href: "/documents" },
    { icon: BarChart, label: "Analytics", href: "/analytics" },
    { icon: Bell, label: "Notifications", href: "/notifications" },
];

const sidePanelItems = {
    dashboard: [
        { label: "Manage Booking", href: "/dashboard" },
        { label: "Manage Room", href: "/dashboard/room" },
        { label: "Payment", href: "/dashboard/payment" },
        { label: "Customer Chat", href: "/dashboard/chat" },
        { label: "Help Center", href: "/dashboard/help" },
    ],
    users: [
        { label: "All Users", href: "/users/all" },
        { label: "Active Users", href: "/users/active" },
        { label: "User Roles", href: "/users/roles" },
    ],
    documents: [
        { label: "All Documents", href: "/documents/all" },
        { label: "Recent", href: "/documents/recent" },
        { label: "Shared", href: "/documents/shared" },
    ],
    analytics: [
        { label: "Overview", href: "/analytics/overview" },
        { label: "Traffic", href: "/analytics/traffic" },
        { label: "Revenue", href: "/analytics/revenue" },
    ],
    notifications: [
        { label: "All Notifications", href: "/notifications/all" },
        { label: "Unread", href: "/notifications/unread" },
        { label: "Settings", href: "/settings" },
    ],
};

interface VerticalNavProps {
    onSidePanelToggle: (isOpen: boolean) => void;
}

export function VerticalNav({ onSidePanelToggle }: VerticalNavProps) {
    const [activePanel, setActivePanel] = useState("/dashboard");
    const pathname = usePathname();

    useEffect(() => {
        // Set initial active panel based on current path
        const currentSection = `/${pathname.split('/')[1]}`;
        setActivePanel(currentSection);
        onSidePanelToggle(true);
    }, [pathname, onSidePanelToggle]);

    return (
        <div className="flex">
            {/* Main Navigation */}
            <div className="fixed left-0 top-0 h-screen w-16 bg-background border-r flex flex-col items-center">
                {/* Branding Section */}
                <div className="h-16 flex items-center justify-center w-full border-b">
                    <div className="font-bold text-xl">Logo</div>
                </div>

                {/* Primary Navigation */}
                <nav className="flex-1 py-4 flex flex-col items-center justify-center space-y-4">
                    {navItems.map((item) => (
                        <Button
                            key={item.href}
                            variant="ghost"
                            size="icon"
                            className={cn(
                                "h-12 w-12",
                                activePanel === item.href && "bg-accent"
                            )}
                            onClick={() => setActivePanel(item.href)}
                        >
                            <item.icon className="h-5 w-5" />
                        </Button>
                    ))}
                </nav>

                {/* Utility Section */}
                <div className="border-t p-4 w-full flex flex-col items-center space-y-2">
                    <Button variant="ghost" size="icon" className="h-12 w-12">
                        <Settings className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-12 w-12">
                        <HelpCircle className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {/* Side Panel - Always Visible */}
            <div className="fixed left-16 top-16 h-[calc(100vh-4rem)] w-64 bg-background border-r">
                <div className="p-4">
                    <h2 className="text-lg font-semibold mb-4">
                        {navItems.find(item => item.href === activePanel)?.label}
                    </h2>
                    <nav className="space-y-2">
                        {activePanel && sidePanelItems[activePanel.split('/')[1] as keyof typeof sidePanelItems]?.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center px-4 py-2 hover:bg-[#F8F9FA] rounded-md cursor-pointer transition-colors",
                                    pathname === item.href && "bg-[#F8F9FA]"
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
} 
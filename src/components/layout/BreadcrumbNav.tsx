"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Search, ChevronDown, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function BreadcrumbNav() {
    const pathname = usePathname();
    const paths = pathname.split("/").filter(Boolean);
    const [selectedHotel, setSelectedHotel] = useState("Hotel 1");

    const getDisplayName = (path: string) => {
        const pathMap: { [key: string]: string } = {
            'dashboard': 'Booking'
        };
        return pathMap[path] || path.charAt(0).toUpperCase() + path.slice(1);
    };

    return (
        <div className="fixed top-0 left-16 right-0 h-16 border-b bg-background z-10 ">
            <div className="flex items-center justify-between h-full px-4">
                <div className="flex items-center space-x-6">
                    {/* Location Selector */}
                    <div className="flex flex-col">
                        <span className="text-[#4A4E57] text-xs mb-0">LOCATION</span>
                        <div className="flex items-center">
                            <div className="flex items-center">
                                <MapPin className="h-4 w-4 text-[#4A4E57] mr-2" />
                                <span className="text-base">{selectedHotel}</span>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="ml-2 bg-[#F8F9FA] rounded-lg p-2 hover:bg-[#F0F1F2]">
                                        <ChevronDown className="h-4 w-4 text-[#4A4E57]" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    <DropdownMenuItem onClick={() => setSelectedHotel("Hotel 1")}>
                                        Hotel 1
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setSelectedHotel("Hotel 2")}>
                                        Hotel 2
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setSelectedHotel("Hotel 3")}>
                                        Hotel 3
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    {/* Breadcrumbs */}
                    <div className="flex items-center space-x-2">
                        {paths.map((path, index) => (
                            <div key={path} className="flex items-center">
                                {index > 0 && <ChevronRight className="h-4 w-4 text-muted-foreground mx-2" />}
                                <Link
                                    href={`/${paths.slice(0, index + 1).join("/")}`}
                                    className={cn(
                                        "text-muted-foreground hover:text-foreground",
                                        index === paths.length - 1 && "text-foreground font-medium"
                                    )}
                                >
                                    {getDisplayName(path)}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Search */}
                <div className="relative w-64">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="pl-8"
                    />
                </div>
            </div>
        </div>
    );
} 
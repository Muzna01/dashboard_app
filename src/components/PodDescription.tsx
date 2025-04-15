"use client";

import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronDown, Filter, MoreVertical } from "lucide-react";

interface Pod {
    id: string;
    material: string;
    feature: string;
    type: string;
    status: 'Available' | 'Not available';
}

const pods: Pod[] = [
    { id: "100001", material: "Fiberglass", feature: "Comfortable mattress, Adjustable lighting...", type: "Power Nap Pod", status: "Available" },
    { id: "100002", material: "Tempered Glass", feature: "Comfortable mattress, Adjustable lighting...", type: "Power Nap Pod", status: "Available" },
    { id: "100003", material: "Fiberglass", feature: "Comfortable mattress, Adjustable lighting...", type: "Power Nap Pod", status: "Available" },
    { id: "100004", material: "Steel Frame", feature: "Comfortable mattress, Adjustable lighting...", type: "Power Nap Pod", status: "Available" },
    { id: "100005", material: "Fiberglass", feature: "Comfortable mattress, Adjustable lighting...", type: "Power Nap Pod", status: "Available" },
];

export default function PodDescription() {
    const [activeTab, setActiveTab] = useState<'All' | 'Available' | 'Not available'>('All');
    const [selectedDate, setSelectedDate] = useState<string>("01/01/2025");

    const filteredPods = activeTab === 'All'
        ? pods
        : pods.filter(pod => pod.status === activeTab);

    return (
        <div className="p-6 space-y-4">
            {/* Status Tabs */}
            <div className="bg-[#EAEAEA] inline-flex">
                {(['All', 'Available', 'Not available'] as const).map((tab) => (
                    <Button
                        key={tab}
                        variant="ghost"
                        className={`px-6 py-2 text-sm rounded-none ${activeTab === tab
                            ? "border-b-2 border-black font-medium"
                            : "text-gray-700 hover:bg-gray-100"
                            }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </Button>
                ))}
            </div>

            <div className="flex items-center justify-between border border-gray-200  p-2">
                <div className="relative">
                    <Button variant="outline" className="flex items-center gap-2 text-sm font-normal border-gray-300 px-3 py-1.5 h-auto">
                        {selectedDate}
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        className="h-8 px-3 bg-white text-sm font-medium border border-gray-300 rounded-none hover:bg-black hover:text-white"
                    >
                        Filters
                    </Button>
                    <Button
                        className="h-8 px-3 bg-black text-white text-sm font-medium rounded-none hover:bg-white hover:text-black"
                    >
                        Add Pod
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="w-full">
                <Table className="w-full">
                    <TableHeader className="after:content-[''] after:block after:h-3 after:bg-white">
                        <TableRow className="bg-[#DFDFDF] border border-black">
                            <TableHead className="py-2.5 px-4 text-sm font-medium text-black w-[15%] text-left">Pod ID</TableHead>
                            <TableHead className="py-2.5 px-4 text-sm font-medium text-black w-[15%] text-left">Material</TableHead>
                            <TableHead className="py-2.5 px-4 text-sm font-medium text-black w-[35%] text-left">Feature</TableHead>
                            <TableHead className="py-2.5 px-4 text-sm font-medium text-black w-[15%] text-left">Type</TableHead>
                            <TableHead className="py-2.5 px-4 text-sm font-medium text-black w-[15%] text-left">Status</TableHead>
                            <TableHead className="py-2.5 px-4 w-[5%]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y-[12px] divide-white">
                        {filteredPods.map((pod) => (
                            <TableRow
                                key={pod.id}
                                className="bg-[#DFDFDF] hover:bg-[#E5E7EB]/90 cursor-pointer"
                            >
                                <TableCell className="py-2.5 px-4 text-sm font-medium w-[15%]">{pod.id}</TableCell>
                                <TableCell className="py-2.5 px-4 text-sm w-[15%]">{pod.material}</TableCell>
                                <TableCell className="py-2.5 px-4 text-sm w-[35%]">{pod.feature}</TableCell>
                                <TableCell className="py-2.5 px-4 text-sm w-[15%]">{pod.type}</TableCell>
                                <TableCell className="py-2.5 px-4 text-sm w-[15%]">{pod.status}</TableCell>
                                <TableCell className="py-2.5 px-4 w-[5%]">
                                    <div className="flex justify-end">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 hover:bg-gray-200 rounded-full"
                                        >
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}             
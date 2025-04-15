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
import { ChevronDown, MoreVertical } from "lucide-react";
import { RoomSidePanel } from "./RoomSidePanel";

interface Room {
    roomNo: string;
    noOfBeds: number;
    type: string;
    status: 'Occupied' | 'Vacant' | 'Room Service';
}

const rooms: Room[] = [
    { roomNo: "100 F1", noOfBeds: 4, type: "Deluxe", status: "Occupied" },
    { roomNo: "101 F1", noOfBeds: 3, type: "Standard", status: "Vacant" },
    { roomNo: "102 F1", noOfBeds: 6, type: "Deluxe", status: "Vacant" },
    { roomNo: "103 F1", noOfBeds: 1, type: "Standard", status: "Occupied" },
    { roomNo: "104 F1", noOfBeds: 1, type: "Standard", status: "Room Service" },
    { roomNo: "105 F1", noOfBeds: 6, type: "Deluxe", status: "Occupied" },
    { roomNo: "106 F1", noOfBeds: 4, type: "Standard", status: "Occupied" },
    { roomNo: "106 F1", noOfBeds: 4, type: "Deluxe", status: "Occupied" },
    { roomNo: "107 F1", noOfBeds: 4, type: "Standard", status: "Vacant" },
];

export default function RoomDescription() {
    const [activeTab, setActiveTab] = useState<'All' | 'Occupied' | 'Vacant' | 'Room Service'>('All');
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

    const filteredRooms = activeTab === 'All'
        ? rooms
        : rooms.filter(room => room.status === activeTab);

    const handleRowClick = (room: Room) => {
        setSelectedRoom(room);
        setIsDescriptionOpen(true);
    };

    return (
        <div className="p-6 space-y-4">
            {/* Status Tabs */}
            <div className="bg-[#EAEAEA] inline-flex rounded-none">
                {(['All', 'Occupied', 'Vacant', 'Room Service'] as const).map((tab) => (

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
            <div className="flex items-center justify-between border rounded-md p-2">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" className="flex items-center gap-2 text-sm font-normal">
                        01/01/2025
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" className="flex items-center gap-2 text-sm font-normal">
                        10AM
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                </div>
                <Button
                    variant="outline"
                    className="h-8 px-3 bg-white text-sm font-medium border border-gray-300 rounded-none hover:bg-black hover:text-white"
                >
                    Filters
                </Button>
            </div>
            {/* Table */}
            <div className="w-full ">
                <Table>
                    <TableHeader className="after:content-[''] after:block after:h-3 after:bg-white">
                        <TableRow className="bg-[#DFDFDF] border border-black">
                            <TableHead className="py-2.5 px-4 text-sm font-medium text-black w-[150px] text-left">Room No</TableHead>
                            <TableHead className="py-2.5 px-4 text-sm font-medium text-black w-[150px] text-left">No of Beds</TableHead>
                            <TableHead className="py-2.5 px-4 text-sm font-medium text-black w-[200px] text-left">Type</TableHead>
                            <TableHead className="py-2.5 px-4 text-sm font-medium text-black w-[200px] text-right">Status</TableHead>
                            <TableHead className="py-2.5 px-4 w-[297px] p-0"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y-[12px] divide-white">
                        {filteredRooms.map((room) => (
                            <TableRow
                                key={room.roomNo}
                                className="bg-[#DFDFDF] hover:bg-[#E5E7EB]/90 cursor-pointer"
                                onClick={() => handleRowClick(room)}
                            >
                                <TableCell className="py-2.5 px-4 text-sm">{room.roomNo}</TableCell>
                                <TableCell className="py-2.5 px-4 text-sm">{room.noOfBeds}</TableCell>
                                <TableCell className="py-2.5 px-4 text-sm">{room.type}</TableCell>
                                <TableCell className="py-2.5 px-4 text-sm w-[300px] flex justify-end text-left">{room.status}</TableCell>
                                <TableCell className="py-2.5 px-2">
                                    <div className="flex justify-end">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 hover:bg-transparent cursor-pointer"
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

            <   RoomSidePanel
                isOpen={isDescriptionOpen}
                onClose={() => setIsDescriptionOpen(false)}
                room={selectedRoom}
            />
        </div>
    );
}
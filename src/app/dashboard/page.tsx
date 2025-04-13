"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Filter, MoreVertical } from "lucide-react";
import { BookingDescription } from "@/components/BookingDescription";

// Define the Booking type
type Booking = {
    id: string;
    customerName: string;
    roomType: string;
    bookingDateTime: string;
    status: string;
    bookingType: string;
};

// Sample booking data
const bookings: Booking[] = [
    {
        id: "1234567",
        customerName: "Yaqoob Ahmed",
        roomType: "Deluxe",
        bookingDateTime: "2 March 2025 23:43:00",
        status: "On going",
        bookingType: "Platform"
    },
    {
        id: "1234567",
        customerName: "Sara Johnson",
        roomType: "Standard",
        bookingDateTime: "3 March 2025 14:30:00",
        status: "Upcoming",
        bookingType: "Walk In"
    },
    {
        id: "1234567",
        customerName: "Yaqoob Ahmed",
        roomType: "Deluxe",
        bookingDateTime: "2 March 2025 23:43:00",
        status: "Cancelled",
        bookingType: "Admin"
    },
    {
        id: "1234567",
        customerName: "Sara Johnson",
        roomType: "Standard",
        bookingDateTime: "3 March 2025 14:30:00",
        status: "On going",
        bookingType: "Via Call"
    },
    {
        id: "1234567",
        customerName: "Sara Johnson",
        roomType: "Standard",
        bookingDateTime: "3 March 2025 14:30:00",
        status: "On going",
        bookingType: "Platform"
    },
    {
        id: "1234567",
        customerName: "Yaqoob Ahmed",
        roomType: "Deluxe",
        bookingDateTime: "2 March 2025 23:43:00",
        status: "On going",
        bookingType: "Platform"
    },
    {
        id: "1234567",
        customerName: "Sara Johnson",
        roomType: "Standard",
        bookingDateTime: "3 March 2025 14:30:00",
        status: "On going",
        bookingType: "Platform"
    },
    {
        id: "1234567",
        customerName: "Yaqoob Ahmed",
        roomType: "Deluxe",
        bookingDateTime: "2 March 2025 23:43:00",
        status: "On going",
        bookingType: "Platform"
    },
    {
        id: "1234567",
        customerName: "Sara Johnson",
        roomType: "Standard",
        bookingDateTime: "3 March 2025 14:30:00",
        status: "Cancelled",
        bookingType: "Platform"
    }
];

export default function DashboardPage() {

    const [activeTab, setActiveTab] = useState<'All' | 'Ongoing' | 'Upcoming' | 'Cancelled'>('All');

    const filteredBookings = activeTab === 'All'
        ? bookings
        : bookings.filter(bookings => bookings.status === activeTab);

    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

    const handleRowClick = (booking: Booking) => {
        setSelectedBooking(booking);
        setIsDescriptionOpen(true);
    };

    return (
        <div className="flex flex-col gap-4 p-4">
            {/* Tabs Section */}
            <div className="flex gap-2">
                {(["All", "Ongoing", "Upcoming", "Cancelled"] as const).map((tab) => (
                    <Button
                        key={tab}
                        variant={activeTab === tab ? "default" : "outline"}
                        className={`rounded px-4 py-2 text-sm ${activeTab === tab
                            ? "bg-black text-white hover:bg-black/90"
                            : "bg-white hover:bg-gray-50"
                            }`}
                        onClick={() => setActiveTab(tab)}   >
                        {tab}
                    </Button>
                ))}
            </div>

            {/* Content Container */}
            <div className="w-full flex flex-col gap-3">
                {/* Buttons Section */}
                <div className="w-full border border-gray-200">
                    <div className="flex justify-end gap-2 px-3 py-2.5">
                        <Button
                            variant="outline"
                            className="h-8 px-3 bg-white text-sm font-medium border border-gray-300 rounded-none hover:bg-black hover:text-white"
                        >
                            Filters
                        </Button>
                        <Button
                            variant="default"
                            className="h-8 px-3 bg-black text-white text-sm font-medium rounded-none hover:bg-white hover:text-black"
                        >
                            New Booking
                        </Button>
                    </div>
                </div>

                {/* Table Section */}
                <div className="w-full border border-gray-200">
                    <Table>
                        <TableHeader className="after:content-[''] after:block after:h-3 after:bg-white">
                            <TableRow className="bg-[#DEDEDE]">
                                <TableHead className="py-2.5 px-4 text-sm font-medium text-left">Reference ID</TableHead>
                                <TableHead className="py-2.5 px-4 text-sm font-medium text-left">Customer Name</TableHead>
                                <TableHead className="py-2.5 px-4 text-sm font-medium text-left">Room Type</TableHead>
                                <TableHead className="py-2.5 px-4 text-sm font-medium text-left">Booking start date & time</TableHead>
                                <TableHead className="py-2.5 px-4 text-sm font-medium text-left">Booking Status</TableHead>
                                <TableHead className="py-2.5 px-4 text-sm font-medium text-left">Booking Type</TableHead>
                                <TableHead className="w-[297px] py-2.5 px-2"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y-[12px] divide-white">
                            {filteredBookings.map((booking) => (
                                <TableRow
                                    key={booking.id}
                                    className="bg-[#E8E8E8] cursor-pointer hover:bg-[#E0E0E0]"
                                    onClick={() => handleRowClick(booking)}
                                >
                                    <TableCell className="py-2.5 px-4 text-sm">{booking.id}</TableCell>
                                    <TableCell className="py-2.5 px-4 text-sm">{booking.customerName}</TableCell>
                                    <TableCell className="py-2.5 px-4 text-sm">{booking.roomType}</TableCell>
                                    <TableCell className="py-2.5 px-4 text-sm">{booking.bookingDateTime}</TableCell>
                                    <TableCell className="py-2.5 px-4">
                                        <span>
                                            {booking.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="py-2.5 px-4 text-sm">{booking.bookingType}</TableCell>
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
            </div>

            {/* Description Panel */}
            <BookingDescription
                isOpen={isDescriptionOpen}
                onClose={() => setIsDescriptionOpen(false)}
                booking={selectedBooking}
            />

        </div>
    );
} 
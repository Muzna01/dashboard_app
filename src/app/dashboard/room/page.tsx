"use client";

import { useState } from "react";
import { ArrowRight, X } from "lucide-react";

import RoomDescription from "@/components/RoomDescription";

interface RoomType {
    type: 'Deluxe' | 'Basic';
    size: number;
    beds: string;
    totalRooms: number;
    privateBathroom: boolean;
    maxGuests: number;
    price: number;
    description: string;
}

const roomTypes: RoomType[] = [
    {
        type: 'Deluxe',
        size: 452,
        beds: '1 Twin Bed',
        totalRooms: 20,
        privateBathroom: true,
        maxGuests: 6,
        price: 10,
        description: "Our Deluxe rooms offer premium comfort with modern amenities, private bathroom, and spacious living area. Perfect for both business and leisure travelers seeking a superior stay experience."
    },
    {
        type: 'Basic',
        size: 252,
        beds: '1 Single Bed',
        totalRooms: 50,
        privateBathroom: false,
        maxGuests: 4,
        price: 6,
        description: "Our Basic rooms provide comfortable accommodation with essential amenities. Ideal for budget-conscious travelers who want a clean, comfortable place to stay."
    }
];

export default function RoomPage() {
    const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);

    if (selectedRoom) {
        return (
            <div className="min-h-screen ">
                <RoomDescription />
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="grid grid-cols-2 gap-6">
                {roomTypes.map((room) => (
                    <div
                        key={room.type}
                        onClick={() => setSelectedRoom(room)}
                        className={`relative rounded-lg hover:bg-white cursor-pointer ${room.type === 'Deluxe' ? 'bg-[#E5E7EB]' : 'bg-[#E5E7EB]'
                            }`}
                    >
                        <div className="flex justify-between items-center p-4">
                            <h3 className="text-base font-medium">{room.type} - Details</h3>
                            <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">{room.type}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 px-4">
                            <div className="bg-[#DBDBDB] p-2 rounded">
                                <div className="text-sm">Size of Rooms: {room.size}ft²</div>
                            </div>
                            <div className="bg-[#DBDBDB] p-2 rounded">
                                <div className="text-sm">Private Bathroom: {room.privateBathroom ? 'Yes' : 'No'}</div>
                            </div>
                            <div className="bg-[#DBDBDB] p-2 rounded">
                                <div className="text-sm">Beds: {room.beds}</div>
                            </div>
                            <div className="bg-[#DBDBDB] p-2 rounded">
                                <div className="text-sm">Guest Allowed: {room.maxGuests}</div>
                            </div>
                            <div className="bg-[#DBDBDB] p-2 rounded col-span-2">
                                <div className="text-sm">Total No. of Rooms: {room.totalRooms}</div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center p-4 mt-2">
                            <div className="text-xl font-bold">
                                Price: {room.price}$ <span className="text-sm font-normal">/Hr</span>
                            </div>
                            <ArrowRight className="h-5 w-5" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
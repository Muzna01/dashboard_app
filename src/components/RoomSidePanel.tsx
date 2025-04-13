"use client";

import { useEffect, useRef } from 'react';


interface RoomSidePanelProps {
    isOpen: boolean;
    onClose: () => void;
    room: any;
}

export function RoomSidePanel({ isOpen, onClose, room }: RoomSidePanelProps) {
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            // Prevent scrolling of the main content when panel is open
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!room) return null;

    return (
        <>
            {/* Dark overlay */}
            <div
                className={`fixed inset-0 bg-black/40 transition-opacity duration-300 z-50 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            />

            {/* Panel */}
            <div
                className={`fixed right-0 top-0 h-screen w-[90%] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                ref={panelRef}
                style={{ marginTop: '0' }}
            >
                {/* Header */}

                {/* Content */}
                <div className="p-6">
                    <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Reference ID</p>
                            <p className="text-sm font-medium">{room.id}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Customer Name</p>
                            <p className="text-sm font-medium">{room.customerName}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Room Type</p>
                            <p className="text-sm font-medium">{room.roomType}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Booking Date/Time</p>
                            <p className="text-sm font-medium">{room.bookingDateTime}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Status</p>
                            <p className={`text-sm font-medium ${room.status === "On going" ? "text-green-700" :
                                room.status === "Upcoming" ? "text-blue-700" :
                                    "text-red-700"
                                }`}>
                                {room.status}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Booking Type</p>
                            <p className="text-sm font-medium">{room.bookingType}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
} 
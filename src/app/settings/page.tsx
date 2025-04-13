"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadCloud } from "lucide-react";

interface UserProfile {
    firstName: string;
    lastName: string;
    punchId: string;
    email: string;
    company: string;
    photo: string | null;
}

export default function SettingsPage() {
    const [profile, setProfile] = useState<UserProfile>({
        firstName: "Oliva",
        lastName: "Rhye",
        punchId: "4523211",
        email: "olivia@untitledui.com",
        company: "Suite Saudi",
        photo: "/image.jpeg"
    });

    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event: ProgressEvent<FileReader>) => {
                const result = event.target?.result;
                if (result && typeof result === 'string') {
                    setProfile(prev => ({
                        ...prev,
                        photo: result
                    }));
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (event: ProgressEvent<FileReader>) => {
                    const result = event.target?.result;
                    if (result && typeof result === 'string') {
                        setProfile(prev => ({
                            ...prev,
                            photo: result
                        }));
                    }
                };
                reader.readAsDataURL(file);
            }
        }
    };

    return (
        <div className="p-6 w-full ">
            {/* Header with buttons */}
            <div className="flex justify-between items-start mb-6 w-full border-b border-gray-200 pb-6">
                <div>
                    <h1 className="text-lg font-semibold text-gray-900">Personal info</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Update your photo and personal details here.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        className="h-9 px-4 rounded-md border-gray-300 text-sm font-medium"
                        onClick={() => { }}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="h-9 px-4 rounded-md bg-black text-sm font-medium text-white hover:bg-black/90"
                        onClick={() => { }}
                    >
                        Save
                    </Button>
                </div>
            </div>

            <div className="space-y-8 w-full">
                <div className="space-y-6 border-b border-gray-200 pb-6">
                    <div className="grid grid-cols-3 gap-2 max-w-[700px]">
                        <Label className="text-sm font-medium">Name</Label>
                        <div className="col-span-2 grid grid-cols-2 gap-2">
                            <Input
                                placeholder="First name"
                                value={profile.firstName}
                                onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                            />
                            <Input
                                placeholder="Last name"
                                value={profile.lastName}
                                onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                {/* Punch ID Field */}
                <div className="space-y-6 border-b border-gray-200 pb-6">
                    <div className="grid grid-cols-3 gap-2 max-w-[700px]">
                        <Label className="text-sm font-medium">Punch ID</Label>
                        <Input
                            className="col-span-2"
                            placeholder="Enter your punch ID"
                            value={profile.punchId}
                            onChange={(e) => setProfile({ ...profile, punchId: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-2 max-w-[700px] mt-6">
                        <Label className="text-sm font-medium">Email address</Label>
                        <Input
                            className="col-span-2"
                            type="email"
                            placeholder="Enter your email"
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-2 max-w-[700px] mt-6">
                        <Label className="text-sm font-medium">Company Name</Label>
                        <Input
                            className="col-span-2"
                            placeholder="Enter your company name"
                            value={profile.company}
                            onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                        />
                    </div>
                </div>

                {/* Photo Upload Section */}
                <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-2 max-w-[700px]">
                        <div className="space-y-1">
                            <Label className="text-sm font-medium">Your photo</Label>
                            <p className="text-sm text-gray-500">This will be displayed on your profile.</p>
                        </div>
                        <div className="col-span-2 flex items-center gap-6">
                            {profile.photo && (
                                <div className="h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
                                    <img
                                        src={profile.photo}
                                        alt="Profile"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            )}
                            <div
                                className={`flex-1 border border-dashed rounded-lg p-4 ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                                    }`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <UploadCloud className="h-5 w-5 text-gray-400" />
                                    <div className="text-sm text-center">
                                        <label htmlFor="file-upload" className="text-blue-600 hover:text-blue-700 cursor-pointer">
                                            Click to upload
                                        </label>
                                        <span className="text-gray-500"> or drag and drop</span>
                                        <p className="text-gray-500 text-xs mt-1">
                                            SVG, PNG, JPG or GIF (max. 800×400px)
                                        </p>
                                    </div>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

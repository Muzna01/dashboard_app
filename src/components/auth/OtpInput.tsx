"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface OtpInputProps {
    length?: number;
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

export function OtpInput({ length = 4, value, onChange, error }: OtpInputProps) {
    const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    const handleChange = (index: number, newValue: string) => {
        if (newValue.length > 1) {
            // Handle paste
            const pastedValues = newValue.split("").slice(0, length);
            const newOtp = [...otp];
            pastedValues.forEach((val, i) => {
                if (index + i < length) {
                    newOtp[index + i] = val;
                }
            });
            setOtp(newOtp);
            onChange(newOtp.join(""));
            return;
        }

        if (!/^\d*$/.test(newValue)) return;

        const newOtp = [...otp];
        newOtp[index] = newValue;
        setOtp(newOtp);
        onChange(newOtp.join(""));

        if (newValue && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <div className="space-y-2">
            <div className="flex justify-center gap-2">
                {otp.map((digit, index) => (
                    <Input
                        key={index}
                        ref={(el) => {
                            inputRefs.current[index] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className={cn(
                            "w-12 h-12 text-center text-xl p-0",
                            error && "border-red-500 focus-visible:ring-red-500"
                        )}
                    />
                ))}
            </div>
            {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
            )}
        </div>
    );
} 
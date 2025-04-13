"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { OtpInput } from "@/components/auth/OtpInput";
import { Loader2, ArrowLeft } from "lucide-react";

export default function VerifyPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email");

    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        if (!email) {
            router.push("/login");
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setCanResend(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [email, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (otp.length !== 4) return;

        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            router.push("/dashboard");
        } catch (err) {
            setError("Invalid code. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        if (!canResend) return;

        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setTimeLeft(120);
            setCanResend(false);
            setError("");
        } catch (err) {
            setError("Failed to resend code. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow relative">
                <Button
                    variant="ghost"
                    className="absolute top-4 left-4"
                    onClick={() => router.push("/login")}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>

                <div className="text-center">
                    <h1 className="text-2xl font-semibold">Check your email</h1>
                    <p className="mt-2 text-gray-600">
                        We sent a verification code to
                        <br />
                        <span className="font-bold text-primary">{email}</span>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        error={error}
                    />

                    <div className="text-center">
                        {canResend ? (
                            <Button
                                variant="link"
                                className="text-primary hover:underline"
                                onClick={handleResend}
                                disabled={isLoading}
                            >
                                Click to resend
                            </Button>
                        ) : (
                            <p className="text-sm text-gray-600">
                                Didn't receive an OTP? New code in {formatTime(timeLeft)}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={otp.length !== 4 || isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Verifying...
                            </>
                        ) : (
                            "Continue"
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
} 
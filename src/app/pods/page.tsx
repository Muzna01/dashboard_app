"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import PodDescription from "@/components/PodDescription";

interface Pod {
    size: number;
    material: string;
    numberOfPods: number;
    features: string;
    price: number;
}

const pods: Pod[] = [
    {
        size: 452,
        material: "Tempered Glass",
        numberOfPods: 9,
        features: "Comfortable mattress, Adjustable lighting, Ventilation & airflow, Temperature control, Noise reduction, Charging ports, Smart controls Security features, Massage functions",
        price: 10
    },
    {
        size: 452,
        material: "Tempered Glass",
        numberOfPods: 9,
        features: "Comfortable mattress, Adjustable lighting, Ventilation & airflow, Temperature control, Noise reduction, Charging ports, Smart controls Security features, Massage functions",
        price: 10
    }
];

export default function PodsPage() {
    const [selectedPod, setSelectedPod] = useState<Pod | null>(null);

    if (selectedPod) {
        return (
            <div className="min-h-screen ">
                <PodDescription />
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="grid grid-cols-2 gap-6">
                {pods.map((pod, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedPod(pod)}
                        className="relative bg-[#E5E7EB] rounded-lg hover:bg-[#F3F4F6]/90 cursor-pointer p-6 space-y-4"
                    >
                        <h3 className="text-base font-medium">Neuron Activation Pod (N.A.P) - Details</h3>

                        <div className="flex gap-3">
                            <div className="bg-[#DBDBDB] px-4 py-2 rounded-md flex-1">
                                <div className="text-sm">Pod Size: {pod.size} ft²</div>
                            </div>
                            <div className="bg-[#DBDBDB] px-4 py-2 rounded-md flex-1">
                                <div className="text-sm">Material: {pod.material}</div>
                            </div>
                        </div>

                        <div className="bg-[#DBDBDB] px-4 py-2 rounded-md">
                            <div className="text-sm">No. of Pods: {pod.numberOfPods.toString().padStart(2, '0')}</div>
                        </div>

                        <div className="bg-[#DBDBDB] px-4 py-2 rounded-md">
                            <div className="text-sm">
                                Feature: {pod.features}
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-2">
                            <div className="text-base font-medium">
                                Price: {pod.price}$ /Hr
                            </div>
                            <ArrowRight className="h-5 w-5" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
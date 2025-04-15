"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const helpCategories = [
    {
        title: "Getting started",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor veli esse cillum doloreincididunt ut labore et dolore magna.",
        icon: "🔍",
        items: [
            "How to change my account password",
            "How to create a business account",
            "How to delete my account"
        ]
    },
    {
        title: "Authentication",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor veli esse cillum doloreincididunt ut labore et dolore magna.",
        icon: "👤",
        items: []
    },
    {
        title: "Limits & pricing",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor veli esse cillum doloreincididunt ut labore et dolore magna.",
        icon: "💳",
        items: []
    },
    {
        title: "Advanced settings",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor veli esse cillum doloreincididunt ut labore et dolore magna.",
        icon: "⚙️",
        items: []
    },
    {
        title: "Ticket submission",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor veli esse cillum doloreincididunt ut labore et dolore magna.",
        icon: "🎫",
        items: []
    },
    {
        title: "Popular questions",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor veli esse cillum doloreincididunt ut labore et dolore magna.",
        icon: "❓",
        items: []
    }
];

type NavigationItem = {
    label: string;
    href: string;
};

type NavigationSection = {
    href: string;
    items: NavigationItem[];
};

type NavigationItems = {
    [key: string]: NavigationSection;
};

const navigationItems: NavigationItems = {
    "Get Started": {
        href: "/help/getting-started",
        items: [
            { label: "How to change my account password", href: "/help/change-password" },
            { label: "How to create a business account", href: "/help/create-business-account" },
            { label: "How to delete my account", href: "/help/delete-account" }
        ]
    },
    "Authentication": {
        href: "/help/authentication",
        items: [
            { label: "Sign in methods", href: "/help/sign-in-methods" },
            { label: "Two-factor authentication", href: "/help/2fa" },
            { label: "Password recovery", href: "/help/password-recovery" },
            { label: "Security settings", href: "/help/security-settings" }
        ]
    },
    "Limit & Pricing": {
        href: "/help/limits-pricing",
        items: [
            { label: "Subscription plans", href: "/help/subscription-plans" },
            { label: "Usage limits", href: "/help/usage-limits" },
            { label: "Billing cycles", href: "/help/billing-cycles" },
            { label: "Payment methods", href: "/help/payment-methods" }
        ]
    },
    "Advanced Settings": {
        href: "/help/advanced-settings",
        items: [
            { label: "API configuration", href: "/help/api-config" },
            { label: "Custom integrations", href: "/help/custom-integrations" },
            { label: "Webhook setup", href: "/help/webhook-setup" },
            { label: "Developer options", href: "/help/developer-options" }
        ]
    },
    "Ticket Submission": {
        href: "/help/ticket-submission",
        items: [
            { label: "Create new ticket", href: "/help/create-ticket" },
            { label: "Track ticket status", href: "/help/ticket-status" },
            { label: "Priority levels", href: "/help/priority-levels" },
            { label: "Response times", href: "/help/response-times" }
        ]
    },
    "Popular Questions": {
        href: "/help/popular-questions",
        items: [
            { label: "Account management", href: "/help/account-management" },
            { label: "Billing issues", href: "/help/billing-issues" },
            { label: "Technical support", href: "/help/technical-support" },
            { label: "Feature requests", href: "/help/feature-requests" }
        ]
    }
};

export default function HelpPage() {
    const [expandedSection, setExpandedSection] = useState("Get Started");

    return (
        <div className=" min-h-screen">
            <div className="bg-white  flex">
                <h1 className="text-5xl font-semibold mb-8 ">Find the help you<br />need for any problem</h1>
                <div className="max-w-3xl mx-auto px-8 py-6 mt-8">

                    <div className="w-[400px] relative">
                        <input
                            type="text"
                            placeholder="Search for answers..."
                            className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-200 text-sm"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <Search className="h-5 w-5 text-gray-600" />
                        </div>
                    </div>
                </div>
            </div>


            {/* Main Content */}
            <div className="flex bg-gray-50">
                <div className="w-72 bg-white border-r">
                    <div className="p-6">

                        {/* Navigation */}
                        <nav className="space-y-1 border rounded-md p-2">
                            {Object.entries(navigationItems).map(([section, items]) => (
                                <div key={section} className="last:border-b-0 pb-2">
                                    <div
                                        className="flex items-center justify-between gap-2 mb-2 cursor-pointer"
                                        onClick={() => setExpandedSection(expandedSection === section ? "" : section)}
                                    >
                                        <div className="flex items-center gap-2">
                                            <Link href={navigationItems[section].href} className="text-sm font-medium hover:text-gray-900">
                                                {section}
                                            </Link>
                                        </div>
                                        <svg
                                            className={`w-4 h-4 text-gray-400 transform transition-transform ${expandedSection === section ? 'rotate-180' : ''}`}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                    {expandedSection === section && (
                                        <div className="ml-7 space-y-2">
                                            {navigationItems[section].items.map((item, index) => (
                                                <Link
                                                    key={index}
                                                    href={item.href}
                                                    className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer hover:bg-gray-50 p-1 rounded block"
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}

                        </nav>
                        <div className="flex items-center justify-between py-2 cursor-pointer group border rounded-md p-2 mt-4">
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 flex items-center justify-center">
                                    <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 4v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                                <Link href="/help/faq" className="text-sm font-medium group-hover:text-gray-900">FAQ</Link>
                            </div>
                            <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Help Categories */}
                <div className="px-8 py-6">
                    <div className="max-w-3xl mx-auto">
                        <div className="space-y-4">
                            {helpCategories.map((category, index) => (
                                <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-xl">
                                            {category.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-base font-medium text-gray-900 mb-1">{category.title}</h3>
                                            <p className="text-sm text-gray-500 mb-3">{category.description}</p>
                                            <Link
                                                href="#"
                                                className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center"
                                            >
                                                Browse questions
                                                <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

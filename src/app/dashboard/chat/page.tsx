"use client";

import { useState } from "react";
import { Send, Search, Mic, Image, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
    id: number;
    content: string;
    sender: 'admin' | 'customer';
    timestamp: string;
}

interface ChatConversation {
    id: number;
    customerName: string;
    lastMessage: string;
    timestamp: string;
    unread: boolean;
    messages: Message[];
}

const mockConversations: ChatConversation[] = [
    {
        id: 1,
        customerName: "Easter Howard",
        lastMessage: "Hello, I'm having troub...",
        timestamp: "2 mins",
        unread: true,
        messages: [
            {
                id: 1,
                content: "Hello, I'm having trouble with my booking",
                sender: 'customer',
                timestamp: '9:58 AM'
            },
            {
                id: 2,
                content: "Hi! I'm here to help. What seems to be the issue?",
                sender: 'admin',
                timestamp: '10:00 AM'
            },
            {
                id: 3,
                content: "I can't seem to modify my check-in date",
                sender: 'customer',
                timestamp: '10:01 AM'
            }
        ]
    },
    {
        id: 2,
        customerName: "Cody Fisher",
        lastMessage: "You sent a message.",
        timestamp: "2 mins",
        unread: false,
        messages: [
            {
                id: 1,
                content: "Is the deluxe room available next week?",
                sender: 'customer',
                timestamp: '9:45 AM'
            },
            {
                id: 2,
                content: "Let me check that for you right away",
                sender: 'admin',
                timestamp: '9:47 AM'
            }
        ]
    },
    {
        id: 3,
        customerName: "Jane Cooper",
        lastMessage: "Interested in the scoo?",
        timestamp: "2 mins",
        unread: false,
        messages: [
            {
                id: 1,
                content: "I'm interested in the executive suite",
                sender: 'customer',
                timestamp: '9:30 AM'
            },
            {
                id: 2,
                content: "That's great! The executive suite offers amazing views and premium amenities",
                sender: 'admin',
                timestamp: '9:32 AM'
            }
        ]
    },
    {
        id: 4,
        customerName: "Kristin Watson",
        lastMessage: "When will this contract be settle?",
        timestamp: "2 mins",
        unread: false,
        messages: [
            {
                id: 1,
                content: "When will this contract be settled?",
                sender: 'customer',
                timestamp: '9:15 AM'
            },
            {
                id: 2,
                content: "We're processing it now, should be done by tomorrow",
                sender: 'admin',
                timestamp: '9:17 AM'
            }
        ]
    },
    {
        id: 5,
        customerName: "Kathryn Murphy",
        lastMessage: "Hello! Interested in this loadde...",
        timestamp: "2 mins",
        unread: false,
        messages: [
            {
                id: 1,
                content: "Hello! Interested in the weekend package",
                sender: 'customer',
                timestamp: '9:00 AM'
            },
            {
                id: 2,
                content: "Hi Kathryn! The weekend package includes...",
                sender: 'admin',
                timestamp: '9:02 AM'
            }
        ]
    }
];

export default function ChatPage() {
    const [selectedConversation, setSelectedConversation] = useState<ChatConversation | null>(mockConversations[0]);
    const [newMessage, setNewMessage] = useState('');
    const [activeFilter, setActiveFilter] = useState<'all' | 'unread'>('all');

    const handleSendMessage = () => {
        if (newMessage.trim() && selectedConversation) {
            const newMsg = {
                id: selectedConversation.messages.length + 1,
                content: newMessage,
                sender: 'admin' as const,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };

            setSelectedConversation({
                ...selectedConversation,
                messages: [...selectedConversation.messages, newMsg],
                lastMessage: newMessage
            });
            setNewMessage('');
        }
    };

    return (
        <div className="flex h-[580px] bg-white">
            {/* Conversations List */}
            <div className="w-[360px] border-r border-[#F3F3F3] flex flex-col">
                <div className="px-6 pt-6 pb-4">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">Message</h2>
                        <div className="relative">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setActiveFilter('all')}
                            className={`text-sm px-1 py-0.5 ${activeFilter === 'all'
                                ? 'text-gray-900 border-b-2 border-gray-900'
                                : 'text-gray-500'
                                }`}
                        >
                            All message
                        </button>

                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {mockConversations.map((conversation) => (
                        <div
                            key={conversation.id}
                            onClick={() => setSelectedConversation(conversation)}
                            className={`px-6 py-4 cursor-pointer hover:bg-gray-200 transition-colors duration-200 flex items-center gap-4 
                                ${selectedConversation?.id === conversation.id
                                    ? 'bg-gray-50'
                                    : 'hover:bg-gray-50/70'
                                }`}
                        >
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-sm text-gray-600">
                                    {conversation.customerName.charAt(0)}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className="font-medium text-[15px] text-gray-900">{conversation.customerName}</h3>
                                    <span className="text-xs text-gray-400">{conversation.timestamp}</span>
                                </div>
                                <p className="text-[13px] text-gray-500 truncate leading-5">{conversation.lastMessage}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Window */}
            <div className="flex-1 flex flex-col bg-white">
                {selectedConversation ? (
                    <>
                        {/* Chat Header */}
                        <div className="px-6 py-4 border-b border-[#F3F3F3] flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                    <span className="text-sm text-gray-600">
                                        {selectedConversation.customerName.charAt(0)}
                                    </span>
                                </div>
                                <h2 className="font-medium text-[15px] text-gray-900">{selectedConversation.customerName}</h2>
                            </div>
                            <div className="relative">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {selectedConversation.messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'} mb-4 group`}
                                >
                                    <div
                                        className={`max-w-[70%] rounded-2xl px-4 py-2 transition-all duration-200
                                            ${message.sender === 'admin'
                                                ? 'bg-[#C6EEFF] text-black hover:bg-blue-100'
                                                : 'bg-gray-100 hover:bg-gray-200'
                                            }
                                            group-hover:shadow-sm`}
                                    >
                                        <p className="text-sm">{message.content}</p>
                                        <p className="text-[11px] mt-1 opacity-70">{message.timestamp}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="px-6 border-t border-[#F3F3F3]">
                            <div className="flex items-center gap-3">
                                <button className="w-14 h-15 flex items-center justify-center rounded-lg hover:bg-gray-300 transition-colors bg-gray-100">
                                    <Image className="h-[22px] w-[22px] text-gray-500" />
                                </button>
                                <button className="w-14 h-15 flex items-center justify-center rounded-lg hover:bg-gray-300 transition-colors bg-gray-100">
                                    <Mic className="h-[22px] w-[22px] text-gray-500" />
                                </button>
                                <button className="w-14 h-15 flex items-center justify-center rounded-lg hover:bg-gray-300 transition-colors bg-gray-100">
                                    <Smile className="h-[22px] w-[22px] text-gray-500" />
                                </button>
                                <div className="flex items-center gap-3 bg-[#F2F4F5] rounded-[20px] px-4 py-3">

                                    <Input
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Type your message..."
                                        className="flex-1 border-0 bg-transparent focus-visible:ring-0 px-0 py-1 text-[15px] placeholder:text-gray-500 w-[500px]"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSendMessage();
                                            }
                                        }}
                                    />
                                    <button
                                        onClick={handleSendMessage}
                                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-100 transition-colors"
                                    >
                                        <Send className="h-[22px] w-[22px] text-blue-500" />
                                    </button>
                                </div>

                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-500">
                        Select a conversation to start chatting
                    </div>
                )}
            </div>
        </div>
    );
} 
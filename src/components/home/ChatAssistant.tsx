import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, X, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';

const ChatAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', text: 'Hi there! I\'m your AI Project Guide. Looking for a specific project or need a recommendation? I can help!' }
    ]);
    const [inputValue, setInputValue] = useState('');

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        setMessages([...messages, { role: 'user', text: inputValue }]);
        setInputValue('');

        // Mock response
        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'assistant', text: "That's a great choice! You can find relevant details in our Categories section, or I can help you generate a custom project structure." }]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
            {isOpen && (
                <div className="bg-card border border-border rounded-2xl shadow-2xl w-80 sm:w-96 overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
                    {/* Header */}
                    <div className="bg-primary p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xl">
                                    🤖
                                </div>
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-primary-foreground">AI Assistant</h3>
                                <p className="text-xs text-primary-foreground/70">Online</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10" onClick={() => setIsOpen(false)}>
                            <X className="w-5 h-5" />
                        </Button>
                    </div>

                    {/* Messages */}
                    <div className="h-80 overflow-y-auto p-4 space-y-4 bg-muted/30">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${msg.role === 'user'
                                    ? 'bg-primary text-primary-foreground rounded-br-none'
                                    : 'bg-card border border-border shadow-sm rounded-bl-none'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSend} className="p-3 border-t border-border bg-card flex gap-2">
                        <Input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1"
                        />
                        <Button type="submit" size="icon" disabled={!inputValue.trim()}>
                            <Send className="w-4 h-4" />
                        </Button>
                    </form>
                </div>
            )}

            <Button
                onClick={() => setIsOpen(!isOpen)}
                size="lg"
                className="rounded-full h-14 w-14 shadow-xl hover:scale-105 transition-transform"
            >
                <MessageCircle className="w-6 h-6" />
            </Button>
        </div>
    );
};

export default ChatAssistant;

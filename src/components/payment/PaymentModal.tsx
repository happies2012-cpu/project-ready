import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, CheckCircle2, Loader2, Smartphone, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

interface PaymentModalProps {
    amount: number;
    trigger: React.ReactNode;
}

const PaymentModal = ({ amount, trigger }: PaymentModalProps) => {
    const [step, setStep] = useState<'method' | 'processing' | 'success'>('method');
    const [method, setMethod] = useState<'card' | 'upi'>('card');

    const handlePayment = () => {
        setStep('processing');
        // Simulate API call to PayU/Stripe/GPay
        setTimeout(() => {
            setStep('success');
            toast.success("Payment Successful!");
        }, 2500);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                {step === 'method' && (
                    <>
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-green-500" />
                                Secure Payment
                            </DialogTitle>
                        </DialogHeader>
                        <div className="py-4">
                            <div className="text-3xl font-bold text-center mb-6">₹{amount}</div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <button
                                    onClick={() => setMethod('upi')}
                                    className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${method === 'upi' ? 'bg-primary/5 border-primary ring-1 ring-primary' : 'hover:bg-muted'}`}
                                >
                                    <Smartphone className="w-6 h-6 text-blue-500" />
                                    <span className="font-medium text-sm">UPI / GPay</span>
                                </button>
                                <button
                                    onClick={() => setMethod('card')}
                                    className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${method === 'card' ? 'bg-primary/5 border-primary ring-1 ring-primary' : 'hover:bg-muted'}`}
                                >
                                    <CreditCard className="w-6 h-6 text-purple-500" />
                                    <span className="font-medium text-sm">Card</span>
                                </button>
                            </div>

                            {method === 'upi' ? (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Enter VPA / UPI ID</Label>
                                        <Input placeholder="example@okhdfcbank" />
                                    </div>
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700 h-11" onClick={handlePayment}>
                                        Pay via GPay / UPI
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4 animate-in fade-in">
                                    <div className="space-y-2">
                                        <Label>Card Number</Label>
                                        <Input placeholder="0000 0000 0000 0000" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Expiry</Label>
                                            <Input placeholder="MM/YY" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>CVV</Label>
                                            <Input placeholder="123" type="password" />
                                        </div>
                                    </div>
                                    <Button className="w-full h-11" onClick={handlePayment}>
                                        Pay Securely
                                    </Button>
                                </div>
                            )}

                            <div className="mt-4 flex justify-center gap-4 opacity-50">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4" alt="PayPal" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4" alt="Mastercard" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="Visa" />
                            </div>
                        </div>
                    </>
                )}

                {step === 'processing' && (
                    <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                        <Loader2 className="w-12 h-12 text-primary animate-spin" />
                        <h3 className="font-semibold text-lg">Processing Transaction...</h3>
                        <p className="text-muted-foreground text-sm">Please do not close this window</p>
                    </div>
                )}

                {step === 'success' && (
                    <div className="py-8 flex flex-col items-center justify-center text-center space-y-4 animate-in zoom-in-95">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-2">
                            <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-500" />
                        </div>
                        <h3 className="font-bold text-2xl">Payment Successful!</h3>
                        <p className="text-muted-foreground">Your project files have been emailed to you and are ready for download.</p>
                        <Button className="w-full mt-4" onClick={() => window.location.reload()}>
                            Access Dashboard
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default PaymentModal;

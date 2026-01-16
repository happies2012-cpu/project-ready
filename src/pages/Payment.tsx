
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShieldCheck, CreditCard, Banknote, Loader2, Download, CheckCircle2 } from 'lucide-react';
import QRCode from 'qrcode';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Payment = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success'>('pending');

    const generateQRCode = async () => {
        try {
            // UPI ID and details
            const upiData = `upi://pay?pa=projectverse@upi&pn=Project Ready&am=499&tn=Payment for Project Ready Premium`;
            const url = await QRCode.toDataURL(upiData);
            setQrCodeUrl(url);
        } catch (err) {
            console.error(err);
        }
    };

    // Generate QR code on mount
    useState(() => {
        generateQRCode();
    });

    const handlePayment = async () => {
        setLoading(true);
        // Simulate payment verification
        setTimeout(() => {
            setLoading(false);
            setPaymentStatus('success');
        }, 2000);
    };

    const generateInvoice = async () => {
        const input = document.getElementById('invoice-content');
        if (!input) return;

        try {
            const canvas = await html2canvas(input);
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('invoice.pdf');
        } catch (error) {
            console.error('Error generating invoice', error);
        }
    };

    if (paymentStatus === 'success') {
        return (
            <div className="container mx-auto py-20 px-4 flex justify-center">
                <Card className="w-full max-w-md text-center">
                    <CardHeader>
                        <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle2 className="w-8 h-8 text-success" />
                        </div>
                        <CardTitle className="text-2xl">Payment Successful!</CardTitle>
                        <CardDescription>Thank you for your purchase.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">
                            You now have lifetime access to all premium features and projects.
                        </p>
                        <div id="invoice-content" className="p-4 border rounded-lg bg-muted/50 text-left text-sm space-y-2">
                            <div className="flex justify-between font-semibold">
                                <span>Order ID:</span>
                                <span>#ORD-{Math.floor(Math.random() * 100000)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Amount Paid:</span>
                                <span>₹499.00</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Date:</span>
                                <span>{new Date().toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Customer:</span>
                                <span>{user?.email || 'Guest User'}</span>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-3">
                        <Button variant="outline" className="w-full" onClick={generateInvoice}>
                            <Download className="w-4 h-4 mr-2" />
                            Download Invoice
                        </Button>
                        <Button className="w-full" onClick={() => window.location.href = '/dashboard'}>
                            Go to Dashboard
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-display font-bold text-center mb-8">Complete Your Purchase</h1>

            <div className="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
                {/* Order Summary */}
                <Card className="h-fit">
                    <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                        <CardDescription>Review your plan details below.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex justify-between items-center py-4 border-b">
                            <div>
                                <h3 className="font-semibold text-lg">ProjectVerse Premium</h3>
                                <p className="text-sm text-muted-foreground">Lifetime Access</p>
                            </div>
                            <div className="text-xl font-bold">₹499</div>
                        </div>
                        <div className="space-y-2 text-sm text-muted-foreground">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>₹499.00</span>
                            </div>
                            <div className="flex justify-between">
                                <span>GST (18%)</span>
                                <span>Included</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t font-semibold text-foreground text-base">
                                <span>Total</span>
                                <span>₹499.00</span>
                            </div>
                        </div>
                        <div className="bg-primary/5 p-4 rounded-lg flex gap-3 text-sm text-primary">
                            <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                            <p>Your payment is secured with 256-bit SSL encryption. We do not store your card details.</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Payment Methods */}
                <Card>
                    <CardHeader>
                        <CardTitle>Payment Method</CardTitle>
                        <CardDescription>Select a payment method to proceed.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="upi" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-6">
                                <TabsTrigger value="upi">UPI / QR Code</TabsTrigger>
                                <TabsTrigger value="card">Card / NetBanking</TabsTrigger>
                            </TabsList>

                            <TabsContent value="upi" className="space-y-6">
                                <div className="text-center space-y-4">
                                    <p className="text-sm text-muted-foreground">Scan QR code to pay instantly</p>
                                    <div className="mx-auto w-48 h-48 bg-white p-2 rounded-lg border shadow-sm flex items-center justify-center">
                                        {qrCodeUrl ? (
                                            <img src={qrCodeUrl} alt="UPI QR Code" className="w-full h-full" />
                                        ) : (
                                            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                                        )}
                                    </div>
                                    <p className="text-xs text-muted-foreground">Supported Apps: GPay, PhonePe, Paytm, BHIM</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-background px-2 text-muted-foreground">Or enter UPI ID</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Input placeholder="username@upi" />
                                    <Button onClick={handlePayment} disabled={loading}>
                                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Verify'}
                                    </Button>
                                </div>
                            </TabsContent>

                            <TabsContent value="card" className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="card-number">Card Number</Label>
                                    <div className="relative">
                                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <Input id="card-number" placeholder="0000 0000 0000 0000" className="pl-9" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="expiry">Expiry</Label>
                                        <Input id="expiry" placeholder="MM/YY" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cvc">CVC</Label>
                                        <Input id="cvc" placeholder="123" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="name">Cardholder Name</Label>
                                    <Input id="name" placeholder="John Doe" />
                                </div>
                                <Button className="w-full" onClick={handlePayment} disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <Banknote className="w-4 h-4 mr-2" />
                                            Pay ₹499
                                        </>
                                    )}
                                </Button>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Payment;

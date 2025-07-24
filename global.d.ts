// global.d.ts

// 1) Define the shapes you already wrote:
interface RazorpayPaymentResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}

interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    order_id: string;
    handler: (response: RazorpayPaymentResponse) => void;
    prefill: { email: string; contact: string };
    theme: { color: string };
}

interface Razorpay {
    open(): void;
}

// 2) Augment the global Window interface:
declare global {
    interface Window {
        Razorpay: new (opts: RazorpayOptions) => Razorpay;
    }
}

// this export ensures it’s treated as a module and its declarations are picked up
export { };

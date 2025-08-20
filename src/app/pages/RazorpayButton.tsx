// components/RazorpayButton.tsx
'use client'; // only needed if you’re in the /app directory

import React, { useEffect } from 'react';

const PAYMENT_BUTTON_ID = 'pl_Qx0UdpA7KNDUuA';

const RazorpayButton: React.FC = () => {
    useEffect(() => {
        // Avoid injecting twice
        if (document.querySelector(`script[data-payment_button_id="${PAYMENT_BUTTON_ID}"]`)) {
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
        script.setAttribute('data-payment_button_id', PAYMENT_BUTTON_ID);
        script.async = true;

        const form = document.getElementById('razorpay-form');
        if (form) {
            form.appendChild(script);
        } else {
            console.error('Razorpay form container not found');
        }
    }, []);

    return (
        <form id="razorpay-form" className="space-y-4">
            {/* Razorpay’s script will auto-inject the <button> here */}
        </form>
    );
};

export default RazorpayButton;

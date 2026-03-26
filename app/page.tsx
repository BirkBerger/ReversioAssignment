'use client'

import { useState, KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import PageLayout from './components/PageLayout';
import Button from './components/Button';
import shopifyService, { Order } from './services/shopify-service';

export default function Home() {

    const [orderId, setOrderId] = useState("");
    const [email, setEmail] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const router = useRouter();
    const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    const inputClasses = "my-4 border-b-1 border-[gray] placeholder:text-[gray] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none outline-none";

    const handleSubmit = async () => {
        if(!isValidInputs()) return;

        const order = await shopifyService.getOrder(orderId);
        if (!order) {
            setErrorMsg("We couldn't find this order. Please make sure the ID is correct.")
        } else {
            saveInLocalStorage(order);
            router.push("/createreturn");
        }
    }

    const isValidInputs = () => {
        if (!orderId) {
            setErrorMsg("Please fill in the order ID.")
        } else if (!email) {
            setErrorMsg("Please fill in your email address.")
        } else if (!emailRegex.test(email)) {
            setErrorMsg("Please make sure to enter a valid email address.")
        } else {
            setErrorMsg("");
            return true;
        }
        return false;
    }

    const saveInLocalStorage = (order: Order) => {
        localStorage.setItem("order", JSON.stringify(order));
        localStorage.setItem("email_address", email);
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter') handleSubmit();
    }

    return (
        <PageLayout title="Fetch order">
            <div className="flex flex-col bg-[#eeeeee] rounded-lg p-5 min-h-40">
                <input className={inputClasses}
                    id="order-id"
                    type="text"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter order ID..."
                    >
                </input>
                <input className={inputClasses}
                    id="email-address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter customer email address..."
                    >
                </input>
            </div>
            <Button onClick={handleSubmit}>
                Go to order
            </Button>
            <div className="animate-fadeIn"
                key={errorMsg}>
                {errorMsg}
            </div>
        </PageLayout>
    );
}

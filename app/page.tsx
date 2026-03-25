'use client'

import { useState, KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import PageLayout from './components/PageLayout';

export default function Home() {

    const [orderId, setOrderId] = useState("");
    const [email, setEmail] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const router = useRouter();
    const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    const inputClasses = "my-4 border-b-1 border-[gray] placeholder:text-[gray] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none outline-none";

    const handleSubmit = () => {
        if(!isValidInputs()) return;
        saveInLocalStorage();
        router.push("/createreturn");
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

    const saveInLocalStorage = () => {
        localStorage.setItem("order_id", orderId);
        localStorage.setItem("email_address", email);
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter') handleSubmit();
    }

    return (
        <PageLayout title="Find order">
            <div className="flex flex-col bg-[#e5e5e5] rounded-lg p-5">
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
            <button className="text-white bg-[blue] hover:bg-[#0c0cbf] cursor-pointer rounded-lg py-1 px-3"
                onClick={() => handleSubmit()}>
                Go to order
            </button>
            <div className="animate-fadeIn"
                key={errorMsg}>
                {errorMsg}
            </div>
        </PageLayout>
    );
}

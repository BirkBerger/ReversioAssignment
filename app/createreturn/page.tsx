'use client'

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import PageLayout from "../components/PageLayout";
import shopifyService, { Order } from "../services/shopify-service";

function CreateReturn() {

    const [email, setEmail] = useState("");
    const [order, setOrder] = useState<Order | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);
    const [feedbackMsg, setFeedbackMsg] = useState("");

    const router = useRouter();

    const handleCreateReturn = async () => {
        if (!order) return;
        const status = await shopifyService.createReturn(order);
        setFeedbackMsg(status);
    }

    const goBack = () => {
        router.push("/");
    }

    useEffect(() => {
        const raw = localStorage.getItem('order');
        const order = raw ? JSON.parse(raw) as Order : null;
        setEmail(localStorage.getItem('email_address') || "");
        setOrder(order);
        setIsInitialized(true);
    }, [])

    return (
        <PageLayout title="Your order">
            <div className="border-1 border-[#c1c1c1] rounded-lg p-5 min-h-40">
                {order && email && (
                    <dl className="flex flex-col gap-5">
                        <span>
                            <dt>
                                Order ID
                            </dt>
                            <dd>
                                {order.id.split("/").pop()}
                            </dd>
                        </span>

                        <span>
                            <dt>
                                Customer email address
                            </dt>
                            <dd>
                                {email}
                            </dd>
                        </span>
                    </dl>
                )}
                {isInitialized && (!order || !email) && (
                    <div className="text-center">
                        We couldn't find your order. Go back to enter the order details.
                    </div>
                )}
            </div>
            <button className="text-white bg-[blue] hover:bg-[#0c0cbf] cursor-pointer rounded-lg py-1 px-3" 
                onClick={() => order || !isInitialized ? handleCreateReturn() : goBack()}>
                    { !isInitialized ? "..." : order ? "Create return" : "Go back" }
            </button>
            {feedbackMsg && (
                <div className="animate-fadeIn text-center"
                    key={feedbackMsg}>
                    {feedbackMsg}
                </div>
            )}
        </PageLayout>
    )
}

export default CreateReturn;
'use client'

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import PageLayout from "../components/PageLayout";
import shopifyService, { Order } from "../services/shopify-service";
import Button from "../components/Button";

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

    if (!isInitialized) return null;

    return (
        <PageLayout title="Your order">
            <div className="border-1 border-[#4f4f4f] bg-[#ffffff6e] rounded-lg p-5 min-h-40">
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
                {(!order || !email) && (
                    <div className="text-center">
                        We couldn't find your order. Go back to enter the order details.
                    </div>
                )}
            </div>
            <Button onClick={() => order ? handleCreateReturn() : goBack()}>
                { order ? "Create return" : "Go back" }
            </Button>
            {feedbackMsg && (
                <div className="animate-fadeIn"
                    key={feedbackMsg}>
                    {feedbackMsg}
                </div>
            )}
        </PageLayout>
    )
}

export default CreateReturn;
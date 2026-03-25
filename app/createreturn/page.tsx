'use client'

import { useEffect, useState } from "react";
import PageLayout from "../components/PageLayout";

function CreateReturn() {

    const [orderId, setOrderId] = useState("");
    const [email, setEmail] = useState("");

    const handleCreateReturn = () => {

    }

    useEffect(() => {
        setOrderId(localStorage.getItem("order_id") || "");
        setEmail(localStorage.getItem("email_address") || "");
    }, [])

    return (

        <PageLayout title="Your order">
            <dl className="flex flex-col border-1 border-[#c1c1c1] rounded-lg p-5 gap-5">
                <span>
                    <dt>
                        Order ID
                    </dt>
                    <dd>
                        {orderId}
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
            <button className="text-white bg-[blue] hover:bg-[#0c0cbf] cursor-pointer rounded-lg py-1 px-3" 
                onClick={() => handleCreateReturn()}>
                Return order
            </button>
        </PageLayout>
    )
}

export default CreateReturn;
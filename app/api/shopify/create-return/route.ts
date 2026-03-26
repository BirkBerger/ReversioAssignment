import { LineItem, Order, Return } from "@/app/services/shopify-service";
import { createAdminApiClient } from "@shopify/admin-api-client";
import { ApiVersion } from "@shopify/shopify-api";
import { NextRequest, NextResponse } from "next/server";


const client = createAdminApiClient({
    accessToken: process.env.SHOPIFY_ACCESS_TOKEN || "",
    storeDomain: process.env.SHOPIFY_SHOP_DOMAIN || "",
    apiVersion: ApiVersion.October25
});

interface UserError {
    field: string[],
    message: string
}

const RETURN_CREATE_MUTATION = `
    mutation ReturnCreate($returnInput: ReturnInput!) {
        returnCreate(returnInput: $returnInput) {
        userErrors {
            field
            message
        }
        return {
            id
            returnLineItems(first: 10) {
                edges {
                    node {
                        id
                        quantity
                    }
                }
            }
        }
    }
}`

export async function POST(req: NextRequest): Promise<NextResponse<{ message: string, status: number, data: Return | null }>> {
    try {
        let order: Order = await req.json();

        if (!order.id || !order.lineItems || order.lineItems.length == 0) {
            return NextResponse.json({ message: "Order ID and line items are required to create a return.", status: 400, data: null });
        }

        const rsp = await client.request(RETURN_CREATE_MUTATION, {
            variables: {
                returnInput: {
                    orderId: order.id,
                    returnLineItems: order.lineItems.map((item: LineItem) => ({
                        fulfillmentLineItemId: item.id,
                        quantity: item.quantity,
                        returnReason: "UNKNOWN",
                        returnReasonNote: "test"
                    }))
                }
            }
        });

        const hiddenErrors = rsp.errors?.graphQLErrors || rsp.data?.returnCreate?.userErrors;

        if ((hiddenErrors as UserError[]).find((e) => e.message == "Return line item has an invalid quantity.")) {
            console.error(hiddenErrors)
            return NextResponse.json({ message: "Return already exists for one or more items in this order.", status: 409, data: null })
        }

        if (hiddenErrors?.length > 0) {
            console.error(hiddenErrors)
            return NextResponse.json({ message: "Failed to create return.", status: 500, data: null })
        }

        return NextResponse.json({ message: "Succesfully created return.", status: 200, data: rsp.data?.returnCreate?.return });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Failed to create return.", status: 500, data: null })
    }
}
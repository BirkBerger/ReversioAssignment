import { Order } from "@/app/services/shopify-service";
import { createAdminApiClient } from "@shopify/admin-api-client";
import { ApiVersion } from "@shopify/shopify-api";
import { NextRequest, NextResponse } from "next/server";


const client = createAdminApiClient({
    accessToken: process.env.SHOPIFY_ACCESS_TOKEN || "",
    storeDomain: process.env.SHOPIFY_SHOP_DOMAIN || "",
    apiVersion: ApiVersion.October25
});

interface ShopifyRsp {
    id: string,
    fulfillments: Fullfillment[]
}

interface Fullfillment {
    id: string,
    fulfillmentLineItems: {
        nodes: {
            id: string,
            lineItem: LineItem
        }[]
    }
}

interface LineItem {
    quantity: number,
    name: string
}

const GET_ORDER_QUERY = `
    query getOrder($id: ID!) {
        order(id: $id) {
            id
            fulfillments(first: 10) {
                id
                fulfillmentLineItems(first: 10) {
                    nodes {
                        id
                        lineItem {
                            quantity
                            name
                        }
                    }
                }
            }
        }
    }
`;


export async function GET(req: NextRequest): Promise<NextResponse<{ message: string, status: number, data: Order | null}>> {
    try {
        const id = req.nextUrl.searchParams.get('id');
        
        if (!id) {
            return NextResponse.json({ message: "Order ID is required.", status: 400, data: null });
        }

        const rsp = await client.request(GET_ORDER_QUERY, {
            variables: {
                id: `gid://shopify/Order/${id}`
            }
        })

        if (rsp.errors?.graphQLErrors) {
            console.error(rsp.errors?.graphQLErrors)
            return NextResponse.json({ message: "Failed to create return.", status: 500, data: null })
        }

        const shopifyRsp: ShopifyRsp = rsp.data?.order;

        if (!shopifyRsp) {
            return NextResponse.json({ message: "Order not found.", status: 404, data: null })
        }

        const order: Order = formatData(rsp.data.order);

        if (!order.lineItems) {
            return NextResponse.json({ message: "No line items found for this order.", status: 400, data: null })
        }
    
        return NextResponse.json({ message: "Succesfully retrieved order.", status: 200, data: order });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Failed to retrieve order.", status: 500, data: null })
    }
}

function formatData(order: ShopifyRsp): Order {
    return {
        id: order.id,
        lineItems: order.fulfillments.map((node) => ({
            id: node.fulfillmentLineItems.nodes[0].id,
            quantity: node.fulfillmentLineItems.nodes[0].lineItem.quantity,
            name: node.fulfillmentLineItems.nodes[0].lineItem.name
        })) 
    }
}
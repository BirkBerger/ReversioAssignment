export interface Order {
    id: string,
    lineItems: LineItem[]
}

export interface LineItem {
    id: string,
    name: string,
    quantity: number
}

class ShopifyService {

    public getOrder = async (id: string): Promise<Order | null> => {
        return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shopify/get-order?id=${id}`)
        .then((rsp: Response) => rsp.json())
        .then((resJson) => resJson.data)
        .catch((err) => {
            console.error(err);
            return null;
        })

    }
}

export default new ShopifyService();
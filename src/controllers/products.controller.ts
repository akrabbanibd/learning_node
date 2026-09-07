import type { IncomingMessage, ServerResponse } from "node:http";
import { insertProduct, readProducts } from "../service/product.service";
import type { IProduct } from "../types/product.type";
import { parseBody } from "../utility/parseBody";

export const productsController = async (req: IncomingMessage, res: ServerResponse) => {

    const products = readProducts()

    const url = req.url;
    const method = req.method;
    const urlParts = url?.split("/");
    const urlId = urlParts && urlParts[1] === "product" ? Number(urlParts[2]) : null;

    if (url === "/products" && method === "GET") {

        res.writeHead(200, { "content-type": "application/json" });
        console.log("This is the products route")
        res.end(JSON.stringify({
            message: "This is the products route",
            data: products
        }));
    } else if (urlId !== null && method === "GET") {

        const products = readProducts()
        const product = products.find((p: IProduct) => p.id === urlId)

        res.writeHead(200, { "content-type": "application/json" });
        console.log("This is the product route")
        res.end(JSON.stringify({
            message: "This is the product route",
            data: product
        }));
    } else if (url === "/products" && method === "POST") {

        const body = await parseBody(req)
        const newProduct = {
            id: Date.now(),
            ...body,
        }

        products.push(newProduct)
        insertProduct(products)

        console.log("post data inserted", newProduct)
        console.log(body)

        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({
            message: "post data inserted",
            data: newProduct,
        }));

    } else if (urlId !== null && method === "PUT") {

        const body = await parseBody(req)

        const index = products.findIndex((p: IProduct) => p.id === urlId)

        if (index < 0) {
            res.writeHead(404, { "content-type": "application/json" });
            res.end(JSON.stringify({
                message: "data not found",
                data: "",
            }));
        }
            const updateProduct= {
                ...body,
                id: urlId,
            }
            products.push(updateProduct)
            console.log("data updated")
            console.log(products)

            res.writeHead(200, { "content-type": "application/json" });
            res.end(JSON.stringify({
                message: "data updated",
                data: "",
            }));
    }

};
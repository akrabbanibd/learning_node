import type { IncomingMessage, ServerResponse } from "node:http";

export const sendResponse= (res: ServerResponse)=>{

    res.writeHead(200, { "content-type": "application/json" });
        console.log("This is the product route")
        res.end(JSON.stringify({
            message: "This is the product route",
            data: product
        }));

}
import type { IncomingMessage, ServerResponse } from "http";
import { productsController } from "../controllers/products.controller";

export const routeHandler = (req: IncomingMessage, res: ServerResponse)=>{
    const url = req.url;
    const method = req.method;

    if(url === "/"){
        res.writeHead(200, {"content-type" : "application/json"});
        console.log("The route is root")
        res.end("The route is root")
    } else if(url?.startsWith ("/product")){
        productsController(req, res)
    }else {
        res.writeHead(404, {"content-type" : "application/json"});
        console.log("Route not found!!")
        res.end("Route not found!!")
    }
}
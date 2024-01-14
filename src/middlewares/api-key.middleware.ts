import { NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { config } from "../config/config";

export class ApiKeyMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction){
        const apiKey = req.headers['x-api-key'];

        if(!apiKey || !config.apiKeys.includes(apiKey.toString())) {
            return res.status(401).json({ message: 'Unathorized'});
        }

        next();
    }
}
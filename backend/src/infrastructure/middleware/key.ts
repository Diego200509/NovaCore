import { NextFunction, Request, Response } from "express";
import { env } from "../../config/env.ts";

function normalizeKey(value: string | string[] | undefined): string {
    if (value == null) return "";
    const raw = Array.isArray(value) ? value[0] : value;
    return typeof raw === "string" ? raw.trim() : "";
}

export const apiMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const serverKey = env["API_KEY"];
    if (!serverKey || typeof serverKey !== "string" || !serverKey.trim()) {
        return res.status(503).json({
            message: "API Key no configurada en el servidor. Configura la variable API_KEY en Render.",
        });
    }
    const clientKey = normalizeKey(req.headers["x-api-key"]);
    if (!clientKey || clientKey !== serverKey.trim()) {
        return res.status(401).json({ message: "API Key inválida o no enviada." });
    }
    next();
};
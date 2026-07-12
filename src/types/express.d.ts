import "express";
import type { JwtPayload} from "./auth.js";

declare module "express-serve-static-core" {
    interface Request {
        user?: JwtPayload;
    }
}
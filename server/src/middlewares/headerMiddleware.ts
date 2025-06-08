import type { Context, Next } from "hono";

const headerMiddleware = async (c: Context, next: Next) => {
    const apiKey = c.req.header('api_key');
    if (!apiKey || apiKey !== 'rahasia') {
        return c.json({ error: 'Invalid API key' }, 401);
    }
    await next();
};

export default headerMiddleware
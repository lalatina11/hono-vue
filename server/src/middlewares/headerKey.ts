import type { Context, Next } from "hono";

const headerMiddleware = async (c: Context, next: Next) => {
    const apiKey = c.req.header('x-api-key');
    if (!apiKey || apiKey !== 'your_secret_api_key') {
        return c.json({ error: 'Invalid API key' }, 401);
    }
    await next();
};

export default headerMiddleware
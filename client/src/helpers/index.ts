export const apiRequest = {
    get: async (url: string) => {
        const res = await fetch(url, { credentials: "include" })
        return { res }
    },
    post: async (url: string, formBody?: any) => {
        const res = await fetch(url, { method: "POST", credentials: "include", body: JSON.stringify(formBody) })
        return { res }
    }
}
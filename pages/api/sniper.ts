import { streamNewTokens } from "@/base/sniper";
import { init } from "@/base/transaction/transaction";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { payload } = req.body;
        await init(payload);
        await streamNewTokens(payload)
            .then(snippingRes => res.json({ result: snippingRes }))
            .catch(err => res.json({ error: err }))
    } catch (error) {
        console.log(error)
    }
}
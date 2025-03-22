import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export const POST = async (request: NextRequest) => {
    try {
        const DID_API_KEY = process.env.DID_API_KEY;
        const { text, style, avatarUrl, language } = await request.json();

        const creationResponse = await axios.post(
            "https://api.d-id.com/talks",
            {
                source_url: avatarUrl,
                script: {
                    type: "text",
                    input: text,
                    provider: {
                        type: "microsoft",
                        voice_id: language,
                        voice_config: { style }
                    }
                },
                config: { stitch: true }
            },
            {
                headers: {
                    Authorization: `Basic ${DID_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const { id } = creationResponse.data;

        async function checkStatus(videoId: string) {
            const MAX_RETRIES = 10;
            const INTERVAL = 5000;

            for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
                await new Promise((resolve) => setTimeout(resolve, INTERVAL));

                const statusResponse = await axios.get(`https://api.d-id.com/talks/${videoId}`, {
                    headers: {
                        Authorization: `Basic ${DID_API_KEY}`,
                        "Content-Type": "application/json",
                    },
                });

                console.log(`Attempt ${attempt + 1}: Status - ${statusResponse.data.status}`);

                if (statusResponse.data.status === "done") {
                    return statusResponse.data.result_url;
                }
            }
            throw new Error("Video processing timeout.");
        }

        const resultUrl = await checkStatus(id);

        return NextResponse.json({ videoUrl: resultUrl });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

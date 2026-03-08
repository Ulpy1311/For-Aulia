import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const client = new OpenAI({
  baseURL: 'https://integrate.api.nvidia.com/v1',
  apiKey: process.env.NVIDIA_API_KEY || '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',
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { prompt } = body;

        const response = await client.chat.completions.create({
            model: "z-ai/glm5",
            messages: [
                {
                    role: "system",
                    content: "Kamu adalah asisten penulis jurnal dan catatan memori pribadi untuk website kenangan. HINDARI penggunaan tanda pisah panjang atau em dashes. Gunakan titik atau koma. Jika perlu menghubungkan ide, gunakan titik. Jangan nyampah. Berikan tulisan yang indah, emosional, dan reflektif."
                },
                {
                    role: "user",
                    content: prompt || "Buatkan catatan indah hari ini tentang kenangan jarak jauh."
                }
            ],
            temperature: 1,
            top_p: 1,
            max_tokens: 16384,
            // @ts-expect-error: NVIDIA specific extra_body kwargs
            extra_body: {
                chat_template_kwargs: { enable_thinking: true, clear_thinking: false }
            }
        });

        const reply = response.choices[0]?.message?.content || "";

        return NextResponse.json({
            success: true,
            result: reply
        });
    } catch (error: unknown) {
        console.error('NVIDIA AI Error:', error);
        return NextResponse.json({ error: error instanceof Error ? error.message : "AI Generation Failed" }, { status: 500 });
    }
}

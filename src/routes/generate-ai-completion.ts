import { FastifyInstance } from "fastify";
import { z } from 'zod';
import { prisma } from "../lib/prisma";
import { openai } from "../lib/openai";
import { createReadStream } from "node:fs";

export async function generateAICompletionRoute(app: FastifyInstance) {

    app.post('/ai/complete', async (request, response) => {
        const bodyShema = z.object({
            videoId: z.string().uuid(),
            template: z.string(),
            temperature: z.number().min(0).max(1).default(0.5),
        })

        const { videoId, template, temperature } = bodyShema.parse(request.body);
        const video = await prisma.video.findFirstOrThrow({
            where: {
                id: videoId
            }
        })

        if(!video.transcription) return response.status(400).send({ error: 'Video transcription was not generated yet.'});

        const promptMessage = template.replace('{transcription}', video.transcription);

        const responseCompletion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo-16k',
            temperature,
            messages: [
                { role: 'user', content: promptMessage },
            ]
        })

        return responseCompletion;
    })
}
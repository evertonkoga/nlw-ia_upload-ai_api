import { FastifyInstance } from "fastify";
import { z } from 'zod';
import { prisma } from "../lib/prisma";
import { openai } from "../lib/openai";
import { createReadStream } from "node:fs";

export async function createTranscriptionRoute(app: FastifyInstance) {

    app.post('/videos/:videoId/transcription', async (request) => {
        const paramsShema = z.object({
            videoId: z.string().uuid(),
        });

        const { videoId } = paramsShema.parse(request.params);

        const bodyShema = z.object({
            prompt: z.string(),
        })

        const { prompt } = bodyShema.parse(request.body);

        const video = await prisma.video.findFirstOrThrow({
            where: {
                id: videoId
            }
        })

        const videoPath = video.path;
        const audioReadStream = createReadStream(videoPath);

        const response = await openai.audio.transcriptions.create({
            file: audioReadStream,
            model: 'whisper-1',
            response_format: 'json',
            language: 'pt',
            temperature: 0,
            prompt,
        });

        const transcription = response.text;

        await prisma.video.update({
            where: {
                id: videoId
            }, 
            data: {
                transcription,
            }
        })

        return transcription;
    })
}
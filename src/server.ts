import fastify from "fastify";
import { getAllPromptsRoute } from "./routes/get-all-prompts";
import { uploadVideo } from "./routes/upload-video";
import { createTranscriptionRoute } from "./routes/create-transcription";

const app = fastify()

app.register(getAllPromptsRoute)
app.register(uploadVideo)
app.register(createTranscriptionRoute)

app.listen({
    port: 3333
}).then(() => {
    console.log('HTTP Server Running.')
})
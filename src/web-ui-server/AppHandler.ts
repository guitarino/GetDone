import { createGetDoneAppRenderStream } from "./App";
import { PassThrough } from "stream";
import { indexContent, indexDelimiter } from "./index.html";

export function appHandler(request, h) {
    const getDoneAppRenderStream = createGetDoneAppRenderStream();
    const renderStream = new PassThrough();
    const response = h.response(renderStream);
    response.type('text/html');
    const indexContentStart = indexContent.indexOf(indexDelimiter);
    const indexContentEnd = indexContentStart + indexDelimiter.length;
    const startChunk = indexContent.substring(0, indexContentStart);
    const endChunk = indexContent.substring(indexContentEnd);
    renderStream.push(startChunk);
    getDoneAppRenderStream.on('data', (chunk) => {
        renderStream.push(chunk);
    });
    getDoneAppRenderStream.on('end', () => {
        renderStream.push(endChunk);
        renderStream.push(null);
    });
    return response;
}
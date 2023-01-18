import { handleRequest } from "./handler";

addEventListener("fetch", (ev: FetchEvent) => {
	ev.respondWith(handleRequest(ev.request));
});

import { Polly } from "@pollyjs/core";
import LocalStoragePersister from "@pollyjs/persister-local-storage";
import NodeHttpAdapter from "@pollyjs/adapter-node-http";
import FSPersister from "@pollyjs/persister-fs";
import FetchAdapter from "@pollyjs/adapter-fetch";

Polly.register(NodeHttpAdapter);
Polly.register(FSPersister);
Polly.register(LocalStoragePersister);
Polly.register(FetchAdapter);

const config = {
  adapters: ["fetch"],
  persister: "fs",
  logLevel: "info",
  recordFailedRequests: true,
  recordIfMissing: true,
  recordFailedRequests: true,
  mode: "replay",
  persisterOptions: {
    fs: "__recordings__",
  },
};

export function pollyConfig(name) {
  const polly = new Polly(name, config);
  polly.server
    .any()
    .on("response", (req) =>
      console.log(JSON.stringify({ result: req }, null, 2)),
    );
  return polly;
}

const { defineCloudflareConfig } = require("@opennextjs/cloudflare/config");
const r2IncrementalCache = require("@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache");

module.exports = defineCloudflareConfig({
    incrementalCache: r2IncrementalCache,
});

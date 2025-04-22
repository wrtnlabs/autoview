export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there's no data, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No route statistics available.\nPlease try again later or adjust your query.",
        };
    }
    // Helper to map HTTP methods to a Chip color
    const methodColorMap = {
        GET: "blue",
        POST: "green",
        PUT: "orange",
        PATCH: "teal",
        DELETE: "red",
        OPTIONS: "violet",
        HEAD: "gray",
    };
    // Transform each route stat into a DataListItem component
    const items = input.map((stat) => {
        var _a, _b, _c, _d, _e, _f;
        const method = ((_a = stat.http_method) !== null && _a !== void 0 ? _a : "").toUpperCase();
        const route = (_b = stat.api_route) !== null && _b !== void 0 ? _b : "/";
        // 1. Chip showing the HTTP method
        const methodChip = {
            type: "Chip",
            label: method,
            color: methodColorMap[method] || "darkGray",
            size: "small",
            variant: "filled",
        };
        // 2. Text component showing the route path
        const routeText = {
            type: "Text",
            variant: "body2",
            color: "primary",
            content: route,
        };
        // 3. Chips for total requests and rate-limited requests
        const totalChip = {
            type: "Chip",
            label: `Total: ${(_c = stat.total_request_count) !== null && _c !== void 0 ? _c : 0}`,
            color: "info",
            size: "small",
            variant: "outlined",
        };
        const rateLimitedCount = (_d = stat.rate_limited_request_count) !== null && _d !== void 0 ? _d : 0;
        const rateChip = {
            type: "Chip",
            label: `Rate-limited: ${rateLimitedCount}`,
            color: rateLimitedCount > 0 ? "error" : "success",
            size: "small",
            variant: "outlined",
        };
        // 4. Markdown for timestamps, using bold labels and line breaks
        const lastRequest = (_e = stat.last_request_timestamp) !== null && _e !== void 0 ? _e : "N/A";
        const lastRateLimited = (_f = stat.last_rate_limited_timestamp) !== null && _f !== void 0 ? _f : "N/A";
        const timestampsMd = {
            type: "Markdown",
            content: `**Last Request:** ${lastRequest}  \n` +
                `**Last Rate-Limited:** ${lastRateLimited}`,
        };
        return {
            type: "DataListItem",
            // Label area: method chip + route text
            label: [methodChip, routeText],
            // Value area: statistics chips and timestamps
            value: [totalChip, rateChip, timestampsMd],
        };
    });
    // Wrap all items in a DataList
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    return dataList;
}
//# sourceMappingURL=458.js.map
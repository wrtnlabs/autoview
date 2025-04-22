export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Sort users by total requests descending for a more meaningful ranking
    const sortedStats = [...input].sort((a, b) => { var _a, _b; return ((_a = b.total_request_count) !== null && _a !== void 0 ? _a : 0) - ((_b = a.total_request_count) !== null && _b !== void 0 ? _b : 0); });
    // Map each user stat to a DataListItem component
    const items = sortedStats.map((stat) => {
        var _a, _b, _c, _d, _e, _f;
        // Create an avatar with the user's name (initials or full name)
        const avatar = {
            type: "Avatar",
            name: (_a = stat.actor_name) !== null && _a !== void 0 ? _a : "Unknown",
            variant: "blue",
        };
        // Label area: avatar + user name
        const label = [
            avatar,
            {
                type: "Text",
                // Use subtitle style for names
                variant: "subtitle1",
                content: (_b = stat.actor_name) !== null && _b !== void 0 ? _b : "Unknown user",
            },
        ];
        // Chip showing total request count
        const totalChip = {
            type: "Chip",
            label: `${(_c = stat.total_request_count) !== null && _c !== void 0 ? _c : 0}`,
            color: "primary",
            variant: "filled",
            size: "medium",
            startElement: {
                type: "Icon",
                id: "database", // FontAwesome "fa-database"
                color: "blue",
                size: 16,
            },
        };
        // Chip showing rate-limited count with color coding
        const rateChip = {
            type: "Chip",
            label: `${(_d = stat.rate_limited_request_count) !== null && _d !== void 0 ? _d : 0}`,
            // If any rate-limited requests exist, highlight in error color
            color: stat.rate_limited_request_count && stat.rate_limited_request_count > 0 ? "error" : "success",
            variant: "outlined",
            size: "medium",
            startElement: {
                type: "Icon",
                id: stat.rate_limited_request_count && stat.rate_limited_request_count > 0 ? "ban" : "check-circle",
                color: stat.rate_limited_request_count && stat.rate_limited_request_count > 0 ? "red" : "green",
                size: 16,
            },
        };
        // Markdown component for last request timestamp to allow styling (bold label)
        const lastRequestMd = {
            type: "Markdown",
            content: `**Last Request:** ${(_e = stat.last_request_timestamp) !== null && _e !== void 0 ? _e : "N/A"}`,
        };
        // Markdown component for last rate-limited timestamp if present
        const lastRateMd = {
            type: "Markdown",
            content: `**Last Rate-Limited:** ${(_f = stat.last_rate_limited_timestamp) !== null && _f !== void 0 ? _f : "Never"}`,
        };
        // Combine chips and markdown into the value area
        const value = [
            totalChip,
            rateChip,
            lastRequestMd,
            lastRateMd,
        ];
        return {
            type: "DataListItem",
            label,
            value,
        };
    });
    // Return a DataList that holds all user stat items
    return {
        type: "DataList",
        childrenProps: items,
    };
}
//# sourceMappingURL=466.js.map
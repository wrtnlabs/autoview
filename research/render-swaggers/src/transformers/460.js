export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Extract stats with sensible defaults if undefined
    const total = (_a = input.total_request_count) !== null && _a !== void 0 ? _a : 0;
    const rateLimited = (_b = input.rate_limited_request_count) !== null && _b !== void 0 ? _b : 0;
    // Calculate rate-limited percentage, guard against division by zero
    const rateLimitPercent = total > 0 ? (rateLimited / total) * 100 : 0;
    const rateLimitPercentFormatted = rateLimitPercent.toFixed(1);
    // Build a DataListItem for each statistic
    const dataListItems = [
        {
            type: "DataListItem",
            // Using Text component for the label for better styling & responsiveness
            label: [
                {
                    type: "Text",
                    content: ["Total Requests"],
                    variant: "body1",
                },
            ],
            // Visualize the raw count as a filled Chip
            value: {
                type: "Chip",
                label: total.toString(),
                color: "primary",
                variant: "filled",
                size: "medium",
            },
        },
        {
            type: "DataListItem",
            label: [
                {
                    type: "Text",
                    content: ["Rate-Limited Requests"],
                    variant: "body1",
                },
            ],
            value: {
                type: "Chip",
                label: rateLimited.toString(),
                color: "error",
                variant: "filled",
                size: "medium",
            },
        },
        {
            type: "DataListItem",
            label: [
                {
                    type: "Text",
                    content: ["Rate Limit Percentage"],
                    variant: "body1",
                },
            ],
            value: {
                type: "Chip",
                label: `${rateLimitPercentFormatted}%`,
                color: "warning",
                variant: "filled",
                size: "medium",
            },
        },
    ];
    // Wrap the items in a DataList component
    const dataList = {
        type: "DataList",
        childrenProps: dataListItems,
    };
    // Header with an engaging icon and a summary description
    const header = {
        type: "CardHeader",
        title: "API Usage Summary",
        description: `${rateLimitPercentFormatted}% of requests were rate limited`,
        startElement: {
            type: "Icon",
            id: "chart-pie", // FontAwesome-style icon
            color: "blue",
            size: 28,
        },
    };
    // Content area holding our DataList
    const content = {
        type: "CardContent",
        childrenProps: [dataList],
    };
    // Return a vertical card combining header and content
    return {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
}
//# sourceMappingURL=460.js.map
export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there's no data, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No data available\nNo API time stats were provided."
        };
    }
    // 1. Create a CardHeader with a clock icon and descriptive title
    const header = {
        type: "CardHeader",
        title: "API Time Stats",
        description: "Timeline of total and rate‑limited requests",
        startElement: {
            type: "Icon",
            id: "clock",
            color: "blue",
            size: 24
        }
    };
    // 2. Transform each record into a DataListItem with timestamp + two Chips
    const items = input.map((record) => {
        var _a, _b, _c;
        // Text component for the timestamp label
        const timestampText = {
            type: "Text",
            content: (_a = record.timestamp) !== null && _a !== void 0 ? _a : "",
            variant: "body2",
            color: "gray"
        };
        // Chip for total requests
        const totalChip = {
            type: "Chip",
            label: String((_b = record.total_request_count) !== null && _b !== void 0 ? _b : 0),
            color: "green",
            variant: "filled",
            startElement: {
                type: "Icon",
                id: "network-wired",
                size: 16
            }
        };
        // Chip for rate‑limited requests
        const rateChip = {
            type: "Chip",
            label: String((_c = record.rate_limited_request_count) !== null && _c !== void 0 ? _c : 0),
            color: "red",
            variant: "filled",
            startElement: {
                type: "Icon",
                id: "ban",
                size: 16
            }
        };
        return {
            type: "DataListItem",
            label: [timestampText],
            value: [totalChip, rateChip]
        };
    });
    // 3. Wrap the list of items in a DataList component
    const dataList = {
        type: "DataList",
        childrenProps: items
    };
    // 4. Put the DataList inside a CardContent component
    const content = {
        type: "CardContent",
        childrenProps: [dataList]
    };
    // 5. Combine header and content into a responsive VerticalCard
    return {
        type: "VerticalCard",
        childrenProps: [header, content]
    };
}
//# sourceMappingURL=465.js.map
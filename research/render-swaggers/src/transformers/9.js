export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    const { pagination, data } = input;
    const { current, pages, records } = pagination;
    // Transform each deposit record into a DataListItem with an icon and text
    const items = data.map((rec) => {
        // Arrow icon: up for positive, down for negative
        const directionIcon = {
            type: "Icon",
            id: rec.direction === 1 ? "arrow-up" : "arrow-down",
            color: rec.direction === 1 ? "green" : "red",
            size: 16,
        };
        // Main code label
        const codeText = {
            type: "Text",
            content: rec.code,
            variant: "body1",
        };
        // Created date (formatted) and source as secondary info
        const dateText = {
            type: "Text",
            content: new Date(rec.created_at).toLocaleString(),
            variant: "caption",
            color: "gray",
        };
        const sourceText = {
            type: "Text",
            content: rec.source,
            variant: "caption",
            color: "gray",
        };
        return {
            type: "DataListItem",
            // Label shows icon + code
            label: [directionIcon, codeText],
            // Value shows date + source
            value: [dateText, sourceText],
        };
    });
    // If there are no records, render a friendly markdown message
    if (items.length === 0) {
        return {
            type: "Markdown",
            content: "### No deposit records available.",
        };
    }
    // Build the DataList component
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    // Card header with a list icon
    const header = {
        type: "CardHeader",
        title: "Deposit Records",
        description: `Showing ${data.length} of ${records} total`,
        startElement: {
            type: "Icon",
            id: "list",
            size: 24,
            color: "blue",
        },
    };
    // Card content wraps the DataList
    const content = {
        type: "CardContent",
        childrenProps: dataList,
    };
    // Card footer with pagination info in markdown for responsive text
    const footer = {
        type: "CardFooter",
        childrenProps: {
            type: "Markdown",
            content: `**Page**: ${current} / ${pages}  \n**Total Records**: ${records}`,
        },
    };
    // Compose everything into a vertical card for mobile-friendly layout
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=9.js.map
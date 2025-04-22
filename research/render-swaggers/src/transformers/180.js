export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Ensure we have a list to work with
    const events = (_a = input.events) !== null && _a !== void 0 ? _a : [];
    // If there are no events, render a simple markdown message
    if (events.length === 0) {
        return {
            type: "Markdown",
            content: "### No events to display\n\nThere are currently no events in the data source.",
        };
    }
    // Helper to format a timestamp into a human-readable string
    const formatDate = (ts) => ts != null ? new Date(ts).toLocaleString() : "N/A";
    // Create a DataListItem for each event
    const items = events.map((event) => {
        var _a, _b, _c;
        // Build a markdown block with the event details
        const detailsLines = [
            `**ID:** ${(_a = event.id) !== null && _a !== void 0 ? _a : "N/A"}`,
            `**User:** ${(_b = event.userId) !== null && _b !== void 0 ? _b : "N/A"}`,
            event.channelId ? `**Channel:** ${event.channelId}` : "",
            `**Version:** ${(_c = event.version) !== null && _c !== void 0 ? _c : "N/A"}`,
            `**Created At:** ${formatDate(event.createdAt)}`,
            `**Expired At:** ${formatDate(event.expireAt)}`,
        ].filter(Boolean);
        return {
            type: "DataListItem",
            // Use Text component for the primary label
            label: [
                {
                    type: "Text",
                    variant: "subtitle1",
                    content: [event.name],
                },
            ],
            // Use Markdown for the details, which supports lists and bold text
            value: {
                type: "Markdown",
                content: detailsLines.join("\n\n"),
            },
        };
    });
    // Wrap the list of items in a DataList component
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    // Card header with an icon and summary
    const header = {
        type: "CardHeader",
        title: `Events (${events.length})`,
        description: `${events.length} event${events.length > 1 ? "s" : ""} fetched.`,
        startElement: {
            type: "Icon",
            id: "calendar", // Assumes `calendar` icon is available
            size: 24,
            color: "blue",
        },
    };
    // Card content wrapping the data list
    const content = {
        type: "CardContent",
        childrenProps: dataList,
    };
    // Optionally render navigation buttons in the footer
    const navButtons = [];
    if (input.prev) {
        navButtons.push({
            type: "Button",
            label: ["Previous"],
            href: input.prev,
            variant: "text",
            size: "small",
        });
    }
    if (input.next) {
        navButtons.push({
            type: "Button",
            label: ["Next"],
            href: input.next,
            variant: "text",
            size: "small",
        });
    }
    // Assemble the card children
    const cardChildren = [header, content];
    if (navButtons.length > 0) {
        cardChildren.push({
            type: "CardFooter",
            childrenProps: navButtons,
        });
    }
    // Return a vertical card component that encapsulates everything
    return {
        type: "VerticalCard",
        childrenProps: cardChildren,
    };
}
//# sourceMappingURL=180.js.map
export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    const data = input.campaignUser;
    // If there's no campaign user data, show a friendly Markdown message
    if (!data) {
        return {
            type: "Markdown",
            content: "**No campaign user data available.**",
        };
    }
    // Destructure metrics with sensible defaults
    const { campaignId = "–", userId = "–", msgId = "–", sent, view, goal, click, version, } = data;
    // Helper to convert any value to string or fallback dash
    const formatValue = (value) => value !== undefined && value !== null ? String(value) : "–";
    // Build a list of label/value pairs for core metrics
    const listItems = [];
    const addMetric = (label, value) => {
        listItems.push({
            type: "DataListItem",
            // Label as a small, secondary-styled text
            label: {
                type: "Text",
                variant: "subtitle2",
                color: "secondary",
                content: [label],
            },
            // Value as body2 text
            value: {
                type: "Text",
                variant: "body2",
                content: [formatValue(value)],
            },
        });
    };
    addMetric("Message ID", msgId);
    addMetric("Sent", sent);
    addMetric("Views", view);
    addMetric("Clicks", click);
    addMetric("Goal", goal);
    addMetric("Version", version);
    // Compose the DataList component
    const metricsList = {
        type: "DataList",
        childrenProps: listItems,
    };
    // Header: shows an icon and identifies campaign + user
    const header = {
        type: "CardHeader",
        title: `Campaign: ${campaignId}`,
        description: `User: ${userId}`,
        // Use a FontAwesome chart-bar icon to represent analytics
        startElement: {
            type: "Icon",
            id: "chart-bar",
            color: "blue",
            size: 24,
        },
    };
    // Content: embed the metrics DataList in the card
    const content = {
        type: "CardContent",
        childrenProps: [metricsList],
    };
    // Footer: action button linking to campaign details (if ID exists)
    const footerButton = Object.assign({ type: "Button", label: "View Details", variant: "outlined", color: "primary", size: "small" }, (campaignId !== "–" && { href: `/campaign/${campaignId}` }));
    const footer = {
        type: "CardFooter",
        childrenProps: [footerButton],
    };
    // Assemble into a responsive vertical card
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=175.js.map
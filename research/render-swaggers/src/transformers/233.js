export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Extract the event from the input
    const event = input.event;
    // If there's no event data, render a simple markdown notice
    if (!event) {
        return {
            type: "Markdown",
            content: "### No event data available",
        };
    }
    // Helper to display string or number fields, falling back to "N/A"
    const display = (value) => value !== undefined && value !== null && value !== ""
        ? String(value)
        : "N/A";
    // Helper to format UNIX timestamps into localized date‐time strings
    const formatTimestamp = (ts) => ts !== undefined ? new Date(ts).toLocaleString() : "N/A";
    // Helper to count keys of an object, safely handling undefined
    const countKeys = (obj) => obj ? Object.keys(obj).length : 0;
    // Build a list of labeled data points for the DataList component
    const dataListItems = [
        {
            type: "DataListItem",
            label: { type: "Text", content: "Name" },
            value: { type: "Text", content: display(event.name) },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "User ID" },
            value: { type: "Text", content: display(event.userId) },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Event ID" },
            value: { type: "Text", content: display(event.id) },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Channel ID" },
            value: { type: "Text", content: display(event.channelId) },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Created At" },
            value: { type: "Text", content: formatTimestamp(event.createdAt) },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Expires At" },
            value: { type: "Text", content: formatTimestamp(event.expireAt) },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Properties Count" },
            value: { type: "Text", content: String(countKeys(event.property)) },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "i18n Keys" },
            value: { type: "Text", content: String(countKeys(event.nameI18nMap)) },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Version" },
            value: {
                type: "Text",
                content: event.version !== undefined ? String(event.version) : "N/A",
            },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Managed" },
            value: {
                type: "Text",
                content: event.managed ? "Yes" : "No",
            },
        },
    ];
    // Compose the top‐level UI using a VerticalCard for responsiveness
    return {
        type: "VerticalCard",
        childrenProps: [
            // Card header with an icon, title, description, and version badge
            {
                type: "CardHeader",
                title: event.name,
                description: `ID: ${display(event.id)} | Channel: ${display(event.channelId)}`,
                startElement: {
                    type: "Icon",
                    id: "user",
                    size: 24,
                    color: "blue",
                },
                endElement: {
                    type: "Chip",
                    label: `v${display(event.version)}`,
                    variant: "outlined",
                    size: "small",
                    color: "info",
                },
            },
            // Card content showing all event fields in a DataList
            {
                type: "CardContent",
                childrenProps: {
                    type: "DataList",
                    childrenProps: dataListItems,
                },
            },
        ],
    };
}
//# sourceMappingURL=233.js.map
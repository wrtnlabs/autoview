export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Handle null input gracefully
    if (input === null) {
        return {
            type: "Markdown",
            content: "## No integration data available.\nPlease check the source or try again later."
        };
    }
    // Helper to build a simple text component
    const makeText = (text) => ({
        type: "Text",
        content: text
    });
    // Helper to build a data list item with label and value components
    const makeDataItem = (label, value) => ({
        type: "DataListItem",
        label: makeText(label),
        value
    });
    // Format dates for readability
    const formatDate = (iso) => new Date(iso).toLocaleString();
    // Build badges for counts
    const makeBadge = (count, iconId) => ({
        type: "Badge",
        count,
        childrenProps: {
            type: "Icon",
            id: iconId,
            size: 16,
            color: "gray"
        }
    });
    // DataList items
    const items = [];
    // ID
    items.push(makeDataItem("ID", makeText(input.id.toString())));
    // Slug (optional)
    if (input.slug) {
        items.push(makeDataItem("Slug", makeText(input.slug)));
    }
    // Node ID
    items.push(makeDataItem("Node ID", makeText(input.node_id)));
    // Client ID (optional)
    if (input.client_id) {
        items.push(makeDataItem("Client ID", makeText(input.client_id)));
    }
    // External URL link as a button
    items.push(makeDataItem("External URL", {
        type: "Button",
        variant: "text",
        color: "primary",
        label: "Visit",
        href: input.external_url
    }));
    // HTML URL link as a button
    items.push(makeDataItem("HTML URL", {
        type: "Button",
        variant: "text",
        color: "primary",
        label: "Open Repo",
        href: input.html_url
    }));
    // Creation & update times
    items.push(makeDataItem("Created At", makeText(formatDate(input.created_at))));
    items.push(makeDataItem("Updated At", makeText(formatDate(input.updated_at))));
    // Events count badge
    if (Array.isArray(input.events)) {
        items.push(makeDataItem("Events", makeBadge(input.events.length, "caret-down") // using caret-down as generic list icon
        ));
    }
    // Permissions count badge
    if (input.permissions && typeof input.permissions === "object") {
        const permCount = Object.keys(input.permissions).length;
        items.push(makeDataItem("Permissions", makeBadge(permCount, "lock")));
    }
    // Installations count (optional)
    if (typeof input.installations_count === "number") {
        items.push(makeDataItem("Installations", makeText(input.installations_count.toString())));
    }
    // Build the DataList component
    const dataList = {
        type: "DataList",
        childrenProps: items
    };
    // Assemble the vertical card
    const card = {
        type: "VerticalCard",
        childrenProps: [
            // Card header with icon and primary info
            {
                type: "CardHeader",
                title: input.name,
                description: (_a = input.description) !== null && _a !== void 0 ? _a : "No description provided.",
                startElement: {
                    type: "Icon",
                    id: "github",
                    size: 32,
                    color: "darkGray"
                }
            },
            // Main content: the data list
            {
                type: "CardContent",
                childrenProps: dataList
            },
            // Footer with quick action buttons
            {
                type: "CardFooter",
                childrenProps: [
                    {
                        type: "Button",
                        variant: "contained",
                        color: "primary",
                        label: "Visit Website",
                        href: input.external_url
                    },
                    {
                        type: "Button",
                        variant: "contained",
                        color: "secondary",
                        label: "View on GitHub",
                        href: input.html_url
                    }
                ]
            }
        ]
    };
    return card;
}
//# sourceMappingURL=310.js.map
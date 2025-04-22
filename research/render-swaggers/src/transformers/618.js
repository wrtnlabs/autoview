export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Map workflow state to a UI color variant for the status chip
    const stateColorMap = {
        active: "success",
        disabled_fork: "warning",
        disabled_inactivity: "warning",
        disabled_manually: "warning",
        deleted: "error",
    };
    const chipColor = stateColorMap[input.state] || "gray";
    // Safely format date‐time strings for display
    const formatDate = (dt) => {
        try {
            return new Date(dt).toLocaleString();
        }
        catch (_a) {
            return dt;
        }
    };
    const createdAt = formatDate(input.created_at);
    const updatedAt = formatDate(input.updated_at);
    const deletedAt = input.deleted_at ? formatDate(input.deleted_at) : undefined;
    // Build the key/value list of workflow properties
    const listItems = [
        {
            type: "DataListItem",
            label: { type: "Text", content: "ID" },
            value: { type: "Text", content: String(input.id) },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Node ID" },
            value: { type: "Text", content: input.node_id },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Created At" },
            value: { type: "Text", content: createdAt },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Updated At" },
            value: { type: "Text", content: updatedAt },
        },
    ];
    if (deletedAt) {
        listItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Deleted At" },
            value: { type: "Text", content: deletedAt },
        });
    }
    // Card header: display name, path, GitHub icon, and a state chip
    const header = {
        type: "CardHeader",
        title: input.name,
        description: input.path,
        startElement: {
            type: "Icon",
            id: "github", // GitHub logo icon
            size: 24,
            color: "gray",
        },
        endElement: {
            type: "Chip",
            label: input.state,
            color: chipColor,
            size: "small",
            variant: "filled",
        },
    };
    // Card content: a DataList of workflow fields
    const dataList = {
        type: "DataList",
        childrenProps: listItems,
    };
    const content = {
        type: "CardContent",
        childrenProps: [dataList],
    };
    // Card footer: link button to GitHub UI and the status badge image
    const viewButton = {
        type: "Button",
        label: "View on GitHub",
        variant: "text",
        color: "primary",
        size: "medium",
        startElement: {
            type: "Icon",
            id: "external-link-alt", // external link icon
            size: 16,
            color: "blue",
        },
        href: input.html_url,
    };
    const badgeImage = {
        type: "Image",
        src: input.badge_url,
        alt: `${input.name} badge`,
    };
    const footer = {
        type: "CardFooter",
        childrenProps: [viewButton, badgeImage],
    };
    // Assemble everything into a vertical card for a responsive layout
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
}
//# sourceMappingURL=618.js.map
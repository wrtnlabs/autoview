export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Map visibility to a friendly chip color
    const visibilityColorMap = {
        all: "green",
        private: "red",
        selected: "orange",
    };
    const chipColor = (_a = visibilityColorMap[input.visibility]) !== null && _a !== void 0 ? _a : "gray";
    // Header: secret name with a lock icon and visibility chip
    const header = {
        type: "CardHeader",
        title: input.name,
        startElement: {
            type: "Icon",
            id: "lock",
            color: "gray",
            size: 24,
        },
        endElement: {
            type: "Chip",
            label: input.visibility,
            color: chipColor,
            variant: "outlined",
            size: "small",
        },
    };
    // Utility to safely format ISO date-time strings
    const formatDate = (iso) => {
        try {
            return new Date(iso).toLocaleString();
        }
        catch (_a) {
            return iso;
        }
    };
    // Build a list of data points: created/updated timestamps and optional link
    const dataItems = [
        {
            type: "DataListItem",
            label: { type: "Text", content: "Created At", variant: "body2", color: "tertiary" },
            value: { type: "Text", content: formatDate(input.created_at), variant: "body1" },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Updated At", variant: "body2", color: "tertiary" },
            value: { type: "Text", content: formatDate(input.updated_at), variant: "body1" },
        },
    ];
    if (input.selected_repositories_url) {
        // Offer a direct link to view selected repositories
        dataItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Repositories", variant: "body2", color: "tertiary" },
            value: {
                type: "Button",
                label: "View",
                variant: "text",
                color: "primary",
                size: "small",
                href: input.selected_repositories_url,
                startElement: { type: "Icon", id: "link", size: 16, color: "blue" },
            },
        });
    }
    // Wrap the list in a DataList component for structured layout
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "DataList",
            childrenProps: dataItems,
        },
    };
    // Compose a vertical card for an engaging, responsive display
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
    return card;
}
//# sourceMappingURL=444.js.map
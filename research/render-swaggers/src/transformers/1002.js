export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d;
    // Helper to format ISO date-times into a more readable string
    const formatDate = (iso) => iso ? new Date(iso).toLocaleString() : "N/A";
    // Build the list of metadata fields to display in a DataList
    const dataItems = [
        {
            type: "DataListItem",
            label: { type: "Text", content: "Version Name", variant: "subtitle2" },
            value: { type: "Text", content: input.name },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "ID", variant: "subtitle2" },
            value: { type: "Text", content: String(input.id) },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Created At", variant: "subtitle2" },
            value: { type: "Text", content: formatDate(input.created_at) },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Updated At", variant: "subtitle2" },
            value: { type: "Text", content: formatDate(input.updated_at) },
        },
    ];
    // Only include deleted date if it exists
    if (input.deleted_at) {
        dataItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Deleted At", variant: "subtitle2" },
            value: { type: "Text", content: formatDate(input.deleted_at) },
        });
    }
    // Provide a quick "Open" button if we have any URL
    const linkTarget = (_a = input.html_url) !== null && _a !== void 0 ? _a : input.url;
    if (linkTarget) {
        dataItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "View Source", variant: "subtitle2" },
            value: {
                type: "Button",
                variant: "text",
                color: "primary",
                size: "small",
                label: "Open",
                href: linkTarget,
                startElement: {
                    type: "Icon",
                    id: "external-link-alt",
                    size: 16,
                    color: "gray",
                },
            },
        });
    }
    // Build chips summarizing the package type and any tags
    const chips = [];
    if (input.metadata) {
        // Main package type
        chips.push({
            type: "Chip",
            label: input.metadata.package_type.toUpperCase(),
            color: "primary",
            variant: "filled",
        });
        // Container tags, if present
        if ((_b = input.metadata.container) === null || _b === void 0 ? void 0 : _b.tags) {
            for (const tag of input.metadata.container.tags) {
                chips.push({
                    type: "Chip",
                    label: tag,
                    color: "secondary",
                    variant: "outlined",
                });
            }
        }
        // Docker tags, if present
        if ((_c = input.metadata.docker) === null || _c === void 0 ? void 0 : _c.tag) {
            for (const tag of input.metadata.docker.tag) {
                chips.push({
                    type: "Chip",
                    label: tag,
                    color: "info",
                    variant: "outlined",
                });
            }
        }
    }
    // Compose the overall card visualizing the package version
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                // Header with an archive icon and optional description
                type: "CardHeader",
                title: input.name,
                description: (_d = input.description) !== null && _d !== void 0 ? _d : input.license,
                startElement: {
                    type: "Icon",
                    id: "archive",
                    size: 32,
                    color: "gray",
                },
            },
            {
                // Main content: a DataList of key fields
                type: "CardContent",
                childrenProps: {
                    type: "DataList",
                    childrenProps: dataItems,
                },
            },
            {
                // Footer: chips for package type and tags
                type: "CardFooter",
                childrenProps: {
                    type: "ChipGroup",
                    childrenProps: chips,
                },
            },
        ],
    };
}
//# sourceMappingURL=1002.js.map
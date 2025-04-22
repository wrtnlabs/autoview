export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d;
    // 1. Build the card header: show an icon, version name, and optionally a license badge
    const header = Object.assign({ type: "CardHeader", 
        // A simple package icon; adjust if you have a different preferred icon name
        startElement: {
            type: "Icon",
            id: "cube",
            color: "blue",
            size: 24,
        }, title: input.name, description: input.description }, (input.license
        ? {
            endElement: {
                type: "Chip",
                label: input.license,
                variant: "outlined",
                size: "small",
                color: "secondary",
            },
        }
        : {}));
    // 2. Build the key/value list of properties
    const items = [];
    // Version ID
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "Version ID" },
        value: { type: "Text", content: input.id.toString() },
    });
    // Primary URL
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "URL" },
        value: {
            type: "Button",
            label: "Open",
            variant: "text",
            href: input.url,
        },
    });
    // Package HTML URL
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "Package Page" },
        value: {
            type: "Button",
            label: "Open",
            variant: "text",
            href: input.package_html_url,
        },
    });
    // Optional generic HTML URL
    if (input.html_url) {
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Extra Link" },
            value: {
                type: "Button",
                label: "Open",
                variant: "text",
                href: input.html_url,
            },
        });
    }
    // Created/Updated timestamps (formatted for readability)
    const formatDate = (iso) => new Date(iso).toLocaleString();
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "Created At" },
        value: { type: "Text", content: formatDate(input.created_at) },
    });
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "Updated At" },
        value: { type: "Text", content: formatDate(input.updated_at) },
    });
    // If marked deleted, show deletion timestamp with an error color
    if (input.deleted_at) {
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Deleted At" },
            value: {
                type: "Text",
                content: formatDate(input.deleted_at),
                color: "error",
            },
        });
    }
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    const content = {
        type: "CardContent",
        childrenProps: [dataList],
    };
    // 3. Build chips summarizing metadata (package type, container tags, docker tags)
    const chips = [];
    if (input.metadata) {
        // Show package type
        chips.push({
            type: "Chip",
            label: input.metadata.package_type,
            variant: "outlined",
            size: "small",
            color: "primary",
        });
        // Container tags
        if ((_b = (_a = input.metadata.container) === null || _a === void 0 ? void 0 : _a.tags) === null || _b === void 0 ? void 0 : _b.length) {
            input.metadata.container.tags.forEach((tag) => chips.push({
                type: "Chip",
                label: tag,
                variant: "filled",
                size: "small",
                color: "teal",
            }));
        }
        // Docker tags
        if ((_d = (_c = input.metadata.docker) === null || _c === void 0 ? void 0 : _c.tag) === null || _d === void 0 ? void 0 : _d.length) {
            input.metadata.docker.tag.forEach((tag) => chips.push({
                type: "Chip",
                label: tag,
                variant: "filled",
                size: "small",
                color: "cyan",
            }));
        }
    }
    // Only render a footer if there's at least one metadata chip
    const footer = {
        type: "CardFooter",
        childrenProps: chips.length > 0
            ? [
                {
                    type: "ChipGroup",
                    childrenProps: chips,
                },
            ]
            : [],
    };
    // 4. Compose the vertical card
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=494.js.map
export function transform($input) {
    return visualizeData($input);
}
// Transforms a GitHub license object into an AutoView UI component props
function visualizeData(input) {
    var _a, _b, _c, _d;
    // 1. Card Header: show license name, SPDX ID and a featured badge if applicable.
    const header = {
        type: "CardHeader",
        title: input.name,
        description: (_a = input.spdx_id) !== null && _a !== void 0 ? _a : "N/A",
        // If this license is featured, display a star badge
        endElement: input.featured
            ? {
                type: "Badge",
                dot: true,
                childrenProps: {
                    type: "Icon",
                    id: "star",
                    color: "yellow",
                    size: 20,
                },
            }
            : undefined,
    };
    // 2. Markdown section for description and implementation details
    const markdownContent = [
        "**Description:**",
        input.description || "_No description provided._",
        "",
        "**Implementation:**",
        "`" + input.implementation + "`",
    ].join("\n\n");
    const markdown = {
        type: "Markdown",
        content: markdownContent,
    };
    // Utility: create a DataListItem with plain text value
    const createTextItem = (label, value) => ({
        type: "DataListItem",
        label: { type: "Text", content: label, variant: "subtitle2" },
        value: { type: "Text", content: value !== null && value !== void 0 ? value : "N/A", variant: "body2" },
    });
    // Utility: create a DataListItem whose value is a group of chips
    const createChipGroupItem = (label, items) => ({
        type: "DataListItem",
        label: { type: "Text", content: label, variant: "subtitle2" },
        value: {
            type: "ChipGroup",
            childrenProps: items.map((item) => ({
                type: "Chip",
                label: item,
                size: "small",
                variant: "outlined",
            })),
        },
    });
    // 3. Metadata list: key, node ID, SPDX ID
    const metadataList = {
        type: "DataList",
        childrenProps: [
            createTextItem("Key", input.key),
            createTextItem("Node ID", input.node_id),
            createTextItem("SPDX ID", input.spdx_id),
        ],
    };
    // 4. Tag lists: permissions, conditions, limitations
    const tagItems = [];
    if ((_b = input.permissions) === null || _b === void 0 ? void 0 : _b.length) {
        tagItems.push(createChipGroupItem("Permissions", input.permissions));
    }
    if ((_c = input.conditions) === null || _c === void 0 ? void 0 : _c.length) {
        tagItems.push(createChipGroupItem("Conditions", input.conditions));
    }
    if ((_d = input.limitations) === null || _d === void 0 ? void 0 : _d.length) {
        tagItems.push(createChipGroupItem("Limitations", input.limitations));
    }
    const tagsList = {
        type: "DataList",
        childrenProps: tagItems,
    };
    // 5. Card Content: combine markdown and all data lists
    const content = {
        type: "CardContent",
        childrenProps: [markdown, metadataList].concat(tagItems.length ? [tagsList] : []),
    };
    // 6. Card Footer: link to the GitHub HTML URL
    const footerButton = {
        type: "Button",
        label: ["View on GitHub"],
        startElement: {
            type: "Icon",
            id: "external-link-alt",
            color: "blue",
            size: 16,
        },
        href: input.html_url,
        variant: "text",
        size: "small",
    };
    const footer = {
        type: "CardFooter",
        childrenProps: footerButton,
    };
    // 7. Assemble the VerticalCard with header, content, and footer
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
}
//# sourceMappingURL=359.js.map
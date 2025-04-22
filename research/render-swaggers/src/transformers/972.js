export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c;
    // Helper to create simple text components
    const createText = (content, variant = "body2", color) => ({
        type: "Text",
        content,
        variant,
        color,
    });
    // Helper to create link buttons for URL fields
    const createLinkButton = (url, label) => ({
        type: "Button",
        variant: "text",
        size: "small",
        href: url,
        label: label !== null && label !== void 0 ? label : url,
    });
    // Helper to create a single chip
    const createChip = (label, color = "gray") => ({
        type: "Chip",
        label,
        variant: "filled",
        color,
    });
    // Helper to create a chip group from an array of strings
    const createChipGroup = (labels, maxItems) => ({
        type: "ChipGroup",
        childrenProps: labels.map((lbl) => createChip(lbl)),
        maxItems,
    });
    // Map package_type to a visually distinct chip color
    const packageTypeColorMap = {
        npm: "orange",
        maven: "indigo",
        rubygems: "pink",
        docker: "teal",
        nuget: "violet",
        container: "cyan",
    };
    // Build DataList items for each property
    const items = [];
    // ID
    items.push({
        type: "DataListItem",
        label: createText("ID", "subtitle2"),
        value: createText(input.id.toString()),
    });
    // Name
    items.push({
        type: "DataListItem",
        label: createText("Name", "subtitle2"),
        value: createText(input.name, "body1"),
    });
    // Description (if present)
    if (input.description) {
        items.push({
            type: "DataListItem",
            label: createText("Description", "subtitle2"),
            // Use Markdown component for rich display if needed
            value: {
                type: "Markdown",
                content: input.description,
            },
        });
    }
    // License (if present)
    if (input.license) {
        items.push({
            type: "DataListItem",
            label: createText("License", "subtitle2"),
            value: createText(input.license),
        });
    }
    // URLs
    items.push({
        type: "DataListItem",
        label: createText("Package URL", "subtitle2"),
        value: createLinkButton(input.url, "View Package"),
    });
    items.push({
        type: "DataListItem",
        label: createText("HTML URL", "subtitle2"),
        value: createLinkButton(input.package_html_url, "Open in Browser"),
    });
    if (input.html_url) {
        items.push({
            type: "DataListItem",
            label: createText("Additional URL", "subtitle2"),
            value: createLinkButton(input.html_url),
        });
    }
    // Timestamps
    items.push({
        type: "DataListItem",
        label: createText("Created At", "subtitle2"),
        value: createText(new Date(input.created_at).toLocaleString()),
    });
    items.push({
        type: "DataListItem",
        label: createText("Updated At", "subtitle2"),
        value: createText(new Date(input.updated_at).toLocaleString()),
    });
    if (input.deleted_at) {
        items.push({
            type: "DataListItem",
            label: createText("Deleted At", "subtitle2"),
            value: createText(new Date(input.deleted_at).toLocaleString(), "body2", "error"),
        });
    }
    // Metadata (if present)
    if (input.metadata) {
        // Package type chip
        items.push({
            type: "DataListItem",
            label: createText("Type", "subtitle2"),
            value: createChip(input.metadata.package_type, (_a = packageTypeColorMap[input.metadata.package_type]) !== null && _a !== void 0 ? _a : "gray"),
        });
        // Container tags
        const containerTags = (_b = input.metadata.container) === null || _b === void 0 ? void 0 : _b.tags;
        if (containerTags && containerTags.length > 0) {
            items.push({
                type: "DataListItem",
                label: createText("Container Tags", "subtitle2"),
                value: createChipGroup(containerTags),
            });
        }
        // Docker tags
        const dockerTags = (_c = input.metadata.docker) === null || _c === void 0 ? void 0 : _c.tag;
        if (dockerTags && dockerTags.length > 0) {
            items.push({
                type: "DataListItem",
                label: createText("Docker Tags", "subtitle2"),
                value: createChipGroup(dockerTags),
            });
        }
    }
    // Compose the DataList component
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    // Build a vertical card with header and content
    const cardHeader = {
        type: "CardHeader",
        title: input.name,
        description: input.description,
        // Use an archive/package icon
        startElement: {
            type: "Icon",
            id: "archive",
            size: 28,
            color: "blue",
        },
    };
    const cardContent = {
        type: "CardContent",
        childrenProps: [dataList],
    };
    const card = {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent],
    };
    return card;
}
//# sourceMappingURL=972.js.map
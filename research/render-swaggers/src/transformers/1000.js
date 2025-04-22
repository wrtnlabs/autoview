export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper to safely format a date string to local date
    const formatDate = (dateString) => {
        try {
            const d = new Date(dateString);
            if (isNaN(d.getTime()))
                return dateString;
            return d.toLocaleDateString();
        }
        catch (_a) {
            return dateString;
        }
    };
    // Capitalize the first letter of a word
    const capitalize = (s) => s.length > 0 ? s[0].toUpperCase() + s.slice(1) : s;
    // Build the CardHeader
    const header = Object.assign({ type: "CardHeader", title: input.name, description: `${capitalize(input.package_type)} package` }, (input.owner && input.owner.avatar_url
        ? {
            startElement: {
                type: "Avatar",
                src: input.owner.avatar_url,
                name: input.owner.login,
            },
        }
        : {}));
    // Build a list of key/value pairs for package details
    const items = [];
    // Package URL
    items.push({
        type: "DataListItem",
        label: [{ type: "Text", content: "Package URL" }],
        value: {
            type: "Button",
            variant: "text",
            size: "small",
            startElement: { type: "Icon", id: "external-link-alt", size: 16 },
            label: "Open",
            href: input.html_url,
        },
    });
    // Repository URL if present
    if (input.repository && input.repository.html_url) {
        items.push({
            type: "DataListItem",
            label: [{ type: "Text", content: "Repository" }],
            value: {
                type: "Button",
                variant: "text",
                size: "small",
                startElement: { type: "Icon", id: "github", size: 16 },
                label: "Open",
                href: input.repository.html_url,
            },
        });
    }
    // Visibility
    items.push({
        type: "DataListItem",
        label: [{ type: "Text", content: "Visibility" }],
        value: {
            type: "Chip",
            label: input.visibility,
            color: input.visibility === "public" ? "success" : "error",
            variant: "outlined",
        },
    });
    // Package type
    items.push({
        type: "DataListItem",
        label: [{ type: "Text", content: "Type" }],
        value: {
            type: "Chip",
            label: input.package_type,
            color: "info",
            variant: "outlined",
        },
    });
    // Version count
    items.push({
        type: "DataListItem",
        label: [{ type: "Text", content: "Versions" }],
        value: {
            type: "Chip",
            label: input.version_count.toString(),
            startElement: { type: "Icon", id: "tag", size: 16 },
            variant: "outlined",
        },
    });
    // Created at
    items.push({
        type: "DataListItem",
        label: [{ type: "Text", content: "Created" }],
        value: { type: "Text", content: formatDate(input.created_at) },
    });
    // Updated at
    items.push({
        type: "DataListItem",
        label: [{ type: "Text", content: "Updated" }],
        value: { type: "Text", content: formatDate(input.updated_at) },
    });
    // Compile the DataList component
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    // Wrap everything in a vertical card
    const card = {
        type: "VerticalCard",
        childrenProps: [
            header,
            {
                type: "CardContent",
                childrenProps: dataList,
            },
        ],
    };
    return card;
}
//# sourceMappingURL=1000.js.map
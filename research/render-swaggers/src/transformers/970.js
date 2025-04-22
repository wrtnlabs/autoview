export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper to format ISO dates into a human‐readable string.
    const formatDate = (iso) => {
        const d = new Date(iso);
        return isNaN(d.getTime())
            ? iso
            : d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
    };
    // Build the card header: show the package name, type, and an avatar if we have an owner.
    const header = {
        type: "CardHeader",
        title: input.name,
        description: `${input.package_type.toUpperCase()} package`,
        startElement: input.owner
            ? {
                type: "Avatar",
                src: input.owner.avatar_url,
                name: input.owner.login,
                variant: "primary",
                size: 40,
            }
            : {
                type: "Icon",
                id: "box", // generic package icon
                color: "gray",
                size: 32,
            },
    };
    // Build a list of properties to display in a key/value fashion.
    const items = [];
    // Version count
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "Versions" },
        value: {
            type: "Chip",
            label: String(input.version_count),
            variant: "filled",
            color: "primary",
            size: "small",
        },
    });
    // Visibility (public/private)
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "Visibility" },
        value: {
            type: "Chip",
            label: input.visibility,
            variant: "outlined",
            // Map visibility to a semantic color
            color: input.visibility === "public" ? "success" : "error",
            size: "small",
        },
    });
    // Created date
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "Created" },
        value: { type: "Text", content: formatDate(input.created_at) },
    });
    // Updated date
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "Updated" },
        value: { type: "Text", content: formatDate(input.updated_at) },
    });
    // Owner (if any)
    if (input.owner) {
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Owner" },
            value: {
                type: "Avatar",
                src: input.owner.avatar_url,
                name: input.owner.login,
                size: 32,
            },
        });
    }
    // Linked repository (if any)
    if (input.repository) {
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Repository" },
            value: {
                type: "Button",
                label: input.repository.full_name,
                variant: "text",
                size: "small",
                href: input.repository.html_url,
            },
        });
    }
    // Compose the data list component
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    // Footer with a primary action to view the package
    const footer = {
        type: "CardFooter",
        childrenProps: {
            type: "Button",
            label: "View Package",
            variant: "contained",
            color: "primary",
            size: "medium",
            href: input.html_url,
            startElement: {
                type: "Icon",
                id: "link",
                size: 16,
            },
        },
    };
    // Assemble everything into a responsive vertical card
    return {
        type: "VerticalCard",
        childrenProps: [
            header,
            { type: "CardContent", childrenProps: dataList },
            footer,
        ],
    };
}
//# sourceMappingURL=970.js.map
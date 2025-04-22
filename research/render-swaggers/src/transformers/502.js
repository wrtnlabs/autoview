export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper: format an ISO date-time string into a user-friendly locale string.
    // If parsing fails, fall back to the original input.
    function formatDateTime(value) {
        try {
            const d = new Date(value);
            if (isNaN(d.getTime()))
                throw new Error("Invalid date");
            return d.toLocaleString();
        }
        catch (_a) {
            return value;
        }
    }
    // Map registry visibility to a chip color for quick visual identification.
    const visibilityColorMap = {
        all: "info",
        private: "error",
        selected: "success",
    };
    const visibilityColor = visibilityColorMap[input.visibility] || "gray";
    // Icon representing a registry
    const registryIcon = {
        type: "Icon",
        id: "database", // Using a database icon for registry
        size: 40,
        color: "blue",
    };
    // Build the header of the card: name + type
    const header = {
        type: "CardHeader",
        title: input.name,
        description: input.registry_type === "maven_repository"
            ? "Maven Repository"
            : input.registry_type,
        startElement: registryIcon,
    };
    // DataList items for each field
    const dataItems = [
        {
            // Username field: show placeholder if null/undefined
            type: "DataListItem",
            label: { type: "Text", content: "Username", variant: "subtitle2" },
            value: {
                type: "Text",
                content: input.username != null && input.username !== ""
                    ? input.username
                    : "Not provided",
                variant: "body2",
                color: input.username ? undefined : "tertiary",
            },
        },
        {
            // Visibility field: use a colored chip for quick scanning
            type: "DataListItem",
            label: { type: "Text", content: "Visibility", variant: "subtitle2" },
            value: {
                type: "Chip",
                label: input.visibility,
                color: visibilityColor,
                size: "small",
                variant: "filled",
            },
        },
        {
            // Created at: formatted date-time
            type: "DataListItem",
            label: { type: "Text", content: "Created At", variant: "subtitle2" },
            value: {
                type: "Text",
                content: formatDateTime(input.created_at),
                variant: "body2",
            },
        },
        {
            // Updated at: formatted date-time
            type: "DataListItem",
            label: { type: "Text", content: "Updated At", variant: "subtitle2" },
            value: {
                type: "Text",
                content: formatDateTime(input.updated_at),
                variant: "body2",
            },
        },
    ];
    // Wrap the items in a DataList component
    const dataList = {
        type: "DataList",
        childrenProps: dataItems,
    };
    // Compose a vertical card with a header and content
    const card = {
        type: "VerticalCard",
        childrenProps: [
            header,
            { type: "CardContent", childrenProps: dataList },
        ],
    };
    return card;
}
//# sourceMappingURL=502.js.map
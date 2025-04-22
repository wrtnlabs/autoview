export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper to create an icon + label pair for DataListItem labels
    const makeLabel = (text, iconId) => [
        {
            type: "Icon",
            id: iconId,
            size: 16,
            color: "gray",
        },
        {
            type: "Text",
            content: text,
            variant: "body2",
        },
    ];
    // Map visibility to chip color for quick visual distinction
    const visibilityColorMap = {
        all: "green",
        private: "red",
        selected: "orange",
    };
    // Build a list of DataListItemProps, skipping optional fields when absent
    const items = [];
    // Name
    items.push({
        type: "DataListItem",
        label: makeLabel("Name", "tag"),
        value: {
            type: "Text",
            content: input.name,
            variant: "body1",
            color: "primary",
        },
    });
    // Registry Type
    items.push({
        type: "DataListItem",
        label: makeLabel("Registry Type", "cubes"),
        value: {
            type: "Chip",
            label: input.registry_type.replace(/_/, " "),
            color: "blue",
            size: "small",
            variant: "outlined",
        },
    });
    // Username (if provided)
    if (input.username) {
        items.push({
            type: "DataListItem",
            label: makeLabel("Username", "user"),
            value: {
                type: "Text",
                content: input.username,
                variant: "body1",
            },
        });
    }
    // Visibility
    items.push({
        type: "DataListItem",
        label: makeLabel("Visibility", input.visibility === "private" ? "lock" : input.visibility === "selected" ? "users" : "eye"),
        value: {
            type: "Chip",
            label: input.visibility,
            color: visibilityColorMap[input.visibility] || "gray",
            size: "small",
            variant: "filled",
        },
    });
    // Selected repository count (only when visibility is "selected")
    if (input.visibility === "selected" && Array.isArray(input.selected_repository_ids)) {
        items.push({
            type: "DataListItem",
            label: makeLabel("Selected Repos", "list"),
            value: {
                type: "Text",
                content: `${input.selected_repository_ids.length}`,
                variant: "body1",
            },
        });
    }
    // Created at
    items.push({
        type: "DataListItem",
        label: makeLabel("Created At", "calendar-alt"),
        value: {
            type: "Text",
            content: new Date(input.created_at).toLocaleString(),
            variant: "body2",
            color: "tertiary",
        },
    });
    // Updated at
    items.push({
        type: "DataListItem",
        label: makeLabel("Last Updated", "sync-alt"),
        value: {
            type: "Text",
            content: new Date(input.updated_at).toLocaleString(),
            variant: "body2",
            color: "tertiary",
        },
    });
    // Compose the DataList with all items
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    // Card header with a registry icon and title
    const header = {
        type: "CardHeader",
        title: input.name,
        description: `Type: ${input.registry_type.replace(/_/, " ")}`,
        startElement: {
            type: "Icon",
            id: "cubes",
            size: 24,
            color: "blue",
        },
    };
    // Card content wrapping the detailed list
    const content = {
        type: "CardContent",
        childrenProps: dataList,
    };
    // Return a vertical card combining header and content for a responsive layout
    return {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
}
//# sourceMappingURL=500.js.map
export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Compose the card header with role name, description, and organization avatar if available
    const header = {
        type: "CardHeader",
        title: input.name,
        description: (_a = input.description) !== null && _a !== void 0 ? _a : undefined,
        // Show organization avatar and login as the start element if organization is present
        startElement: input.organization
            ? {
                type: "Avatar",
                src: input.organization.avatar_url,
                name: input.organization.login,
                variant: "primary",
                size: 40,
            }
            : undefined,
    };
    // Helper to wrap a string into a Text component
    const makeText = (text, variant = "body2", color) => ({
        type: "Text",
        content: text,
        variant,
        color,
    });
    // Build a list of key‐value pairs for the core fields of the role
    const dataItems = [
        {
            type: "DataListItem",
            label: [makeText("ID", "subtitle2")],
            value: [makeText(input.id.toString(), "body1")],
        },
        {
            type: "DataListItem",
            label: [makeText("Base Role", "subtitle2")],
            value: [
                makeText(input.base_role != null ? input.base_role : "—", "body1"),
            ],
        },
        {
            type: "DataListItem",
            label: [makeText("Source", "subtitle2")],
            value: [makeText((_b = input.source) !== null && _b !== void 0 ? _b : "—", "body1")],
        },
        {
            type: "DataListItem",
            label: [makeText("Created At", "subtitle2")],
            // Display the raw timestamp; formatting is delegated to the consumer if needed
            value: [makeText(input.created_at, "body1")],
        },
        {
            type: "DataListItem",
            label: [makeText("Updated At", "subtitle2")],
            value: [makeText(input.updated_at, "body1")],
        },
    ];
    // Wrap the list of items in a DataList component
    const dataList = {
        type: "DataList",
        childrenProps: dataItems,
    };
    // Card content holds the DataList
    const content = {
        type: "CardContent",
        childrenProps: dataList,
    };
    // Render permissions as a compact ChipGroup; if no permissions, show a placeholder text
    const permissionChips = input.permissions.length > 0
        ? input.permissions.map((perm) => ({
            type: "Chip",
            label: perm,
            variant: "outlined",
            size: "small",
            color: "primary",
        }))
        : [
            {
                type: "Chip",
                label: "No permissions",
                variant: "outlined",
                size: "small",
                color: "gray",
            },
        ];
    const chipGroup = {
        type: "ChipGroup",
        childrenProps: permissionChips,
        // On small screens, limit the number of visible chips
        maxItems: 5,
    };
    const footer = {
        type: "CardFooter",
        childrenProps: chipGroup,
    };
    // Compose a vertical card that is responsive and stacks header, content, and footer
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=487.js.map
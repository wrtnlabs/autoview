export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Destructure input for easier access
    const { billable_owner: owner, defaults } = input;
    // Prepare the array of VerticalCard children (CardHeader, CardContent, etc.)
    const cardChildren = [];
    // If we have owner information, render it in a CardHeader with avatar
    if (owner) {
        const header = {
            type: "CardHeader",
            // The title is the GitHub login
            title: owner.login,
            // Use the optional name as description if present
            description: (_a = owner.name) !== null && _a !== void 0 ? _a : undefined,
            // Display the avatar; fallback to login initials if name missing
            startElement: {
                type: "Avatar",
                src: owner.avatar_url,
                name: (_b = owner.name) !== null && _b !== void 0 ? _b : owner.login,
                variant: "primary",
                size: 40,
            },
        };
        cardChildren.push(header);
    }
    // If we have defaults data, render it in a DataList inside CardContent
    if (defaults) {
        const items = [];
        // Location item
        if (defaults.location) {
            items.push({
                type: "DataListItem",
                label: [
                    {
                        type: "Text",
                        content: "Location",
                        variant: "subtitle2",
                        color: "secondary",
                    },
                ],
                value: {
                    type: "Chip",
                    label: defaults.location,
                    variant: "filled",
                    color: "info",
                    size: "small",
                },
            });
        }
        // Devcontainer path item: either show path or a "None" chip
        items.push({
            type: "DataListItem",
            label: [
                {
                    type: "Text",
                    content: "Devcontainer",
                    variant: "subtitle2",
                    color: "secondary",
                },
            ],
            value: defaults.devcontainer_path !== null
                ? {
                    type: "Text",
                    content: defaults.devcontainer_path,
                    variant: "body2",
                }
                : {
                    type: "Chip",
                    label: "None",
                    variant: "outlined",
                    color: "gray",
                    size: "small",
                },
        });
        // Wrap the list of items in a DataList component
        const dataList = {
            type: "DataList",
            childrenProps: items,
        };
        // Wrap the DataList in a CardContent so it fits under the VerticalCard
        const content = {
            type: "CardContent",
            childrenProps: [dataList],
        };
        cardChildren.push(content);
    }
    // If we have at least one child, render a VerticalCard
    if (cardChildren.length > 0) {
        return {
            type: "VerticalCard",
            childrenProps: cardChildren,
        };
    }
    // Fallback: no meaningful data, render a Markdown notice
    return {
        type: "Markdown",
        content: "### No codespace data available",
    };
}
//# sourceMappingURL=690.js.map
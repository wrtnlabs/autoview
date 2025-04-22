export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Extract chat tags, default to empty array if undefined
    const tags = (_a = input.chatTags) !== null && _a !== void 0 ? _a : [];
    // Mapping from legacy colorVariant to AutoView color names
    const colorMap = {
        red: "red",
        orange: "orange",
        yellow: "yellow",
        olive: "lime", // olive ≈ lime
        green: "green",
        cobalt: "blue", // cobalt ≈ blue
        purple: "violet", // purple ≈ violet
        pink: "pink",
        navy: "darkGray", // navy ≈ darkGray
    };
    // If there are no tags, return a simple markdown message
    if (tags.length === 0) {
        return {
            type: "Markdown",
            content: "_No chat tags available._",
        };
    }
    // Build each DataListItem: avatar + name, with optional description below
    const listItems = tags.map((tag) => {
        var _a;
        // Determine avatar variant by mapping legacy color to new scale
        const avatarVariant = tag.colorVariant
            ? (_a = colorMap[tag.colorVariant]) !== null && _a !== void 0 ? _a : "gray"
            : "gray";
        // Avatar for the tag
        const avatar = {
            type: "Avatar",
            name: tag.name,
            variant: avatarVariant,
            size: 32,
        };
        // Text showing the tag name
        const nameText = {
            type: "Text",
            content: tag.name,
            variant: "body1",
        };
        // If a description exists, render it as markdown in the value slot
        const valueComponent = tag.description
            ? {
                type: "Markdown",
                content: tag.description,
            }
            : undefined;
        return {
            type: "DataListItem",
            // Label is an array: [avatar, text]
            label: [avatar, nameText],
            // Value shows the description as markdown if present
            value: valueComponent,
        };
    });
    // Compose the DataList that contains all tag items
    const dataList = {
        type: "DataList",
        childrenProps: listItems,
    };
    // If there is a 'next' token, add a Load More button in a card footer
    if (input.next) {
        const loadMoreButton = {
            type: "Button",
            label: "Load More",
            variant: "contained",
            color: "primary",
        };
        // Wrap the list and button in a vertical card for better layout on mobile
        const cardContent = {
            type: "CardContent",
            childrenProps: dataList,
        };
        const cardFooter = {
            type: "CardFooter",
            childrenProps: loadMoreButton,
        };
        return {
            type: "VerticalCard",
            childrenProps: [cardContent, cardFooter],
        };
    }
    // Otherwise just return the DataList directly
    return dataList;
}
//# sourceMappingURL=177.js.map
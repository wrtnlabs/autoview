export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d, _e;
    // Helper: Map reaction content to a FontAwesome icon ID and color
    const mapReaction = (content) => {
        switch (content) {
            case "+1":
                return { id: "thumbs-up", color: "green" };
            case "-1":
                return { id: "thumbs-down", color: "red" };
            case "laugh":
                return { id: "face-laugh", color: "yellow" };
            case "confused":
                return { id: "face-confused", color: "orange" };
            case "heart":
                return { id: "heart", color: "pink" };
            case "hooray":
                return { id: "party-hat", color: "violet" };
            case "rocket":
                return { id: "rocket", color: "cyan" };
            case "eyes":
                return { id: "eyes", color: "blue" };
            default:
                return { id: "question-circle", color: "gray" };
        }
    };
    // Build a user avatar or fallback to an icon if user data is missing
    const userAvatarOrIcon = input.user && input.user.avatar_url
        ? {
            type: "Avatar",
            src: input.user.avatar_url,
            name: (_a = input.user.name) !== null && _a !== void 0 ? _a : input.user.login,
            size: 40,
        }
        : {
            type: "Icon",
            id: "user",
            color: "gray",
            size: 40,
        };
    // Build the reaction icon
    const reactionMeta = mapReaction(input.content);
    const reactionIcon = {
        type: "Icon",
        id: reactionMeta.id,
        color: reactionMeta.color,
        size: 32,
    };
    // Card header: shows user + reaction at a glance
    const cardHeader = {
        type: "CardHeader",
        title: (_c = (_b = input.user) === null || _b === void 0 ? void 0 : _b.login) !== null && _c !== void 0 ? _c : "Unknown User",
        description: (_e = (_d = input.user) === null || _d === void 0 ? void 0 : _d.name) !== null && _e !== void 0 ? _e : undefined,
        startElement: userAvatarOrIcon,
        endElement: reactionIcon,
    };
    // DataList items for the rest of the reaction fields
    const dataListItems = [
        {
            type: "DataListItem",
            label: { type: "Text", content: "Reaction ID" },
            value: { type: "Text", content: input.id.toString() },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Node ID" },
            value: { type: "Text", content: input.node_id },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Content" },
            value: {
                type: "Chip",
                label: input.content,
                variant: "filled",
                color: reactionMeta.color, // align chip color with icon color
                size: "small",
            },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Created At" },
            value: {
                type: "Text",
                content: new Date(input.created_at).toLocaleString(),
            },
        },
    ];
    // Wrap the DataList in a CardContent for layout consistency
    const cardContent = {
        type: "CardContent",
        childrenProps: {
            type: "DataList",
            childrenProps: dataListItems,
        },
    };
    // Assemble the vertical card
    const verticalCard = {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent],
    };
    return verticalCard;
}
//# sourceMappingURL=915.js.map
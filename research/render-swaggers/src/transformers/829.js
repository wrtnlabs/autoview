export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If no reactions, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "*No reactions found.*",
        };
    }
    // Map each GitHub reaction content to a FontAwesome icon id and a color
    const reactionMeta = {
        "+1": { iconId: "thumbs-up", color: "green" },
        "-1": { iconId: "thumbs-down", color: "red" },
        laugh: { iconId: "laugh", color: "orange" },
        confused: { iconId: "meh", color: "gray" },
        heart: { iconId: "heart", color: "red" },
        hooray: { iconId: "hands-clapping", color: "yellow" }, // using "hands-clapping" as a celebratory icon
        rocket: { iconId: "rocket", color: "indigo" },
        eyes: { iconId: "eye", color: "teal" },
    };
    // Transform each reaction into a DataListItem for listing
    const items = input.map((reaction) => {
        var _a, _b, _c, _d;
        const login = (_b = (_a = reaction.user) === null || _a === void 0 ? void 0 : _a.login) !== null && _b !== void 0 ? _b : "unknown";
        const avatar = (_c = reaction.user) === null || _c === void 0 ? void 0 : _c.avatar_url;
        const created = new Date(reaction.created_at).toLocaleString();
        // pick icon & color, fallback to gray icon if unknown reaction
        const meta = (_d = reactionMeta[reaction.content]) !== null && _d !== void 0 ? _d : { iconId: reaction.content, color: "gray" };
        return {
            type: "DataListItem",
            // Label shows user avatar + username
            label: [
                {
                    type: "Avatar",
                    src: avatar,
                    name: login,
                    size: 32,
                    variant: "primary",
                },
                {
                    type: "Text",
                    variant: "body1",
                    content: login,
                },
            ],
            // Value shows reaction icon + timestamp
            value: [
                {
                    type: "Icon",
                    id: meta.iconId,
                    color: meta.color,
                    size: 20,
                },
                {
                    type: "Text",
                    variant: "caption",
                    content: created,
                },
            ],
        };
    });
    // Wrap the list of reactions in a DataList component
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    // Card header summarizing the total count
    const header = {
        type: "CardHeader",
        title: "Reactions",
        description: `Total reactions: ${input.length}`,
        startElement: {
            type: "Icon",
            id: "thumbs-up",
            color: "blue",
            size: 24,
        },
    };
    // Card content containing our DataList
    const content = {
        type: "CardContent",
        childrenProps: [dataList],
    };
    // Use a vertical card for a responsive, mobile‑friendly layout
    return {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
}
//# sourceMappingURL=829.js.map
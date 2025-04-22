export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Map GitHub reaction content to FontAwesome icon names.
    const reactionIconMap = {
        "+1": "thumbs-up",
        "-1": "thumbs-down",
        laugh: "face-laugh",
        confused: "face-confused",
        heart: "heart",
        hooray: "hands-clapping",
        rocket: "rocket",
        eyes: "eyes",
    };
    // Choose a color based on the reaction sentiment.
    const reactionColorMap = {
        "+1": "green",
        "-1": "red",
        laugh: "yellow",
        confused: "orange",
        heart: "pink",
        hooray: "blue",
        rocket: "teal",
        eyes: "cyan",
    };
    // Safely extract user info or fallback to generic.
    const user = input.user;
    const userName = (_a = user === null || user === void 0 ? void 0 : user.login) !== null && _a !== void 0 ? _a : "Unknown User";
    const avatarSrc = user === null || user === void 0 ? void 0 : user.avatar_url;
    // Format the creation date for display; use locale-friendly string.
    const createdDate = (() => {
        try {
            const d = new Date(input.created_at);
            return isNaN(d.getTime()) ? input.created_at : d.toLocaleString();
        }
        catch (_a) {
            return input.created_at;
        }
    })();
    // Build the card header showing the user avatar, name, and reaction icon.
    const header = {
        type: "CardHeader",
        title: userName,
        description: `Reacted ${createdDate}`,
        startElement: {
            type: "Avatar",
            src: avatarSrc,
            name: userName,
            size: 40,
            variant: "primary",
        },
        endElement: {
            type: "Icon",
            id: reactionIconMap[input.content] || "question",
            color: reactionColorMap[input.content] || "gray",
            size: 24,
        },
    };
    // Present the node_id and raw content in a small markdown block.
    const contentMarkdown = {
        type: "Markdown",
        content: `**Node ID:** \`${input.node_id}\`  
**Reaction:** \`${input.content}\``,
    };
    const content = {
        type: "CardContent",
        childrenProps: [contentMarkdown],
    };
    // Wrap everything in a vertical card for mobile responsiveness.
    return {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
}
//# sourceMappingURL=792.js.map
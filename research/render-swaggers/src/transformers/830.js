export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d;
    // Map GitHub reaction content to FontAwesome icon identifiers
    const contentIconMap = {
        "+1": "thumbs-up",
        "-1": "thumbs-down",
        laugh: "laugh",
        confused: "confused",
        heart: "heart",
        hooray: "tada", // celebration emoji
        rocket: "rocket",
        eyes: "eyes",
    };
    // Fallback icon if content is unexpected
    const iconId = (_a = contentIconMap[input.content]) !== null && _a !== void 0 ? _a : "question";
    // Choose a color for each icon to make it visually distinct
    const iconColorMap = {
        "thumbs-up": "green",
        "thumbs-down": "red",
        laugh: "yellow",
        confused: "orange",
        heart: "pink",
        tada: "violet",
        rocket: "teal",
        eyes: "gray",
        question: "gray",
    };
    const iconColor = (_b = iconColorMap[iconId]) !== null && _b !== void 0 ? _b : "gray";
    // Safely format the creation date; if invalid, use the raw string
    const createdAt = (() => {
        const date = new Date(input.created_at);
        return isNaN(date.getTime())
            ? input.created_at
            : date.toLocaleString();
    })();
    // Build an avatar component if user data exists
    const avatarProps = input.user
        ? {
            type: "Avatar",
            src: input.user.avatar_url,
            name: input.user.login,
        }
        : undefined;
    // Create the card header with avatar, username, timestamp, and reaction icon
    const headerProps = {
        type: "CardHeader",
        title: (_d = (_c = input.user) === null || _c === void 0 ? void 0 : _c.login) !== null && _d !== void 0 ? _d : "Unknown User",
        description: createdAt,
        startElement: avatarProps,
        endElement: {
            type: "Icon",
            id: iconId,
            color: iconColor,
            size: 24,
        },
    };
    // Prepare a Markdown block summarizing the reaction details
    const markdownLines = [
        "### Reaction Details",
        `- **ID**: \`${input.id}\``,
        `- **Node ID**: \`${input.node_id}\``,
        `- **Content**: ${input.content}`,
    ];
    if (input.user) {
        markdownLines.push(`- **Profile**: [${input.user.login}](${input.user.html_url})`);
    }
    const markdownContent = markdownLines.join("\n");
    const contentProps = {
        type: "CardContent",
        // Use Markdown for rich text instead of plain strings
        childrenProps: {
            type: "Markdown",
            content: markdownContent,
        },
    };
    // Assemble a vertical card containing the header and the markdown content
    return {
        type: "VerticalCard",
        childrenProps: [headerProps, contentProps],
    };
}
//# sourceMappingURL=830.js.map
export function transform($input) {
    return visualizeData($input);
}
// Transforms a GitHub team discussion into a visual AutoView card.
// Displays author avatar, title, creation date, body as markdown,
// and a data list of comments and reaction counts.
function visualizeData(input) {
    var _a, _b, _c;
    // Extract author info (might be null)
    const author = input.author;
    // Build an avatar component for the author
    const authorAvatar = {
        type: "Avatar",
        src: (_a = author === null || author === void 0 ? void 0 : author.avatar_url) !== null && _a !== void 0 ? _a : "", // fallback to empty URI if missing
        name: (_b = author === null || author === void 0 ? void 0 : author.login) !== null && _b !== void 0 ? _b : "Unknown", // fallback name
        size: 40, // medium avatar size
        variant: "gray", // neutral color
    };
    // Format creation date as locale string
    const createdDate = new Date(input.created_at).toLocaleDateString();
    // Include privacy flag in description if discussion is private
    const descriptionText = `by ${(_c = author === null || author === void 0 ? void 0 : author.login) !== null && _c !== void 0 ? _c : "Unknown"} on ${createdDate}` +
        (input.private ? " (Private)" : "");
    // Card header with avatar, title, and description
    const cardHeader = {
        type: "CardHeader",
        startElement: authorAvatar,
        title: input.title,
        description: descriptionText,
    };
    // Main body rendered as markdown for rich text display
    const bodyMarkdown = {
        type: "Markdown",
        content: input.body,
    };
    const cardContent = {
        type: "CardContent",
        childrenProps: [bodyMarkdown],
    };
    // Build a list of stats: comments + reactions
    const items = [];
    // 1) Comments count entry
    items.push({
        type: "DataListItem",
        label: [{
                type: "Text",
                content: ["Comments"],
                variant: "subtitle2",
                color: "gray",
            }],
        value: [{
                type: "Text",
                content: [String(input.comments_count)],
                variant: "subtitle2",
                color: "gray",
            }],
    });
    // 2) Reaction rollup entries (only include non-zero reactions)
    if (input.reactions) {
        const reactions = input.reactions;
        // Map reaction keys to FontAwesome icon IDs
        const reactionMap = [
            ["+1", "thumbs-up"],
            ["-1", "thumbs-down"],
            ["laugh", "laugh"],
            ["confused", "meh"],
            ["heart", "heart"],
            ["hooray", "tada"],
            ["eyes", "eye"],
            ["rocket", "rocket"],
        ];
        reactionMap.forEach(([key, iconId]) => {
            const count = reactions[key];
            if (count > 0) {
                items.push({
                    type: "DataListItem",
                    // Use an icon to represent the reaction type
                    label: [{
                            type: "Icon",
                            id: iconId,
                            color: "gray",
                            size: 16,
                        }],
                    // Show the count as text
                    value: [{
                            type: "Text",
                            content: [String(count)],
                            variant: "body2",
                            color: "gray",
                        }],
                });
            }
        });
    }
    // Wrap stats entries in a data list component
    const statsList = {
        type: "DataList",
        childrenProps: items,
    };
    // Footer of the card containing the stats list
    const cardFooter = {
        type: "CardFooter",
        childrenProps: [statsList],
    };
    // Compose a vertical card: header, body, footer
    const card = {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent, cardFooter],
    };
    return card;
}
//# sourceMappingURL=538.js.map
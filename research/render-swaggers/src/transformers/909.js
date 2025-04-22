export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d;
    // Format creation date for display
    const createdAt = new Date(input.created_at).toLocaleString();
    // Prepare author avatar and name (handle null author)
    const author = input.author;
    const avatarProps = {
        type: "Avatar",
        src: (_a = author === null || author === void 0 ? void 0 : author.avatar_url) !== null && _a !== void 0 ? _a : "",
        name: (_c = (_b = author === null || author === void 0 ? void 0 : author.name) !== null && _b !== void 0 ? _b : author === null || author === void 0 ? void 0 : author.login) !== null && _c !== void 0 ? _c : "Unknown",
        size: 40,
        variant: "blue",
    };
    // Build header of the card with avatar, title, and subtitle
    const header = {
        type: "CardHeader",
        title: input.title,
        description: `By ${(_d = author === null || author === void 0 ? void 0 : author.login) !== null && _d !== void 0 ? _d : "Unknown"} on ${createdAt}`,
        startElement: avatarProps,
    };
    // Use the Markdown component to render the discussion body
    const markdownBody = {
        type: "Markdown",
        content: input.body,
    };
    // If reactions are provided, transform them into a DataList
    const reactionListItems = [];
    if (input.reactions) {
        // Only keep actual reaction counts (skip url and total_count)
        const reactionEntries = [
            ["+1", input.reactions["+1"]],
            ["-1", input.reactions["-1"]],
            ["laugh", input.reactions.laugh],
            ["confused", input.reactions.confused],
            ["heart", input.reactions.heart],
            ["hooray", input.reactions.hooray],
            ["eyes", input.reactions.eyes],
            ["rocket", input.reactions.rocket],
        ];
        for (const [key, count] of reactionEntries) {
            if (count > 0) {
                reactionListItems.push({
                    type: "DataListItem",
                    label: {
                        type: "Text",
                        content: key,
                    },
                    value: {
                        type: "Text",
                        content: count.toString(),
                    },
                });
            }
        }
    }
    // If we have any reactions, wrap them in a DataList component
    let reactionsDataList = null;
    if (reactionListItems.length > 0) {
        reactionsDataList = {
            type: "DataList",
            childrenProps: reactionListItems,
        };
    }
    // Compose card content: first the body, then optionally the reactions
    const contentChildren = [markdownBody];
    if (reactionsDataList) {
        contentChildren.push(reactionsDataList);
    }
    const content = {
        type: "CardContent",
        childrenProps: contentChildren,
    };
    // Build a footer with a comment button indicating the number of comments
    const commentButton = {
        type: "Button",
        variant: "text",
        color: "primary",
        startElement: {
            type: "Icon",
            id: "comment",
            size: 20,
            color: "gray",
        },
        // Show "No comments" if zero
        label: input.comments_count > 0
            ? `${input.comments_count} comments`
            : "No comments",
    };
    const footer = {
        type: "CardFooter",
        childrenProps: [commentButton],
    };
    // Finally, compose a vertical card with header, content, and footer
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=909.js.map
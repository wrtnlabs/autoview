export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If the input is an array, render a simple data list.
    if (Array.isArray(input)) {
        const childrenProps = input.map((item) => {
            // Extract a title or fallback to string representation
            const titleText = item && typeof item === 'object' && 'title' in item
                ? String(item.title)
                : String(item);
            // Optionally extract a summary/value
            const summaryText = item && typeof item === 'object' && 'summary' in item
                ? String(item.summary)
                : undefined;
            const listItem = Object.assign({ type: "DataListItem", label: {
                    type: "Text",
                    content: titleText
                } }, (summaryText !== undefined
                ? { value: { type: "Text", content: summaryText } }
                : {}));
            return listItem;
        });
        return {
            type: "DataList",
            childrenProps,
        };
    }
    // If the input is an object, try to render it as an "article"-style card
    if (input && typeof input === "object") {
        const obj = input;
        // 1. Build the card header
        const header = {
            type: "CardHeader",
            title: obj.title ? String(obj.title) : undefined,
            description: obj.subtitle ? String(obj.subtitle) : undefined,
            // Show an avatar if provided, otherwise fallback to a generic file icon
            startElement: obj.authorAvatar
                ? {
                    type: "Avatar",
                    src: String(obj.authorAvatar),
                    name: obj.authorName ? String(obj.authorName) : undefined,
                }
                : {
                    type: "Icon",
                    id: "file-alt",
                    color: "gray",
                    size: 24,
                },
        };
        // 2. Optionally include a media image
        const media = obj.image
            ? {
                type: "CardMedia",
                src: String(obj.image),
            }
            : undefined;
        // 3. Build the card content with markdown or plain text
        const contentChildren = [];
        if (obj.contentMarkdown) {
            contentChildren.push({
                type: "Markdown",
                content: String(obj.contentMarkdown),
            });
        }
        else if (typeof obj.content === "string") {
            contentChildren.push({
                type: "Text",
                content: String(obj.content),
            });
        }
        const content = {
            type: "CardContent",
            childrenProps: contentChildren,
        };
        // 4. Build the footer badges/chips for meta data (tags, likes, comments)
        const footerItems = [];
        // Tags as chips
        if (Array.isArray(obj.tags) && obj.tags.length > 0) {
            const chips = obj.tags.map((tag) => ({
                type: "Chip",
                label: String(tag),
            }));
            footerItems.push({
                type: "ChipGroup",
                childrenProps: chips,
            });
        }
        // Comments count badge
        if (typeof obj.commentsCount === "number") {
            footerItems.push({
                type: "Badge",
                count: obj.commentsCount,
                childrenProps: {
                    type: "Icon",
                    id: "comment",
                    color: "blue",
                    size: 16,
                },
            });
        }
        // Likes count badge
        if (typeof obj.likes === "number") {
            footerItems.push({
                type: "Badge",
                count: obj.likes,
                childrenProps: {
                    type: "Icon",
                    id: "thumbs-up",
                    color: "green",
                    size: 16,
                },
            });
        }
        const footer = {
            type: "CardFooter",
            childrenProps: footerItems,
        };
        // Assemble a vertical card with header, optional media, content, and footer
        const childrenProps = [header];
        if (media)
            childrenProps.push(media);
        childrenProps.push(content);
        if (footerItems.length)
            childrenProps.push(footer);
        return {
            type: "VerticalCard",
            childrenProps,
        };
    }
    // Fallback: serialize the input as JSON in a markdown code block
    return {
        type: "Markdown",
        content: "json\n" + JSON.stringify(input, null, 2) + "\n```",
    };
}
//# sourceMappingURL=291.js.map
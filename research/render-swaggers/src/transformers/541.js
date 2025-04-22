export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Safely extract author info, falling back to "Unknown" if null
    const author = (_a = input.author) !== null && _a !== void 0 ? _a : {
        login: "Unknown",
        avatar_url: "",
        name: null,
    };
    // Format timestamp for display (fallback to raw string)
    const createdAt = input.created_at;
    const formattedDate = new Date(createdAt).toLocaleString();
    // Build the CardHeader: avatar + author name + comment number + timestamp
    const header = {
        type: "CardHeader",
        // Display author's name if available, otherwise fallback to login
        title: (_b = author.name) !== null && _b !== void 0 ? _b : author.login,
        description: `Comment #${input.number}`,
        // Avatar on the left
        startElement: {
            type: "Avatar",
            src: author.avatar_url,
            name: author.login,
            size: 40,
        },
        // Timestamp on the right
        endElement: {
            type: "Text",
            variant: "caption",
            color: "gray",
            content: formattedDate,
        },
    };
    // Build the CardContent: render the body as markdown
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "Markdown",
            content: input.body,
        },
    };
    // Prepare reaction chips if any reactions are present
    const reactions = input.reactions;
    let footerChildren;
    if (reactions && reactions.total_count > 0) {
        // Map reaction keys to FontAwesome icon IDs
        const iconMap = {
            "+1": "thumbs-up",
            "-1": "thumbs-down",
            laugh: "laugh",
            confused: "confused",
            heart: "heart",
            hooray: "hooray",
            eyes: "eye",
            rocket: "rocket",
        };
        // Build an array of chips for each reaction with a positive count
        const chips = Object.keys(iconMap)
            .filter((key) => reactions[key] > 0)
            .map((key) => ({
            type: "Chip",
            label: `${key} ${reactions[key]}`,
            variant: "outlined",
            size: "small",
            // Use the corresponding icon for the reaction
            startElement: {
                type: "Icon",
                id: iconMap[key],
                size: 16,
                color: "gray",
            },
        }));
        footerChildren = {
            type: "ChipGroup",
            childrenProps: chips,
            maxItems: 8,
        };
    }
    else {
        // No reactions: display a placeholder text
        footerChildren = {
            type: "Text",
            variant: "caption",
            color: "gray",
            content: "No reactions",
        };
    }
    // Build the CardFooter
    const footer = {
        type: "CardFooter",
        childrenProps: footerChildren,
    };
    // Assemble the vertical card containing header, content, and footer
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=541.js.map
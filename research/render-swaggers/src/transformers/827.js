export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d;
    // Helper: map GitHub reaction keys to FontAwesome icon IDs
    const reactionIconMap = {
        "+1": "thumbs-up",
        "-1": "thumbs-down",
        laugh: "laugh",
        confused: "confused",
        heart: "heart",
        hooray: "tada",
        eyes: "eye",
        rocket: "rocket",
    };
    // Build chips for each non-zero reaction
    const reactionChips = [];
    if (input.reactions) {
        for (const key of Object.keys(reactionIconMap)) {
            // @ts-ignore -- reactions has numeric values
            const count = (_a = input.reactions[key]) !== null && _a !== void 0 ? _a : 0;
            if (count > 0) {
                reactionChips.push({
                    type: "Chip",
                    label: String(count),
                    variant: "outlined",
                    size: "small",
                    startElement: {
                        type: "Icon",
                        id: reactionIconMap[key],
                        size: 16,
                    },
                });
            }
        }
    }
    // Compose a ChipGroup only if there's at least one reaction
    const footerComponent = reactionChips.length > 0
        ? {
            type: "CardFooter",
            // Wrap multiple Chips in a ChipGroup for a horizontal layout
            childrenProps: {
                type: "ChipGroup",
                childrenProps: reactionChips,
            },
        }
        : undefined;
    // Format creation timestamp and optional reply info
    const createdAt = new Date(input.created_at);
    let description = createdAt.toLocaleString();
    if (input.in_reply_to_id != null) {
        description += ` • reply to #${input.in_reply_to_id}`;
    }
    // Determine a usable line number
    const lineNumber = (_d = (_c = (_b = input.line) !== null && _b !== void 0 ? _b : input.position) !== null && _c !== void 0 ? _c : input.original_line) !== null && _d !== void 0 ? _d : null;
    // Build file-location chip
    const locationLabel = lineNumber != null
        ? `${input.path}:${lineNumber}`
        : input.path;
    const locationChip = {
        type: "Chip",
        label: locationLabel,
        variant: "outlined",
        size: "small",
        startElement: {
            type: "Icon",
            id: "code",
            size: 16,
        },
    };
    // Card header with avatar, user name, timestamp, and file location
    const headerComponent = {
        type: "CardHeader",
        title: input.user.login,
        description,
        startElement: {
            type: "Avatar",
            src: input.user.avatar_url,
            name: input.user.login,
            size: 32,
        },
        endElement: locationChip,
    };
    // Content: render the comment body as Markdown for richer formatting
    const contentComponent = {
        type: "CardContent",
        childrenProps: {
            type: "Markdown",
            content: input.body,
        },
    };
    // Assemble a vertical card with header, content, and optional footer
    const card = {
        type: "VerticalCard",
        childrenProps: [
            headerComponent,
            contentComponent,
            // Only include the footer if we have reactions
            ...(footerComponent ? [footerComponent] : []),
        ],
    };
    return card;
}
//# sourceMappingURL=827.js.map
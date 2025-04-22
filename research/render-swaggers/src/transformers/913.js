export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    // Helper: map reaction keys to FontAwesome icon IDs
    const reactionIconMap = {
        "+1": "thumbs-up",
        "-1": "thumbs-down",
        laugh: "laugh",
        confused: "question-circle", // approximate
        heart: "heart",
        hooray: "tada",
        eyes: "eye",
        rocket: "rocket",
    };
    // Build author avatar; handle null author gracefully
    const avatarProps = {
        type: "Avatar",
        src: (_a = input.author) === null || _a === void 0 ? void 0 : _a.avatar_url,
        name: (_e = (_c = (_b = input.author) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : (_d = input.author) === null || _d === void 0 ? void 0 : _d.login) !== null && _e !== void 0 ? _e : "Unknown",
        variant: "gray",
        size: 32,
    };
    // Format creation timestamp for display
    const createdAt = new Date(input.created_at).toLocaleString();
    // Card header with avatar, author login, and timestamp
    const header = {
        type: "CardHeader",
        title: (_g = (_f = input.author) === null || _f === void 0 ? void 0 : _f.login) !== null && _g !== void 0 ? _g : "Unknown",
        description: createdAt,
        startElement: avatarProps,
    };
    // Main content: render the comment body as markdown
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "Markdown",
            content: input.body,
        },
    };
    // Build reaction chips if any reaction has a positive count
    const reactionChips = [];
    if (input.reactions) {
        for (const key of Object.keys(input.reactions)) {
            const count = input.reactions[key];
            // Skip URL and total_count fields
            if (key === "url" || key === "total_count")
                continue;
            if (count > 0) {
                const iconId = (_h = reactionIconMap[key]) !== null && _h !== void 0 ? _h : "question-circle";
                reactionChips.push({
                    type: "Chip",
                    label: String(count),
                    variant: "outlined",
                    color: "gray",
                    size: "small",
                    startElement: {
                        type: "Icon",
                        id: iconId,
                        size: 16,
                        color: "gray",
                    },
                });
            }
        }
    }
    // Optional "View on GitHub" button if HTML URL is present
    const viewButton = input.html_url
        ? {
            type: "Button",
            variant: "outlined",
            color: "primary",
            size: "small",
            label: "View on GitHub",
            startElement: {
                type: "Icon",
                id: "github",
                size: 16,
            },
            href: input.html_url,
        }
        : null;
    // Assemble footer: include reaction chip group and view button if any
    const footerChildren = [];
    if (reactionChips.length > 0) {
        footerChildren.push({
            type: "ChipGroup",
            childrenProps: reactionChips,
            maxItems: reactionChips.length, // show all
        });
    }
    if (viewButton) {
        footerChildren.push(viewButton);
    }
    const footer = footerChildren.length > 0
        ? {
            type: "CardFooter",
            childrenProps: footerChildren,
        }
        : null;
    // Final vertical card composition
    const cardChildren = [
        header,
        content,
    ];
    if (footer) {
        cardChildren.push(footer);
    }
    return {
        type: "VerticalCard",
        childrenProps: cardChildren,
    };
}
//# sourceMappingURL=913.js.map
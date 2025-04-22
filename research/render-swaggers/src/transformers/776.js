export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Prepare the card header, including the user's avatar and basic metadata
    const user = input.user;
    // Fallbacks for missing user
    const avatarProps = {
        type: "Avatar",
        src: user === null || user === void 0 ? void 0 : user.avatar_url,
        name: (_a = user === null || user === void 0 ? void 0 : user.login) !== null && _a !== void 0 ? _a : "Unknown",
        variant: "gray",
        size: 40,
    };
    const headerProps = {
        type: "CardHeader",
        startElement: avatarProps,
        title: (_b = user === null || user === void 0 ? void 0 : user.login) !== null && _b !== void 0 ? _b : "Unknown User",
        // Display created date in local format; description uses created_at
        description: (() => {
            try {
                return new Date(input.created_at).toLocaleString();
            }
            catch (_a) {
                return input.created_at;
            }
        })(),
    };
    // Prepare the main content: use Markdown if a body exists; otherwise fallback to text
    const contentChildren = input.body
        ? {
            type: "Markdown",
            content: input.body,
        }
        : {
            type: "Text",
            content: "No comment body",
        };
    const contentProps = {
        type: "CardContent",
        childrenProps: contentChildren,
    };
    // Prepare the footer: display a badge with total reactions
    let footerProps;
    if (input.reactions) {
        // Use a single badge to show total reactions; you may expand this to per-reaction badges
        const total = input.reactions.total_count;
        const badgeProps = {
            type: "Badge",
            count: total,
            showZero: false,
            // Use a smiley icon to represent reactions
            childrenProps: {
                type: "Icon",
                id: "smile",
                color: total > 0 ? "yellow" : "gray",
                size: 16,
            },
        };
        footerProps = {
            type: "CardFooter",
            childrenProps: badgeProps,
        };
    }
    // Assemble the vertical card
    const children = [headerProps, contentProps];
    if (footerProps) {
        children.push(footerProps);
    }
    return {
        type: "VerticalCard",
        childrenProps: children,
    };
}
//# sourceMappingURL=776.js.map
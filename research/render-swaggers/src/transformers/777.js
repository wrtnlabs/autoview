export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // 1. Build the avatar or fallback icon for the comment author
    const authorElement = input.user && input.user.avatar_url
        ? {
            type: "Avatar",
            src: input.user.avatar_url,
            name: input.user.login,
            variant: "primary",
            size: 40,
        }
        : {
            type: "Icon",
            id: "user",
            color: "gray",
            size: 40,
        };
    // 2. Build a chip for the author's association if available
    const associationChip = input.author_association
        ? {
            type: "Chip",
            label: input.author_association,
            variant: "outlined",
            size: "small",
            color: "primary",
        }
        : undefined;
    // 3. Format the creation date for display
    const createdAtStr = (() => {
        try {
            return new Date(input.created_at).toLocaleString();
        }
        catch (_a) {
            return input.created_at; // fallback to raw string
        }
    })();
    // 4. Build reaction chips if reactions are provided
    const reactionChips = [];
    if (input.reactions) {
        // Map each known reaction to a FontAwesome icon and a color
        const mapping = [
            ["+1", "thumbs-up", "green"],
            ["-1", "thumbs-down", "red"],
            ["laugh", "laugh", "primary"],
            ["confused", "confused", "primary"],
            ["heart", "heart", "primary"],
            ["hooray", "tada", "primary"], // use "tada" for hooray
            ["eyes", "eye", "primary"], // singular "eye"
            ["rocket", "rocket", "primary"],
        ];
        for (const [key, iconId, color] of mapping) {
            const count = input.reactions[key];
            if (typeof count === "number" && count > 0) {
                reactionChips.push({
                    type: "Chip",
                    label: String(count),
                    size: "small",
                    variant: "outlined",
                    color: color,
                    startElement: {
                        type: "Icon",
                        id: iconId,
                        size: 16,
                        color: color,
                    },
                });
            }
        }
    }
    // 5. Build a Button linking to the GitHub comment page
    const viewButton = {
        type: "Button",
        label: "View on GitHub",
        variant: "text",
        color: "primary",
        size: "small",
        startElement: {
            type: "Icon",
            id: "github",
            size: 16,
            color: "gray",
        },
        href: input.html_url,
    };
    // 6. Assemble children for the CardFooter
    const footerChildren = [];
    if (reactionChips.length > 0) {
        footerChildren.push({
            type: "ChipGroup",
            childrenProps: reactionChips,
            maxItems: reactionChips.length,
        });
    }
    footerChildren.push(viewButton);
    // 7. Build the main Markdown or fallback Text for the comment body
    const bodyContent = {
        type: "Markdown",
        content: input.body || input.body_text || "*No content*",
    };
    // 8. Compose the VerticalCard with header, content, and footer
    const card = {
        type: "VerticalCard",
        childrenProps: [
            Object.assign({ type: "CardHeader", title: ((_a = input.user) === null || _a === void 0 ? void 0 : _a.login) || "Unknown", description: createdAtStr, startElement: authorElement }, (associationChip ? { endElement: associationChip } : {})),
            {
                type: "CardContent",
                childrenProps: bodyContent,
            },
            {
                type: "CardFooter",
                childrenProps: footerChildren.length === 1 ? footerChildren[0] : footerChildren,
            },
        ],
    };
    return card;
}
//# sourceMappingURL=777.js.map
export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c;
    // Helper: format the creation date for display
    const createdDate = new Date(input.created_at).toLocaleString();
    // Determine user avatar or fallback icon
    const avatarOrIcon = input.user
        ? {
            type: "Avatar",
            src: input.user.avatar_url,
            name: input.user.login,
            size: 40,
            variant: "blue",
        }
        : {
            type: "Icon",
            id: "user",
            size: 24,
            color: "gray",
        };
    // Chip to show author's association (e.g., OWNER, CONTRIBUTOR, etc.)
    const associationChip = {
        type: "Chip",
        label: input.author_association,
        variant: "outlined",
        size: "small",
        color: "info",
    };
    // Build reaction chips if reactions are provided
    let reactionGroup;
    if (input.reactions) {
        // Map GitHub reaction keys to FontAwesome icon names
        const iconMap = {
            "+1": "thumbs-up",
            "-1": "thumbs-down",
            laugh: "laugh",
            confused: "confused",
            heart: "heart",
            hooray: "hands-clapping",
            eyes: "eye",
            rocket: "rocket",
        };
        const reactionChips = [];
        for (const key of Object.keys(iconMap)) {
            const count = input.reactions[key];
            if (count > 0) {
                reactionChips.push({
                    type: "Chip",
                    label: String(count),
                    variant: "outlined",
                    size: "small",
                    color: "gray",
                    startElement: {
                        type: "Icon",
                        id: iconMap[key],
                        size: 16,
                        color: "gray",
                    },
                });
            }
        }
        if (reactionChips.length > 0) {
            reactionGroup = {
                type: "ChipGroup",
                childrenProps: reactionChips,
            };
        }
    }
    // Button to view the comment on GitHub
    const viewOnGitHubBtn = {
        type: "Button",
        label: "View on GitHub",
        href: input.html_url,
        variant: "text",
        color: "primary",
        size: "small",
    };
    // Markdown content including file path/line context and the comment body
    const filePath = (_a = input.path) !== null && _a !== void 0 ? _a : "N/A";
    const fileLocation = input.line !== null && input.line !== undefined
        ? `:${input.line}`
        : "";
    const markdownContent = `**File:** \`${filePath}${fileLocation}\`

${input.body}`;
    // Compose the card header, content, and footer
    const header = {
        type: "CardHeader",
        startElement: avatarOrIcon,
        title: (_c = (_b = input.user) === null || _b === void 0 ? void 0 : _b.login) !== null && _c !== void 0 ? _c : "Unknown user",
        description: `Created at ${createdDate}`,
        endElement: associationChip,
    };
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "Markdown",
            content: markdownContent,
        },
    };
    // Collect footer children: reactions (if any) and the view button
    const footerChildren = [];
    if (reactionGroup)
        footerChildren.push(reactionGroup);
    footerChildren.push(viewOnGitHubBtn);
    const footer = {
        type: "CardFooter",
        childrenProps: footerChildren,
    };
    // Return a vertical card combining header, content, and footer
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
}
//# sourceMappingURL=699.js.map
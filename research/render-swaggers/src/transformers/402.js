export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    /**
     * Mask a token string for display: show first 4 and last 4 chars, hide the rest.
     * If the token is shorter than 8 chars, display it as-is.
     */
    function maskToken(token) {
        if (token.length <= 8)
            return token;
        return `${token.slice(0, 4)}…${token.slice(token.length - 4)}`;
    }
    // Prepare display values
    const masked = maskToken(input.token);
    let expiresLabel;
    try {
        const date = new Date(input.expires_at);
        expiresLabel = isNaN(date.getTime())
            ? input.expires_at
            : date.toLocaleString();
    }
    catch (_c) {
        expiresLabel = input.expires_at;
    }
    const selection = (_a = input.repository_selection) !== null && _a !== void 0 ? _a : "all";
    const repos = (_b = input.repositories) !== null && _b !== void 0 ? _b : [];
    // Build repository owner avatars if any
    const avatarItems = repos.map(repo => ({
        type: "Avatar",
        src: repo.owner.avatar_url,
        name: repo.owner.login,
        size: 24
    }));
    // Compose the CardContent children dynamically
    const contentChildren = [];
    // Show masked token and selection in markdown for readability
    contentChildren.push({
        type: "Markdown",
        content: `
- **Token:** \`${masked}\`
- **Expires At:** ${expiresLabel}
- **Repository Selection:** *${selection}*
        `.trim()
    });
    // Show number of repositories as a Chip
    contentChildren.push({
        type: "Chip",
        label: `${repos.length} Repositories`,
        variant: "outlined",
        color: repos.length > 0 ? "primary" : "gray",
        size: "small"
    });
    // If there are repositories, display their owners as an avatar group
    if (avatarItems.length > 0) {
        contentChildren.push({
            type: "AvatarGroup",
            childrenProps: avatarItems,
            maxItems: 5,
            totalItems: repos.length
        });
    }
    else {
        // Fallback text when no repositories are present
        contentChildren.push({
            type: "Text",
            variant: "body2",
            content: "No repositories available",
            color: "tertiary"
        });
    }
    // Build the vertical card with header and content
    const card = {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: "Authentication Token",
                description: `Expires: ${expiresLabel}`,
                startElement: {
                    type: "Icon",
                    id: "clock",
                    color: "gray",
                    size: 20
                }
            },
            {
                type: "CardContent",
                childrenProps: contentChildren
            }
        ]
    };
    return card;
}
//# sourceMappingURL=402.js.map
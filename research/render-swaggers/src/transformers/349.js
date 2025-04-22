export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    /**
     * Safely extract user information, falling back to placeholders if absent.
     */
    const user = input.user;
    const userName = (_a = user === null || user === void 0 ? void 0 : user.login) !== null && _a !== void 0 ? _a : "Unknown User";
    const avatarSrc = (_b = user === null || user === void 0 ? void 0 : user.avatar_url) !== null && _b !== void 0 ? _b : "";
    // Format the creation timestamp to a human-readable string.
    const createdAt = new Date(input.created_at).toLocaleString();
    // Avatar for the comment's author.
    const avatarProps = {
        type: "Avatar",
        src: avatarSrc,
        name: userName,
        size: 40,
        variant: "primary",
    };
    // Header section: author avatar, name, and creation date.
    const header = {
        type: "CardHeader",
        startElement: avatarProps,
        title: userName,
        description: `Commented on ${createdAt}`,
    };
    // Main content: render the comment body as Markdown.
    const markdownProps = {
        type: "Markdown",
        content: input.body || "_No content provided_",
    };
    const content = {
        type: "CardContent",
        // Single markdown component is acceptable for childrenProps.
        childrenProps: markdownProps,
    };
    // Visual indicator of the author's association with the repository.
    const associationChip = {
        type: "Chip",
        label: input.author_association,
        variant: "outlined",
        color: "secondary",
        size: "small",
    };
    // Icon for the "View Comment" button.
    const arrowIcon = {
        type: "Icon",
        id: "arrow-right",
        size: 16,
        color: "blue",
    };
    // Footer with association chip and link button to the full comment.
    const viewButton = {
        type: "Button",
        label: "View Comment",
        href: input.url,
        variant: "text",
        color: "primary",
        size: "small",
        startElement: arrowIcon,
    };
    const footer = {
        type: "CardFooter",
        // Display the chip and button side by side.
        childrenProps: [associationChip, viewButton],
    };
    // Assemble the vertical card with header, content, and footer.
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=349.js.map
export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d;
    // Extract user info, with graceful fallback if user is null
    const user = input.user;
    const avatar = {
        type: "Avatar",
        // If user is null or avatar_url is missing, the UI component will hide the image
        src: (_a = user === null || user === void 0 ? void 0 : user.avatar_url) !== null && _a !== void 0 ? _a : undefined,
        name: (_b = user === null || user === void 0 ? void 0 : user.login) !== null && _b !== void 0 ? _b : "Unknown",
    };
    // Map review state to chip color for visual emphasis
    const stateColorMap = {
        APPROVED: "success",
        CHANGES_REQUESTED: "error",
        COMMENTED: "info",
    };
    const stateChip = {
        type: "Chip",
        label: input.state,
        // Default to gray if we don't recognize the state
        color: (_c = stateColorMap[input.state]) !== null && _c !== void 0 ? _c : "gray",
        variant: "filled",
    };
    // Format submission date; if unavailable, show placeholder
    const submittedAt = input.submitted_at
        ? new Date(input.submitted_at).toLocaleString()
        : "Date unavailable";
    // Card header showing avatar, user, date, and state of the review
    const header = {
        type: "CardHeader",
        title: (_d = user === null || user === void 0 ? void 0 : user.login) !== null && _d !== void 0 ? _d : "Unknown User",
        description: submittedAt,
        startElement: avatar,
        endElement: stateChip,
    };
    // Use Markdown component for the review body; fallback text if empty
    const bodyContent = input.body && input.body.trim() !== ""
        ? input.body
        : "_No review comments provided_";
    const markdown = {
        type: "Markdown",
        content: bodyContent,
    };
    const content = {
        type: "CardContent",
        // childrenProps can accept a single PresentationComponentProps (Markdown)
        childrenProps: markdown,
    };
    // Footer with a button linking to the GitHub review page
    const reviewButton = {
        type: "Button",
        variant: "outlined",
        color: "primary",
        size: "small",
        label: "View on GitHub",
        startElement: {
            type: "Icon",
            id: "github",
            color: "gray",
            size: 20,
        },
        href: input.html_url,
    };
    const footer = {
        type: "CardFooter",
        childrenProps: reviewButton,
    };
    // Compose a vertical card to display the full review data
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=842.js.map
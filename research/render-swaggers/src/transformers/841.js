export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Prepare the 'startElement' for the card header: user's avatar if available, otherwise a generic icon
    const author = input.user;
    const startElement = author
        ? {
            type: "Avatar",
            src: author.avatar_url,
            name: author.login,
            // choice of variant can be extended, default to primary
            variant: "primary",
        }
        : {
            type: "Icon",
            id: "user",
            color: "gray",
            size: 24,
        };
    // Map GitHub review state to a chip color
    const stateColorMap = {
        APPROVED: "success",
        COMMENTED: "info",
        "CHANGES_REQUESTED": "error",
    };
    const chipColor = stateColorMap[input.state.toUpperCase()] || "primary";
    // Format submission date for display
    const submittedAt = input.submitted_at
        ? new Date(input.submitted_at).toLocaleString()
        : "Unknown date";
    // CardHeader: shows who reviewed, when, and the review state
    const header = {
        type: "CardHeader",
        title: (_a = author === null || author === void 0 ? void 0 : author.login) !== null && _a !== void 0 ? _a : "Unknown Reviewer",
        description: `${input.author_association.replace(/_/g, " ")} · ${submittedAt}`,
        startElement,
        endElement: {
            type: "Chip",
            label: input.state,
            color: chipColor,
            variant: "outlined",
            size: "small",
        },
    };
    // CardContent: render the review body as Markdown for richer formatting
    const bodyContent = ((_b = input.body) === null || _b === void 0 ? void 0 : _b.trim()) || "No review comments provided.";
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "Markdown",
            content: bodyContent,
        },
    };
    // CardFooter: action buttons linking to the GitHub review and the pull request
    const footer = {
        type: "CardFooter",
        childrenProps: [
            {
                type: "Button",
                label: "View Review",
                href: input.html_url,
                color: "primary",
                variant: "text",
                size: "small",
            },
            {
                type: "Button",
                label: "View Pull Request",
                href: input.pull_request_url,
                color: "secondary",
                variant: "text",
                size: "small",
            },
        ],
    };
    // Assemble the final VerticalCard with header, content, and footer
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=841.js.map
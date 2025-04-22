export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Destructure input fields
    const { token, expires_at, repository_selection, repositories } = input;
    // Format expiration date for display
    const expirationDate = new Date(expires_at).toLocaleString();
    // Build a list of DataListItemProps for each repository
    const repoItems = (repositories !== null && repositories !== void 0 ? repositories : []).map((repo) => {
        // Avatar for repository owner
        const ownerAvatar = {
            type: "Avatar",
            src: repo.owner.avatar_url,
            name: repo.owner.login,
            size: 24,
            variant: "info",
        };
        // Text component to show the repository full name
        const repoNameText = {
            type: "Text",
            content: repo.full_name,
            variant: "body1",
        };
        // Button to navigate to the repository's GitHub page
        const viewButton = {
            type: "Button",
            label: "View",
            href: repo.html_url,
            variant: "text",
            size: "small",
            color: "primary",
        };
        return {
            type: "DataListItem",
            // Combine avatar and name in the label slot
            label: [ownerAvatar, repoNameText],
            // Place the "View" button in the value slot
            value: viewButton,
        };
    });
    // Badge to display the total number of repositories
    const repoCountBadge = {
        type: "Badge",
        count: (_a = repositories === null || repositories === void 0 ? void 0 : repositories.length) !== null && _a !== void 0 ? _a : 0,
        maxCount: 999,
        showZero: true,
        color: "primary",
        childrenProps: {
            type: "Icon",
            id: "code-branch",
            size: 20,
            color: "blue",
        },
    };
    // Chip to indicate whether all repositories or a selection is in use
    const selectionChip = {
        type: "Chip",
        label: repository_selection === "all"
            ? "All Repositories"
            : "Selected Repositories",
        variant: "filled",
        color: repository_selection === "all" ? "success" : "info",
        size: "medium",
    };
    // Compose the final VerticalCard
    return {
        type: "VerticalCard",
        childrenProps: [
            // Header with icon, title, and expiration info
            {
                type: "CardHeader",
                title: "Authentication Token",
                description: `Expires at ${expirationDate}`,
                startElement: {
                    type: "Icon",
                    id: "key",
                    size: 24,
                    color: "teal",
                },
            },
            // Content section with token markdown and repository list
            {
                type: "CardContent",
                childrenProps: [
                    // Display the token in a markdown block
                    {
                        type: "Markdown",
                        content: `#### Token\n\`${token}\``,
                    },
                    // If there are repositories, render them; otherwise show a placeholder item
                    {
                        type: "DataList",
                        childrenProps: repoItems.length > 0
                            ? repoItems
                            : [
                                {
                                    type: "DataListItem",
                                    label: {
                                        type: "Text",
                                        content: "No repositories available",
                                        variant: "body2",
                                    },
                                },
                            ],
                    },
                ],
            },
            // Footer with selection chip and total count badge
            {
                type: "CardFooter",
                childrenProps: [selectionChip, repoCountBadge],
            },
        ],
    };
}
//# sourceMappingURL=590.js.map
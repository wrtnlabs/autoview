export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no pull requests, show a simple markdown message.
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No pull requests found.\n\nThere are currently no pull requests to display.",
        };
    }
    // Helper: create an Avatar or fallback Icon for a user.
    function createUserAvatar(user) {
        if (user && user.avatar_url) {
            return {
                type: "Avatar",
                src: user.avatar_url,
                name: user.login,
                size: 40,
            };
        }
        // Fallback icon when user data is absent.
        return {
            type: "Icon",
            id: "user",
            color: "gray",
            size: 40,
        };
    }
    // Helper: create a Chip to reflect PR state or draft status.
    function createStatusChips(pr) {
        const chips = [];
        // Draft chip
        if (pr.draft) {
            chips.push({
                type: "Chip",
                label: "Draft",
                color: "gray",
                variant: "outlined",
                size: "small",
            });
        }
        // State chip: open / closed / merged
        if (pr.merged_at) {
            chips.push({
                type: "Chip",
                label: "Merged",
                color: "success",
                variant: "filled",
                size: "small",
            });
        }
        else if (pr.state === "open") {
            chips.push({
                type: "Chip",
                label: "Open",
                color: "success",
                variant: "filled",
                size: "small",
            });
        }
        else {
            // Closed but not merged
            chips.push({
                type: "Chip",
                label: "Closed",
                color: "error",
                variant: "filled",
                size: "small",
            });
        }
        return chips;
    }
    // Compose each pull request into a ListItem.
    const listItems = input.map((pr) => {
        var _a;
        // Format creation date for display
        const createdDate = new Date(pr.created_at).toLocaleDateString();
        return {
            type: "ListItem",
            title: pr.title,
            description: `#${pr.number} opened by @${((_a = pr.user) === null || _a === void 0 ? void 0 : _a.login) ||
                "unknown"} on ${createdDate}`,
            // Link to the pull request HTML page
            href: pr.html_url,
            // Show avatar or fallback icon
            startElement: createUserAvatar(pr.user),
            // Show chips for state/draft/merge
            endElement: createStatusChips(pr),
        };
    });
    // Return a responsive list of pull requests.
    return {
        type: "List",
        childrenProps: listItems,
    };
}
//# sourceMappingURL=705.js.map
export function transform($input) {
    return visualizeData($input);
}
// Transforms an array of GitHub teams into a responsive list with avatars and badges.
function visualizeData(input) {
    // Map each team to a ListItem with avatar, title, description and badges for members/repos.
    const listItems = input.map((team) => {
        var _a;
        // Prepare badges: one for member count, one for repository count.
        const memberBadge = {
            type: "Badge",
            count: team.members_count,
            maxCount: 9999,
            color: "primary",
            // Show a user icon under the badge
            childrenProps: {
                type: "Icon",
                id: "users",
                color: "gray",
                size: 20,
            },
        };
        const repoBadge = {
            type: "Badge",
            count: team.repos_count,
            maxCount: 9999,
            color: "secondary",
            // Show a branch icon under the badge
            childrenProps: {
                type: "Icon",
                id: "code-branch",
                color: "gray",
                size: 20,
            },
        };
        // Fallback for missing description
        const description = (_a = team.description) !== null && _a !== void 0 ? _a : "No description provided";
        return {
            type: "ListItem",
            // Main title is the team name
            title: team.name,
            // Secondary text
            description,
            // Clicking the item navigates to the team's GitHub page
            href: team.html_url,
            // Show organization avatar on the left
            startElement: {
                type: "Avatar",
                src: team.organization.avatar_url,
                name: team.organization.login,
                size: 40,
                variant: "primary",
            },
            // Show badges on the right
            endElement: [memberBadge, repoBadge],
        };
    });
    // Render the full list
    const listProps = {
        type: "List",
        childrenProps: listItems,
    };
    return listProps;
}
//# sourceMappingURL=985.js.map
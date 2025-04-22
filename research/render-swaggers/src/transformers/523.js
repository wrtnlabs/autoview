export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // When there is no data, show a simple Markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No teams available to display.",
        };
    }
    // Map each team_simple record to a DataListItem
    const listItems = input.map((team) => {
        // Avatar showing the first letter of the team name
        const avatar = {
            type: "Avatar",
            name: team.name.charAt(0).toUpperCase(),
            variant: "blue",
            size: 24,
        };
        // Text for the team name
        const nameText = {
            type: "Text",
            content: team.name,
            variant: "body1",
        };
        // Chip representing the permission level
        const permissionChip = {
            type: "Chip",
            label: team.permission,
            variant: "filled",
            color: "teal",
            size: "small",
        };
        // Button to view the team's HTML URL
        const viewButton = {
            type: "Button",
            variant: "text",
            color: "primary",
            size: "small",
            label: "View",
            href: team.html_url,
            startElement: {
                type: "Icon",
                id: "external-link",
                size: 12,
                color: "blue",
            },
        };
        // Button to view the team's repositories
        const repoButton = {
            type: "Button",
            variant: "text",
            color: "secondary",
            size: "small",
            label: "Repos",
            href: team.repositories_url,
            startElement: {
                type: "Icon",
                id: "code-branch",
                size: 12,
                color: "gray",
            },
        };
        return {
            type: "DataListItem",
            // Combine avatar and team name as the label
            label: [avatar, nameText],
            // Show permission chip and action buttons on the right
            value: [permissionChip, viewButton, repoButton],
        };
    });
    // Return the DataList containing all team items
    return {
        type: "DataList",
        childrenProps: listItems,
    };
}
//# sourceMappingURL=523.js.map
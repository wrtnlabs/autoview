export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Handle empty or missing input gracefully
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "**No teams available**",
        };
    }
    // Map each team to a ListItem component
    const childrenProps = input.map((team) => {
        // Prepare a human-friendly description
        const descriptionParts = [];
        if (team.description) {
            descriptionParts.push(team.description);
        }
        else {
            descriptionParts.push("No description");
        }
        if (team.privacy) {
            descriptionParts.push(`Privacy: ${team.privacy}`);
        }
        // The core permission for the team (e.g. "admin", "push", etc.)
        descriptionParts.push(`Permission: ${team.permission}`);
        return {
            // Discriminator
            type: "ListItem",
            // Main title of the list item
            title: team.name,
            // Combine description, privacy, and permission into one line
            description: descriptionParts.join(" • "),
            // Clicking the item navigates to the team's GitHub page
            href: team.html_url,
            // Avatar with team name initials, using a consistent color
            startElement: {
                type: "Avatar",
                name: team.name,
                variant: "blue",
                size: 32,
            },
            // Two icon buttons: one to view the team page, one to view repositories
            endElement: [
                {
                    type: "IconButton",
                    icon: "external-link-alt", // FontAwesome external link icon
                    variant: "outlined",
                    color: "primary",
                    size: "small",
                },
                {
                    type: "IconButton",
                    icon: "code-branch", // FontAwesome branch (repos) icon
                    variant: "outlined",
                    color: "primary",
                    size: "small",
                },
            ],
        };
    });
    // Return a responsive List component containing all teams
    return {
        type: "List",
        childrenProps,
    };
}
//# sourceMappingURL=650.js.map
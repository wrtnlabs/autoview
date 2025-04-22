export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Sort projects by their number for consistent ordering
    const sortedProjects = [...input].sort((a, b) => a.number - b.number);
    // Helper to map project state to chip color
    const stateColor = (state) => {
        switch (state.toLowerCase()) {
            case "open":
                return "green";
            case "closed":
                return "red";
            default:
                return "gray";
        }
    };
    // Build a list item for each project
    const listItems = sortedProjects.map((project) => {
        // Avatar representing the creator
        const avatar = {
            type: "Avatar",
            src: project.creator.avatar_url,
            name: project.creator.login,
            size: 32,
            variant: "blue",
        };
        // Chip showing the project state (open/closed/other)
        const stateChip = {
            type: "Chip",
            label: project.state,
            variant: "outlined",
            size: "small",
            color: stateColor(project.state),
        };
        // Button linking to the HTML URL of the project
        const viewButton = {
            type: "Button",
            label: "View",
            href: project.html_url,
            variant: "outlined",
            size: "small",
            // Add a small external link icon before the label
            startElement: {
                type: "Icon",
                id: "external-link",
                size: 12,
                color: "blue",
            },
        };
        // Compose a human‑readable permission summary
        const perm = project.permissions;
        const permDesc = `Perm: R:${perm.read ? "✔" : "✖"} W:${perm.write ? "✔" : "✖"} A:${perm.admin ? "✔" : "✖"}`;
        return {
            type: "ListItem",
            // Project title
            title: project.name,
            // Show project number and permission summary
            description: `#${project.number} · ${permDesc}`,
            // Creator avatar on the left
            startElement: avatar,
            // On the right, show state chip and "View" button
            endElement: [stateChip, viewButton],
        };
    });
    // Return as a responsive list; mobile will collapse it gracefully
    return {
        type: "List",
        childrenProps: listItems,
    };
}
//# sourceMappingURL=921.js.map
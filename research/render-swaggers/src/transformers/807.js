export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Transform each milestone into a ListItem with avatar/icon, title, description, and issue count chips.
    const listItems = input.map((milestone) => {
        // Determine the startElement: use the creator's avatar if available, otherwise a fallback icon.
        const startElement = milestone.creator !== null
            ? {
                type: "Avatar",
                src: milestone.creator.avatar_url,
                name: milestone.creator.login,
                // Use a color variant to hint at state (open = info, closed = gray).
                variant: milestone.state === "open" ? "info" : "gray",
                size: 32,
            }
            : {
                type: "Icon",
                id: "user", // generic user icon
                color: "gray",
                size: 32,
            };
        // Create chips to show the number of open and closed issues.
        const openIssuesChip = {
            type: "Chip",
            label: `${milestone.open_issues} open`,
            color: "warning",
            variant: "outlined",
            size: "small",
        };
        const closedIssuesChip = {
            type: "Chip",
            label: `${milestone.closed_issues} closed`,
            color: "success",
            variant: "outlined",
            size: "small",
        };
        // Assemble a brief description: state and optional due date.
        const parts = [`State: ${milestone.state}`];
        if (milestone.due_on) {
            // Format due date in a locale-friendly way.
            const dueDate = new Date(milestone.due_on).toLocaleDateString();
            parts.push(`Due on ${dueDate}`);
        }
        const description = parts.join(" • ");
        return {
            type: "ListItem",
            title: `#${milestone.number} ${milestone.title}`,
            description,
            href: milestone.html_url, // Link directly to the milestone page
            startElement, // Avatar or fallback icon
            endElement: [openIssuesChip, closedIssuesChip], // Issue count chips
        };
    });
    // Return a responsive list component containing all milestone items.
    return {
        type: "List",
        childrenProps: listItems,
    };
}
//# sourceMappingURL=807.js.map
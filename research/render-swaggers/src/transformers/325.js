export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there is no data, show a simple markdown message
    if (input.length === 0) {
        return {
            type: "Markdown",
            content: "### No classrooms available\n\nThere are currently no classrooms to display."
        };
    }
    // Map each classroom to a ListItem component
    const listItems = input.map((classroom) => {
        // Icon to represent GitHub
        const githubIcon = {
            type: "Icon",
            id: "github",
            color: "gray",
            size: 24
        };
        // Chip to indicate archived or active status
        const statusChip = {
            type: "Chip",
            label: classroom.archived ? "Archived" : "Active",
            color: classroom.archived ? "gray" : "green",
            size: "small",
            variant: "filled"
        };
        // Button to navigate to the classroom URL
        const viewButton = {
            type: "Button",
            variant: "text",
            color: "primary",
            size: "small",
            label: "Open",
            startElement: {
                type: "Icon",
                id: "arrow-right",
                color: "blue",
                size: 16
            },
            href: classroom.url
        };
        return {
            type: "ListItem",
            // Classroom name as the title
            title: classroom.name,
            // Show the URL as a subtitle; on mobile this wraps gracefully
            description: classroom.url,
            // Leading GitHub icon for visual context
            startElement: githubIcon,
            // Trailing status chip and view button for actions
            endElement: [statusChip, viewButton],
            // Make the entire item clickable as well
            href: classroom.url
        };
    });
    // Return a responsive List component containing all items
    const list = {
        type: "List",
        childrenProps: listItems
    };
    return list;
}
//# sourceMappingURL=325.js.map
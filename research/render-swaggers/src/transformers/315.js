export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there's no data, display a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No integration installation requests found."
        };
    }
    // Transform each installation request into a ListItem
    const items = input.map(request => {
        const { id, requester, created_at } = request;
        // Attempt to format the created_at timestamp for readability
        const date = new Date(created_at);
        const formattedDate = isNaN(date.valueOf())
            ? created_at // fallback to raw string if invalid date
            : date.toLocaleString();
        // Render the requester's avatar
        const avatar = {
            type: "Avatar",
            src: requester.avatar_url,
            name: requester.login,
            size: 32,
            variant: "gray"
        };
        // Add a small chip showing the request id
        const idChip = {
            type: "Chip",
            label: `#${id}`,
            color: "info",
            size: "small",
            variant: "outlined"
        };
        // Provide a button to view the requester's GitHub profile
        const profileButton = {
            type: "Button",
            label: "Profile",
            href: requester.html_url,
            variant: "text",
            color: "primary",
            startElement: {
                type: "Icon",
                id: "external-link-alt",
                size: 16,
                color: "blue"
            }
        };
        return {
            type: "ListItem",
            title: requester.login,
            description: `Installed at ${formattedDate}`,
            startElement: avatar,
            // Display both the ID chip and the profile button at the end
            endElement: [idChip, profileButton]
        };
    });
    // Wrap all items in a responsive list
    const list = {
        type: "List",
        childrenProps: items
    };
    return list;
}
//# sourceMappingURL=315.js.map
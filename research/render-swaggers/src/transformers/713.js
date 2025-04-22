export function transform($input) {
    return visualizeData($input);
}
// Transforms an array of contributors into a visual DataList
function visualizeData(input) {
    // If there are no contributors, show an informative markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No contributors found\n\nIt looks like there are no contributors to display at this time."
        };
    }
    // Convert each contributor record into a DataListItemProps
    const items = input.map((contributor) => {
        const { login = "Unknown", avatar_url, html_url, contributions = 0 } = contributor;
        // Avatar with fallback to initials when no URL is provided
        const avatar = {
            type: "Avatar",
            name: login,
            size: 28,
            variant: "blue",
            src: avatar_url !== null && avatar_url !== void 0 ? avatar_url : undefined
        };
        // Username label
        const nameText = {
            type: "Text",
            variant: "body1",
            content: login
        };
        // Chip showing the number of contributions
        const contributionsChip = {
            type: "Chip",
            label: `${contributions}`,
            variant: "outlined",
            size: "small",
            color: "primary"
        };
        // Optional button linking to the GitHub profile
        const profileButton = html_url
            ? {
                type: "Button",
                label: "Profile",
                variant: "text",
                color: "primary",
                size: "small",
                href: html_url,
                startElement: {
                    type: "Icon",
                    id: "github",
                    color: "gray",
                    size: 12
                }
            }
            : null;
        // Assemble the right-hand side components: always show contributions, then profile button if available
        const valueComponents = [
            contributionsChip
        ];
        if (profileButton) {
            valueComponents.push(profileButton);
        }
        return {
            type: "DataListItem",
            startElement: avatar,
            // We wrap the username in an array to allow extension with icons or other text
            label: [nameText],
            value: valueComponents
        };
    });
    // Return the DataList container holding all items
    return {
        type: "DataList",
        childrenProps: items
    };
}
//# sourceMappingURL=713.js.map
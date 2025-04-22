export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Map each gist into a DataListItem composed of visual elements.
    const items = input.map((gist) => {
        // Safely extract owner information; it may be null.
        const owner = gist.user;
        // Build an Avatar component for the owner if available.
        const avatar = owner
            ? {
                type: "Avatar",
                src: owner.avatar_url,
                name: owner.login,
                size: 32,
                variant: "primary",
            }
            : undefined;
        // Build a Text component for the owner name.
        const ownerName = owner
            ? {
                type: "Text",
                variant: "body1",
                content: owner.login,
            }
            : undefined;
        // Build a Chip to show the comment count with an icon.
        const commentChip = {
            type: "Chip",
            label: String(gist.comments),
            color: "gray",
            variant: "outlined",
            startElement: {
                type: "Icon",
                id: "comment",
                color: "gray",
                size: 12,
            },
            size: "small",
        };
        // Build a Chip to show the fork count with an icon.
        const forkChip = {
            type: "Chip",
            label: gist.forks && Array.isArray(gist.forks) ? String(gist.forks.length) : "0",
            color: "gray",
            variant: "outlined",
            startElement: {
                type: "Icon",
                id: "code-branch",
                color: "gray",
                size: 12,
            },
            size: "small",
        };
        // Build a Tooltip + Icon to show last-updated date on hover.
        const updatedTooltip = {
            type: "Tooltip",
            message: `Updated: ${new Date(gist.updated_at).toLocaleString()}`,
            childrenProps: {
                type: "Icon",
                id: "calendar",
                color: "gray",
                size: 16,
            },
        };
        // Build a Button to navigate to the gist page.
        const viewButton = {
            type: "Button",
            label: "View",
            variant: "outlined",
            size: "small",
            color: "primary",
            href: gist.html_url,
        };
        // Build an array of "value" components: chips, tooltip, and view button
        const valueComponents = [
            commentChip,
            forkChip,
            updatedTooltip,
            viewButton,
        ];
        // Build the "label" area: avatar + owner name + optional description in markdown.
        // If description exists, include it as Markdown to allow rich formatting.
        const labelComponents = [];
        if (avatar)
            labelComponents.push(avatar);
        if (ownerName)
            labelComponents.push(ownerName);
        if (gist.description) {
            labelComponents.push({
                type: "Markdown",
                content: gist.description.startsWith("#")
                    ? gist.description
                    : `**${gist.description}**`,
            });
        }
        return {
            type: "DataListItem",
            // Use the composed visual label and values.
            label: labelComponents.length === 1 ? labelComponents[0] : labelComponents,
            value: valueComponents.length === 1 ? valueComponents[0] : valueComponents,
        };
    });
    // Wrap all items in a DataList for vertical, responsive layout.
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    return dataList;
}
//# sourceMappingURL=341.js.map
export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If no collaborators, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "**No collaborators found**",
        };
    }
    // Map each collaborator to a ListItemProps for a responsive, mobile‑friendly list
    const items = input.map((collaborator) => {
        var _a;
        // Prepare a human‑readable title: use the real name if available, otherwise the login
        const title = collaborator.name
            ? `${collaborator.name} (${collaborator.login})`
            : collaborator.login;
        // Use the avatar_url for a visual cue
        const avatar = {
            type: "Avatar",
            src: collaborator.avatar_url,
            name: collaborator.login,
            variant: "primary",
            size: 40,
        };
        // A small button linking to the GitHub profile, with an arrow icon
        const viewButton = {
            type: "Button",
            variant: "text",
            color: "info",
            size: "small",
            href: collaborator.html_url,
            startElement: {
                type: "Icon",
                id: "arrow-right",
                color: "cyan",
                size: 16,
            },
            label: ["View"],
        };
        // Assemble the list item
        return {
            type: "ListItem",
            title,
            // Show email if available
            description: (_a = collaborator.email) !== null && _a !== void 0 ? _a : undefined,
            startElement: avatar,
            // Put the "View" button at the end; ListItem endElement can be an array
            endElement: [viewButton],
        };
    });
    // Return the List component with all items
    return {
        type: "List",
        childrenProps: items,
    };
}
//# sourceMappingURL=696.js.map
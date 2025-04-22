export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no managers, display a friendly markdown message
    if (!input.managers || input.managers.length === 0) {
        return {
            type: "Markdown",
            content: "*No managers found.*",
        };
    }
    // Helper: determine if a manager is currently online
    const isManagerOnline = (managerId) => {
        if (!managerId || !input.onlines)
            return false;
        return input.onlines.some((o) => o.personId === managerId);
    };
    // Build a list item for each manager
    const listItems = input.managers.map((mgr) => {
        const online = isManagerOnline(mgr.id);
        // Avatar: use mgr.avatarUrl if available, otherwise show initials
        const avatar = {
            type: "Avatar",
            name: mgr.name,
            src: mgr.avatarUrl,
            // size left undefined to use default
        };
        // If online, wrap avatar in a green dot badge
        const startElement = online
            ? {
                type: "Badge",
                dot: true,
                color: "success",
                childrenProps: avatar,
            }
            : avatar;
        // Description logic: show description only if allowed, else fallback to email
        const description = mgr.showDescriptionToFront && mgr.description
            ? mgr.description
            : mgr.email;
        // Visual chip showing the manager's role
        const roleChip = {
            type: "Chip",
            label: mgr.role,
            variant: "outlined",
            color: mgr.role === "owner" ? "error" : "info",
            size: "small",
        };
        return {
            type: "ListItem",
            title: mgr.name,
            description,
            startElement,
            // display role on the right side
            endElement: roleChip,
        };
    });
    // If there's a pagination token, append a "Load More" button item
    if (input.next) {
        const loadMoreButton = {
            type: "Button",
            label: "Load More",
            variant: "text",
            color: "primary",
            size: "medium",
            href: input.next,
        };
        listItems.push({
            type: "ListItem",
            // Title can be blank or guiding text
            title: " ",
            endElement: loadMoreButton,
        });
    }
    // Return a responsive list component for mobile/web
    return {
        type: "List",
        childrenProps: listItems,
    };
}
//# sourceMappingURL=192.js.map
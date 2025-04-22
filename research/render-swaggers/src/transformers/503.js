export function transform($input) {
    return visualizeData($input);
}
// Transforms an array of GitHub project schemas into a visual data list
function visualizeData(input) {
    // If there are no projects, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No GitHub projects available."
        };
    }
    // Map each project to a DataListItem with avatar, name, state chip, markdown description, and a button
    const items = input.map(project => {
        var _a, _b, _c;
        // Avatar for the project creator (or fallback to owner URL)
        const avatar = {
            type: "Avatar",
            src: ((_a = project.creator) === null || _a === void 0 ? void 0 : _a.avatar_url) || project.owner_url,
            name: ((_b = project.creator) === null || _b === void 0 ? void 0 : _b.login) || project.name,
            size: 32,
            variant: "primary"
        };
        // Text component for the project name
        const nameText = {
            type: "Text",
            content: project.name,
            variant: "h4"
        };
        // Chip to show open/closed state
        const stateChip = {
            type: "Chip",
            label: project.state,
            variant: "filled",
            size: "small",
            color: project.state === "open" ? "success" : "error"
        };
        // Format creation/update dates
        const created = new Date(project.created_at).toLocaleDateString();
        const updated = new Date(project.updated_at).toLocaleDateString();
        // Build markdown description combining body, created and updated dates
        const descriptionLines = [
            (_c = project.body) !== null && _c !== void 0 ? _c : "",
            `**Created:** ${created}`,
            `**Updated:** ${updated}`
        ].filter(line => line.trim().length > 0);
        const mdContent = descriptionLines.join("\n\n");
        const markdown = {
            type: "Markdown",
            content: mdContent
        };
        // Button to open the project in a new tab
        const openButton = {
            type: "Button",
            label: "View",
            variant: "text",
            size: "small",
            href: project.html_url
        };
        // Compose the DataListItem: label column is avatar + name; value column is state, description, and button
        return {
            type: "DataListItem",
            label: [avatar, nameText],
            value: [stateChip, markdown, openButton]
        };
    });
    // Return the DataList containing all project items
    return {
        type: "DataList",
        childrenProps: items
    };
}
//# sourceMappingURL=503.js.map
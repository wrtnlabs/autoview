export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there's no deployment data, show a simple message
    if (!input || input.length === 0) {
        return {
            type: "Text",
            content: "No deployment data available",
            variant: "body1",
        };
    }
    // Transform each deployment into a ListItem
    const listItems = input.map(deployment => {
        // Build an avatar for the creator if present
        const avatar = deployment.creator
            ? {
                type: "Avatar",
                src: deployment.creator.avatar_url,
                name: deployment.creator.login,
                variant: "blue",
                size: 40,
            }
            : undefined;
        // Create “chips” to flag production/transient environments
        const chips = [];
        if (deployment.production_environment) {
            chips.push({
                type: "Chip",
                label: "Production",
                color: "success",
                size: "small",
                variant: "filled",
            });
        }
        if (deployment.transient_environment) {
            chips.push({
                type: "Chip",
                label: "Transient",
                color: "warning",
                size: "small",
                variant: "outlined",
            });
        }
        // A button to navigate to the deployment statuses URL
        const statusButton = {
            type: "Button",
            label: "View Statuses",
            size: "small",
            variant: "text",
            href: deployment.statuses_url,
        };
        return {
            type: "ListItem",
            title: deployment.environment,
            // Show ref and abbreviated SHA in the description
            description: `Ref: ${deployment.ref} (${deployment.sha.slice(0, 7)})`,
            startElement: avatar,
            // Render chips and the statuses button at the end
            endElement: [...chips, statusButton],
        };
    });
    // Wrap all ListItems in a responsive List
    return {
        type: "List",
        childrenProps: listItems,
    };
}
//# sourceMappingURL=724.js.map
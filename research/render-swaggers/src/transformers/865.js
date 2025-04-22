export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no versions, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "## No versions available\n\nThere are no historical versions to display."
        };
    }
    // Map each ruleset_version to a ListItem with visual elements
    const items = input.map((version) => {
        var _a;
        const { version_id, actor, updated_at } = version;
        // Build the title
        const title = `Version ${version_id}`;
        // Extract actor info
        const actorType = (_a = actor === null || actor === void 0 ? void 0 : actor.type) !== null && _a !== void 0 ? _a : "unknown";
        const actorId = actor === null || actor === void 0 ? void 0 : actor.id;
        // Format the updated_at timestamp for display
        const updatedLabel = (() => {
            try {
                return new Date(updated_at).toLocaleString();
            }
            catch (_a) {
                // Fallback if the date is invalid
                return updated_at;
            }
        })();
        // Use a user icon as the leading element; color it based on actor presence
        const startElement = {
            type: "Icon",
            id: "user", // using a generic user icon
            color: actorId != null ? "blue" : "gray",
            size: 20
        };
        // Build small chips to display actor ID and last updated time
        const endElements = [];
        if (actorId != null) {
            endElements.push({
                type: "Chip",
                label: `Actor #${actorId}`,
                variant: "outlined",
                color: "teal",
                size: "small"
            });
        }
        endElements.push({
            type: "Chip",
            label: updatedLabel,
            variant: "outlined",
            color: "gray",
            size: "small"
        });
        // The description shows the actor type in human-friendly form
        const description = `Role: ${actorType.charAt(0).toUpperCase() + actorType.slice(1)}`;
        return {
            type: "ListItem",
            title,
            description,
            startElement,
            endElement: endElements
        };
    });
    // Wrap all items in a responsive List component
    return {
        type: "List",
        childrenProps: items
    };
}
//# sourceMappingURL=865.js.map
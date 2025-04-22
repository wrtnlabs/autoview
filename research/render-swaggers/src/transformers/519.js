export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there's no version data, render a friendly markdown message
    if (!Array.isArray(input) || input.length === 0) {
        return {
            type: "Markdown",
            content: [
                "**No versions found**",
                "",
                "There are no ruleset versions available at this time.",
            ].join("\n"),
        };
    }
    // Transform each ruleset version into a list item
    const items = input.map((version) => {
        // Safely format the updated_at timestamp
        let formattedDate;
        try {
            formattedDate = new Date(version.updated_at).toLocaleString();
        }
        catch (_a) {
            formattedDate = version.updated_at;
        }
        // Decide on a label for the actor (type preferred, otherwise fallback to ID)
        const actorType = version.actor.type;
        const actorId = version.actor.id;
        const actorLabel = actorType
            ? actorType
            : actorId !== undefined
                ? `Actor ${actorId}`
                : "Unknown";
        return {
            type: "ListItem",
            title: `Version ${version.version_id}`,
            description: formattedDate,
            // A small history icon to represent the version history
            startElement: {
                type: "Icon",
                id: "history",
                color: "teal",
                size: 20,
            },
            // A chip indicating who made the change
            endElement: {
                type: "Chip",
                label: actorLabel,
                variant: "outlined",
                color: "primary",
                size: "small",
            },
        };
    });
    // Compose the list with a sticky subheader showing total count
    return {
        type: "List",
        childrenProps: [
            {
                type: "ListSubheader",
                stickToTop: true,
                childrenProps: {
                    type: "Text",
                    variant: "h6",
                    content: `Ruleset Versions (${input.length})`,
                },
            },
            ...items,
        ],
    };
}
//# sourceMappingURL=519.js.map
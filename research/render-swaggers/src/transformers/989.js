export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If no events, display a simple message using markdown for nicer formatting
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "_No events found._",
        };
    }
    // Sort events by creation time descending, null dates go last
    const sortedEvents = [...input].sort((a, b) => {
        const ta = a.created_at ? new Date(a.created_at).getTime() : 0;
        const tb = b.created_at ? new Date(b.created_at).getTime() : 0;
        return tb - ta;
    });
    // Transform each event into a DataListItem for a responsive list view
    const childrenProps = sortedEvents.map((event) => {
        var _a, _b;
        // Actor avatar
        const avatar = {
            type: "Avatar",
            src: event.actor.avatar_url,
            name: event.actor.login,
            variant: "primary",
            size: 32,
        };
        // Actor login text
        const actorText = {
            type: "Text",
            content: event.actor.login,
            variant: "body1",
        };
        // Event type displayed as a chip for quick visual identification
        const typeChip = {
            type: "Chip",
            label: (_a = event.type) !== null && _a !== void 0 ? _a : "Unknown",
            variant: "outlined",
            size: "small",
            color: "info",
        };
        // Repository link as a button for direct navigation
        const repoButton = {
            type: "Button",
            label: event.repo.name,
            variant: "text",
            size: "small",
            href: event.repo.url,
            color: "primary",
        };
        // Creation date stamp in a smaller font
        const dateText = {
            type: "Text",
            content: [
                // Format to a readable date; fallback to raw if invalid
                new Date((_b = event.created_at) !== null && _b !== void 0 ? _b : "").toLocaleString() || "Unknown date",
            ],
            variant: "caption",
            color: "#888", // Gray shade for de-emphasis
        };
        // Compose label (actor avatar + login)
        const labelComponents = [
            avatar,
            actorText,
        ];
        // Compose value (type chip + repo button + date)
        const valueComponents = [
            typeChip,
            repoButton,
            dateText,
        ];
        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponents,
        };
    });
    // Return the DataList component with all events
    return {
        type: "DataList",
        childrenProps,
    };
}
//# sourceMappingURL=989.js.map
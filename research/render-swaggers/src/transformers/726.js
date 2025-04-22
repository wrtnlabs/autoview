export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Map deployment state to an icon name and color for visual emphasis
    const stateIconMap = {
        success: { id: "check-circle", color: "green" },
        error: { id: "times-circle", color: "red" },
        failure: { id: "times-circle", color: "orange" },
        pending: { id: "hourglass-half", color: "yellow" },
        in_progress: { id: "spinner", color: "cyan" },
        queued: { id: "clock", color: "blue" },
        inactive: { id: "ban", color: "gray" },
    };
    // Helper to format ISO date strings into a more user‐friendly format
    function formatDate(iso) {
        // Use browser locale for responsiveness on different devices
        const d = new Date(iso);
        return d.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    }
    // Build each DataListItemProps from a deployment_status record
    const items = input.map((status) => {
        const creator = status.creator;
        // Prepare avatar if creator info exists
        const avatarComponent = creator && creator.avatar_url
            ? {
                type: "Avatar",
                src: creator.avatar_url,
                name: creator.login,
                variant: "primary",
                size: 28,
            }
            : undefined;
        // Choose icon for the state
        const stateMeta = stateIconMap[status.state] || {
            id: "question-circle",
            color: "gray",
        };
        // Compose the label: avatar + user login + description
        const labelComponents = [];
        if (avatarComponent) {
            labelComponents.push(avatarComponent);
        }
        labelComponents.push({
            type: "Text",
            variant: "body1",
            content: [
                // Show login and short description if available
                creator ? creator.login : "Unknown",
                status.description ? ` - ${status.description}` : "",
            ].join(""),
        });
        // Compose the value: state icon + state name + created date
        const valueComponents = [
            {
                type: "Icon",
                id: stateMeta.id,
                color: stateMeta.color,
                size: 20,
            },
            {
                type: "Text",
                variant: "body2",
                content: ` ${status.state.replace("_", " ")} `,
            },
            {
                type: "Text",
                variant: "caption",
                color: "#888",
                content: formatDate(status.created_at),
            },
        ];
        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponents,
        };
    });
    // Wrap all items in a responsive DataList component
    return {
        type: "DataList",
        childrenProps: items,
    };
}
//# sourceMappingURL=726.js.map
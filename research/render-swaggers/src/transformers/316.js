export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Map each installation to a visual DataListItem
    const items = input.map((inst) => {
        // Build label components: avatar (if suspended), app icon, slug, id, repo selection chip, contact email icon
        const labelComponents = [];
        // Show suspended user avatar if present
        if (inst.suspended_by) {
            labelComponents.push({
                type: "Avatar",
                src: inst.suspended_by.avatar_url,
                name: inst.suspended_by.login,
                variant: "error",
                size: 32,
            });
        }
        // App installation icon
        labelComponents.push({
            type: "Icon",
            id: "box-open",
            color: "blue",
            size: 16,
        });
        // App slug as a subtitle
        labelComponents.push({
            type: "Text",
            content: inst.app_slug,
            variant: "subtitle1",
        });
        // Installation ID chip
        labelComponents.push({
            type: "Chip",
            label: `#${inst.id}`,
            color: "gray",
            size: "small",
            variant: "filled",
        });
        // Repository selection chip: green for "all", orange for "selected"
        labelComponents.push({
            type: "Chip",
            label: inst.repository_selection,
            color: inst.repository_selection === "all" ? "green" : "orange",
            size: "small",
            variant: "outlined",
        });
        // Mail icon button if contact_email is provided
        if (inst.contact_email) {
            labelComponents.push({
                type: "IconButton",
                icon: "envelope",
                color: "primary",
                size: "small",
                variant: "outlined",
            });
        }
        // Build value components: created date, updated date, event count
        const valueComponents = [];
        // Created date with calendar icon
        valueComponents.push({
            type: "Icon",
            id: "calendar-day",
            color: "gray",
            size: 16,
        });
        valueComponents.push({
            type: "Text",
            content: new Date(inst.created_at).toLocaleDateString(),
            variant: "caption",
        });
        // Updated date with clock icon
        valueComponents.push({
            type: "Icon",
            id: "clock",
            color: "gray",
            size: 16,
        });
        valueComponents.push({
            type: "Text",
            content: new Date(inst.updated_at).toLocaleDateString(),
            variant: "caption",
        });
        // Number of events with list icon
        valueComponents.push({
            type: "Icon",
            id: "list",
            color: "teal",
            size: 16,
        });
        valueComponents.push({
            type: "Text",
            content: `${inst.events.length}`,
            variant: "caption",
        });
        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponents,
        };
    });
    // Return a DataList that holds all installation items
    return {
        type: "DataList",
        childrenProps: items,
    };
}
//# sourceMappingURL=316.js.map
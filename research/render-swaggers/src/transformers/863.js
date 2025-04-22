export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper to create a DataListItem from a label and a value component
    const makeItem = (label, value) => ({
        type: "DataListItem",
        label: { type: "Text", content: label, variant: "subtitle2" },
        value,
    });
    // Build the list of properties dynamically, skipping undefined ones
    const items = [];
    // ID
    items.push(makeItem("Ruleset ID", { type: "Text", content: `${input.id}`, variant: "body2" }));
    // Target
    if (input.target) {
        items.push(makeItem("Target", {
            type: "Chip",
            label: input.target,
            variant: "outlined",
            color: "primary"
        }));
    }
    // Source type and source
    if (input.source_type) {
        items.push(makeItem("Source Type", { type: "Text", content: input.source_type, variant: "body2" }));
    }
    items.push(makeItem("Source", { type: "Text", content: input.source, variant: "body2" }));
    // Enforcement level, highlight with Chip
    items.push(makeItem("Enforcement", {
        type: "Chip",
        label: input.enforcement,
        color: input.enforcement === "active"
            ? "success"
            : input.enforcement === "evaluate"
                ? "warning"
                : "gray",
        variant: "filled"
    }));
    // Bypass actors count (optional array)
    if (Array.isArray(input.bypass_actors)) {
        items.push(makeItem("Bypass Actors", {
            type: "Text",
            content: `${input.bypass_actors.length}`,
            variant: "body2"
        }));
    }
    // Current user can bypass
    if (input.current_user_can_bypass) {
        items.push(makeItem("You Can Bypass", {
            type: "Chip",
            label: input.current_user_can_bypass,
            variant: "outlined",
            color: "secondary"
        }));
    }
    // Dates
    if (input.created_at) {
        items.push(makeItem("Created", {
            type: "Text",
            content: new Date(input.created_at).toLocaleString(),
            variant: "caption"
        }));
    }
    if (input.updated_at) {
        items.push(makeItem("Updated", {
            type: "Text",
            content: new Date(input.updated_at).toLocaleString(),
            variant: "caption"
        }));
    }
    // Rules count if present
    if (Array.isArray(input.rules)) {
        items.push(makeItem("Rules", {
            type: "Chip",
            label: `${input.rules.length}`,
            variant: "filled",
            color: "info"
        }));
    }
    // Compose the DataList component
    const dataList = {
        type: "DataList",
        childrenProps: items
    };
    // Header with the ruleset name and an icon
    const header = {
        type: "CardHeader",
        title: input.name,
        description: `ID: ${input.id}`,
        startElement: {
            type: "Icon",
            id: "cog",
            size: 28,
            color: "cyan"
        }
    };
    // CardContent wrapping the DataList
    const content = {
        type: "CardContent",
        childrenProps: dataList
    };
    // Return a VerticalCard composed of header and content
    return {
        type: "VerticalCard",
        childrenProps: [header, content]
    };
}
//# sourceMappingURL=863.js.map
export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If no custom properties, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No custom properties found\nThere are no organization custom properties to display."
        };
    }
    // Helper maps to choose an icon and color based on value_type
    const iconMap = {
        string: "font",
        single_select: "list-alt",
        multi_select: "list",
        true_false: "toggle-on"
    };
    const iconColorMap = {
        string: "gray",
        single_select: "orange",
        multi_select: "yellow",
        true_false: "green"
    };
    // Transform each Schema.custom_property into an IAutoViewListItemProps
    const items = input.map((prop) => {
        var _a;
        // Determine the icon for the value_type
        const iconId = iconMap[prop.value_type] || "tag";
        const iconColor = iconColorMap[prop.value_type] || "blue";
        // Chip for the value_type
        const valueTypeChip = {
            type: "Chip",
            label: prop.value_type.replace(/_/g, " "),
            color: "teal",
            size: "small",
            variant: "outlined"
        };
        // Chip for required vs optional
        const requiredChip = {
            type: "Chip",
            label: prop.required ? "Required" : "Optional",
            color: prop.required ? "error" : "gray",
            size: "small",
            variant: "outlined"
        };
        // Chip for source_type if present
        const sourceChip = prop.source_type
            ? {
                type: "Chip",
                label: prop.source_type.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase()),
                color: "info",
                size: "small",
                variant: "outlined"
            }
            : null;
        // Chip for who can edit values
        const editableLabel = prop.values_editable_by === "org_actors"
            ? "Org Actors"
            : prop.values_editable_by === "org_and_repo_actors"
                ? "Org & Repo Actors"
                : null;
        const editableChip = editableLabel
            ? {
                type: "Chip",
                label: editableLabel,
                color: "blue",
                size: "small",
                variant: "outlined"
            }
            : null;
        // Chip for default_value if provided
        const defaultChip = prop.default_value != null
            ? {
                type: "Chip",
                label: Array.isArray(prop.default_value)
                    ? `Default: ${prop.default_value.join(", ")}`
                    : `Default: ${prop.default_value}`,
                color: "indigo",
                size: "small",
                variant: "outlined"
            }
            : null;
        // Assemble endElement chips, filtering out any nulls
        const endElements = [
            valueTypeChip,
            requiredChip,
            sourceChip,
            editableChip,
            defaultChip
        ].filter((c) => c !== null);
        return {
            type: "ListItem",
            title: prop.property_name,
            // Use the description field for a brief explanation, if available
            description: (_a = prop.description) !== null && _a !== void 0 ? _a : undefined,
            // Show an icon that represents the value type
            startElement: {
                type: "Icon",
                id: iconId,
                color: iconColor,
                size: 24
            },
            // Display all metadata as a row of chips
            endElement: endElements
        };
    });
    // Return a responsive List of all properties
    return {
        type: "List",
        childrenProps: items
    };
}
//# sourceMappingURL=505.js.map
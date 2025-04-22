export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper to map a status string to a colored Chip component
    const statusChip = (status) => {
        // Determine chip color based on status
        let color;
        switch (status) {
            case "enabled":
                color = "green";
                break;
            case "disabled":
                color = "red";
                break;
            case "not_set":
                color = "gray";
                break;
            case "enforced":
                color = "teal";
                break;
            case "unenforced":
                color = "gray";
                break;
            default:
                color = "gray";
        }
        return {
            type: "Chip",
            label: status,
            color,
            variant: "filled",
            size: "small",
        };
    };
    // Collect the relevant configuration fields into DataListItems
    const items = [];
    /**
     * Utility to add a DataListItem if the property is defined.
     * @param labelText - human-readable label of the field
     * @param propValue - the value from the input to display
     */
    const addItem = (labelText, propValue) => {
        if (propValue == null)
            return;
        items.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: labelText,
                variant: "body2",
                color: "secondary",
            },
            value: statusChip(propValue),
        });
    };
    // Standard security settings
    addItem("Target Type", input.target_type);
    addItem("Advanced Security", input.advanced_security);
    addItem("Dependency Graph", input.dependency_graph);
    addItem("Dependabot Alerts", input.dependabot_alerts);
    addItem("Secret Scanning", input.secret_scanning);
    addItem("Private Vulnerability Reporting", input.private_vulnerability_reporting);
    addItem("Enforcement", input.enforcement);
    // Assemble the DataList component
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    // Compose the VerticalCard with a header, content, and footer
    const card = {
        type: "VerticalCard",
        childrenProps: [
            // Header with title, description, and an icon
            {
                type: "CardHeader",
                title: input.name,
                description: input.description,
                startElement: {
                    type: "Icon",
                    id: "shield-alt", // represents security context
                    color: "blue",
                    size: 24,
                },
            },
            // Content section containing the list of settings
            {
                type: "CardContent",
                childrenProps: dataList,
            },
            // Footer showing the last update timestamp
            {
                type: "CardFooter",
                childrenProps: {
                    type: "Text",
                    content: input.updated_at
                        ? `Updated at: ${new Date(input.updated_at).toLocaleString()}`
                        : "Updated at: N/A",
                    variant: "caption",
                    color: "gray",
                },
            },
        ],
    };
    return card;
}
//# sourceMappingURL=332.js.map
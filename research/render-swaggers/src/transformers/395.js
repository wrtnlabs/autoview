export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper to create a simple text component
    const createText = (content, variant = "body2") => ({
        type: "Text",
        content,
        variant,
    });
    // Helper to create a chip for boolean values
    const createBooleanChip = (flag, trueLabel = "Yes", falseLabel = "No") => ({
        type: "Chip",
        label: flag ? trueLabel : falseLabel,
        color: flag ? "success" : "error",
        variant: "filled",
        size: "small",
    });
    // Helper to create a chip for arbitrary string
    const createStringChip = (label, color = "primary") => ({
        type: "Chip",
        label,
        color,
        variant: "filled",
        size: "small",
    });
    // Helper to create a link button with an external-link icon
    const createLinkButton = (href, label) => ({
        type: "Button",
        label,
        href,
        variant: "text",
        size: "small",
        startElement: {
            type: "Icon",
            id: "external-link",
            color: "blue",
            size: 16,
        },
    });
    // Build list of DataListItems to display each property
    const items = [];
    // Visibility
    items.push({
        type: "DataListItem",
        label: [createText("Visibility")],
        value: createStringChip(input.visibility, input.visibility === "public"
            ? "success"
            : input.visibility === "selected"
                ? "info"
                : "secondary"),
    });
    // Default runner group?
    items.push({
        type: "DataListItem",
        label: [createText("Default Group")],
        value: createBooleanChip(input["default"], "Default", "Not default"),
    });
    // Runners URL
    items.push({
        type: "DataListItem",
        label: [createText("Runners")],
        value: createLinkButton(input.runners_url, "View Runners"),
    });
    // Selected repositories URL (only if provided)
    if (input.selected_repositories_url) {
        items.push({
            type: "DataListItem",
            label: [createText("Repositories")],
            value: createLinkButton(input.selected_repositories_url, "View Repositories"),
        });
    }
    // Hosted runners URL (optional)
    if (input.hosted_runners_url) {
        items.push({
            type: "DataListItem",
            label: [createText("Hosted Runners")],
            value: createLinkButton(input.hosted_runners_url, "View Hosted Runners"),
        });
    }
    // Network configuration ID (optional)
    if (input.network_configuration_id) {
        items.push({
            type: "DataListItem",
            label: [createText("Network Config ID")],
            value: createText(input.network_configuration_id),
        });
    }
    // Inherited?
    items.push({
        type: "DataListItem",
        label: [createText("Inherited")],
        value: createBooleanChip(input.inherited),
    });
    // Inherited allows public repositories (optional)
    if (typeof input.inherited_allows_public_repositories === "boolean") {
        items.push({
            type: "DataListItem",
            label: [createText("Inherited Public Repos")],
            value: createBooleanChip(input.inherited_allows_public_repositories),
        });
    }
    // Allows public repositories?
    items.push({
        type: "DataListItem",
        label: [createText("Public Repos")],
        value: createBooleanChip(input.allows_public_repositories),
    });
    // Workflow restrictions read-only (optional)
    if (typeof input.workflow_restrictions_read_only === "boolean") {
        items.push({
            type: "DataListItem",
            label: [createText("Workflows R/O")],
            value: createBooleanChip(input.workflow_restrictions_read_only),
        });
    }
    // Restricted to workflows? (optional)
    if (typeof input.restricted_to_workflows === "boolean") {
        items.push({
            type: "DataListItem",
            label: [createText("Restricted Workflows")],
            value: createBooleanChip(input.restricted_to_workflows),
        });
    }
    // Selected workflows list (optional array)
    if (Array.isArray(input.selected_workflows) && input.selected_workflows.length > 0) {
        const chips = input.selected_workflows.map((wf) => createStringChip(wf, "teal"));
        items.push({
            type: "DataListItem",
            label: [createText("Workflows List")],
            // Use a ChipGroup for multiple workflows
            value: {
                type: "ChipGroup",
                childrenProps: chips,
                maxItems: 5, // show up to 5, collapse the rest
            },
        });
    }
    // Compose the DataList component
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    // Compose the CardHeader with an icon
    const header = {
        type: "CardHeader",
        title: input.name,
        description: `ID: ${input.id}`,
        startElement: {
            type: "Icon",
            id: "server",
            color: "blue",
            size: 24,
        },
    };
    // Wrap everything in a VerticalCard for responsive layout
    const card = {
        type: "VerticalCard",
        childrenProps: [
            header,
            {
                type: "CardContent",
                childrenProps: [dataList],
            },
        ],
    };
    return card;
}
//# sourceMappingURL=395.js.map
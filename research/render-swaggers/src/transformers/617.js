export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no workflows, show a friendly markdown message
    if (!input.workflows || input.workflows.length === 0) {
        return {
            type: "Markdown",
            content: "## No workflows found\n\nThis repository does not have any GitHub Actions workflows configured."
        };
    }
    // Map workflow state to an icon and color for quick visual cue
    const stateIconMap = {
        active: { id: "play-circle", color: "green" },
        deleted: { id: "trash", color: "red" },
        disabled_fork: { id: "code-branch", color: "orange" },
        disabled_inactivity: { id: "pause-circle", color: "orange" },
        disabled_manually: { id: "ban", color: "orange" }
    };
    // Transform each workflow into a DataListItemProps
    const items = input.workflows.map((wf) => {
        // Format the created date for display
        const createdDate = new Date(wf.created_at).toLocaleDateString();
        // Pick icon mapping or fall back
        const mapping = stateIconMap[wf.state] || { id: "question-circle", color: "gray" };
        // Icon component for the state, wrapped in a tooltip
        const stateIcon = {
            type: "Tooltip",
            message: `State: ${wf.state}`,
            childrenProps: {
                type: "Icon",
                id: mapping.id,
                color: mapping.color,
                size: 16
            }
        };
        // Date text component
        const dateText = {
            type: "Text",
            content: createdDate,
            variant: "caption",
            color: "gray"
        };
        return {
            type: "DataListItem",
            // Workflow name as primary label
            label: {
                type: "Text",
                content: wf.name,
                variant: "body1",
                color: "primary"
            },
            // Show created date and state icon side by side
            value: [dateText, stateIcon]
        };
    });
    // The data list presenting all workflows
    const dataList = {
        type: "DataList",
        childrenProps: items
    };
    // Header for the card: repository workflows summary
    const header = {
        type: "CardHeader",
        title: "Workflows",
        description: `${input.total_count} total`,
        startElement: {
            type: "Icon",
            id: "github",
            color: "gray",
            size: 24
        }
    };
    // Content section wrapping the list
    const content = {
        type: "CardContent",
        childrenProps: dataList
    };
    // Compose a vertical card to hold the workflows overview
    return {
        type: "VerticalCard",
        childrenProps: [header, content]
    };
}
//# sourceMappingURL=617.js.map
export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Handle empty input gracefully with a simple markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No projects available\n_No projects were provided to visualize._",
        };
    }
    // Transform each project into a DataListItem
    const items = input.map((project) => {
        // Primary label: project name as a header text
        const labelText = {
            type: "Text",
            variant: "h5",
            content: project.name,
        };
        // Build an array of presentation components for the item's value
        const valueComps = [];
        // 1. State chip: open=success, closed=error
        const stateChip = {
            type: "Chip",
            label: project.state.toUpperCase(),
            color: project.state === "open" ? "success" : "error",
            variant: "filled",
        };
        valueComps.push(stateChip);
        // 2. Project number chip
        const numberChip = {
            type: "Chip",
            label: `#${project.number}`,
            color: "primary",
            variant: "outlined",
        };
        valueComps.push(numberChip);
        // 3. Body description as markdown (if present)
        if (project.body) {
            const bodyMd = {
                type: "Markdown",
                content: project.body,
            };
            valueComps.push(bodyMd);
        }
        // 4. Creator avatar (if we have a creator)
        if (project.creator) {
            const avatar = {
                type: "Avatar",
                src: project.creator.avatar_url,
                name: project.creator.login,
                variant: "info",
                size: 28,
            };
            valueComps.push(avatar);
        }
        // 5. Creation timestamp as a smaller caption text
        const createdText = {
            type: "Text",
            variant: "caption",
            content: `Created: ${new Date(project.created_at).toLocaleString()}`,
        };
        valueComps.push(createdText);
        // 6. "View" button linking to the project page
        const viewButton = {
            type: "Button",
            label: "View",
            variant: "contained",
            color: "primary",
            href: project.html_url,
        };
        valueComps.push(viewButton);
        return {
            type: "DataListItem",
            label: [labelText],
            value: valueComps,
        };
    });
    // Wrap all items in a DataList for a responsive vertical list
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    return dataList;
}
//# sourceMappingURL=823.js.map
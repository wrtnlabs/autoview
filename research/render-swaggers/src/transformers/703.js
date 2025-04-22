export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no branches, show a friendly markdown message instead of an empty list.
    if (input.length === 0) {
        return {
            type: "Markdown",
            content: "### No branches available\n\nThere are currently no branches to display."
        };
    }
    // Build a DataList where each item corresponds to one branch.
    const items = input.map(branch => {
        const shaShort = branch.commit.sha.substring(0, 7);
        const commitUrl = branch.commit.url;
        const isProtected = branch["protected"];
        // Label area: display branch icon and name.
        const labelComponents = [
            {
                type: "Icon",
                id: "code-branch", // fontawesome icon name for branch
                size: 20,
                color: isProtected ? "green" : "gray"
            },
            {
                type: "Text",
                variant: "body1",
                content: ` ${branch.name}`
            }
        ];
        // Value area: clickable commit link and protection status chip.
        const valueComponents = [
            {
                type: "Markdown",
                // Render the commit SHA as a markdown link for easy click-to-copy on mobile.
                content: `[\`${shaShort}\`](${commitUrl})`
            },
            {
                type: "Chip",
                label: isProtected ? "Protected" : "Unprotected",
                size: "small",
                variant: "filled",
                color: isProtected ? "success" : "error",
                startElement: {
                    type: "Icon",
                    id: isProtected ? "lock" : "unlock",
                    size: 16,
                    color: isProtected ? "green" : "red"
                }
            }
        ];
        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponents
        };
    });
    // Wrap all items in a DataList component for clean vertical alignment.
    return {
        type: "DataList",
        childrenProps: items
    };
}
//# sourceMappingURL=703.js.map
export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Compose the card header with a folder icon, category name, and code
    const header = {
        type: "CardHeader",
        title: input.name,
        description: input.code,
        startElement: {
            type: "Icon",
            id: "folder",
            size: 24,
            color: "blue"
        }
    };
    // Use a markdown component to show the creation timestamp in bold
    const createdAtMarkdown = {
        type: "Markdown",
        content: `**Created At:** ${new Date(input.created_at).toLocaleString()}`
    };
    // Collect children props for the CardContent
    const contentChildren = [createdAtMarkdown];
    // If there is a parent category, show it as an outlined chip
    if (input.parent && typeof input.parent.name === "string") {
        const parentName = input.parent.name;
        const parentChip = {
            type: "Chip",
            label: parentName,
            variant: "outlined",
            color: "gray"
        };
        contentChildren.push(parentChip);
    }
    // If there are child categories, display them in a responsive chip group
    if (Array.isArray(input.children) && input.children.length > 0) {
        const childChips = input.children.map((child) => ({
            type: "Chip",
            label: child.name,
            variant: "filled",
            color: "primary"
        }));
        const chipGroup = {
            type: "ChipGroup",
            childrenProps: childChips,
            // Show up to 5 chips before collapsing
            maxItems: 5
        };
        contentChildren.push(chipGroup);
    }
    // Wrap the assembled children in a CardContent component
    const content = {
        type: "CardContent",
        childrenProps: contentChildren
    };
    // Return a vertical card that is mobile-friendly and stacks header + content
    return {
        type: "VerticalCard",
        childrenProps: [header, content]
    };
}
//# sourceMappingURL=40.js.map
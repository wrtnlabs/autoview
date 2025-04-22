export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Destructure input with defaults
    const { base_branch, merge_type, message } = input;
    // Determine merge type value, default to "none" if missing
    const typeKey = merge_type !== null && merge_type !== void 0 ? merge_type : "none";
    // Human-friendly labels for merge types
    const mergeLabels = {
        merge: "Merged",
        "fast-forward": "Fast-Forward",
        none: "No Merge",
    };
    // FontAwesome icon IDs to represent each merge type visually
    const iconIds = {
        merge: "code-branch",
        "fast-forward": "arrow-right",
        none: "ban",
    };
    // Color scheme for each merge type
    const colors = {
        merge: "green",
        "fast-forward": "blue",
        none: "red",
    };
    const label = mergeLabels[typeKey];
    const iconId = iconIds[typeKey];
    const color = colors[typeKey];
    // Card header with icon, branch name, and merge status
    const header = {
        type: "CardHeader",
        // Show base branch or a generic title if unspecified
        title: base_branch ? `Base Branch: ${base_branch}` : "Upstream Merge Result",
        description: label,
        startElement: {
            type: "Icon",
            id: iconId,
            color,
            size: 32,
        },
    };
    // Card content: either markdown of the message or fallback text
    const contentChild = message
        ? {
            type: "Markdown",
            content: message,
        }
        : {
            type: "Text",
            content: "No additional message provided.",
            variant: "body2",
            color: "gray",
        };
    const content = {
        type: "CardContent",
        childrenProps: contentChild,
    };
    // Footer chip summarizing the merge type
    const footerChip = {
        type: "Chip",
        label,
        color: color, // Chip color accepts the same string union
        size: "small",
        variant: "filled",
        startElement: {
            type: "Icon",
            id: iconId,
            color,
            size: 16,
        },
    };
    const footer = {
        type: "CardFooter",
        childrenProps: footerChip,
    };
    // Compose a vertical card with header, content, and footer
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=805.js.map
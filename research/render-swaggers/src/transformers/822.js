export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Choose an icon to represent the vulnerability reporting feature.
    // We use the same 'shield-alt' icon but tint it green when enabled, or gray when disabled.
    const statusIcon = {
        type: "Icon",
        id: "shield-alt",
        color: input.enabled ? "green" : "gray",
        size: 24,
    };
    // A chip to clearly label the current status. Green for enabled, red for disabled.
    const statusChip = {
        type: "Chip",
        label: input.enabled ? "Enabled" : "Disabled",
        color: input.enabled ? "green" : "red",
        variant: "filled",
        size: "medium",
    };
    // The card header displays the feature name, a brief description, and our visual status elements.
    const header = {
        type: "CardHeader",
        title: "Private Vulnerability Reporting",
        description: input.enabled
            ? "Vulnerability reporting is enabled for this repository."
            : "Vulnerability reporting is disabled for this repository.",
        // Leading icon
        startElement: statusIcon,
        // Trailing status chip
        endElement: statusChip,
    };
    // Use a Markdown block to give a little more context in a mobile‑friendly format.
    // Markdown allows for emojis and line breaks to make it more engaging.
    const markdownContent = {
        type: "Markdown",
        content: input.enabled
            ? "🔒 **Your repository is protected with private vulnerability reporting.**\n\nYou will receive alerts for potential vulnerabilities."
            : "⚠️ **Private vulnerability reporting is currently disabled.**\n\nConsider enabling it to stay informed about security risks.",
    };
    // Wrap everything in a vertical card so it's responsive on narrow screens.
    // The childrenProps property accepts an array of card sub‑components.
    return {
        type: "VerticalCard",
        childrenProps: [
            header,
            {
                type: "CardContent",
                childrenProps: markdownContent,
            },
        ],
    };
}
//# sourceMappingURL=822.js.map
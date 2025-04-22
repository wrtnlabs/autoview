export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Determine status label and visual styling based on the `enabled` flag
    const statusLabel = input.enabled ? "Enforced" : "Not Enforced";
    const statusColor = input.enabled ? "green" : "gray";
    // Fallback for missing URL (shouldn't happen if the input is valid)
    const urlDisplay = (_a = input.url) !== null && _a !== void 0 ? _a : "N/A";
    // Compose a vertical card to present the protected-branch settings:
    // - CardHeader: shows a lock icon, a title, and the branch URL
    // - CardFooter: displays a colored chip to indicate whether enforcement is on
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                // Header with an icon and the URL
                type: "CardHeader",
                title: "Protected Branch Admin Enforcement",
                // Display the URL directly; you could use a Markdown component here
                description: urlDisplay,
                // Use a lock icon to visually represent protection
                startElement: {
                    type: "Icon",
                    id: input.enabled ? "lock" : "unlock",
                    color: input.enabled ? "green" : "red",
                    size: 24,
                },
            },
            {
                // Footer with a chip showing the enforcement status
                type: "CardFooter",
                childrenProps: {
                    type: "Chip",
                    label: statusLabel,
                    color: statusColor,
                    variant: "filled",
                },
            },
        ],
    };
}
//# sourceMappingURL=637.js.map
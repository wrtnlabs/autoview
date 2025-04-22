export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    const { accepted } = input;
    // Determine status icon based on acceptance
    const statusIcon = {
        type: "Icon",
        id: accepted ? "check-circle" : "times-circle",
        color: accepted ? "green" : "red",
        size: 24, // medium-sized icon for visibility
    };
    // Build card header with title, description, and status icon
    const header = {
        type: "CardHeader",
        title: "Codespaces Permissions Check",
        description: accepted
            ? "User has accepted the permissions defined by the devcontainer config."
            : "User has not accepted the permissions defined by the devcontainer config.",
        startElement: statusIcon,
    };
    // Build a visual chip indicating accepted/denied status
    const statusChip = {
        type: "Chip",
        label: accepted ? "Accepted" : "Denied",
        color: accepted ? "success" : "error",
        size: "medium",
        variant: "filled",
    };
    // Wrap the chip in card content
    const content = {
        type: "CardContent",
        // childrenProps can be a single component or an array;
        // here we provide a single chip for clarity.
        childrenProps: statusChip,
    };
    // Compose a vertical card to ensure responsiveness on all device sizes.
    return {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
}
//# sourceMappingURL=691.js.map
export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Map role to an icon and color for better visual distinction
    const roleIconId = input.role === "maintainer" ? "user-tie" : "user";
    const roleColor = input.role === "maintainer" ? "blue" : "teal";
    // Map state to an icon and color (active vs pending)
    const stateIconId = input.state === "active" ? "check-circle" : "hourglass-half";
    const stateColor = input.state === "active" ? "green" : "orange";
    // Create a chip for the role
    const roleChip = {
        type: "Chip",
        label: input.role,
        startElement: {
            type: "Icon",
            id: roleIconId,
            color: roleColor,
            size: 16,
        },
        color: roleColor,
        variant: "filled",
        size: "medium",
    };
    // Create a chip for the membership state
    const stateChip = {
        type: "Chip",
        label: input.state,
        startElement: {
            type: "Icon",
            id: stateIconId,
            color: stateColor,
            size: 16,
        },
        color: stateColor,
        variant: "outlined",
        size: "medium",
    };
    // Group the role and state chips together
    const chipsGroup = {
        type: "ChipGroup",
        childrenProps: [roleChip, stateChip],
    };
    // Assemble a vertical card:
    // - Header shows the membership URL with a link icon
    // - Content holds the chip group
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: input.url,
                startElement: {
                    type: "Icon",
                    id: "link",
                    color: "blue",
                    size: 20,
                },
            },
            {
                type: "CardContent",
                childrenProps: [chipsGroup],
            },
        ],
    };
}
//# sourceMappingURL=550.js.map
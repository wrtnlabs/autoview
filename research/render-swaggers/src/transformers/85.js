export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Represent the boolean as a colored chip with an icon for quick visual feedback.
    // True: green chip with a check icon; False: red chip with a times (x) icon.
    const state = Boolean(input);
    const color = state ? "green" : "red";
    const iconId = state ? "check" : "times";
    return {
        type: "Chip",
        label: state ? "True" : "False",
        color,
        variant: "filled",
        startElement: {
            type: "Icon",
            id: iconId,
            color,
            // A moderate size for visibility within the chip
            size: 16,
        },
    };
}
//# sourceMappingURL=85.js.map
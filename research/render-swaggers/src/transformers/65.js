export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Map the boolean value to a corresponding FontAwesome icon and color
    const iconProps = {
        type: "Icon",
        id: input ? "check-circle" : "times-circle", // "check-circle" for true, "times-circle" for false
        color: input ? "green" : "red", // green for true, red for false
        size: 32, // medium size icon, good for mobile & desktop
    };
    // Wrap the icon in a tooltip to provide an accessible text label on hover or tap
    const tooltipProps = {
        type: "Tooltip",
        message: input ? "True" : "False", // textual representation for screen readers
        childrenProps: iconProps,
    };
    return tooltipProps;
}
//# sourceMappingURL=65.js.map
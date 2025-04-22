export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // We visualize a simple numeric input by wrapping it in a badge on top of an icon.
    // This provides an engaging, responsive UI element that works across devices.
    // The badge color reflects positive, negative, or zero values.
    // Determine badge color based on input sign
    const badgeColor = input > 0
        ? "success"
        : input < 0
            ? "error"
            : "gray";
    // Construct the icon that will be decorated by the badge
    const iconProps = {
        type: "Icon",
        id: "hashtag", // Using the 'hashtag' icon to represent a number
        size: 32, // Reasonable size for clarity on all viewports
        color: "blue", // A neutral color for the icon itself
    };
    // Badge will display the numeric value
    const badgeProps = {
        type: "Badge",
        count: input,
        showZero: true, // Explicitly show zero counts
        color: badgeColor, // Visual cue: green=positive, red=negative, gray=zero
        childrenProps: iconProps,
    };
    return badgeProps;
}
//# sourceMappingURL=69.js.map
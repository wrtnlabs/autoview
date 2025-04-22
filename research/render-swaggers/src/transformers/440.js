export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Destructure the relevant field from the input
    const { seats_cancelled } = input;
    // Determine text color based on value (zero seats might be de-emphasized)
    const textColor = seats_cancelled > 0 ? "error" : "gray";
    // 1. Card header: shows the metric name with an icon
    const header = {
        type: "CardHeader",
        title: "Pending Cancellation",
        description: "Seats set for cancellation",
        startElement: {
            type: "Icon",
            id: "user-slash", // FontAwesome icon denoting user removal
            color: seats_cancelled > 0 ? "red" : "gray",
            size: 24
        }
    };
    // 2. Card content: displays the numeric value prominently
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "Text",
            variant: "h3", // Large heading style for emphasis
            color: textColor, // Use error color when >0, gray when 0
            content: seats_cancelled.toString()
        }
    };
    // Compose the vertical card with header and content.
    // This layout is responsive by default and stacks nicely on small screens.
    return {
        type: "VerticalCard",
        childrenProps: [header, content]
    };
}
//# sourceMappingURL=440.js.map
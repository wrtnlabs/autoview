export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Format the created_at timestamp into a human-readable string
    const date = new Date(input.created_at);
    const formattedDate = isNaN(date.getTime())
        ? input.created_at // fallback to the raw string if parsing failed
        : date.toLocaleString();
    // Build the value display component: a colored chip showing +/– value or N/A
    const valueComponent = input.value === null
        ? {
            type: "Chip",
            label: "N/A",
            color: "gray",
            variant: "filled",
            size: "medium",
        }
        : {
            type: "Chip",
            label: `${input.direction === 1 ? "+" : "-"}${input.value}`,
            color: input.direction === 1 ? "green" : "red",
            variant: "filled",
            size: "medium",
        };
    // Card header with an up/down icon indicating direction and the code + date
    const header = {
        type: "CardHeader",
        title: input.code,
        description: formattedDate,
        startElement: {
            type: "Icon",
            id: input.direction === 1 ? "arrow-up" : "arrow-down",
            color: input.direction === 1 ? "green" : "red",
            size: 24,
        },
    };
    // Card content showing the source as an outlined chip
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "Chip",
            label: input.source,
            color: "primary",
            variant: "outlined",
            size: "small",
        },
    };
    // Card footer showing the mileage change component
    const footer = {
        type: "CardFooter",
        childrenProps: valueComponent,
    };
    // Return a vertical card aggregating header, content, and footer
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
}
//# sourceMappingURL=14.js.map
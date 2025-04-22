export function transform($input) {
    return visualizeData($input);
}
// Transforms a page build status into a visual card with a status chip and badge image.
function visualizeData(input) {
    // Normalize status text for matching
    const statusLower = input.status.toLowerCase();
    // Decide on icon and color based on status content
    let iconId = "exclamation-triangle"; // Default warning icon
    let statusColor = "orange";
    if (statusLower.includes("success")) {
        iconId = "check-circle";
        statusColor = "green";
    }
    else if (statusLower.includes("error") || statusLower.includes("fail")) {
        iconId = "times-circle";
        statusColor = "red";
    }
    // Create a Chip component showing the status with an icon
    const statusChip = {
        type: "Chip",
        label: input.status,
        color: statusColor,
        variant: "filled",
        startElement: {
            type: "Icon",
            id: iconId,
            color: statusColor,
        },
    };
    // Assemble a vertical card:
    // - CardHeader displays the title and the status chip
    // - CardMedia shows the badge image at the given URL
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: "Page Build Status",
                startElement: statusChip,
            },
            {
                type: "CardMedia",
                src: input.url,
            },
        ],
    };
}
//# sourceMappingURL=816.js.map
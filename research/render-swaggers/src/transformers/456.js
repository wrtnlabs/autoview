export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no deliveries, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "*No deliveries to display*",
        };
    }
    // Helper to decide icon id and color based on HTTP status code
    const getStatusIcon = (code) => {
        let id = "check-circle"; // default success
        let color = "green";
        if (code >= 300 && code < 400) {
            id = "exclamation-circle";
            color = "yellow";
        }
        else if (code >= 400) {
            id = "times-circle";
            color = "red";
        }
        return {
            type: "Icon",
            id,
            color,
            size: 20,
        };
    };
    // Helper to decide chip color based on HTTP status code
    const getStatusChipColor = (code) => {
        if (code >= 400)
            return "error";
        if (code >= 300)
            return "warning";
        return "success";
    };
    // Build a ListItem for each delivery
    const listItems = input.map((item) => {
        // Format delivered time to a user-friendly local string
        let deliveredAtText;
        try {
            deliveredAtText = new Date(item.delivered_at).toLocaleString();
        }
        catch (_a) {
            deliveredAtText = item.delivered_at; // fallback to raw string
        }
        // Include action in description if present
        const descriptionParts = [deliveredAtText];
        if (item.action) {
            descriptionParts.push(item.action);
        }
        if (item.redelivery) {
            descriptionParts.push("🔄 redelivery");
        }
        const description = descriptionParts.join(" • ");
        // Chips for status_code and duration (ms)
        const statusChip = {
            type: "Chip",
            label: item.status_code.toString(),
            color: getStatusChipColor(item.status_code),
            size: "small",
            variant: "outlined",
        };
        const durationChip = {
            type: "Chip",
            label: `${item.duration} ms`,
            color: "info",
            size: "small",
            variant: "outlined",
        };
        return {
            type: "ListItem",
            title: item.event,
            description,
            startElement: getStatusIcon(item.status_code),
            endElement: [statusChip, durationChip],
        };
    });
    // Wrap all items in a responsive List component
    return {
        type: "List",
        childrenProps: listItems,
    };
}
//# sourceMappingURL=456.js.map
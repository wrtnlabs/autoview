export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Handle empty or missing data gracefully
    if (!input || input.length === 0) {
        return {
            type: "Text",
            // Inform user there is no data
            content: "No subject statistics available",
            variant: "body2",
            color: "tertiary",
        };
    }
    // Transform each record into a ListItemProps
    const listItems = input.map((record) => {
        const { subject_name, subject_id, total_request_count, rate_limited_request_count, last_request_timestamp, last_rate_limited_timestamp, } = record;
        // Use a database icon to represent each subject
        const icon = {
            type: "Icon",
            id: "database",
            color: "blue",
            size: 24,
        };
        // Create Chips for total & rate-limited counts
        const chipTotal = {
            type: "Chip",
            label: `Total: ${total_request_count !== null && total_request_count !== void 0 ? total_request_count : 0}`,
            color: "teal",
            size: "small",
            variant: "outlined",
        };
        const chipRate = {
            type: "Chip",
            label: `Rate‐Limited: ${rate_limited_request_count !== null && rate_limited_request_count !== void 0 ? rate_limited_request_count : 0}`,
            color: "error",
            size: "small",
            variant: "outlined",
        };
        // Build a concise description string with ID and timestamps
        const descParts = [];
        if (subject_id !== undefined)
            descParts.push(`ID: ${subject_id}`);
        if (last_request_timestamp)
            descParts.push(`Last: ${last_request_timestamp}`);
        if (last_rate_limited_timestamp)
            descParts.push(`Last Rate: ${last_rate_limited_timestamp}`);
        const description = descParts.join(" | ");
        return {
            type: "ListItem",
            title: subject_name !== null && subject_name !== void 0 ? subject_name : "Unnamed Subject",
            startElement: icon,
            // Render counts as chips on the right
            endElement: [chipTotal, chipRate],
            // Show ID & timestamps inline under the title
            description,
        };
    });
    // Add a sticky subheader for clarity
    const subheader = {
        type: "ListSubheader",
        stickToTop: true,
        childrenProps: {
            type: "Text",
            content: "API Insights – Subject Stats",
            variant: "h6",
            color: "primary",
        },
    };
    // Compose and return the List component
    return {
        type: "List",
        childrenProps: [subheader, ...listItems],
    };
}
//# sourceMappingURL=459.js.map
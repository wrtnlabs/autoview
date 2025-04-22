export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Extract seats array and total seats, with sensible defaults
    const seats = (_a = input.seats) !== null && _a !== void 0 ? _a : [];
    const totalSeats = (_b = input.total_seats) !== null && _b !== void 0 ? _b : 0;
    // Helper to format ISO date strings to a human-readable date
    function formatDate(isoDate) {
        // Using toLocaleDateString for simplicity; adjust options as needed
        const date = new Date(isoDate);
        return date.toLocaleDateString();
    }
    // Map plan types to chip colors for visual distinction
    const planColorMap = {
        business: "blue",
        enterprise: "orange",
        unknown: "gray",
    };
    // Build a DataListItemProps for each seat
    const dataListItems = seats.map(seat => {
        var _a;
        const assignee = seat.assignee;
        const planType = (_a = seat.plan_type) !== null && _a !== void 0 ? _a : "unknown";
        const lastActivity = seat.last_activity_at;
        const pendingDate = seat.pending_cancellation_date;
        // Label for the row: avatar + login
        const labelComponents = [
            {
                type: "Avatar",
                src: assignee.avatar_url,
                name: assignee.login,
                size: 28,
            },
            {
                type: "Text",
                content: assignee.login,
                variant: "body1",
                // Small left margin to separate from avatar
                color: "primary",
            },
        ];
        // Value for the row: chips and text items for details
        const valueComponents = [];
        // Plan type chip
        valueComponents.push({
            type: "Chip",
            label: planType.charAt(0).toUpperCase() + planType.slice(1),
            color: planColorMap[planType] || "gray",
            size: "small",
            variant: "outlined",
        });
        // Last activity date as a text with an icon
        if (lastActivity) {
            valueComponents.push({
                type: "Text",
                content: [`🕒 ${formatDate(lastActivity)}`],
                variant: "caption",
                color: "secondary",
            });
        }
        // Pending cancellation date as a warning chip
        if (pendingDate) {
            valueComponents.push({
                type: "Chip",
                label: `Cancel on ${formatDate(pendingDate)}`,
                color: "warning",
                size: "small",
                variant: "outlined",
            });
        }
        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponents,
        };
    });
    // Compose the overall UI as a vertical card with header and content
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                // Card header with title and total seats badge
                type: "CardHeader",
                title: "GitHub Copilot Seats",
                description: `Total Seats: ${totalSeats}`,
                startElement: {
                    type: "Badge",
                    count: totalSeats,
                    showZero: true,
                    childrenProps: {
                        type: "Icon",
                        id: "users",
                        color: "blue",
                        size: 20,
                    },
                },
            },
            {
                // Card content with a DataList of seat details
                type: "CardContent",
                childrenProps: {
                    type: "DataList",
                    childrenProps: dataListItems,
                },
            },
        ],
    };
}
//# sourceMappingURL=439.js.map
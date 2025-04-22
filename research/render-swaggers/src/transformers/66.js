export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    /**
     * Safely format an ISO date-time string into a localized human-readable form.
     * Falls back to the raw string if parsing fails.
     */
    function formatDate(dateString) {
        try {
            const d = new Date(dateString);
            if (!isNaN(d.getTime())) {
                return d.toLocaleString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                });
            }
        }
        catch (_a) {
            // ignore and return raw
        }
        return dateString;
    }
    // Build an array of DataListItemProps to represent each field with icons.
    const rows = [];
    // Row for the unique identifier
    rows.push({
        type: "DataListItem",
        label: [
            { type: "Icon", id: "hashtag", color: "cyan" },
            { type: "Text", content: "ID", variant: "body2" },
        ],
        value: { type: "Text", content: input.id, variant: "body1" },
    });
    // Row for creation timestamp
    rows.push({
        type: "DataListItem",
        label: [
            { type: "Icon", id: "calendar-plus", color: "blue" },
            { type: "Text", content: "Created", variant: "body2" },
        ],
        value: { type: "Text", content: formatDate(input.created_at), variant: "body1" },
    });
    // Row for payment status and timestamp
    const paidAt = input.paid_at;
    const paidIcon = paidAt ? "check-circle" : "hourglass-half";
    const paidColor = paidAt ? "green" : "orange";
    rows.push({
        type: "DataListItem",
        label: [
            { type: "Icon", id: paidIcon, color: paidColor },
            { type: "Text", content: "Paid", variant: "body2" },
        ],
        value: {
            type: "Text",
            content: paidAt ? formatDate(paidAt) : "Pending",
            variant: "body1",
            // dim text if still pending
            color: paidAt ? undefined : "gray",
        },
    });
    // Row for cancellation status and timestamp
    const cancelledAt = input.cancelled_at;
    rows.push({
        type: "DataListItem",
        label: [
            { type: "Icon", id: "ban", color: "red" },
            { type: "Text", content: "Cancelled", variant: "body2" },
        ],
        value: {
            type: "Text",
            content: cancelledAt ? formatDate(cancelledAt) : "N/A",
            variant: "body1",
            color: cancelledAt ? undefined : "gray",
        },
    });
    // Return a DataList component that lays out the rows responsively
    return {
        type: "DataList",
        childrenProps: rows,
    };
}
//# sourceMappingURL=66.js.map
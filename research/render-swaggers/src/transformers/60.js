export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there's no ticket data, show a friendly markdown message
    if (!Array.isArray(input.data) || input.data.length === 0) {
        return {
            type: "Markdown",
            content: "## No coupon tickets available"
        };
    }
    // Helpers to format ISO strings into local date/time
    const formatDateTime = (iso) => {
        if (!iso)
            return "N/A";
        try {
            return new Date(iso).toLocaleString();
        }
        catch (_a) {
            return iso;
        }
    };
    const formatDate = (iso) => {
        if (!iso)
            return "Never";
        try {
            return new Date(iso).toLocaleDateString();
        }
        catch (_a) {
            return iso;
        }
    };
    // Transform each coupon ticket into a DataListItem
    const items = input.data.map((ticket) => {
        var _a, _b, _c, _d;
        const createdAt = formatDateTime(ticket.created_at);
        const expiredAt = formatDate(ticket.expired_at);
        // Fallback to ID if coupon name is missing
        const couponName = (_d = (_b = (_a = ticket.coupon) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : (_c = ticket.coupon) === null || _c === void 0 ? void 0 : _c.id) !== null && _d !== void 0 ? _d : "Unknown Coupon";
        // Label area: a ticket icon + the coupon name
        const labelComponents = [
            {
                type: "Icon",
                id: "ticket-alt",
                size: 16,
                color: "blue"
            },
            {
                type: "Text",
                variant: "body1",
                content: couponName
            }
        ];
        // Value area: show issued time and expiration with small icons
        const valueComponents = [
            {
                type: "Icon",
                id: "clock",
                size: 12,
                color: "gray"
            },
            {
                type: "Text",
                variant: "caption",
                content: ` Issued: ${createdAt}`
            },
            {
                type: "Icon",
                id: "calendar",
                size: 12,
                color: "gray"
            },
            {
                type: "Text",
                variant: "caption",
                content: ` Expires: ${expiredAt}`
            }
        ];
        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponents
        };
    });
    // Wrap all items in a DataList for responsive display
    return {
        type: "DataList",
        childrenProps: items
    };
}
//# sourceMappingURL=60.js.map
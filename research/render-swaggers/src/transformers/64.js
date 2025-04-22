export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d;
    // Destructure frequently used fields
    const { id, created_at, value, customer } = input;
    // Format creation timestamp for readability
    const formattedDate = (() => {
        try {
            return new Date(created_at).toLocaleString();
        }
        catch (_a) {
            return created_at; // fallback to raw string if invalid
        }
    })();
    // Format monetary value; assume USD by default
    const formattedValue = new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "USD",
    }).format(value);
    // Safely extract nested customer info with fallbacks
    const channelName = (_b = (_a = customer === null || customer === void 0 ? void 0 : customer.channel) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "Unknown";
    const ipAddress = (_c = customer === null || customer === void 0 ? void 0 : customer.ip) !== null && _c !== void 0 ? _c : "Unknown";
    const referrer = (_d = customer === null || customer === void 0 ? void 0 : customer.referrer) !== null && _d !== void 0 ? _d : null;
    // Build a list of key/value pairs to display in a DataList
    const dataListItems = [
        {
            type: "DataListItem",
            label: { type: "Text", content: "Deposit ID" },
            value: { type: "Text", content: id },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Channel" },
            value: { type: "Text", content: channelName },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "IP Address" },
            value: { type: "Text", content: ipAddress },
        },
        // Only include referrer if present
        ...(referrer
            ? [
                {
                    type: "DataListItem",
                    label: { type: "Text", content: "Referrer" },
                    // Use Markdown so that links are clickable
                    value: {
                        type: "Markdown",
                        content: `[${referrer}](${referrer})`,
                    },
                },
            ]
            : []),
    ];
    // Compose the final VerticalCard with a header and content section
    return {
        type: "VerticalCard",
        childrenProps: [
            // Card header shows the formatted value and timestamp, with an icon
            {
                type: "CardHeader",
                title: formattedValue,
                description: formattedDate,
                startElement: {
                    type: "Icon",
                    id: "dollar-sign", // FontAwesome "dollar-sign" icon
                    color: "green",
                },
            },
            // Card content holds the DataList of detailed properties
            {
                type: "CardContent",
                childrenProps: {
                    type: "DataList",
                    childrenProps: dataListItems,
                },
            },
        ],
    };
}
//# sourceMappingURL=64.js.map
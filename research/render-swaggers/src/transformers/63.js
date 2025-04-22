export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    const { pagination, data } = input;
    // Header summary as markdown: shows page, total records
    const headerMarkdown = {
        type: "Markdown",
        content: `### Deposit Charges — Page ${pagination.current}/${pagination.pages}  
_Total records: ${pagination.records}_`
    };
    // Transform each record into a DataListItem
    const listItems = data.map((record) => {
        var _a, _b, _c;
        // 1) Record ID and created date with icon
        const rawDate = record.created_at;
        const dateObj = new Date(rawDate);
        const formattedDate = isNaN(dateObj.getTime())
            ? rawDate
            : dateObj.toLocaleString();
        const idText = {
            type: "Text",
            variant: "body2",
            content: [`ID: ${record.id}`]
        };
        // Date with calendar icon
        const dateText = {
            type: "Text",
            variant: "caption",
            content: [
                { type: "Icon", id: "calendar", size: 12, color: "gray" },
                ` ${formattedDate}`
            ]
        };
        // 2) Channel as a chip
        const channelName = (_c = (_b = (_a = record.customer) === null || _a === void 0 ? void 0 : _a.channel) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : "Unknown channel";
        const channelChip = {
            type: "Chip",
            label: channelName,
            variant: "outlined",
            color: "info",
            size: "small"
        };
        // 3) Deposit value as a filled chip with currency formatting
        const valueLabel = record.value.toLocaleString(undefined, {
            style: "currency",
            currency: "USD"
        });
        const valueChip = {
            type: "Chip",
            label: valueLabel,
            variant: "filled",
            color: "success",
            size: "small"
        };
        return {
            type: "DataListItem",
            // Combine ID, date, and channel chip in the label section
            label: [idText, dateText, channelChip],
            // Show the monetary value as the value section
            value: valueChip
        };
    });
    // Compose the data list
    const dataList = {
        type: "DataList",
        childrenProps: listItems
    };
    // Wrap everything in a card for responsiveness and mobile friendliness
    const cardHeader = {
        type: "CardHeader",
        title: "Shopping Deposit Charges",
        description: `Page ${pagination.current} of ${pagination.pages}`
    };
    const cardContent = {
        type: "CardContent",
        childrenProps: [headerMarkdown, dataList]
    };
    const rootCard = {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent]
    };
    return rootCard;
}
//# sourceMappingURL=63.js.map
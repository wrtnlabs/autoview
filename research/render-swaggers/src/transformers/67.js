export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Extract pagination and data array
    const { pagination, data } = input;
    // Safely get the first citizen for header display (all records belong to the same citizen)
    const firstCitizen = (_a = data[0]) === null || _a === void 0 ? void 0 : _a.citizen;
    const citizenName = (_b = firstCitizen === null || firstCitizen === void 0 ? void 0 : firstCitizen.name) !== null && _b !== void 0 ? _b : "";
    const citizenMobile = firstCitizen === null || firstCitizen === void 0 ? void 0 : firstCitizen.mobile;
    // Build the CardHeader: show citizen avatar, name and mobile
    const cardHeader = Object.assign({ type: "CardHeader", title: citizenName ? `${citizenName}'s Deposit History` : "Deposit History", description: citizenMobile }, (citizenName
        ? {
            startElement: {
                type: "Avatar",
                name: citizenName,
                // Optional: choose a variant color
                variant: "primary",
            },
        }
        : {}));
    // Build a DataList of each deposit history record
    const dataListItems = data.map((item) => {
        // Direction arrow icon: up for deposit, down for withdrawal
        const directionIcon = {
            type: "Icon",
            id: item.deposit.direction === 1 ? "arrow-up" : "arrow-down",
            color: item.deposit.direction === 1 ? "green" : "red",
            size: 16,
        };
        // Format date string (fallback to raw if Date parsing fails)
        let dateLabel = item.created_at;
        try {
            dateLabel = new Date(item.created_at).toLocaleString();
        }
        catch (_a) {
            // keep raw timestamp
        }
        // Text components for label: date, deposit code, source
        const labelComponents = [
            directionIcon,
            {
                type: "Text",
                variant: "subtitle2",
                content: dateLabel,
            },
            {
                type: "Text",
                variant: "caption",
                content: `Code: ${item.deposit.code}`,
                color: "#666", // subdued color for metadata
            },
            {
                type: "Text",
                variant: "caption",
                content: `Via: ${item.deposit.source}`,
                color: "#666",
            },
        ];
        // Text components for value: deposit amount and resulting balance
        const valueComponents = [
            {
                type: "Text",
                variant: "body1",
                content: `$${item.value.toFixed(2)}`,
                color: item.deposit.direction === 1 ? "green" : "red",
            },
            {
                type: "Text",
                variant: "body2",
                content: `Balance: $${item.balance.toFixed(2)}`,
                color: "#333",
            },
        ];
        // Return a DataListItem combining label and value
        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponents,
        };
    });
    // Compose the DataList component
    const dataList = {
        type: "DataList",
        childrenProps: dataListItems,
    };
    // Footer showing current page / total pages
    const pageInfoText = {
        type: "Text",
        variant: "caption",
        content: `Page ${pagination.current} of ${pagination.pages}`,
        color: "#888",
    };
    const cardFooter = {
        type: "CardFooter",
        childrenProps: pageInfoText,
    };
    // Assemble the VerticalCard with header, content (DataList), and footer
    const verticalCard = {
        type: "VerticalCard",
        childrenProps: [
            cardHeader,
            {
                type: "CardContent",
                childrenProps: dataList,
            },
            cardFooter,
        ],
    };
    return verticalCard;
}
//# sourceMappingURL=67.js.map
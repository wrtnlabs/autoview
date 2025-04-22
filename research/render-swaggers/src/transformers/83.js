export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    const { deposit, mileage, combinations } = input;
    // Card header showing overall deposit and mileage with relevant icons
    const header = {
        type: "CardHeader",
        title: "Discountable Order",
        description: `Deposit: ${deposit}, Mileage: ${mileage}`,
        startElement: {
            type: "Icon",
            id: "wallet", // icon representing money/deposit
            size: 24,
            color: "teal",
        },
        endElement: {
            type: "Icon",
            id: "road", // icon representing mileage
            size: 24,
            color: "cyan",
        },
    };
    // Build a data list of each discount combination
    const listItems = combinations.map((comb, idx) => {
        var _a, _b, _c, _d, _e, _f;
        const couponsCount = (_b = (_a = comb.coupons) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
        const ticketsCount = (_d = (_c = comb.tickets) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0;
        const entriesCount = (_f = (_e = comb.entries) === null || _e === void 0 ? void 0 : _e.length) !== null && _f !== void 0 ? _f : 0;
        const amount = comb.amount;
        // Use markdown to present each combination's details as a bullet list
        // Two spaces + newline for markdown line break in AutoView Markdown component
        const detailLines = [
            `**Coupons**: ${couponsCount}`,
            `**Tickets**: ${ticketsCount}`,
            `**Entries**: ${entriesCount}`,
            `**Amount**: $${amount.toFixed(2)}`,
        ];
        const markdownContent = "- " + detailLines.join("  \n- ");
        return {
            type: "DataListItem",
            // Label for the combination
            label: {
                type: "Text",
                variant: "subtitle2",
                content: `Combination #${idx + 1}`,
            },
            // Detailed breakdown in markdown
            value: {
                type: "Markdown",
                content: markdownContent,
            },
        };
    });
    // Compose card content: an intro text plus the data list (or a fallback message)
    const contentChildren = [
        {
            type: "Text",
            variant: "body1",
            content: [
                "Below are possible discount combinations using your deposit and mileage."
            ],
        },
    ];
    if (listItems.length > 0) {
        contentChildren.push({
            type: "DataList",
            childrenProps: listItems,
        });
    }
    else {
        // Graceful handling when no combinations are available
        contentChildren.push({
            type: "Text",
            variant: "body2",
            content: ["No discount combinations available."],
        });
    }
    const cardContent = {
        type: "CardContent",
        childrenProps: contentChildren,
    };
    // Return a vertical card combining header and content
    return {
        type: "VerticalCard",
        childrenProps: [
            header,
            cardContent,
        ],
    };
}
//# sourceMappingURL=83.js.map
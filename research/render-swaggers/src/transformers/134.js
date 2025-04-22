export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Helper: format a date-time string into a locale-aware short date
    const formatDate = (dt) => {
        if (!dt)
            return undefined;
        try {
            return new Date(dt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
        }
        catch (_a) {
            return undefined;
        }
    };
    // Build DataListItems for each sale unit, summarizing its price range and total inventory
    const unitItems = input.units.map((unit) => {
        // Collect real prices across all stocks
        const realPrices = unit.stocks.map((s) => s.price.real);
        const minPrice = Math.min(...realPrices);
        const maxPrice = Math.max(...realPrices);
        // Compute total available inventory for the unit (income - outcome)
        const totalInventory = unit.stocks.reduce((sum, s) => {
            const inv = (s.inventory.income || 0) - (s.inventory.outcome || 0);
            return sum + inv;
        }, 0);
        // Label as unit.name, styled as subtitle
        const label = {
            type: "Text",
            variant: "subtitle1",
            content: unit.name,
        };
        // Value uses a ChipGroup to display the price range and inventory count
        const priceLabel = minPrice === maxPrice ? `${minPrice}` : `${minPrice} - ${maxPrice}`;
        const chips = [
            {
                type: "Chip",
                label: `Price: ${priceLabel}`,
                color: "primary",
                variant: "filled",
            },
            {
                type: "Chip",
                label: `Stock: ${totalInventory}`,
                color: "info",
                variant: "outlined",
            },
        ];
        const value = {
            type: "ChipGroup",
            childrenProps: chips,
        };
        return {
            type: "DataListItem",
            label,
            value,
        };
    });
    // Optional media: show the first thumbnail if available
    const firstThumb = (_a = input.content.thumbnails) === null || _a === void 0 ? void 0 : _a[0];
    const media = firstThumb
        ? {
            type: "CardMedia",
            src: firstThumb.url,
        }
        : undefined;
    // Card header: title, opened date, and a tag icon for visual cue
    const header = {
        type: "CardHeader",
        title: input.content.title,
        description: formatDate(input.opened_at) ? `Opened: ${formatDate(input.opened_at)}` : undefined,
        startElement: {
            type: "Icon",
            id: "tags",
            color: "gray",
            size: 20,
        },
    };
    // Main content: markdown-rendered sale body
    const markdown = {
        type: "Markdown",
        content: input.content.body,
    };
    // Unit list as DataList
    const unitsList = {
        type: "DataList",
        childrenProps: unitItems,
    };
    // Assemble the vertical card
    const card = {
        type: "VerticalCard",
        childrenProps: [
            header,
            media !== null && media !== void 0 ? media : { type: "CardMedia", src: "" }, // empty media if none to maintain structure
            { type: "CardContent", childrenProps: markdown },
            { type: "CardContent", childrenProps: unitsList },
        ],
    };
    return card;
}
//# sourceMappingURL=134.js.map
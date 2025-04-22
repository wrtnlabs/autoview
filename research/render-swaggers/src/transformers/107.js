export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Extract the first thumbnail URL if available for featured image
    const firstThumbnailUrl = (_b = (_a = input.content.thumbnails) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.url;
    // Compute price range across all stocks in all units
    const allPrices = [];
    for (const unit of input.units || []) {
        for (const stock of unit.stocks || []) {
            allPrices.push(stock.price.real);
        }
    }
    // Fallback to zero if there are no prices
    const minPrice = allPrices.length ? Math.min(...allPrices) : 0;
    const maxPrice = allPrices.length ? Math.max(...allPrices) : 0;
    // Build category chips for display
    const categoryChips = (input.categories || []).map(cat => ({
        type: "Chip",
        label: cat.name,
        variant: "outlined"
    }));
    // Build tag chips for display
    const tagChips = (input.tags || []).map(t => ({
        type: "Chip",
        label: t,
        variant: "filled",
        color: "info"
    }));
    // Build a data list of units and their variant counts
    const unitListItems = (input.units || []).map(unit => ({
        type: "DataListItem",
        // Use Text components for labels and values
        label: [
            {
                type: "Text",
                content: unit.name,
                variant: "subtitle2"
            }
        ],
        value: [
            {
                type: "Text",
                content: `${unit.stocks.length} variant${unit.stocks.length !== 1 ? "s" : ""}`,
                variant: "body2",
                color: "gray"
            }
        ]
    }));
    const unitsList = {
        type: "DataList",
        childrenProps: unitListItems
    };
    // Compose the CardHeader with avatar, title, and format badge
    const cardHeader = {
        type: "CardHeader",
        title: input.content.title,
        description: `Format: ${input.content.format.toUpperCase()}`,
        // Show seller's name as an avatar with initials
        startElement: {
            type: "Avatar",
            name: input.seller.citizen.name,
            variant: "primary"
        }
    };
    // Optional featured image
    const cardMedia = firstThumbnailUrl
        ? {
            type: "CardMedia",
            src: firstThumbnailUrl
        }
        : undefined;
    // Compose the main content: markdown body, categories, tags, and units list
    const cardContentChildren = [
        {
            type: "Markdown",
            content: input.content.body
        },
        // Category chip group
        {
            type: "ChipGroup",
            childrenProps: categoryChips,
            maxItems: 6
        },
        // Tag chip group
        {
            type: "ChipGroup",
            childrenProps: tagChips,
            maxItems: 8
        },
        // Units data list
        unitsList
    ];
    const cardContent = {
        type: "CardContent",
        childrenProps: cardContentChildren
    };
    // Compose the footer showing price range
    const priceText = minPrice === maxPrice
        ? `$${minPrice.toFixed(2)}`
        : `$${minPrice.toFixed(2)} - $${maxPrice.toFixed(2)}`;
    const cardFooter = {
        type: "CardFooter",
        childrenProps: {
            type: "Text",
            content: priceText,
            variant: "body1",
            color: "primary"
        }
    };
    // Assemble the vertical card
    const cardChildren = [
        cardHeader,
        // Conditionally include media if exists
        ...(cardMedia ? [cardMedia] : []),
        cardContent,
        cardFooter
    ];
    return {
        type: "VerticalCard",
        childrenProps: cardChildren
    };
}
//# sourceMappingURL=107.js.map
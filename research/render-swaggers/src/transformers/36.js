export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Header icon indicating snapshot
    const headerIcon = {
        type: "Icon",
        id: "clone",
        size: 20,
        color: "blue",
    };
    // Status chip for latest vs historical snapshot
    const statusChip = {
        type: "Chip",
        label: input.latest ? "Latest" : "Snapshot",
        color: input.latest ? "success" : "gray",
        variant: input.latest ? "filled" : "outlined",
        size: "small",
    };
    const cardHeader = {
        type: "CardHeader",
        title: input.content.title,
        description: input.latest
            ? `Snapshot ID: ${input.snapshot_id}`
            : `Sale ID: ${input.id}`,
        startElement: headerIcon,
        endElement: statusChip,
    };
    // Show the first thumbnail if available
    const firstThumb = (_a = input.content.thumbnails) === null || _a === void 0 ? void 0 : _a[0];
    const cardMedia = firstThumb
        ? {
            type: "CardMedia",
            src: firstThumb.url,
        }
        : undefined;
    // Build chip group for categories
    const categoryChips = (input.categories || []).map((cat) => ({
        type: "Chip",
        label: cat.name,
        variant: "outlined",
        size: "small",
        color: "secondary",
    }));
    const categoriesGroup = categoryChips.length > 0
        ? { type: "ChipGroup", childrenProps: categoryChips, maxItems: 5 }
        : undefined;
    // Build chip group for tags
    const tagChips = (input.tags || []).map((tag) => ({
        type: "Chip",
        label: tag,
        variant: "filled",
        size: "small",
        color: "info",
    }));
    const tagsGroup = tagChips.length > 0
        ? { type: "ChipGroup", childrenProps: tagChips, maxItems: 8 }
        : undefined;
    // Build a DataList of units, marking primary/required
    const unitItems = (input.units || []).map((unit) => {
        const labelText = {
            type: "Text",
            content: unit.name,
            variant: "subtitle1",
        };
        const valueChips = [];
        if (unit.primary) {
            valueChips.push({
                type: "Chip",
                label: "Primary",
                color: "success",
                variant: "filled",
                size: "small",
            });
        }
        if (unit.required) {
            valueChips.push({
                type: "Chip",
                label: "Required",
                color: "warning",
                variant: "outlined",
                size: "small",
            });
        }
        return {
            type: "DataListItem",
            label: [labelText],
            value: valueChips.length > 0 ? valueChips : undefined,
        };
    });
    const unitsList = unitItems.length > 0
        ? { type: "DataList", childrenProps: unitItems }
        : undefined;
    // Render the main content as markdown or text
    const contentElement = input.content.format === "md"
        ? { type: "Markdown", content: input.content.body }
        : {
            type: "Text",
            content: input.content.body,
            variant: "body1",
        };
    // Compute price range for footer
    const prices = [];
    (_b = input.units) === null || _b === void 0 ? void 0 : _b.forEach((unit) => { var _a; return (_a = unit.stocks) === null || _a === void 0 ? void 0 : _a.forEach((stock) => prices.push(stock.price.real)); });
    const priceFooter = prices.length > 0
        ? {
            type: "CardFooter",
            childrenProps: [
                {
                    type: "Text",
                    content: prices.length > 1
                        ? `Price: ${Math.min(...prices)} – ${Math.max(...prices)}`
                        : `Price: ${prices[0]}`,
                    variant: "subtitle2",
                },
            ],
        }
        : undefined;
    // Aggregate all content children
    const contentChildren = [];
    if (categoriesGroup)
        contentChildren.push(categoriesGroup);
    if (tagsGroup)
        contentChildren.push(tagsGroup);
    if (unitsList)
        contentChildren.push(unitsList);
    contentChildren.push(contentElement);
    const cardContent = {
        type: "CardContent",
        childrenProps: contentChildren,
    };
    // Assemble the vertical card
    const verticalCard = {
        type: "VerticalCard",
        childrenProps: [
            cardHeader,
            ...(cardMedia ? [cardMedia] : []),
            cardContent,
            ...(priceFooter ? [priceFooter] : []),
        ],
    };
    return verticalCard;
}
//# sourceMappingURL=36.js.map
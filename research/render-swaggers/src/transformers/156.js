export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Build CardHeader: show sale title, section, marker for "latest" snapshot
    const header = Object.assign({ type: "CardHeader", title: input.content.title, 
        // show section name as description
        description: input.section.name, 
        // left icon indicating categories
        startElement: {
            type: "Icon",
            id: "tags", // represents categories/tags
            color: "cyan",
            size: 24,
        } }, (input.latest && {
        endElement: {
            type: "Chip",
            label: "Latest",
            color: "success",
            variant: "filled",
            size: "small",
        },
    }));
    // Optionally show the first thumbnail as media if available
    const media = input.content.thumbnails && input.content.thumbnails.length > 0
        ? {
            type: "CardMedia",
            src: input.content.thumbnails[0].url,
        }
        : null;
    // Build Markdown component for the body description
    const markdownBody = {
        type: "Markdown",
        content: input.content.body,
    };
    // Build ChipGroup for search tags
    const tagChips = {
        type: "ChipGroup",
        childrenProps: input.tags.map((tag) => ({
            type: "Chip",
            label: tag,
            variant: "outlined",
            size: "small",
        })),
        maxItems: 5,
    };
    // Combine them into CardContent
    const content = {
        type: "CardContent",
        childrenProps: [markdownBody, tagChips],
    };
    // Build a DataList of units and their stock options
    const unitListItems = input.units.map((unit) => {
        // for each stock, build a Chip
        const stockChips = {
            type: "ChipGroup",
            childrenProps: unit.stocks.map((stock) => ({
                type: "Chip",
                label: `${stock.name} — $${stock.price.real.toFixed(2)}`,
                variant: "filled",
                size: "small",
                color: "primary",
            })),
            maxItems: 4,
        };
        return {
            type: "DataListItem",
            // label is unit name
            label: {
                type: "Text",
                content: unit.name,
                variant: "subtitle1",
                color: "primary",
            },
            // value shows all stock choices as chips
            value: stockChips,
        };
    });
    // Wrap the list items in a DataList
    const dataList = {
        type: "DataList",
        childrenProps: unitListItems,
    };
    // Footer shows the unit list
    const footer = {
        type: "CardFooter",
        childrenProps: dataList,
    };
    // Compose the vertical card, filtering out any null media
    const children = [header, media, content, footer].filter((comp) => comp !== null);
    return {
        type: "VerticalCard",
        childrenProps: children,
    };
}
//# sourceMappingURL=156.js.map
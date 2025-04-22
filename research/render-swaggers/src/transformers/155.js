export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Destructure frequently used fields
    const { content, categories, tags, units } = input;
    // 1. Card Header: display title and format
    const header = {
        type: "CardHeader",
        title: content.title,
        description: `Format: ${content.format.toUpperCase()}`,
    };
    // 2. Card Media: show all thumbnails (if any)
    //    Each thumbnail becomes its own CardMedia component
    const mediaComponents = (content.thumbnails || []).map((thumb) => ({
        type: "CardMedia",
        src: thumb.url,
    }));
    // 3. Card Content: render the main body as Markdown for rich text support
    const markdownContent = {
        type: "Markdown",
        content: content.body,
    };
    const cardContent = {
        type: "CardContent",
        childrenProps: markdownContent,
    };
    // 4. Category Chips: one chip per category, in an outlined style
    const categoryChips = (categories || []).map((cat) => ({
        type: "Chip",
        label: cat.name,
        size: "small",
        variant: "outlined",
        color: "primary",
    }));
    const categoriesGroup = {
        type: "ChipGroup",
        childrenProps: categoryChips,
        maxItems: 5, // collapse if too many
    };
    // 5. Tag Chips: one filled chip per tag, secondary color
    const tagChips = (tags || []).map((t) => ({
        type: "Chip",
        label: t,
        size: "small",
        variant: "filled",
        color: "secondary",
    }));
    const tagsGroup = {
        type: "ChipGroup",
        childrenProps: tagChips,
        maxItems: 10,
    };
    // 6. Units DataList: list each unit with a badge showing number of stocks
    const unitItems = (units || []).map((unit) => {
        // Label: unit name
        const labelText = {
            type: "Text",
            content: unit.name,
            variant: "body1",
        };
        // Value: badge with count of stock variants
        const stockBadge = {
            type: "Badge",
            count: unit.stocks.length,
            maxCount: 9999,
            showZero: true,
            // Use an icon to make the badge more visual
            childrenProps: {
                type: "Icon",
                id: "box", // assume "box" icon for stock representation
                size: 16,
            },
        };
        return {
            type: "DataListItem",
            label: labelText,
            value: stockBadge,
        };
    });
    const unitsList = {
        type: "DataList",
        childrenProps: unitItems,
    };
    // 7. Card Footer: assemble categories, tags, and units into one footer
    const cardFooter = {
        type: "CardFooter",
        childrenProps: [
            { type: "Text", content: "Categories:", variant: "subtitle1" },
            categoriesGroup,
            { type: "Text", content: "Tags:", variant: "subtitle1" },
            tagsGroup,
            { type: "Text", content: "Units:", variant: "subtitle1" },
            unitsList,
        ],
    };
    // 8. Assemble the VerticalCard with all parts in order
    const verticalCard = {
        type: "VerticalCard",
        childrenProps: [
            header,
            // Spread mediaComponents only if we have thumbnails
            ...mediaComponents,
            cardContent,
            cardFooter,
        ],
    };
    return verticalCard;
}
//# sourceMappingURL=155.js.map
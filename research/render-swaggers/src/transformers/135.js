export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    const { section, seller, content, categories, tags, units } = input;
    // Prepare the card header with title and a subtitle showing section and seller info
    const header = {
        type: "CardHeader",
        title: content.title,
        description: `${section.name} | Seller: ${seller.member.nickname}`,
    };
    // If there are thumbnails, use the first one as the card media
    const media = content.thumbnails && content.thumbnails.length > 0
        ? {
            type: "CardMedia",
            src: content.thumbnails[0].url,
        }
        : undefined;
    // Build the content section of the card
    const contentChildren = [];
    // Render the main body: prefer Markdown for md format, fallback to Text
    if (content.format === "md") {
        contentChildren.push({
            type: "Markdown",
            content: content.body,
        });
    }
    else {
        contentChildren.push({
            type: "Text",
            content: content.body,
        });
    }
    // Visualize categories as a chip group for quick scanning
    if (categories.length > 0) {
        contentChildren.push({
            type: "ChipGroup",
            childrenProps: categories.map((cat) => ({
                type: "Chip",
                label: cat.name,
                // You could assign colors dynamically if needed
            })),
        });
    }
    // Visualize tags as a secondary-colored chip group
    if (tags.length > 0) {
        contentChildren.push({
            type: "ChipGroup",
            childrenProps: tags.map((tag) => ({
                type: "Chip",
                label: tag,
                color: "secondary",
            })),
        });
    }
    // List the sale units and how many stock configurations each has
    if (units.length > 0) {
        contentChildren.push({
            type: "DataList",
            childrenProps: units.map((unit) => ({
                type: "DataListItem",
                // Unit name
                label: [
                    {
                        type: "Text",
                        content: unit.name,
                    },
                ],
                // Number of stock combinations available
                value: [
                    {
                        type: "Text",
                        content: `${unit.stocks.length} configurations`,
                    },
                ],
            })),
        });
    }
    const cardContent = {
        type: "CardContent",
        childrenProps: contentChildren,
    };
    // Assemble all parts into a vertical card
    const childrenProps = [
        header,
        media,
        cardContent,
    ]
        .filter((c) => !!c);
    return {
        type: "VerticalCard",
        childrenProps,
    };
}
//# sourceMappingURL=135.js.map
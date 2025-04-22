export function transform($input) {
    return visualizeData($input);
}
// Transforms a shopping sale into a visual AutoView component.
function visualizeData(input) {
    // 1. Card header: show title, section and seller nickname
    const header = {
        type: "CardHeader",
        title: input.content.title,
        description: input.section.name,
        // show seller nickname on the right
        endElement: {
            type: "Text",
            content: input.seller.member.nickname,
            variant: "caption",
        },
    };
    // 2. Card media: display first thumbnail if available
    let media;
    if (input.content.thumbnails && input.content.thumbnails.length > 0) {
        media = {
            type: "CardMedia",
            src: input.content.thumbnails[0].url,
        };
    }
    // 3. Card content: render body as markdown for rich text support
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "Markdown",
            content: input.content.body,
        },
    };
    // 4. Footer: build chips for categories and tags + show unit count
    const categoryChips = input.categories.map(cat => ({
        type: "Chip",
        label: cat.name,
        variant: "filled",
        size: "small",
        color: "primary",
    }));
    const tagChips = input.tags.map(tag => ({
        type: "Chip",
        label: `#${tag}`,
        variant: "outlined",
        size: "small",
        color: "secondary",
    }));
    const unitCountText = {
        type: "Text",
        content: `Units: ${input.units.length}`,
        variant: "caption",
    };
    const footer = {
        type: "CardFooter",
        childrenProps: [
            ...categoryChips,
            ...tagChips,
            unitCountText,
        ],
    };
    // 5. Assemble VerticalCard children in order, omitting media if none
    const cardChildren = [
        header,
        ...(media ? [media] : []),
        content,
        footer,
    ];
    return {
        type: "VerticalCard",
        childrenProps: cardChildren,
    };
}
//# sourceMappingURL=88.js.map
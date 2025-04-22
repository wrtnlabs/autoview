export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d, _e;
    // Card header showing sale title and ID
    const cardHeader = {
        type: "CardHeader",
        title: input.content.title,
        description: `Sale ID: ${input.id}`,
    };
    // Pick a representative media (thumbnail first, then files)
    const firstMedia = ((_a = input.content.thumbnails) === null || _a === void 0 ? void 0 : _a[0]) ||
        ((_b = input.content.files) === null || _b === void 0 ? void 0 : _b[0]) ||
        null;
    // Prepare content components
    const contentChildren = [];
    // 1. Main description as Markdown (responsive, rich)
    if (input.content.body) {
        contentChildren.push({
            type: "Markdown",
            content: input.content.body,
        });
    }
    // 2. Categories as filled chips (visually distinct)
    if ((_c = input.categories) === null || _c === void 0 ? void 0 : _c.length) {
        const categoryChips = input.categories.map(cat => ({
            type: "Chip",
            label: cat.name,
            variant: "filled",
            color: "primary",
        }));
        contentChildren.push({
            type: "ChipGroup",
            childrenProps: categoryChips,
        });
    }
    // 3. Tags as outlined chips
    if ((_d = input.tags) === null || _d === void 0 ? void 0 : _d.length) {
        const tagChips = input.tags.map(tag => ({
            type: "Chip",
            label: tag,
            variant: "outlined",
            color: "secondary",
        }));
        contentChildren.push({
            type: "ChipGroup",
            childrenProps: tagChips,
        });
    }
    // 4. Units and their stocks in a DataList
    if ((_e = input.units) === null || _e === void 0 ? void 0 : _e.length) {
        const unitItems = input.units.map(unit => {
            // Label for the unit, marking primary/required
            const unitLabel = {
                type: "Text",
                variant: "subtitle1",
                content: [
                    `${unit.name}${unit.primary ? " (Primary)" : ""}${unit.required ? " *Required" : ""}`,
                ],
            };
            // Build a Markdown table of stocks
            const headers = ["Stock", "Price", "Inventory"];
            const rows = unit.stocks.map(stock => {
                const available = stock.inventory.income - stock.inventory.outcome;
                const price = stock.price.real.toFixed(2);
                return [`${stock.name}`, `$${price}`, `${available}`];
            });
            const tableLines = [
                `| ${headers.join(" | ")} |`,
                `| ${headers.map(() => "---").join(" | ")} |`,
                ...rows.map(cols => `| ${cols.join(" | ")} |`),
            ];
            const stocksMarkdown = tableLines.join("\n");
            const unitValue = {
                type: "Markdown",
                content: stocksMarkdown,
            };
            return {
                type: "DataListItem",
                label: [unitLabel],
                value: [unitValue],
            };
        });
        contentChildren.push({
            type: "DataList",
            childrenProps: unitItems,
        });
    }
    // Wrap all content pieces
    const cardContent = {
        type: "CardContent",
        childrenProps: contentChildren,
    };
    // Assemble the VerticalCard children: header, optional media, then content
    const cardChildren = [cardHeader];
    if (firstMedia) {
        cardChildren.push({
            type: "CardMedia",
            src: firstMedia.url,
        });
    }
    cardChildren.push(cardContent);
    // Return the composed vertical card
    const verticalCard = {
        type: "VerticalCard",
        childrenProps: cardChildren,
    };
    return verticalCard;
}
//# sourceMappingURL=22.js.map
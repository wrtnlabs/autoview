export function transform($input) {
    return visualizeData($input);
}
// Transforms shopping sale data into a visual AutoView component
function visualizeData(input) {
    var _a, _b;
    // Format date-time or show infinity symbol
    const formatDate = (dt) => {
        if (!dt)
            return '∞';
        const d = new Date(dt);
        return isNaN(d.getTime()) ? dt : d.toLocaleString();
    };
    // Derive status label and chip color
    const rawStatus = (_a = input.status) !== null && _a !== void 0 ? _a : 'active';
    const statusLabel = rawStatus === 'paused'
        ? 'Paused'
        : rawStatus === 'suspended'
            ? 'Suspended'
            : 'Active';
    const statusColor = rawStatus === 'paused' ? 'warning'
        : rawStatus === 'suspended' ? 'error'
            : 'success';
    // Build chips for search tags
    const tagChips = input.tags.map(tag => ({
        type: 'Chip',
        label: tag,
        variant: 'outlined',
        size: 'small'
    }));
    // Build DataListItem for categories
    const categoryItems = input.category_codes.map(code => ({
        type: 'DataListItem',
        label: { type: 'Text', content: code }
    }));
    // Build per-unit DataListItem, nesting stocks as a DataList
    const unitItems = input.units.map(unit => {
        const stockItems = unit.stocks.map(stock => {
            // Show real price and optional nominal "was" price, plus quantity
            const priceText = stock.price.real !== stock.price.nominal
                ? `${stock.price.real} (was ${stock.price.nominal})`
                : `${stock.price.real}`;
            const detail = `${priceText} — ${stock.quantity} in stock`;
            return {
                type: 'DataListItem',
                label: { type: 'Text', content: stock.name },
                value: { type: 'Text', content: detail }
            };
        });
        // If unit is required, tag it with a small error‐colored chip
        const labelComponents = [
            { type: 'Text', content: unit.name, variant: 'subtitle1' }
        ];
        if (unit.required) {
            labelComponents.push({
                type: 'Chip',
                label: 'Required',
                size: 'small',
                variant: 'outlined',
                color: 'error'
            });
        }
        return {
            type: 'DataListItem',
            label: labelComponents,
            value: { type: 'DataList', childrenProps: stockItems }
        };
    });
    // Metadata DataList for status, dates, tags, categories
    const metaList = {
        type: 'DataList',
        childrenProps: [
            {
                type: 'DataListItem',
                label: { type: 'Text', content: 'Status', variant: 'body2' },
                value: { type: 'Chip', label: statusLabel, color: statusColor, size: 'small' }
            },
            {
                type: 'DataListItem',
                label: { type: 'Text', content: 'Opened At', variant: 'body2' },
                value: { type: 'Text', content: formatDate(input.opened_at) }
            },
            {
                type: 'DataListItem',
                label: { type: 'Text', content: 'Closed At', variant: 'body2' },
                value: { type: 'Text', content: formatDate(input.closed_at) }
            },
            {
                type: 'DataListItem',
                label: { type: 'Text', content: 'Tags', variant: 'body2' },
                value: { type: 'ChipGroup', childrenProps: tagChips }
            },
            {
                type: 'DataListItem',
                label: { type: 'Text', content: 'Categories', variant: 'body2' },
                value: { type: 'DataList', childrenProps: categoryItems }
            }
        ]
    };
    // Main card children
    const children = [];
    // Header with title and section code
    children.push({
        type: 'CardHeader',
        title: input.content.title,
        description: `Section: ${input.section_code}`,
        startElement: { type: 'Icon', id: 'tag', size: 20 }
    });
    // Show the first thumbnail if present
    if ((_b = input.content.thumbnails) === null || _b === void 0 ? void 0 : _b.length) {
        children.push({
            type: 'CardMedia',
            src: input.content.thumbnails[0].url
        });
    }
    // Content block: metadata, body, units
    children.push({
        type: 'CardContent',
        childrenProps: [
            metaList,
            { type: 'Markdown', content: input.content.body },
            { type: 'Markdown', content: '#### Units and Stocks' },
            { type: 'DataList', childrenProps: unitItems }
        ]
    });
    // Wrap up in a vertical card
    return {
        type: 'VerticalCard',
        childrenProps: children
    };
}
//# sourceMappingURL=136.js.map
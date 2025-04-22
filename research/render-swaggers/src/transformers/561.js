export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper: convert ISO date-time to a friendly locale string
    function formatDate(iso) {
        const date = new Date(iso);
        if (isNaN(date.getTime())) {
            return iso; // fallback to raw value if parsing fails
        }
        return date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    }
    // Transform each project_card into a ListItemProps for a responsive list view
    const items = input.map((card) => {
        var _a, _b, _c;
        const creator = card.creator;
        const login = (_a = creator === null || creator === void 0 ? void 0 : creator.login) !== null && _a !== void 0 ? _a : 'Unknown';
        const created = formatDate(card.created_at);
        // Title uses the card's note if present, otherwise a fallback label
        const title = (_b = card.note) !== null && _b !== void 0 ? _b : `Project Card #${card.id}`;
        // Description shows who created and when
        const description = `Created by ${login} on ${created}`;
        // Show an avatar if we have one, otherwise a placeholder icon
        const startElement = (creator === null || creator === void 0 ? void 0 : creator.avatar_url)
            ? {
                type: 'Avatar',
                src: creator.avatar_url,
                name: login,
                size: 40,
            }
            : {
                type: 'Icon',
                id: 'user',
                color: 'gray',
                size: 24,
            };
        // Button linking to the card's detail (content_url if available, else project_url)
        const endElement = {
            type: 'Button',
            label: 'View',
            variant: 'text',
            size: 'small',
            href: (_c = card.content_url) !== null && _c !== void 0 ? _c : card.project_url,
        };
        return {
            type: 'ListItem',
            title,
            description,
            startElement,
            endElement,
        };
    });
    // Wrap all items in a List component for a mobile‐friendly, scrollable view
    return {
        type: 'List',
        childrenProps: items,
    };
}
//# sourceMappingURL=561.js.map
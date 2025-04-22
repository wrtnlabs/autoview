export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper to stringify unknown "designer" field
    const formatDesigner = (designer) => {
        if (typeof designer === "string")
            return designer;
        try {
            return JSON.stringify(designer);
        }
        catch (_a) {
            return String(designer);
        }
    };
    // Build a VerticalCard for each coupon
    const cards = input.data.map((coupon) => {
        var _a, _b, _c;
        // Prepare inventory strings, with '∞' for null/unlimited
        const invVol = coupon.inventory.volume != null ? coupon.inventory.volume : "∞";
        const invPer = coupon.inventory.volume_per_citizen != null ? coupon.inventory.volume_per_citizen : "∞";
        // Summarize discount; fallback to JSON if structure is unknown
        let discountDesc;
        try {
            discountDesc = JSON.stringify(coupon.discount);
        }
        catch (_d) {
            discountDesc = String(coupon.discount);
        }
        // Summarize criterias by count (full detail could be verbose)
        const criteriaCount = Array.isArray(coupon.criterias) ? coupon.criterias.length : 0;
        // Build markdown content for the card body
        const mdLines = [
            `**Designer:** ${formatDesigner(coupon.designer)}`,
            `**Inventory:** ${invVol} total, ${invPer} per citizen`,
            `**Criteria count:** ${criteriaCount}`,
            `**Discount:** ${discountDesc}`,
            `**Access:** ${coupon.restriction.access}`,
            `**Exclusive:** ${coupon.restriction.exclusive ? "Yes" : "No"}`,
            `**Issued at:** ${coupon.created_at}`,
            `**Opens at:** ${(_a = coupon.opened_at) !== null && _a !== void 0 ? _a : "N/A"}`,
            `**Closes at:** ${(_b = coupon.closed_at) !== null && _b !== void 0 ? _b : "N/A"}`
        ];
        const markdownContent = mdLines.join("\n\n");
        // Icon to represent coupon access type
        const accessIcon = {
            type: "Icon",
            id: coupon.restriction.access === "private" ? "lock" : "globe",
            size: 16,
            color: "gray"
        };
        // Chip to display access level
        const accessChip = {
            type: "Chip",
            label: coupon.restriction.access,
            startElement: accessIcon,
            variant: "outlined",
            color: coupon.restriction.access === "private" ? "error" : "success",
            size: "small"
        };
        // Card header with coupon name and ID
        const header = {
            type: "CardHeader",
            title: coupon.name,
            description: `ID: ${coupon.id}`,
            startElement: {
                type: "Icon",
                id: "ticket",
                size: 24,
                color: "blue"
            }
        };
        // Card content renders details as markdown
        const content = {
            type: "CardContent",
            childrenProps: {
                type: "Markdown",
                content: markdownContent
            }
        };
        // Card footer shows when it closes and access chip
        const footer = {
            type: "CardFooter",
            childrenProps: [
                {
                    type: "Text",
                    variant: "caption",
                    content: `Valid until: ${(_c = coupon.closed_at) !== null && _c !== void 0 ? _c : "N/A"}`,
                    color: "secondary"
                },
                accessChip
            ]
        };
        // Assemble the vertical card
        const card = {
            type: "VerticalCard",
            childrenProps: [header, content, footer]
        };
        return card;
    });
    // Wrap all cards in a carousel for responsive browsing
    const carousel = {
        type: "Carousel",
        autoPlay: false,
        infinite: false,
        navControls: true,
        indicators: true,
        gutter: 16,
        effect: "slide",
        childrenProps: cards
    };
    return carousel;
}
//# sourceMappingURL=57.js.map
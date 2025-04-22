export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Map delivery state to a Chip color
    const stateColorMap = {
        none: "gray",
        preparing: "orange",
        manufacturing: "lime",
        shipping: "blue",
        delivering: "cyan",
        underway: "primary",
        arrived: "green",
    };
    // Map journey type to an icon name
    const journeyIconMap = {
        preparing: "gear",
        manufacturing: "industry",
        shipping: "truck",
        delivering: "shipping-fast",
    };
    // Format date-time strings for display
    const formatDateTime = (dt) => dt
        ? new Date(dt).toLocaleString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
        : "N/A";
    // 1) CardHeader: Delivery identifier, creation, and state
    const header = {
        type: "CardHeader",
        title: `Delivery ${input.id}`,
        description: `Created at ${formatDateTime(input.created_at)}`,
        startElement: {
            type: "Icon",
            id: "truck", // generic delivery icon
            color: "blue",
            size: 28,
        },
        endElement: {
            type: "Chip",
            label: input.state.charAt(0).toUpperCase() + input.state.slice(1),
            color: stateColorMap[input.state] || "gray",
            variant: "filled",
        },
    };
    // 2) Build journey list items
    const journeyItems = (input.journeys || []).map((j) => ({
        type: "DataListItem",
        label: [
            {
                type: "Icon",
                id: journeyIconMap[j.type] || "circle",
                color: "gray",
                size: 16,
            },
            {
                type: "Text",
                content: j.title || j.type,
                variant: "body2",
            },
        ],
        value: {
            type: "Text",
            content: `${formatDateTime(j.started_at)} → ${formatDateTime(j.completed_at)}`,
            variant: "caption",
            color: "gray",
        },
    }));
    // 3) Build pieces list items
    const pieceItems = (input.pieces || []).map((p) => ({
        type: "DataListItem",
        label: {
            type: "Text",
            content: `Stock ID: ${p.stock_id}`,
            variant: "body2",
        },
        value: {
            type: "Text",
            content: `Qty: ${p.quantity}`,
            variant: "body2",
            color: "primary",
        },
    }));
    // 4) Build shippers as chips
    const shipperChips = (input.shippers || []).map((s) => ({
        type: "Chip",
        label: s.name,
        color: "secondary",
        size: "small",
        startElement: {
            type: "Icon",
            id: "user",
            color: "gray",
            size: 16,
        },
    }));
    // 5) Compose CardContent with sections: Journeys, Pieces, Shippers
    const contentChildren = [];
    // Journeys section
    contentChildren.push({
        type: "Text",
        content: "Journeys",
        variant: "subtitle1",
    });
    if (journeyItems.length > 0) {
        contentChildren.push({
            type: "DataList",
            childrenProps: journeyItems,
        });
    }
    else {
        contentChildren.push({
            type: "Text",
            content: "No journeys recorded.",
            variant: "body2",
            color: "gray",
        });
    }
    // Divider
    contentChildren.push({
        type: "Divider",
        orientation: "horizontal",
    });
    // Pieces section
    contentChildren.push({
        type: "Text",
        content: "Delivery Pieces",
        variant: "subtitle1",
    });
    if (pieceItems.length > 0) {
        contentChildren.push({
            type: "DataList",
            childrenProps: pieceItems,
        });
    }
    else {
        contentChildren.push({
            type: "Text",
            content: "No pieces recorded.",
            variant: "body2",
            color: "gray",
        });
    }
    // Divider
    contentChildren.push({
        type: "Divider",
        orientation: "horizontal",
    });
    // Shippers section
    contentChildren.push({
        type: "Text",
        content: "Shippers",
        variant: "subtitle1",
    });
    if (shipperChips.length > 0) {
        contentChildren.push({
            type: "ChipGroup",
            childrenProps: shipperChips,
        });
    }
    else {
        contentChildren.push({
            type: "Text",
            content: "No shippers assigned.",
            variant: "body2",
            color: "gray",
        });
    }
    const cardContent = {
        type: "CardContent",
        childrenProps: contentChildren,
    };
    // 6) Wrap into a vertical card for responsive layout
    const card = {
        type: "VerticalCard",
        childrenProps: [header, cardContent],
    };
    return card;
}
//# sourceMappingURL=121.js.map
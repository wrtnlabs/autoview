export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d;
    // Extract the first thumbnail URL if present for visual cues
    const thumbnailUrl = (_b = (_a = input.sale.content.thumbnails) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.url;
    // Format creation date into a more readable form
    const formattedDate = (() => {
        try {
            return new Date(input.created_at).toLocaleDateString();
        }
        catch (_a) {
            return input.created_at;
        }
    })();
    // Build the card header with title, creation date, and optional thumbnail avatar
    const header = {
        type: "CardHeader",
        title: input.sale.content.title,
        description: `Created on ${formattedDate}`,
        // Use an avatar for the thumbnail if available
        startElement: thumbnailUrl
            ? {
                type: "Avatar",
                src: thumbnailUrl,
                name: input.sale.content.title,
            }
            : undefined,
    };
    // Prepare data list items to summarize key attributes
    const listItems = [];
    // Seller nickname
    listItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Seller" },
        value: { type: "Text", content: input.sale.seller.member.nickname },
    });
    // Price: show real price with a filled chip and nominal price as caption
    const realPrice = input.price.real.toFixed(2);
    const nominalPrice = input.price.nominal.toFixed(2);
    listItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Price" },
        value: {
            type: "Chip",
            label: `$${realPrice}`,
            variant: "filled",
            color: "primary",
        },
    });
    listItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "List Price" },
        value: { type: "Text", content: `$${nominalPrice}` },
    });
    // Volume of the commodity
    listItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Volume" },
        value: {
            type: "Chip",
            label: `${input.volume}`,
            variant: "outlined",
            color: "secondary",
        },
    });
    // Number of units in this sale snapshot
    const unitCount = (_d = (_c = input.sale.units) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0;
    listItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Options" },
        value: {
            type: "Chip",
            label: `${unitCount}`,
            variant: "outlined",
            color: "info",
        },
    });
    // Orderable status
    listItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Orderable" },
        value: {
            type: "Chip",
            label: input.orderable ? "Yes" : "No",
            variant: "filled",
            color: input.orderable ? "success" : "error",
        },
    });
    // Pseudo flag
    if (input.pseudo) {
        listItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Note" },
            value: {
                type: "Chip",
                label: "Pseudo Commodity",
                variant: "outlined",
                color: "warning",
            },
        });
    }
    // Assemble the data list component
    const dataList = {
        type: "DataList",
        childrenProps: listItems,
    };
    // Build the card content to hold the data list
    const content = {
        type: "CardContent",
        childrenProps: dataList,
    };
    // Footer button: Checkout if orderable, or Disabled state if already ordered
    const footerButton = {
        type: "Button",
        label: input.orderable ? "Checkout" : "Already Ordered",
        variant: input.orderable ? "contained" : "outlined",
        color: input.orderable ? "primary" : "gray",
    };
    const footer = {
        type: "CardFooter",
        childrenProps: footerButton,
    };
    // Compose into a vertical card for mobile-friendly, stacked layout
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=75.js.map
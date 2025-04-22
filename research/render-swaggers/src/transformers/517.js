export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d;
    // Helper to create a DataListItem with a label and a value component
    function makeDataListItem(labelText, valueComp) {
        return {
            type: "DataListItem",
            label: { type: "Text", variant: "subtitle2", content: labelText },
            value: valueComp,
        };
    }
    // Build list of key/value pairs
    const listItems = [];
    // Target
    if (input.target) {
        listItems.push(makeDataListItem("Target", { type: "Chip", label: input.target, variant: "outlined" }));
    }
    // Source Type
    if (input.source_type) {
        listItems.push(makeDataListItem("Source Type", { type: "Chip", label: input.source_type, variant: "outlined" }));
    }
    // Source
    listItems.push(makeDataListItem("Source", { type: "Text", variant: "body2", content: input.source }));
    // Enforcement
    listItems.push(makeDataListItem("Enforcement", { type: "Chip", label: input.enforcement, variant: "filled" }));
    // Number of rules
    const rulesCount = Array.isArray(input.rules) ? input.rules.length : 0;
    listItems.push(makeDataListItem("Rules", {
        type: "Chip",
        label: `${rulesCount}`,
        variant: "outlined",
    }));
    // Number of bypass actors
    const bypassCount = Array.isArray(input.bypass_actors)
        ? input.bypass_actors.length
        : 0;
    listItems.push(makeDataListItem("Bypass Actors", {
        type: "Chip",
        label: `${bypassCount}`,
        variant: "outlined",
    }));
    // Current user bypass capability
    if (input.current_user_can_bypass) {
        listItems.push(makeDataListItem("Your Bypass", {
            type: "Text",
            variant: "body2",
            content: input.current_user_can_bypass,
        }));
    }
    // Creation and update timestamps
    if (input.created_at) {
        listItems.push(makeDataListItem("Created", {
            type: "Text",
            variant: "body2",
            content: new Date(input.created_at).toLocaleString(),
        }));
    }
    if (input.updated_at) {
        listItems.push(makeDataListItem("Updated", {
            type: "Text",
            variant: "body2",
            content: new Date(input.updated_at).toLocaleString(),
        }));
    }
    // Build DataList component
    const dataList = {
        type: "DataList",
        childrenProps: listItems,
    };
    // Build CardHeader: show name (title) and ID (description), add a chip for enforcement
    const cardHeader = {
        type: "CardHeader",
        title: input.name,
        description: `ID: ${input.id}`,
        // show enforcement as a visual chip
        startElement: { type: "Chip", label: input.enforcement, variant: "filled" },
    };
    // Build CardContent: the data list
    const cardContent = {
        type: "CardContent",
        childrenProps: dataList,
    };
    // Optionally build CardFooter with link buttons if links exist
    const footerButtons = [];
    if ((_b = (_a = input._links) === null || _a === void 0 ? void 0 : _a.html) === null || _b === void 0 ? void 0 : _b.href) {
        footerButtons.push({
            type: "Button",
            variant: "text",
            size: "small",
            label: "View HTML",
            endElement: { type: "Icon", id: "external-link", size: 16 },
            href: input._links.html.href,
        });
    }
    if ((_d = (_c = input._links) === null || _c === void 0 ? void 0 : _c.self) === null || _d === void 0 ? void 0 : _d.href) {
        footerButtons.push({
            type: "Button",
            variant: "text",
            size: "small",
            label: "View API",
            endElement: { type: "Icon", id: "external-link-alt", size: 16 },
            href: input._links.self.href,
        });
    }
    const cardFooter = footerButtons.length > 0
        ? {
            type: "CardFooter",
            // Buttons in footer as a horizontal button group
            childrenProps: footerButtons,
        }
        : undefined;
    // Assemble a vertical card
    const verticalCard = {
        type: "VerticalCard",
        childrenProps: [
            cardHeader,
            cardContent,
            // only include footer if links are present
            ...(cardFooter ? [cardFooter] : []),
        ],
    };
    return verticalCard;
}
//# sourceMappingURL=517.js.map
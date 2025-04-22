export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Helper to display nullable numbers as "Unlimited" or the number.
    const formatVolume = (vol) => vol === null ? "Unlimited" : String(vol);
    // Map access level to chip color.
    const accessColor = input.restriction.access === "public" ? "success" : "error";
    // Build the header: show coupon name and an icon.
    const header = {
        type: "CardHeader",
        title: input.name,
        // show coupon ID lightly in description
        description: `ID: ${input.id}`,
        startElement: {
            type: "Icon",
            id: "ticket-alt", // FontAwesome ticket icon
            color: "teal",
            size: 20
        }
    };
    // Build a data list of core properties.
    const dataListItems = [
        {
            type: "DataListItem",
            label: { type: "Text", content: "Created", variant: "subtitle2" },
            value: { type: "Text", content: input.created_at, variant: "body2" }
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Valid From", variant: "subtitle2" },
            value: {
                type: "Text",
                content: (_a = input.opened_at) !== null && _a !== void 0 ? _a : "N/A",
                variant: "body2"
            }
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Valid Until", variant: "subtitle2" },
            value: {
                type: "Text",
                content: (_b = input.closed_at) !== null && _b !== void 0 ? _b : "N/A",
                variant: "body2"
            }
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Total Inventory", variant: "subtitle2" },
            value: {
                type: "Text",
                content: formatVolume(input.inventory.volume),
                variant: "body2"
            }
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Per-Customer Limit", variant: "subtitle2" },
            value: {
                type: "Text",
                content: formatVolume(input.inventory.volume_per_citizen),
                variant: "body2"
            }
        }
    ];
    const content = {
        type: "CardContent",
        childrenProps: [
            {
                type: "DataList",
                childrenProps: dataListItems
            },
            // Use markdown to render discount details as JSON for readability.
            {
                type: "Markdown",
                content: "### Discount Details\n" +
                    "json\n" +
                    JSON.stringify(input.discount, null, 2) +
                    "\n```"
            },
            // Similarly render criteria array if non-empty.
            ...(input.criterias.length > 0
                ? [
                    {
                        type: "Markdown",
                        content: "### Coupon Criteria\n" +
                            "```json\n" +
                            JSON.stringify(input.criterias, null, 2) +
                            "\n```"
                    }
                ]
                : [])
        ]
    };
    // Build a group of chips to show restriction flags.
    const chips = [];
    // Access level chip
    chips.push({
        type: "Chip",
        label: `Access: ${input.restriction.access}`,
        color: accessColor,
        size: "small",
        variant: "filled"
    });
    // Exclusivity chip
    chips.push({
        type: "Chip",
        label: input.restriction.exclusive ? "Exclusive" : "Combinable",
        color: input.restriction.exclusive ? "error" : "info",
        size: "small",
        variant: "outlined"
    });
    // Volume restrictions
    if (input.restriction.volume !== null) {
        chips.push({
            type: "Chip",
            label: `Limit: ${input.restriction.volume}`,
            color: "warning",
            size: "small",
            variant: "outlined"
        });
    }
    if (input.restriction.volume_per_citizen !== null) {
        chips.push({
            type: "Chip",
            label: `Per-Customer: ${input.restriction.volume_per_citizen}`,
            color: "warning",
            size: "small",
            variant: "outlined"
        });
    }
    // Expiration by days or date
    if (input.restriction.expired_in !== null) {
        chips.push({
            type: "Chip",
            label: `${input.restriction.expired_in}d after issue`,
            color: "secondary",
            size: "small",
            variant: "outlined"
        });
    }
    if (input.restriction.expired_at !== null) {
        chips.push({
            type: "Chip",
            label: `Expires on ${input.restriction.expired_at}`,
            color: "error",
            size: "small",
            variant: "filled"
        });
    }
    const footer = {
        type: "CardFooter",
        childrenProps: {
            type: "ChipGroup",
            childrenProps: chips
        }
    };
    // Compose the vertical card
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer]
    };
    return card;
}
//# sourceMappingURL=5.js.map
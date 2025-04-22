export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d, _e;
    // 1. Card header with a coupon icon and access level
    const header = {
        type: "CardHeader",
        title: input.name,
        description: input.restriction.access === "public" ? "Public Coupon" : "Private Coupon",
        startElement: {
            type: "Icon",
            id: input.restriction.access === "public" ? "globe" : "lock",
            color: input.restriction.access === "public" ? "green" : "red",
            size: 24
        }
    };
    // 2. Prepare the main details as a data list
    const mainDetails = [
        {
            type: "DataListItem",
            label: [{ type: "Text", content: "Coupon ID", variant: "subtitle2" }],
            value: [{ type: "Text", content: input.id, variant: "body2" }]
        },
        {
            type: "DataListItem",
            label: [{ type: "Text", content: "Created At", variant: "subtitle2" }],
            value: [{ type: "Text", content: input.created_at, variant: "body2" }]
        },
        {
            type: "DataListItem",
            label: [{ type: "Text", content: "Valid From", variant: "subtitle2" }],
            value: [{ type: "Text", content: (_a = input.opened_at) !== null && _a !== void 0 ? _a : "N/A", variant: "body2" }]
        },
        {
            type: "DataListItem",
            label: [{ type: "Text", content: "Valid Until", variant: "subtitle2" }],
            value: [{ type: "Text", content: (_b = input.closed_at) !== null && _b !== void 0 ? _b : "N/A", variant: "body2" }]
        },
        {
            type: "DataListItem",
            label: [{ type: "Text", content: "Inventory (Total)", variant: "subtitle2" }],
            value: [
                {
                    type: "Text",
                    content: input.inventory.volume != null ? input.inventory.volume.toString() : "Unlimited",
                    variant: "body2"
                }
            ]
        },
        {
            type: "DataListItem",
            label: [{ type: "Text", content: "Per User Limit", variant: "subtitle2" }],
            value: [
                {
                    type: "Text",
                    content: input.inventory.volume_per_citizen != null
                        ? input.inventory.volume_per_citizen.toString()
                        : "Unlimited",
                    variant: "body2"
                }
            ]
        }
    ];
    // 3. Show number of criteria with a chip for quick glance
    const criteriaChip = {
        type: "Chip",
        label: `${(_d = (_c = input.criterias) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0} Criteria`,
        color: "teal",
        variant: "outlined",
        size: "small"
    };
    // 4. Present discount structure as a markdown code block for clarity
    const discountSection = {
        type: "Markdown",
        content: "### Discount Details\n" +
            "json\n" +
            JSON.stringify(input.discount, null, 2) +
            "\n```"
    };
    // 5. Restriction details as a second data list
    const restrictionDetails = [
        {
            type: "DataListItem",
            label: [{ type: "Text", content: "Exclusive", variant: "subtitle2" }],
            value: [{ type: "Text", content: input.restriction.exclusive ? "Yes" : "No", variant: "body2" }]
        },
        {
            type: "DataListItem",
            label: [{ type: "Text", content: "Expires In (Days)", variant: "subtitle2" }],
            value: [
                {
                    type: "Text",
                    content: input.restriction.expired_in != null ? input.restriction.expired_in.toString() : "-",
                    variant: "body2"
                }
            ]
        },
        {
            type: "DataListItem",
            label: [{ type: "Text", content: "Expiration Date", variant: "subtitle2" }],
            value: [
                { type: "Text", content: (_e = input.restriction.expired_at) !== null && _e !== void 0 ? _e : "-", variant: "body2" }
            ]
        }
    ];
    // 6. Assemble card content with all sections
    const content = {
        type: "CardContent",
        childrenProps: [
            { type: "DataList", childrenProps: mainDetails },
            criteriaChip,
            discountSection,
            { type: "DataList", childrenProps: restrictionDetails }
        ]
    };
    // 7. Return a vertical card combining header and content for responsive display
    return {
        type: "VerticalCard",
        childrenProps: [header, content]
    };
}
//# sourceMappingURL=129.js.map
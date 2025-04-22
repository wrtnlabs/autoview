export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Build a DataList to summarize key numeric and enum fields
    const summaryList = {
        type: "DataList",
        childrenProps: [
            // Inventory: total volume
            {
                type: "DataListItem",
                label: [
                    { type: "Icon", id: "boxes", size: 16, color: "gray" },
                    { type: "Text", content: "Total Inventory", variant: "body2" }
                ],
                value: {
                    type: "Text",
                    content: input.inventory.volume != null
                        ? String(input.inventory.volume)
                        : "Unlimited",
                    variant: "body2"
                }
            },
            // Inventory: per-citizen volume
            {
                type: "DataListItem",
                label: [
                    { type: "Icon", id: "user", size: 16, color: "gray" },
                    { type: "Text", content: "Per User Limit", variant: "body2" }
                ],
                value: {
                    type: "Text",
                    content: input.inventory.volume_per_citizen != null
                        ? String(input.inventory.volume_per_citizen)
                        : "Unlimited",
                    variant: "body2"
                }
            },
            // Restriction: access level
            {
                type: "DataListItem",
                label: { type: "Text", content: "Access", variant: "body2" },
                value: {
                    type: "Chip",
                    label: input.restriction.access,
                    color: input.restriction.access === "public" ? "green" : "red",
                    size: "small",
                    variant: "filled"
                }
            },
            // Restriction: exclusive
            {
                type: "DataListItem",
                label: { type: "Text", content: "Exclusive", variant: "body2" },
                value: {
                    type: "Chip",
                    label: input.restriction.exclusive ? "Yes" : "No",
                    color: input.restriction.exclusive ? "red" : "gray",
                    size: "small",
                    variant: "filled"
                }
            },
            // Restriction: expiration days or fixed date
            {
                type: "DataListItem",
                label: { type: "Text", content: "Expires In", variant: "body2" },
                value: {
                    type: "Text",
                    content: input.restriction.expired_in != null
                        ? `${input.restriction.expired_in} days`
                        : input.restriction.expired_at != null
                            ? new Date(input.restriction.expired_at).toLocaleDateString()
                            : "No expiration",
                    variant: "body2"
                }
            },
            // Dates: open
            {
                type: "DataListItem",
                label: [
                    { type: "Icon", id: "calendar-alt", size: 16, color: "gray" },
                    { type: "Text", content: "Opens At", variant: "body2" }
                ],
                value: {
                    type: "Text",
                    content: input.opened_at
                        ? new Date(input.opened_at).toLocaleString()
                        : "Immediate",
                    variant: "body2"
                }
            },
            // Dates: close
            {
                type: "DataListItem",
                label: [
                    { type: "Icon", id: "calendar-times", size: 16, color: "gray" },
                    { type: "Text", content: "Closes At", variant: "body2" }
                ],
                value: {
                    type: "Text",
                    content: input.closed_at
                        ? new Date(input.closed_at).toLocaleString()
                        : "No deadline",
                    variant: "body2"
                }
            },
            // Criteria count
            {
                type: "DataListItem",
                label: { type: "Text", content: "Criteria Rules", variant: "body2" },
                value: {
                    type: "Text",
                    content: `${input.criterias.length} rule${input.criterias.length === 1 ? "" : "s"}`,
                    variant: "body2"
                }
            }
        ]
    };
    // Fallback Markdown sections for complex sub-objects: discount & designer
    const markdownSections = [
        {
            type: "Markdown",
            content: "### Discount Details\n" +
                "json\n" +
                JSON.stringify(input.discount, null, 2) +
                "\n```"
        },
        {
            type: "Markdown",
            content: "### Designer Info\n" +
                "```json\n" +
                JSON.stringify(input.designer, null, 2) +
                "\n```"
        }
    ];
    // Compose the final VerticalCard with header, summary list, and markdown dumps
    return {
        type: "VerticalCard",
        childrenProps: [
            // Header: show coupon name and ID with an icon
            {
                type: "CardHeader",
                title: input.name,
                description: `ID: ${input.id}`,
                startElement: {
                    type: "Icon",
                    id: "ticket-alt",
                    size: 28,
                    color: "blue"
                }
            },
            // Main content: summary and details
            {
                type: "CardContent",
                childrenProps: [
                    summaryList,
                    // allow the markdown sections to wrap on small screens gracefully
                    ...markdownSections
                ]
            }
        ]
    };
}
//# sourceMappingURL=58.js.map
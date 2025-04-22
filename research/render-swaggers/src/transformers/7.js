export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper: format a nullable numeric field or show 'Unlimited'
    const fmtNumber = (value) => value !== null ? `${value}` : "Unlimited";
    // Build Inventory DataListItem
    const inventoryVolume = fmtNumber(input.inventory.volume);
    const inventoryPerCitizen = fmtNumber(input.inventory.volume_per_citizen);
    const inventoryItem = {
        type: "DataListItem",
        label: { type: "Text", content: ["Inventory"] },
        value: { type: "Text", content: [`Total: ${inventoryVolume}`, `Per Citizen: ${inventoryPerCitizen}`] }
    };
    // Build Discount section using Markdown for arbitrary structure
    const discountMarkdown = `\`\`\`json
${JSON.stringify(input.discount, null, 2)}
\`\`\``;
    const discountItem = {
        type: "DataListItem",
        label: { type: "Text", content: ["Discount"] },
        value: { type: "Markdown", content: discountMarkdown }
    };
    // Build Restriction section as a group of Chips
    const restrictionChips = [];
    const r = input.restriction;
    // Access level
    restrictionChips.push({
        type: "Chip",
        label: `Access: ${r.access}`,
        variant: "outlined",
        color: r.access === "public" ? "green" : "gray"
    });
    // Exclusive flag
    if (r.exclusive) {
        restrictionChips.push({
            type: "Chip",
            label: "Exclusive",
            variant: "outlined",
            color: "red"
        });
    }
    // Numeric limits
    if (r.volume !== null) {
        restrictionChips.push({
            type: "Chip",
            label: `Volume: ${r.volume}`,
            variant: "outlined"
        });
    }
    if (r.volume_per_citizen !== null) {
        restrictionChips.push({
            type: "Chip",
            label: `Per Person: ${r.volume_per_citizen}`,
            variant: "outlined"
        });
    }
    if (r.expired_in !== null) {
        restrictionChips.push({
            type: "Chip",
            label: `Expires in: ${r.expired_in}d`,
            variant: "outlined"
        });
    }
    if (r.expired_at !== null) {
        restrictionChips.push({
            type: "Chip",
            label: `Expires at: ${r.expired_at}`,
            variant: "outlined"
        });
    }
    const restrictionItem = {
        type: "DataListItem",
        label: { type: "Text", content: ["Restrictions"] },
        value: {
            type: "ChipGroup",
            childrenProps: restrictionChips,
            maxItems: 5
        }
    };
    // Build Criteria list as Markdown (arbitrary objects)
    const criteriaMarkdown = `\`\`\`json
${JSON.stringify(input.criterias, null, 2)}
\`\`\``;
    const criteriaItem = {
        type: "DataListItem",
        label: { type: "Text", content: ["Criteria"] },
        value: { type: "Markdown", content: criteriaMarkdown }
    };
    // Aggregate all DataList items
    const dataList = {
        type: "DataList",
        childrenProps: [inventoryItem, discountItem, restrictionItem, criteriaItem]
    };
    // Build footer texts for dates (skip nulls)
    const footerTexts = [];
    const dates = [
        ["Opened At", input.opened_at],
        ["Closed At", input.closed_at],
        ["Created At", input.created_at]
    ];
    for (const [label, value] of dates) {
        if (value !== null) {
            footerTexts.push({
                type: "Text",
                variant: "caption",
                content: [`${label}: ${value}`]
            });
        }
    }
    const footer = {
        type: "CardFooter",
        childrenProps: footerTexts
    };
    // Build the Card Header with an icon and main title
    const header = {
        type: "CardHeader",
        title: input.name,
        description: `ID: ${input.id}`,
        startElement: {
            type: "Icon",
            id: "ticket-alt",
            color: "cyan",
            size: 24
        }
    };
    // Compose the final VerticalCard
    const card = {
        type: "VerticalCard",
        childrenProps: [
            header,
            { type: "CardContent", childrenProps: dataList },
            footer
        ]
    };
    return card;
}
//# sourceMappingURL=7.js.map
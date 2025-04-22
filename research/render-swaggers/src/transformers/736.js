export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Construct a card header showing an icon, title, and total rule count
    const header = {
        type: "CardHeader",
        title: "Deployment Protection Rules",
        description: `${(_a = input.total_count) !== null && _a !== void 0 ? _a : 0} rule${input.total_count === 1 ? "" : "s"}`,
        startElement: {
            type: "Icon",
            id: "shield-alt",
            color: "blue",
            size: 20,
        },
    };
    // Map each deployment protection rule into a DataListItem
    const rules = (_b = input.custom_deployment_protection_rules) !== null && _b !== void 0 ? _b : [];
    let contentChild;
    if (rules.length > 0) {
        const items = rules.map((rule) => {
            // A status chip indicating enabled / disabled
            const statusChip = {
                type: "Chip",
                label: rule.enabled ? "Enabled" : "Disabled",
                color: rule.enabled ? "success" : "error",
                variant: "filled",
                size: "small",
            };
            // A button linking to the App's integration URL
            const viewButton = {
                type: "Button",
                label: "View App",
                variant: "outlined",
                size: "small",
                href: rule.app.integration_url,
            };
            // The slug of the GitHub App as text
            const slugText = {
                type: "Text",
                content: rule.app.slug,
                variant: "body1",
            };
            return {
                type: "DataListItem",
                label: slugText,
                // Show both status and action button in the value slot
                value: [statusChip, viewButton],
            };
        });
        contentChild = {
            type: "DataList",
            childrenProps: items,
        };
    }
    else {
        // Graceful fallback when there are no rules
        contentChild = {
            type: "Text",
            content: "No custom deployment protection rules found.",
            variant: "body1",
        };
    }
    // Wrap the list or fallback text in card content
    const content = {
        type: "CardContent",
        childrenProps: contentChild,
    };
    // Assemble the vertical card layout
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
    return card;
}
//# sourceMappingURL=736.js.map
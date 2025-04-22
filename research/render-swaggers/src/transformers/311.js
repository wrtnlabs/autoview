export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Prepare each configuration field as a DataListItem
    const items = [];
    // URL field: clickable link button if provided, otherwise indicate "Not set"
    items.push({
        type: "DataListItem",
        label: [
            { type: "Icon", id: "link", color: "blue", size: 20 },
            { type: "Text", content: "URL", variant: "subtitle2" }
        ],
        value: input.url
            ? {
                type: "Button",
                label: input.url,
                href: input.url,
                variant: "text",
                startElement: { type: "Icon", id: "external-link-alt", size: 16 }
            }
            : {
                type: "Text",
                content: "Not set",
                variant: "body2",
                color: "gray"
            }
    });
    // Content-Type field: render as colored chip, with variant based on common types
    const ct = input.content_type;
    let ctColor = "gray";
    if (ct === null || ct === void 0 ? void 0 : ct.toLowerCase().includes("json"))
        ctColor = "green";
    else if (ct === null || ct === void 0 ? void 0 : ct.toLowerCase().includes("form"))
        ctColor = "blue";
    items.push({
        type: "DataListItem",
        label: [
            { type: "Icon", id: "file-alt", color: "orange", size: 20 },
            { type: "Text", content: "Content Type", variant: "subtitle2" }
        ],
        value: ct
            ? {
                type: "Chip",
                label: ct,
                color: ctColor,
                variant: "filled"
            }
            : {
                type: "Text",
                content: "Not set",
                variant: "body2",
                color: "gray"
            }
    });
    // Secret field: never expose, display masked bullets
    items.push({
        type: "DataListItem",
        label: [
            { type: "Icon", id: "lock", color: "red", size: 20 },
            { type: "Text", content: "Secret", variant: "subtitle2" }
        ],
        value: input.secret
            ? {
                type: "Text",
                // simple bullet mask; length not tied to actual secret length for security
                content: "••••••••",
                variant: "body2",
                color: "gray"
            }
            : {
                type: "Text",
                content: "Not set",
                variant: "body2",
                color: "gray"
            }
    });
    // Insecure SSL field: show a status chip indicating SSL verification status
    const insecure = input.insecure_ssl;
    const sslEnabled = insecure === undefined || insecure === "0" || insecure === 0;
    items.push({
        type: "DataListItem",
        label: [
            { type: "Icon", id: "shield-alt", color: "teal", size: 20 },
            { type: "Text", content: "SSL Verification", variant: "subtitle2" }
        ],
        value: {
            type: "Chip",
            label: sslEnabled ? "Enabled" : "Disabled",
            color: sslEnabled ? "green" : "red",
            variant: "filled"
        }
    });
    // Compose the final UI: a card with header and the data list
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: "Webhook Configuration",
                startElement: { type: "Icon", id: "rss", color: "teal", size: 24 }
            },
            {
                type: "CardContent",
                childrenProps: {
                    type: "DataList",
                    childrenProps: items
                }
            }
        ]
    };
}
//# sourceMappingURL=311.js.map
export function transform($input) {
    return visualizeData($input);
}
// Transforms a Schema.authorization into a visual AutoView component.
function visualizeData(input) {
    var _a;
    // 1. Card header with a key icon and authorization ID / app name
    const header = {
        type: "CardHeader",
        title: `Authorization #${input.id}`,
        description: input.app.name,
        // Use a key icon to represent the token
        startElement: {
            type: "Icon",
            id: "key",
            color: "teal",
            size: 28,
        },
    };
    // 2. Build chips for scopes (or a "None" chip if null/empty)
    const scopesChips = input.scopes && input.scopes.length > 0
        ? input.scopes.map((scope) => ({
            type: "Chip",
            label: scope,
            size: "small",
            variant: "outlined",
        }))
        : [
            {
                type: "Chip",
                label: "None",
                size: "small",
                variant: "outlined",
                color: "gray",
            },
        ];
    const scopesComponent = {
        type: "ChipGroup",
        childrenProps: scopesChips,
    };
    // 3. Assemble a list of data points
    const items = [];
    // URL (link button)
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "URL", variant: "subtitle2" },
        value: {
            type: "Button",
            label: "Open",
            href: input.url,
            variant: "text",
            color: "blue",
            startElement: { type: "Icon", id: "external-link-alt", color: "blue", size: 16 },
        },
    });
    // Scopes
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "Scopes", variant: "subtitle2" },
        value: scopesComponent,
    });
    // Note (markdown with optional link)
    if (input.note || input.note_url) {
        const md = [
            (_a = input.note) !== null && _a !== void 0 ? _a : "",
            input.note_url ? `\n\n[View more](${input.note_url})` : "",
        ].join("");
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Note", variant: "subtitle2" },
            value: { type: "Markdown", content: md },
        });
    }
    // Token (masked)
    if (input.token_last_eight) {
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Token", variant: "subtitle2" },
            value: {
                type: "Text",
                content: `••••••••${input.token_last_eight}`,
                variant: "body2",
                color: "tertiary",
            },
        });
    }
    // Hashed token
    if (input.hashed_token) {
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Hashed Token", variant: "subtitle2" },
            value: { type: "Text", content: input.hashed_token, variant: "body2", color: "gray" },
        });
    }
    // Fingerprint
    if (input.fingerprint) {
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Fingerprint", variant: "subtitle2" },
            value: { type: "Text", content: input.fingerprint, variant: "body2" },
        });
    }
    // Creation / Update timestamps
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "Created At", variant: "subtitle2" },
        value: {
            type: "Text",
            // Format to locale string for readability
            content: new Date(input.created_at).toLocaleString(),
            variant: "caption",
            color: "gray",
        },
    });
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "Updated At", variant: "subtitle2" },
        value: {
            type: "Text",
            content: new Date(input.updated_at).toLocaleString(),
            variant: "caption",
            color: "gray",
        },
    });
    // Expiration
    if (input.expires_at) {
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Expires At", variant: "subtitle2" },
            value: {
                type: "Text",
                content: new Date(input.expires_at).toLocaleString(),
                variant: "caption",
                color: "error",
            },
        });
    }
    // Installation details (repository selection + link)
    if (input.installation) {
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Repository Selection", variant: "subtitle2" },
            value: {
                type: "Chip",
                label: input.installation.repository_selection,
                size: "small",
                variant: "outlined",
            },
        });
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Repositories URL", variant: "subtitle2" },
            value: {
                type: "Button",
                label: "View",
                href: input.installation.repositories_url,
                variant: "text",
                color: "blue",
                startElement: { type: "Icon", id: "book", color: "blue", size: 16 },
            },
        });
    }
    // 4. Wrap all items in a DataList
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    // 5. Final vertical card containing header + content
    const cardContent = {
        type: "CardContent",
        childrenProps: [dataList],
    };
    return {
        type: "VerticalCard",
        childrenProps: [header, cardContent],
    };
}
//# sourceMappingURL=320.js.map
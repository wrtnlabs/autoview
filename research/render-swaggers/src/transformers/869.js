export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c;
    // Map alert state to a FontAwesome icon name and color
    const stateIconMap = {
        open: { id: "exclamation-triangle", color: "orange" },
        resolved: { id: "check-circle", color: "green" },
    };
    // Helper to format ISO dates into a more user-friendly string
    function formatDate(dateString) {
        try {
            return new Date(dateString).toLocaleString();
        }
        catch (_a) {
            return dateString;
        }
    }
    // Build the card header: Title, description, state icon, and resolver avatar
    const header = {
        type: "CardHeader",
        title: `#${(_a = input.number) !== null && _a !== void 0 ? _a : ""}${input.secret_type_display_name ? `: ${input.secret_type_display_name}` : ""}`,
        description: input.secret_type,
        startElement: {
            type: "Icon",
            id: stateIconMap[(_b = input.state) !== null && _b !== void 0 ? _b : "open"].id,
            color: stateIconMap[(_c = input.state) !== null && _c !== void 0 ? _c : "open"].color,
            size: 24,
        },
        endElement: input.resolved_by
            ? {
                type: "Avatar",
                src: input.resolved_by.avatar_url,
                name: input.resolved_by.login,
                variant: "info",
                size: 32,
            }
            : undefined,
    };
    // Build a DataList of key timestamps and URLs
    const listItems = [];
    if (input.created_at) {
        listItems.push({
            type: "DataListItem",
            label: [{ type: "Text", content: ["Created At"], variant: "subtitle2" }],
            value: [{ type: "Text", content: [formatDate(input.created_at)], variant: "body2" }],
        });
    }
    if (input.updated_at) {
        listItems.push({
            type: "DataListItem",
            label: [{ type: "Text", content: ["Updated At"], variant: "subtitle2" }],
            value: [{ type: "Text", content: [formatDate(input.updated_at)], variant: "body2" }],
        });
    }
    if (input.resolved_at) {
        listItems.push({
            type: "DataListItem",
            label: [{ type: "Text", content: ["Resolved At"], variant: "subtitle2" }],
            value: [{ type: "Text", content: [formatDate(input.resolved_at)], variant: "body2" }],
        });
    }
    if (input.html_url) {
        listItems.push({
            type: "DataListItem",
            label: [{ type: "Text", content: ["Details URL"], variant: "subtitle2" }],
            value: [
                {
                    type: "Button",
                    variant: "text",
                    color: "primary",
                    size: "small",
                    label: ["View"],
                    href: input.html_url,
                },
            ],
        });
    }
    // Compose the card content: either a DataList or fallback Markdown
    const content = {
        type: "CardContent",
        childrenProps: listItems.length > 0
            ? { type: "DataList", childrenProps: listItems }
            : {
                type: "Markdown",
                content: "No details available for this alert.",
            },
    };
    // Build chips for resolution and flags (public leak, multi-repo, bypass)
    const chips = [];
    if (input.resolution) {
        chips.push({
            type: "Chip",
            label: input.resolution,
            color: input.resolution === "wont_fix" ? "warning" : "success",
            size: "small",
            variant: "filled",
        });
    }
    if (input.publicly_leaked) {
        chips.push({
            type: "Chip",
            label: "Publicly Leaked",
            color: "error",
            size: "small",
            variant: "outlined",
        });
    }
    if (input.multi_repo) {
        chips.push({
            type: "Chip",
            label: "Multi-Repo",
            color: "info",
            size: "small",
            variant: "outlined",
        });
    }
    if (input.push_protection_bypassed) {
        chips.push({
            type: "Chip",
            label: "Bypassed",
            color: "secondary",
            size: "small",
            variant: "outlined",
        });
    }
    // Compose the card footer: a ChipGroup or single Chip
    const footer = {
        type: "CardFooter",
        childrenProps: chips.length === 0
            ? {
                type: "Text",
                content: ["No flags or resolution."],
                variant: "caption",
            }
            : chips.length === 1
                ? chips[0]
                : { type: "ChipGroup", childrenProps: chips },
    };
    // Return a vertical card that aggregates header, content, and footer
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
}
//# sourceMappingURL=869.js.map
export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d;
    // Helper to create text components
    const text = (content) => ({
        type: "Text",
        content,
    });
    // Helper to create icon components
    const icon = (id, color, size) => ({
        type: "Icon",
        id,
        color,
        size,
    });
    // Map page status to colors for chips
    const statusColorMap = {
        built: "success",
        building: "info",
        errored: "error",
        null: "gray",
    };
    const statusLabel = (_a = input.status) !== null && _a !== void 0 ? _a : "unknown";
    // Footer chips: status, visibility, HTTPS enforcement, custom 404
    const footerChips = [
        {
            type: "Chip",
            label: `Status: ${statusLabel}`,
            color: statusColorMap[(_b = input.status) !== null && _b !== void 0 ? _b : "null"],
        },
        {
            type: "Chip",
            label: input.public ? "Public" : "Private",
            color: input.public ? "green" : "gray",
        },
        {
            type: "Chip",
            label: input.https_enforced ? "HTTPS Enforced" : "HTTPS Not Enforced",
            color: input.https_enforced ? "teal" : "gray",
        },
        {
            type: "Chip",
            label: input.custom_404 ? "Custom 404 ✓" : "Default 404",
            color: input.custom_404 ? "orange" : "gray",
        },
    ];
    // Build the main data list of properties
    const listItems = [
        {
            type: "DataListItem",
            label: [text("URL")],
            value: {
                type: "Button",
                label: input.url,
                href: input.url,
                variant: "text",
                color: "primary",
            },
        },
        {
            type: "DataListItem",
            label: [text("HTML URL")],
            value: input.html_url
                ? {
                    type: "Button",
                    label: input.html_url,
                    href: input.html_url,
                    variant: "text",
                    color: "primary",
                }
                : text("—"),
        },
        {
            type: "DataListItem",
            label: [text("CNAME")],
            value: input.cname ? text(input.cname) : text("—"),
        },
        {
            type: "DataListItem",
            label: [text("Build Type")],
            value: input.build_type ? text(input.build_type) : text("—"),
        },
        {
            type: "DataListItem",
            label: [text("Source")],
            value: input.source != null
                ? text(`${input.source.branch} @ ${input.source.path}`)
                : text("—"),
        },
        {
            type: "DataListItem",
            label: [text("Domain Verification")],
            value: text((_c = input.protected_domain_state) !== null && _c !== void 0 ? _c : "—"),
        },
        {
            type: "DataListItem",
            label: [text("Pending Unverified At")],
            value: input.pending_domain_unverified_at
                ? text(new Date(input.pending_domain_unverified_at).toLocaleString())
                : text("—"),
        },
    ];
    // If HTTPS certificate exists, add nested details
    if (input.https_certificate) {
        const cert = input.https_certificate;
        // Create markdown content for certificate details
        const mdLines = [];
        mdLines.push(`**State**: ${cert.state}`);
        mdLines.push(`**Description**: ${cert.description}`);
        mdLines.push(`**Domains**: ${cert.domains.join(", ")}`);
        if (cert.expires_at) {
            mdLines.push(`**Expires At**: ${new Date(cert.expires_at).toLocaleDateString()}`);
        }
        listItems.push({
            type: "DataListItem",
            label: [text("HTTPS Certificate")],
            value: {
                type: "Markdown",
                content: mdLines.join("\n\n"),
            },
        });
    }
    // Assemble the DataList component
    const dataList = {
        type: "DataList",
        childrenProps: listItems,
    };
    // Build Card header with a globe icon and primary title
    const header = {
        type: "CardHeader",
        title: (_d = input.cname) !== null && _d !== void 0 ? _d : input.url,
        description: input.status ? `Status: ${input.status}` : undefined,
        startElement: icon("globe", "blue", 20),
    };
    // Assemble the vertical card with header, content, and footer
    const card = {
        type: "VerticalCard",
        childrenProps: [
            header,
            {
                type: "CardContent",
                childrenProps: dataList,
            },
            {
                type: "CardFooter",
                childrenProps: {
                    type: "ChipGroup",
                    childrenProps: footerChips,
                },
            },
        ],
    };
    return card;
}
//# sourceMappingURL=813.js.map
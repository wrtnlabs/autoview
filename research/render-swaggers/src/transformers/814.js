export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d, _e;
    // Helper to map statuses to colors
    const mapStatusColor = (status) => {
        switch (status) {
            case "built":
                return "green";
            case "building":
                return "blue";
            case "errored":
                return "red";
            default:
                return "gray";
        }
    };
    // Helper to map boolean to Chip props
    const booleanToChip = (value, labelTrue = "Yes", labelFalse = "No") => ({
        type: "Chip",
        label: value ? labelTrue : labelFalse,
        color: value ? "success" : "error",
        variant: "filled",
    });
    // Helper to format optional date-time strings
    const formatDate = (dt) => {
        if (!dt)
            return "N/A";
        const d = new Date(dt);
        if (isNaN(d.getTime()))
            return dt;
        return d.toLocaleString();
    };
    // Determine which URL to show: prefer html_url for end-user
    const displayUrl = (_a = input.html_url) !== null && _a !== void 0 ? _a : input.url;
    // Build DataList items for each field
    const items = [
        {
            type: "DataListItem",
            label: { type: "Text", content: "Page URL", variant: "body1" },
            value: {
                type: "Button",
                variant: "text",
                color: "primary",
                label: displayUrl,
                href: displayUrl,
            },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Build Status", variant: "body1" },
            value: {
                type: "Text",
                content: (_b = input.status) !== null && _b !== void 0 ? _b : "unknown",
                color: mapStatusColor(input.status),
                variant: "body2",
            },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Custom Domain", variant: "body1" },
            value: input.cname
                ? {
                    type: "Button",
                    variant: "text",
                    color: "primary",
                    label: input.cname,
                    href: `https://${input.cname}`,
                }
                : { type: "Text", content: "None", variant: "body2", color: "gray" },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Domain Verified State", variant: "body1" },
            value: {
                type: "Text",
                content: (_c = input.protected_domain_state) !== null && _c !== void 0 ? _c : "N/A",
                color: input.protected_domain_state === "verified"
                    ? "green"
                    : input.protected_domain_state === "pending"
                        ? "orange"
                        : input.protected_domain_state === "unverified"
                            ? "red"
                            : "gray",
                variant: "body2",
            },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Pending Unverified At", variant: "body1" },
            value: { type: "Text", content: formatDate(input.pending_domain_unverified_at), variant: "body2" },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Custom 404 Page", variant: "body1" },
            value: booleanToChip(input.custom_404, "Enabled", "Disabled"),
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Publicly Visible", variant: "body1" },
            value: booleanToChip(input["public"], "Public", "Private"),
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "HTTPS Enforced", variant: "body1" },
            value: booleanToChip(input.https_enforced, "Yes", "No"),
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Build Type", variant: "body1" },
            value: {
                type: "Chip",
                label: (_d = input.build_type) !== null && _d !== void 0 ? _d : "default",
                variant: "outlined",
                color: input.build_type === "workflow" ? "info" : input.build_type === "legacy" ? "secondary" : "gray",
                size: "small",
            },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Source", variant: "body1" },
            value: {
                type: "Text",
                content: input.source ? `${input.source.branch}/${input.source.path}` : "N/A",
                variant: "body2",
            },
        },
    ];
    // If there's a certificate, display its details
    if (input.https_certificate) {
        const cert = input.https_certificate;
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Certificate State", variant: "body1" },
            value: {
                type: "Chip",
                label: cert.state,
                variant: "filled",
                color: cert.state === "issued" || cert.state === "authorized"
                    ? "green"
                    : cert.state === "errored" || cert.state === "bad_authz"
                        ? "error"
                        : "orange",
                size: "small",
            },
        }, {
            type: "DataListItem",
            label: { type: "Text", content: "Expires At", variant: "body1" },
            value: { type: "Text", content: (_e = cert.expires_at) !== null && _e !== void 0 ? _e : "N/A", variant: "body2" },
        });
        // Domain list as Markdown for compactness
        if (cert.domains && cert.domains.length > 0) {
            const mdContent = cert.domains.map((d) => `- ${d}`).join("\n");
            items.push({
                type: "DataListItem",
                label: { type: "Text", content: "Domains", variant: "body1" },
                value: { type: "Markdown", content: mdContent },
            });
        }
    }
    // Compose final DataList
    return {
        type: "DataList",
        childrenProps: items,
    };
}
//# sourceMappingURL=814.js.map
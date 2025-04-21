import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * The configuration for GitHub Pages for a repository.
     *
     * @title GitHub Pages
    */
    export type page = {
        /**
         * The API address for accessing this Page resource.
        */
        url: string;
        /**
         * The status of the most recent build of the Page.
        */
        status: "built" | "building" | "errored" | null;
        /**
         * The Pages site's custom domain
        */
        cname: string | null;
        /**
         * The state if the domain is verified
        */
        protected_domain_state?: "pending" | "verified" | "unverified" | null;
        /**
         * The timestamp when a pending domain becomes unverified.
        */
        pending_domain_unverified_at?: (string & tags.Format<"date-time">) | null;
        /**
         * Whether the Page has a custom 404 page.
        */
        custom_404: boolean;
        /**
         * The web address the Page can be accessed from.
        */
        html_url?: string;
        /**
         * The process in which the Page will be built.
        */
        build_type?: "legacy" | "workflow" | null;
        source?: Schema.pages_source_hash;
        /**
         * Whether the GitHub Pages site is publicly visible. If set to `true`, the site is accessible to anyone on the internet. If set to `false`, the site will only be accessible to users who have at least `read` access to the repository that published the site.
        */
        "public": boolean;
        https_certificate?: Schema.pages_https_certificate;
        /**
         * Whether https is enabled on the domain
        */
        https_enforced?: boolean;
    };
    /**
     * @title Pages Source Hash
    */
    export type pages_source_hash = {
        branch: string;
        path: string;
    };
    /**
     * @title Pages Https Certificate
    */
    export type pages_https_certificate = {
        state: "new" | "authorization_created" | "authorization_pending" | "authorized" | "authorization_revoked" | "issued" | "uploaded" | "approved" | "errored" | "bad_authz" | "destroy_pending" | "dns_changed";
        description: string;
        /**
         * Array of the domain set and its alternate name (if it is configured)
        */
        domains: string[];
        expires_at?: string & tags.Format<"date">;
    };
}
type IAutoViewTransformerInputType = Schema.page;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Helper to map statuses to colors
    const mapStatusColor = (status: string | null): IAutoView.IAutoViewTextProps["color"] => {
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
    const booleanToChip = (value: boolean | undefined, labelTrue = "Yes", labelFalse = "No"): IAutoView.IAutoViewChipProps => ({
        type: "Chip",
        label: value ? labelTrue : labelFalse,
        color: value ? "success" : "error",
        variant: "filled",
    });

    // Helper to format optional date-time strings
    const formatDate = (dt?: string | null): string => {
        if (!dt) return "N/A";
        const d = new Date(dt);
        if (isNaN(d.getTime())) return dt;
        return d.toLocaleString();
    };

    // Determine which URL to show: prefer html_url for end-user
    const displayUrl = input.html_url ?? input.url;

    // Build DataList items for each field
    const items: IAutoView.IAutoViewDataListItemProps[] = [
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
                content: input.status ?? "unknown",
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
                content: input.protected_domain_state ?? "N/A",
                color:
                    input.protected_domain_state === "verified"
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
                label: input.build_type ?? "default",
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
        items.push(
            {
                type: "DataListItem",
                label: { type: "Text", content: "Certificate State", variant: "body1" },
                value: {
                    type: "Chip",
                    label: cert.state,
                    variant: "filled",
                    color:
                        cert.state === "issued" || cert.state === "authorized"
                            ? "green"
                            : cert.state === "errored" || cert.state === "bad_authz"
                            ? "error"
                            : "orange",
                    size: "small",
                },
            },
            {
                type: "DataListItem",
                label: { type: "Text", content: "Expires At", variant: "body1" },
                value: { type: "Text", content: cert.expires_at ?? "N/A", variant: "body2" },
            }
        );
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

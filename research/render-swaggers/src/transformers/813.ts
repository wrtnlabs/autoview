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
    // Helper to create text components
    const text = (content: string): IAutoView.IAutoViewTextProps => ({
        type: "Text",
        content,
    });

    // Helper to create icon components
    const icon = (id: string, color?: IAutoView.IAutoViewIconProps["color"], size?: IAutoView.IAutoViewIconProps["size"]): IAutoView.IAutoViewIconProps => ({
        type: "Icon",
        id,
        color,
        size,
    });

    // Map page status to colors for chips
    const statusColorMap: Record<NonNullable<typeof input.status> | "null", IAutoView.IAutoViewChipProps["color"]> = {
        built: "success",
        building: "info",
        errored: "error",
        null: "gray",
    };
    const statusLabel = input.status ?? "unknown";

    // Footer chips: status, visibility, HTTPS enforcement, custom 404
    const footerChips: IAutoView.IAutoViewChipProps[] = [
        {
            type: "Chip",
            label: `Status: ${statusLabel}`,
            color: statusColorMap[input.status ?? "null"],
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
    const listItems: IAutoView.IAutoViewDataListItemProps[] = [
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
            value:
                input.source != null
                    ? text(`${input.source.branch} @ ${input.source.path}`)
                    : text("—"),
        },
        {
            type: "DataListItem",
            label: [text("Domain Verification")],
            value: text(input.protected_domain_state ?? "—"),
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
        const mdLines: string[] = [];
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
    const dataList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: listItems,
    };

    // Build Card header with a globe icon and primary title
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: input.cname ?? input.url,
        description: input.status ? `Status: ${input.status}` : undefined,
        startElement: icon("globe", "blue", 20),
    };

    // Assemble the vertical card with header, content, and footer
    const card: IAutoView.IAutoViewVerticalCardProps = {
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

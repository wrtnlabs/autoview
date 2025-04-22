import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Api Overview
     *
     * @title Api Overview
    */
    export type api_overview = {
        verifiable_password_authentication: boolean;
        ssh_key_fingerprints?: {
            SHA256_RSA?: string;
            SHA256_DSA?: string;
            SHA256_ECDSA?: string;
            SHA256_ED25519?: string;
        };
        ssh_keys?: string[];
        hooks?: string[];
        github_enterprise_importer?: string[];
        web?: string[];
        api?: string[];
        git?: string[];
        packages?: string[];
        pages?: string[];
        importer?: string[];
        actions?: string[];
        actions_macos?: string[];
        codespaces?: string[];
        dependabot?: string[];
        copilot?: string[];
        domains?: {
            website?: string[];
            codespaces?: string[];
            copilot?: string[];
            packages?: string[];
            actions?: string[];
            actions_inbound?: {
                full_domains?: string[];
                wildcard_domains?: string[];
            };
            artifact_attestations?: {
                trust_domain?: string;
                services?: string[];
            };
        };
    };
}
type IAutoViewTransformerInputType = Schema.api_overview;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Build the card header with an icon and dynamic description
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: "API Overview",
        description: `Verifiable Password Authentication is ${input.verifiable_password_authentication ? "Enabled" : "Disabled"}`,
        startElement: {
            type: "Icon",
            id: "shield-check",    // FontAwesome icon
            color: "blue",
            size: 24,
        },
    };

    // We'll accumulate each piece of data as a DataListItem
    const items: IAutoView.IAutoViewDataListItemProps[] = [];

    // 1) SSH Key Fingerprints as a markdown bullet list
    if (input.ssh_key_fingerprints) {
        const fp = input.ssh_key_fingerprints;
        // Collect only the present fingerprint entries
        const lines: string[] = [];
        if (fp.SHA256_RSA)    lines.push(`- SHA256_RSA: \`${fp.SHA256_RSA}\``);
        if (fp.SHA256_DSA)    lines.push(`- SHA256_DSA: \`${fp.SHA256_DSA}\``);
        if (fp.SHA256_ECDSA)  lines.push(`- SHA256_ECDSA: \`${fp.SHA256_ECDSA}\``);
        if (fp.SHA256_ED25519)lines.push(`- SHA256_ED25519: \`${fp.SHA256_ED25519}\``);

        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "SSH Key Fingerprints", variant: "subtitle1" },
            value: { type: "Markdown", content: lines.join("\n") },
        });
    }

    // 2) Generic string-array properties rendered as chips
    const arrayProps: { key: keyof IAutoViewTransformerInputType; label: string }[] = [
        { key: "ssh_keys", label: "SSH Keys" },
        { key: "hooks", label: "Hooks" },
        { key: "github_enterprise_importer", label: "GitHub Enterprise Importer" },
        { key: "web", label: "Web Endpoints" },
        { key: "api", label: "API Endpoints" },
        { key: "git", label: "Git Endpoints" },
        { key: "packages", label: "Packages" },
        { key: "pages", label: "Pages" },
        { key: "importer", label: "Importer" },
        { key: "actions", label: "Actions" },
        { key: "actions_macos", label: "Actions macOS" },
        { key: "codespaces", label: "Codespaces" },
        { key: "dependabot", label: "Dependabot" },
        { key: "copilot", label: "Copilot" },
    ];
    for (const { key, label } of arrayProps) {
        const arr = input[key];
        if (Array.isArray(arr) && arr.length > 0) {
            items.push({
                type: "DataListItem",
                label: { type: "Text", content: label, variant: "subtitle1" },
                value: {
                    type: "ChipGroup",
                    childrenProps: arr.map((val) => ({
                        type: "Chip",
                        label: val,
                        variant: "outlined",
                        size: "small",
                    })) as IAutoView.IAutoViewChipProps[],
                },
            });
        }
    }

    // 3) Domains: nested structure, render via markdown sections
    if (input.domains) {
        const d = input.domains;
        const mdLines: string[] = [];
        // Helper to render a section of strings
        const renderList = (title: string, list?: string[]) => {
            if (list && list.length) {
                mdLines.push(`#### ${title}`);
                for (const entry of list) {
                    mdLines.push(`- \`${entry}\``);
                }
                mdLines.push(""); // blank line
            }
        };
        renderList("Website Domains", d.website);
        renderList("Codespaces Domains", d.codespaces);
        renderList("Copilot Domains", d.copilot);
        renderList("Package Domains", d.packages);
        renderList("Actions Domains", d.actions);

        // Actions inbound has nested full and wildcard domains
        if (d.actions_inbound) {
            mdLines.push("#### Actions Inbound Domains");
            renderList(" - Full Domains", d.actions_inbound.full_domains);
            renderList(" - Wildcard Domains", d.actions_inbound.wildcard_domains);
        }

        // Artifact attestations: trust domain + services
        if (d.artifact_attestations) {
            mdLines.push("#### Artifact Attestations");
            if (d.artifact_attestations.trust_domain) {
                mdLines.push(`- Trust Domain: \`${d.artifact_attestations.trust_domain}\``);
            }
            renderList("Services", d.artifact_attestations.services);
        }

        if (mdLines.length > 0) {
            items.push({
                type: "DataListItem",
                label: { type: "Text", content: "Domains", variant: "subtitle1" },
                value: { type: "Markdown", content: mdLines.join("\n") },
            });
        }
    }

    // If there's no data beyond the header, show a friendly message
    if (items.length === 0) {
        return {
            type: "Text",
            content: "No API overview data is available.",
        } as IAutoView.IAutoViewTextProps;
    }

    // Compose the data list
    const dataList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: items,
    };

    // Wrap into card content
    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: dataList,
    };

    // Final vertical card combining header + content
    const card: IAutoView.IAutoViewVerticalCardProps = {
        type: "VerticalCard",
        childrenProps: [header, content],
    };

    return card;
}

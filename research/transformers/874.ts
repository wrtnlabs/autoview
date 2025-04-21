import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A repository security advisory.
    */
    export type repository_advisory = {
        /**
         * The GitHub Security Advisory ID.
        */
        ghsa_id: string;
        /**
         * The Common Vulnerabilities and Exposures (CVE) ID.
        */
        cve_id: string | null;
        /**
         * The API URL for the advisory.
        */
        url: string;
        /**
         * The URL for the advisory.
        */
        html_url: string;
        /**
         * A short summary of the advisory.
        */
        summary: string;
        /**
         * A detailed description of what the advisory entails.
        */
        description: (string & tags.MaxLength<65535>) | null;
        /**
         * The severity of the advisory.
        */
        severity: "critical" | "high" | "medium" | "low" | null;
        /**
         * The author of the advisory.
        */
        author: any | null;
        /**
         * The publisher of the advisory.
        */
        publisher: any | null;
        identifiers: {
            /**
             * The type of identifier.
            */
            type: "CVE" | "GHSA";
            /**
             * The identifier value.
            */
            value: string;
        }[];
        /**
         * The state of the advisory.
        */
        state: "published" | "closed" | "withdrawn" | "draft" | "triage";
        /**
         * The date and time of when the advisory was created, in ISO 8601 format.
        */
        created_at: (string & tags.Format<"date-time">) | null;
        /**
         * The date and time of when the advisory was last updated, in ISO 8601 format.
        */
        updated_at: (string & tags.Format<"date-time">) | null;
        /**
         * The date and time of when the advisory was published, in ISO 8601 format.
        */
        published_at: (string & tags.Format<"date-time">) | null;
        /**
         * The date and time of when the advisory was closed, in ISO 8601 format.
        */
        closed_at: (string & tags.Format<"date-time">) | null;
        /**
         * The date and time of when the advisory was withdrawn, in ISO 8601 format.
        */
        withdrawn_at: (string & tags.Format<"date-time">) | null;
        submission: {
            /**
             * Whether a private vulnerability report was accepted by the repository's administrators.
            */
            accepted: boolean;
        } | null;
        vulnerabilities: any[] | null;
        cvss: {
            /**
             * The CVSS vector.
            */
            vector_string: string | null;
            /**
             * The CVSS score.
            */
            score: (number & tags.Minimum<0> & tags.Maximum<10>) | null;
        } | null;
        cvss_severities?: Schema.cvss_severities;
        cwes: {
            /**
             * The Common Weakness Enumeration (CWE) identifier.
            */
            cwe_id: string;
            /**
             * The name of the CWE.
            */
            name: string;
        }[] | null;
        /**
         * A list of only the CWE IDs.
        */
        cwe_ids: string[] | null;
        credits: {
            /**
             * The username of the user credited.
            */
            login?: string;
            type?: any;
        }[] | null;
        credits_detailed: any[] | null;
        /**
         * A list of users that collaborate on the advisory.
        */
        collaborating_users: any[] | null;
        /**
         * A list of teams that collaborate on the advisory.
        */
        collaborating_teams: any[] | null;
        /**
         * A temporary private fork of the advisory's repository for collaborating on a fix.
        */
        private_fork: any | null;
    };
    export type simple_user = any;
    export type repository_advisory_vulnerability = any;
    export type cvss_severities = {
        cvss_v3?: {
            /**
             * The CVSS 3 vector string.
            */
            vector_string: string | null;
            /**
             * The CVSS 3 score.
            */
            score: (number & tags.Minimum<0> & tags.Maximum<10>) | null;
        } | null;
        cvss_v4?: {
            /**
             * The CVSS 4 vector string.
            */
            vector_string: string | null;
            /**
             * The CVSS 4 score.
            */
            score: (number & tags.Minimum<0> & tags.Maximum<10>) | null;
        } | null;
    } | null;
    export type security_advisory_credit_types = any;
    export type repository_advisory_credit = any;
    export type team = any;
    export type simple_repository = any;
}
type IAutoViewTransformerInputType = Schema.repository_advisory;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Map advisory severity to a colored Chip
    const severityLabel = input.severity ? input.severity.toUpperCase() : "UNKNOWN";
    const severityColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
        critical: "error",
        high: "warning",
        medium: "info",
        low: "secondary",
    };
    const severityColor = input.severity ? severityColorMap[input.severity] ?? "gray" : "gray";
    const severityChip: IAutoView.IAutoViewChipProps = {
        type: "Chip",
        label: severityLabel,
        color: severityColor,
        variant: "filled",
        size: "medium",
    };

    // Header with GHSA ID and severity
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: input.ghsa_id,
        description: input.summary,
        startElement: severityChip,
    };

    // Build content section
    const contentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];

    // Use Markdown to render a detailed description if provided
    if (input.description) {
        contentChildren.push({
            type: "Markdown",
            content: input.description,
        });
    }

    // Collect key-value pairs in a data list
    const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [];
    const pushItem = (label: string, value: string | number | boolean | null) => {
        if (value !== null && value !== undefined) {
            dataListItems.push({
                type: "DataListItem",
                label: { type: "Text", content: label, variant: "subtitle2" },
                value: { type: "Text", content: String(value), variant: "body2" },
            });
        }
    };

    pushItem("CVE ID", input.cve_id);
    pushItem("State", input.state);
    pushItem("Published At", input.published_at);
    pushItem("Updated At", input.updated_at);
    pushItem("Closed At", input.closed_at);
    pushItem("Withdrawn At", input.withdrawn_at);
    if (input.submission) {
        pushItem("Private Report Accepted", input.submission.accepted ? "Yes" : "No");
    }
    if (input.cvss) {
        pushItem("CVSS Score", input.cvss.score);
        pushItem("CVSS Vector", input.cvss.vector_string);
    }
    if (input.cwe_ids && input.cwe_ids.length > 0) {
        pushItem("CWE IDs", input.cwe_ids.join(", "));
    }

    if (dataListItems.length > 0) {
        contentChildren.push({
            type: "DataList",
            childrenProps: dataListItems,
        });
    }

    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: contentChildren,
    };

    // Footer with action buttons
    const footerChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];
    if (input.html_url) {
        footerChildren.push({
            type: "Button",
            label: "View on GitHub",
            variant: "contained",
            color: "primary",
            href: input.html_url,
            startElement: { type: "Icon", id: "github", size: 20 },
        });
    }
    if (input.url) {
        footerChildren.push({
            type: "Button",
            label: "API URL",
            variant: "outlined",
            color: "secondary",
            href: input.url,
            startElement: { type: "Icon", id: "link", size: 20 },
        });
    }
    const footer: IAutoView.IAutoViewCardFooterProps = {
        type: "CardFooter",
        childrenProps: footerChildren,
    };

    // Assemble everything into a responsive VerticalCard
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
}

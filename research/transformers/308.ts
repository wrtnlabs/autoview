import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A GitHub Security Advisory.
    */
    export type global_advisory = {
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
         * The API URL for the repository advisory.
        */
        repository_advisory_url: (string & tags.Format<"uri">) | null;
        /**
         * A short summary of the advisory.
        */
        summary: string;
        /**
         * A detailed description of what the advisory entails.
        */
        description: (string & tags.MaxLength<65535>) | null;
        /**
         * The type of advisory.
        */
        type: "reviewed" | "unreviewed" | "malware";
        /**
         * The severity of the advisory.
        */
        severity: "critical" | "high" | "medium" | "low" | "unknown";
        /**
         * The URL of the advisory's source code.
        */
        source_code_location: (string & tags.Format<"uri">) | null;
        identifiers: {
            /**
             * The type of identifier.
            */
            type: "CVE" | "GHSA";
            /**
             * The identifier value.
            */
            value: string;
        }[] | null;
        references: string[] | null;
        /**
         * The date and time of when the advisory was published, in ISO 8601 format.
        */
        published_at: string;
        /**
         * The date and time of when the advisory was last updated, in ISO 8601 format.
        */
        updated_at: string;
        /**
         * The date and time of when the advisory was reviewed by GitHub, in ISO 8601 format.
        */
        github_reviewed_at: (string & tags.Format<"date-time">) | null;
        /**
         * The date and time when the advisory was published in the National Vulnerability Database, in ISO 8601 format.
         * This field is only populated when the advisory is imported from the National Vulnerability Database.
        */
        nvd_published_at: (string & tags.Format<"date-time">) | null;
        /**
         * The date and time of when the advisory was withdrawn, in ISO 8601 format.
        */
        withdrawn_at: (string & tags.Format<"date-time">) | null;
        /**
         * The products and respective version ranges affected by the advisory.
        */
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
        epss?: Schema.security_advisory_epss;
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
         * The users who contributed to the advisory.
        */
        credits: {
            user: any;
            type: any;
        }[] | null;
    };
    export type vulnerability = any;
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
    /**
     * The EPSS scores as calculated by the [Exploit Prediction Scoring System](https://www.first.org/epss).
    */
    export type security_advisory_epss = {
        percentage?: number & tags.Minimum<0> & tags.Maximum<100>;
        percentile?: number & tags.Minimum<0> & tags.Maximum<100>;
    } | null;
    export type simple_user = any;
    export type security_advisory_credit_types = any;
}
type IAutoViewTransformerInputType = Schema.global_advisory[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Map advisory severity to icon colors
    const severityColorMap: Record<string, IAutoView.IAutoViewIconProps["color"]> = {
        critical: "red",
        high: "orange",
        medium: "yellow",
        low: "green",
        unknown: "gray",
    };

    // Transform each advisory into a ListItem component
    const listItems: IAutoView.IAutoViewListItemProps[] = input.map((advisory) => {
        const severity = advisory.severity ?? "unknown";
        const color = severityColorMap[severity] || "gray";

        // Round CVSS score to one decimal
        const cvssScore = advisory.cvss?.score != null
            ? Math.round(advisory.cvss.score * 10) / 10
            : null;

        // Build endElement array: a link button and (optionally) a CVSS badge
        const endElements: (IAutoView.IAutoViewButtonProps | IAutoView.IAutoViewBadgeProps)[] = [
            {
                type: "Button",
                label: "View",
                href: advisory.html_url,
                variant: "text",
                size: "small",
                color: "primary",
            },
            cvssScore != null && {
                type: "Badge",
                count: cvssScore,
                maxCount: 10,
                showZero: false,
                // Use an info icon inside the badge
                childrenProps: {
                    type: "Icon",
                    id: "info-circle",
                    color: "blue",
                    size: 16,
                },
            },
        ].filter(Boolean) as any;

        return {
            type: "ListItem",
            title: advisory.ghsa_id,
            description: advisory.summary || advisory.description || "No summary available.",
            // Use an exclamation icon to reflect severity
            startElement: {
                type: "Icon",
                id: "exclamation-triangle",
                color,
                size: 20,
            },
            endElement: endElements,
        };
    });

    // Compose the final List component
    const list: IAutoView.IAutoViewListProps = {
        type: "List",
        // Responsive list of advisories
        childrenProps: listItems,
    };

    return list;
}

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
type IAutoViewTransformerInputType = Schema.repository_advisory[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



// Transforms an array of repository advisories into an AutoView list,
// with icons for severity and chips for state.
// Falls back to a Markdown notice if the input is empty.
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // If there are no advisories, show a simple markdown message.
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No security advisories available."
        };
    }

    // Map advisory severity to a FontAwesome icon and color.
    const mapSeverityIcon = (
        severity: Schema.repository_advisory["severity"]
    ): IAutoView.IAutoViewIconProps => {
        let id = "question-circle";
        let color: IAutoView.IAutoViewIconProps["color"] = "gray";
        switch (severity) {
            case "critical":
                id = "exclamation-triangle";
                color = "red";
                break;
            case "high":
                id = "exclamation-triangle";
                color = "orange";
                break;
            case "medium":
                id = "exclamation-circle";
                color = "yellow";
                break;
            case "low":
                id = "info-circle";
                color = "blue";
                break;
            // null or unknown → generic question icon
        }
        return {
            type: "Icon",
            id,
            color,
            size: 20
        };
    };

    // Map advisory state to a colored chip.
    const mapStateChip = (
        state: Schema.repository_advisory["state"]
    ): IAutoView.IAutoViewChipProps => {
        let color: IAutoView.IAutoViewChipProps["color"] = "gray";
        switch (state) {
            case "published":
                color = "green";
                break;
            case "closed":
                color = "gray";
                break;
            case "withdrawn":
                color = "darkGray";
                break;
            case "draft":
                color = "blue";
                break;
            case "triage":
                color = "orange";
                break;
        }
        return {
            type: "Chip",
            label: state,
            color,
            variant: "outlined",
            size: "small"
        };
    };

    // Build a ListItem for each advisory, showing ID, summary,
    // severity icon on the left, and state chip on the right.
    const childrenProps: IAutoView.IAutoViewListItemProps[] = input.map(advisory => ({
        type: "ListItem",
        title: advisory.ghsa_id,
        description: advisory.summary,
        startElement: mapSeverityIcon(advisory.severity),
        // wrap in an array so that ListItem will render correctly on small screens
        endElement: [mapStateChip(advisory.state)]
    }));

    // Return a responsive list of advisories.
    return {
        type: "List",
        childrenProps
    };
}

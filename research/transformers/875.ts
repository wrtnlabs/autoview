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
  // Map severity to an icon and color for visual emphasis.
  const severityMap: Record<string, { icon: string; color: IAutoView.IAutoViewIconProps['color'] }> = {
    critical: { icon: "bomb", color: "red" },
    high:     { icon: "fire", color: "orange" },
    medium:   { icon: "exclamation-triangle", color: "yellow" },
    low:      { icon: "info-circle", color: "green" },
    "null":   { icon: "question-circle", color: "gray" },
  };
  const sevKey = input.severity ?? "null";
  const { icon: severityIcon, color: severityColor } = severityMap[sevKey] || severityMap["null"];

  // Map state to a chip color
  const stateColorMap: Record<string, IAutoView.IAutoViewChipProps['color']> = {
    published: "success",
    closed:    "gray",
    withdrawn: "error",
    draft:     "info",
    triage:    "warning",
  };
  const stateColor = stateColorMap[input.state] || "secondary";

  // Build the header with summary, GHSA ID, severity icon and state chip.
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.summary,
    // Show GHSA ID under the title
    description: input.ghsa_id,
    startElement: {
      type: "Icon",
      id: severityIcon,
      color: severityColor,
      size: 24,
    },
    endElement: {
      type: "Chip",
      label: input.state,
      variant: "filled",
      color: stateColor,
    },
  };

  // Prepare DataList items for key fields
  const listItems: IAutoView.IAutoViewDataListItemProps[] = [];

  // CVE ID
  if (input.cve_id) {
    listItems.push({
      type: "DataListItem",
      label: { type: "Text", content: "CVE ID", variant: "subtitle2" },
      value: { type: "Text", content: input.cve_id, variant: "body2" },
    });
  }

  // Identifiers (join all values)
  if (input.identifiers && input.identifiers.length) {
    const vals = input.identifiers.map((i) => i.value).join(", ");
    listItems.push({
      type: "DataListItem",
      label: { type: "Text", content: "Identifiers", variant: "subtitle2" },
      value: { type: "Text", content: vals, variant: "body2" },
    });
  }

  // CVSS score
  if (input.cvss && input.cvss.score != null) {
    listItems.push({
      type: "DataListItem",
      label: { type: "Text", content: "CVSS Score", variant: "subtitle2" },
      value: { type: "Text", content: input.cvss.score.toFixed(1), variant: "body2" },
    });
  }

  // CWE IDs
  if (input.cwe_ids && input.cwe_ids.length) {
    listItems.push({
      type: "DataListItem",
      label: { type: "Text", content: "CWE IDs", variant: "subtitle2" },
      value: { type: "Text", content: input.cwe_ids.join(", "), variant: "body2" },
    });
  }

  // Submission accepted
  if (input.submission) {
    listItems.push({
      type: "DataListItem",
      label: { type: "Text", content: "Submission", variant: "subtitle2" },
      // Use a chip to visualize boolean accepted status
      value: {
        type: "Chip",
        label: input.submission.accepted ? "Accepted" : "Not Accepted",
        variant: "filled",
        color: input.submission.accepted ? "success" : "error",
      },
    });
  }

  // Dates (created & published)
  const humanDate = (dt: string | null) =>
    dt ? new Date(dt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : null;
  if (input.created_at) {
    listItems.push({
      type: "DataListItem",
      label: { type: "Text", content: "Created", variant: "subtitle2" },
      value: { type: "Text", content: humanDate(input.created_at)!, variant: "body2" },
    });
  }
  if (input.published_at) {
    listItems.push({
      type: "DataListItem",
      label: { type: "Text", content: "Published", variant: "subtitle2" },
      value: { type: "Text", content: humanDate(input.published_at)!, variant: "body2" },
    });
  }

  // Assemble the DataList component
  const detailList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: listItems,
  };

  // Use Markdown to render the detailed description if available
  const descriptionPane: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    content: input.description ?? "_No detailed description available._",
  };

  // Footer with a call-to-action button
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: {
      type: "Button",
      label: "View Advisory",
      href: input.html_url,
      variant: "contained",
      color: "primary",
    },
  };

  // Compose the vertical card
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, { type: "CardContent", childrenProps: [descriptionPane, detailList] }, footer],
  };

  return card;
}

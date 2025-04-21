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
  // Map severity levels to UI chip colors
  const severityColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
    critical: "red",
    high: "orange",
    medium: "yellow",
    low: "lime",
  };
  const severityLabel = input.severity ? input.severity.toUpperCase() : "UNKNOWN";
  const severityColor = input.severity
    ? severityColorMap[input.severity] || "gray"
    : "gray";

  // Compose the card header showing GHSA ID, summary and severity
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.ghsa_id,
    description: input.summary,
    startElement: {
      type: "Chip",
      label: severityLabel,
      color: severityColor,
      variant: "filled",
      size: "medium",
    },
  };

  // Helper to push a label/value pair into the details list
  const details: IAutoView.IAutoViewDataListItemProps[] = [];
  const pushDetail = (label: string, content: string | IAutoView.IAutoViewComponentProps) => {
    // Wrap primitive content into a Text component if needed
    const valueComponent: IAutoView.IAutoViewPresentationComponentProps =
      typeof content === "string"
        ? { type: "Text", content }
        : (content as IAutoView.IAutoViewPresentationComponentProps);

    details.push({
      type: "DataListItem",
      label: { type: "Text", content: label },
      value: valueComponent,
    });
  };

  // Date fields
  if (input.published_at) {
    pushDetail("Published", input.published_at.split("T")[0]);
  }
  if (input.created_at) {
    pushDetail("Created", input.created_at.split("T")[0]);
  }
  if (input.updated_at) {
    pushDetail("Updated", input.updated_at.split("T")[0]);
  }

  // Advisory state
  pushDetail("State", input.state);

  // CVSS score & vector
  if (input.cvss && input.cvss.score != null) {
    const md = `**Score:** ${input.cvss.score}\n**Vector:** ${input.cvss.vector_string ?? "N/A"}`;
    details.push({
      type: "DataListItem",
      label: { type: "Text", content: "CVSS" },
      value: { type: "Markdown", content: md },
    });
  }

  // CWE identifiers as a chip group
  if (input.cwes && input.cwes.length) {
    details.push({
      type: "DataListItem",
      label: { type: "Text", content: "CWEs" },
      value: {
        type: "ChipGroup",
        childrenProps: input.cwes.map(cwe => ({
          type: "Chip",
          label: `${cwe.cwe_id}: ${cwe.name}`,
          variant: "outlined",
          size: "small",
        })),
      },
    });
  }

  // Submission acceptance indicator
  if (input.submission) {
    details.push({
      type: "DataListItem",
      label: { type: "Text", content: "Private Report Accepted" },
      value: {
        type: "Icon",
        id: input.submission.accepted ? "check-circle" : "times-circle",
        color: input.submission.accepted ? "green" : "red",
        size: 16,
      },
    });
  }

  // Build the data list
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: details,
  };

  // Assemble card content: description + details
  const contentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];
  if (input.description) {
    contentChildren.push({
      type: "Markdown",
      content: input.description,
    });
  }
  contentChildren.push(dataList);

  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: contentChildren,
  };

  // Footer: link to the GitHub advisory page
  const cardFooter: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: {
      type: "Button",
      label: "View Advisory",
      href: input.html_url,
      variant: "outlined",
      color: "primary",
      startElement: { type: "Icon", id: "external-link-alt", size: 16 },
    },
  };

  // Final vertical card encapsulating the entire advisory view
  return {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent, cardFooter],
  };
}

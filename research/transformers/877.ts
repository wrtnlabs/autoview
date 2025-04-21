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
  // Map advisory severity to FontAwesome icon IDs and AutoView colors
  const severityIconMap: Record<"critical" | "high" | "medium" | "low", string> = {
    critical: "exclamation-triangle",
    high:     "fire",
    medium:   "exclamation-circle",
    low:      "arrow-down",
  };
  const severityColorMap: Record<"critical" | "high" | "medium" | "low", 
    "primary" | "secondary" | "success" | "error" | "warning" | "info" | "red" | "orange" | "yellow" | "lime" | "green" | "teal" | "cyan" | "blue" | "indigo" | "violet" | "pink" | "gray" | "darkGray"
  > = {
    critical: "error",
    high:     "warning",
    medium:   "info",
    low:      "gray",
  };

  // Build the card header: GHSA ID, summary, and a severity icon if present
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.ghsa_id,
    description: input.summary,
    ...(input.severity
      ? {
          // Show an icon for severity
          startElement: {
            type: "Icon",
            id: severityIconMap[input.severity],
            color: severityColorMap[input.severity],
            size: 24,
          } as IAutoView.IAutoViewIconProps,
        }
      : {}),
  };

  // Accumulate content components: markdown description and a details list
  const contentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];

  // Render the full description in markdown if available
  if (input.description) {
    contentChildren.push({
      type: "Markdown",
      content: input.description,
    } as IAutoView.IAutoViewMarkdownProps);
  }

  // Prepare DataList items for various structured fields
  const listItems: IAutoView.IAutoViewDataListItemProps[] = [];

  // Identifiers (CVE, GHSA, etc.)
  if (Array.isArray(input.identifiers) && input.identifiers.length > 0) {
    const label: IAutoView.IAutoViewTextProps = {
      type: "Text",
      content: "Identifiers",
    };
    const values = input.identifiers
      .map((i) => `${i.type}: ${i.value}`)
      .join(", ");
    const value: IAutoView.IAutoViewTextProps = {
      type: "Text",
      content: values,
    };
    listItems.push({
      type: "DataListItem",
      label,
      value,
    });
  }

  // CVSS Score and Vector
  if (input.cvss) {
    if (input.cvss.score != null) {
      const label: IAutoView.IAutoViewTextProps = {
        type: "Text",
        content: "CVSS Score",
      };
      // Emphasize the score with a filled chip
      const value: IAutoView.IAutoViewChipProps = {
        type: "Chip",
        label: `${input.cvss.score}`,
        color: input.cvss.score >= 7 ? "error" : input.cvss.score >= 4 ? "warning" : "success",
        size: "small",
        variant: "filled",
      };
      listItems.push({ type: "DataListItem", label, value });
    }
    if (input.cvss.vector_string) {
      const label: IAutoView.IAutoViewTextProps = {
        type: "Text",
        content: "CVSS Vector",
      };
      const value: IAutoView.IAutoViewTextProps = {
        type: "Text",
        content: input.cvss.vector_string,
      };
      listItems.push({ type: "DataListItem", label, value });
    }
  }

  // CWE IDs as a group of small chips
  if (Array.isArray(input.cwe_ids) && input.cwe_ids.length > 0) {
    const label: IAutoView.IAutoViewTextProps = {
      type: "Text",
      content: "CWE",
    };
    const chips: IAutoView.IAutoViewChipProps[] = input.cwe_ids.map((cwe) => ({
      type: "Chip",
      label: cwe,
      size: "small",
      variant: "outlined",
    }));
    const value: IAutoView.IAutoViewChipGroupProps = {
      type: "ChipGroup",
      childrenProps: chips,
      maxItems: 5,
    };
    listItems.push({ type: "DataListItem", label, value });
  }

  // If any DataList items were created, wrap them in a DataList component
  if (listItems.length > 0) {
    contentChildren.push({
      type: "DataList",
      childrenProps: listItems,
    } as IAutoView.IAutoViewDataListProps);
  }

  // Footer with a button linking to the advisory on GitHub
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    ...(input.html_url
      ? {
          childrenProps: {
            type: "Button",
            label: "View on GitHub",
            variant: "contained",
            color: "primary",
            href: input.html_url,
          } as IAutoView.IAutoViewButtonProps,
        }
      : {}),
  };

  // Assemble everything into a responsive vertical card
  return {
    type: "VerticalCard",
    childrenProps: [
      header,
      {
        type: "CardContent",
        childrenProps: contentChildren,
      } as IAutoView.IAutoViewCardContentProps,
      footer,
    ],
  } as IAutoView.IAutoViewVerticalCardProps;
}

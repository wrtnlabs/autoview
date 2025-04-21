import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A Dependabot alert.
    */
    export type dependabot_alert = {
        number: Schema.alert_number;
        /**
         * The state of the Dependabot alert.
        */
        state: "auto_dismissed" | "dismissed" | "fixed" | "open";
        /**
         * Details for the vulnerable dependency.
        */
        dependency: {
            "package"?: Schema.dependabot_alert_package;
            /**
             * The full path to the dependency manifest file, relative to the root of the repository.
            */
            manifest_path?: string;
            /**
             * The execution scope of the vulnerable dependency.
            */
            scope?: "development" | "runtime" | null;
            /**
             * The vulnerable dependency's relationship to your project.
             *
             * > [!NOTE]
             * > We are rolling out support for dependency relationship across ecosystems. This value will be "unknown" for all dependencies in unsupported ecosystems.
             *
            */
            relationship?: "unknown" | "direct" | "transitive" | null;
        };
        security_advisory: Schema.dependabot_alert_security_advisory;
        security_vulnerability: Schema.dependabot_alert_security_vulnerability;
        url: Schema.alert_url;
        html_url: Schema.alert_html_url;
        created_at: Schema.alert_created_at;
        updated_at: Schema.alert_updated_at;
        dismissed_at: Schema.alert_dismissed_at;
        dismissed_by: Schema.nullable_simple_user;
        /**
         * The reason that the alert was dismissed.
        */
        dismissed_reason: "fix_started" | "inaccurate" | "no_bandwidth" | "not_used" | "tolerable_risk" | null;
        /**
         * An optional comment associated with the alert's dismissal.
        */
        dismissed_comment: (string & tags.MaxLength<280>) | null;
        fixed_at: Schema.alert_fixed_at;
        auto_dismissed_at?: Schema.alert_auto_dismissed_at;
    };
    /**
     * The security alert number.
    */
    export type alert_number = number & tags.Type<"int32">;
    /**
     * Details for the vulnerable package.
    */
    export type dependabot_alert_package = {
        /**
         * The package's language or package management ecosystem.
        */
        ecosystem: string;
        /**
         * The unique package name within its ecosystem.
        */
        name: string;
    };
    /**
     * Details for the GitHub Security Advisory.
    */
    export type dependabot_alert_security_advisory = {
        /**
         * The unique GitHub Security Advisory ID assigned to the advisory.
        */
        ghsa_id: string;
        /**
         * The unique CVE ID assigned to the advisory.
        */
        cve_id: string | null;
        /**
         * A short, plain text summary of the advisory.
        */
        summary: string;
        /**
         * A long-form Markdown-supported description of the advisory.
        */
        description: string;
        /**
         * Vulnerable version range information for the advisory.
        */
        vulnerabilities: Schema.dependabot_alert_security_vulnerability[];
        /**
         * The severity of the advisory.
        */
        severity: "low" | "medium" | "high" | "critical";
        /**
         * Details for the advisory pertaining to the Common Vulnerability Scoring System.
        */
        cvss: {
            /**
             * The overall CVSS score of the advisory.
            */
            score: number;
            /**
             * The full CVSS vector string for the advisory.
            */
            vector_string: string | null;
        };
        cvss_severities?: Schema.cvss_severities;
        epss?: Schema.security_advisory_epss;
        /**
         * Details for the advisory pertaining to Common Weakness Enumeration.
        */
        cwes: {
            /**
             * The unique CWE ID.
            */
            cwe_id: string;
            /**
             * The short, plain text name of the CWE.
            */
            name: string;
        }[];
        /**
         * Values that identify this advisory among security information sources.
        */
        identifiers: {
            /**
             * The type of advisory identifier.
            */
            type: "CVE" | "GHSA";
            /**
             * The value of the advisory identifer.
            */
            value: string;
        }[];
        /**
         * Links to additional advisory information.
        */
        references: {
            /**
             * The URL of the reference.
            */
            url: string;
        }[];
        /**
         * The time that the advisory was published in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
        */
        published_at: string;
        /**
         * The time that the advisory was last modified in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
        */
        updated_at: string;
        /**
         * The time that the advisory was withdrawn in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
        */
        withdrawn_at: (string & tags.Format<"date-time">) | null;
    };
    /**
     * Details pertaining to one vulnerable version range for the advisory.
    */
    export type dependabot_alert_security_vulnerability = {
        "package": Schema.dependabot_alert_package;
        /**
         * The severity of the vulnerability.
        */
        severity: "low" | "medium" | "high" | "critical";
        /**
         * Conditions that identify vulnerable versions of this vulnerability's package.
        */
        vulnerable_version_range: string;
        /**
         * Details pertaining to the package version that patches this vulnerability.
        */
        first_patched_version: {
            /**
             * The package version that patches this vulnerability.
            */
            identifier: string;
        } | null;
    };
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
    /**
     * The REST API URL of the alert resource.
    */
    export type alert_url = string;
    /**
     * The GitHub URL of the alert resource.
    */
    export type alert_html_url = string;
    /**
     * The time that the alert was created in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
    */
    export type alert_created_at = string;
    /**
     * The time that the alert was last updated in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
    */
    export type alert_updated_at = string;
    /**
     * The time that the alert was dismissed in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
    */
    export type alert_dismissed_at = (string & tags.Format<"date-time">) | null;
    /**
     * A GitHub user.
     *
     * @title Simple User
    */
    export type nullable_simple_user = {
        name?: string | null;
        email?: string | null;
        login: string;
        id: number & tags.Type<"int32">;
        node_id: string;
        avatar_url: string & tags.Format<"uri">;
        gravatar_id: string | null;
        url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        followers_url: string & tags.Format<"uri">;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string & tags.Format<"uri">;
        organizations_url: string & tags.Format<"uri">;
        repos_url: string & tags.Format<"uri">;
        events_url: string;
        received_events_url: string & tags.Format<"uri">;
        type: string;
        site_admin: boolean;
        starred_at?: string;
        user_view_type?: string;
    } | null;
    /**
     * The time that the alert was no longer detected and was considered fixed in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
    */
    export type alert_fixed_at = (string & tags.Format<"date-time">) | null;
    /**
     * The time that the alert was auto-dismissed in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
    */
    export type alert_auto_dismissed_at = (string & tags.Format<"date-time">) | null;
}
type IAutoViewTransformerInputType = Schema.dependabot_alert;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(
  input: IAutoViewTransformerInputType
): IAutoView.IAutoViewComponentProps {
  // Map severity levels to icon colors
  const severityColorMap: Record<
    "low" | "medium" | "high" | "critical",
    "lime" | "yellow" | "orange" | "red"
  > = {
    low: "lime",
    medium: "yellow",
    high: "orange",
    critical: "red",
  };

  // Map alert states to chip colors
  const stateColorMap: Record<
    "auto_dismissed" | "dismissed" | "fixed" | "open",
    "gray" | "darkGray" | "green" | "red"
  > = {
    auto_dismissed: "gray",
    dismissed: "darkGray",
    fixed: "green",
    open: "red",
  };

  // Format published date for display
  const publishedDate = new Date(
    input.security_advisory.published_at
  ).toLocaleString();

  // Construct DataList items to show key fields
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      // Label: plain text
      label: {
        type: "Text",
        content: "Severity",
        variant: "body2",
        color: "tertiary",
      },
      // Value: colored chip indicating severity
      value: {
        type: "Chip",
        label: input.security_advisory.severity,
        color: severityColorMap[input.security_advisory.severity],
        size: "small",
        variant: "filled",
      },
    },
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "State",
        variant: "body2",
        color: "tertiary",
      },
      value: {
        type: "Chip",
        label: input.state,
        color: stateColorMap[input.state],
        size: "small",
        variant: "outlined",
      },
    },
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Package",
        variant: "body2",
        color: "tertiary",
      },
      value: {
        type: "Text",
        content: `${input.dependency.package?.name ?? "-"} (${
          input.dependency.package?.ecosystem ?? "-"
        })`,
        variant: "body1",
      },
    },
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Manifest Path",
        variant: "body2",
        color: "tertiary",
      },
      value: {
        type: "Text",
        content: input.dependency.manifest_path ?? "-",
        variant: "body1",
      },
    },
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Published",
        variant: "body2",
        color: "tertiary",
      },
      value: {
        type: "Text",
        content: publishedDate,
        variant: "body1",
      },
    },
  ];

  // Build a markdown list of vulnerable version ranges and patched versions
  const vulnerabilitiesMd = input.security_advisory.vulnerabilities
    .map((v) => {
      const pkgName = v.package.name;
      const range = v.vulnerable_version_range;
      const patched = v.first_patched_version?.identifier ?? "unpatched";
      return `- **${pkgName}**: ${range} → _${patched}_`;
    })
    .join("\n");

  return {
    // Use a vertical card to stack header, content, and footer
    type: "VerticalCard",
    childrenProps: [
      {
        // Header with alert number and summary, prefixed by a bug icon colored by severity
        type: "CardHeader",
        title: `Alert #${input.number}`,
        description: input.security_advisory.summary,
        startElement: {
          type: "Icon",
          id: "bug",
          color: severityColorMap[input.security_advisory.severity],
          size: 24,
        },
      },
      {
        // Content comprising a DataList and Markdown details
        type: "CardContent",
        childrenProps: [
          {
            // DataList of primary properties
            type: "DataList",
            childrenProps: dataListItems,
          },
          {
            // Full advisory description rendered in markdown
            type: "Markdown",
            content: `### Description\n${input.security_advisory.description}`,
          },
          {
            // Vulnerability details rendered as markdown list
            type: "Markdown",
            content: `### Vulnerabilities\n${vulnerabilitiesMd}`,
          },
        ],
      },
      {
        // Footer with a button linking to GitHub alert page
        type: "CardFooter",
        childrenProps: {
          type: "Button",
          label: "View on GitHub",
          href: input.html_url,
          variant: "contained",
          color: "primary",
          startElement: {
            type: "Icon",
            id: "github",
            color: "gray",
            size: 20,
          },
        },
      },
    ],
  };
}

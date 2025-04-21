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
type IAutoViewTransformerInputType = Schema.global_advisory;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Map advisory severity to UI color variants
  const severityColorMap: Record<string, IAutoView.IAutoViewChipProps['color']> = {
    critical: 'error',
    high: 'error',
    medium: 'warning',
    low: 'info',
    unknown: 'gray',
  };

  // Helper: create a simple text component
  const makeText = (content: string | string[]): IAutoView.IAutoViewTextProps => ({
    type: 'Text',
    content: Array.isArray(content) ? content : [content],
  });

  // Build a list of key-value pairs as DataListItems
  const items: IAutoView.IAutoViewDataListItemProps[] = [];

  // GHSA ID with link button
  items.push({
    type: 'DataListItem',
    label: makeText('Advisory'),
    value: {
      type: 'Button',
      label: input.ghsa_id,
      variant: 'text',
      startElement: { type: 'Icon', id: 'arrow-up-right-from-square' },
      href: input.html_url,
    },
  });

  // CVE ID if available
  if (input.cve_id) {
    items.push({
      type: 'DataListItem',
      label: makeText('CVE'),
      value: {
        type: 'Chip',
        label: input.cve_id,
        variant: 'outlined',
      },
    });
  }

  // Advisory Type
  items.push({
    type: 'DataListItem',
    label: makeText('Type'),
    value: {
      type: 'Chip',
      label: input.type,
      variant: 'filled',
      color: 'primary',
    },
  });

  // Severity
  items.push({
    type: 'DataListItem',
    label: makeText('Severity'),
    value: {
      type: 'Chip',
      label: input.severity.toUpperCase(),
      variant: 'filled',
      color: severityColorMap[input.severity] || 'gray',
    },
  });

  // Published timestamp
  items.push({
    type: 'DataListItem',
    label: makeText('Published'),
    value: makeText(new Date(input.published_at).toLocaleDateString()),
  });

  // Last updated
  items.push({
    type: 'DataListItem',
    label: makeText('Updated'),
    value: makeText(new Date(input.updated_at).toLocaleDateString()),
  });

  // GitHub Reviewed date if present
  if (input.github_reviewed_at) {
    items.push({
      type: 'DataListItem',
      label: makeText('Reviewed'),
      value: makeText(new Date(input.github_reviewed_at).toLocaleDateString()),
    });
  }

  // NVD Published date if present
  if (input.nvd_published_at) {
    items.push({
      type: 'DataListItem',
      label: makeText('NVD Published'),
      value: makeText(new Date(input.nvd_published_at).toLocaleDateString()),
    });
  }

  // CVSS details if available
  if (input.cvss && (input.cvss.score !== null || input.cvss.vector_string)) {
    const vec = input.cvss.vector_string ?? 'N/A';
    const score = input.cvss.score !== null ? input.cvss.score.toFixed(1) : 'N/A';
    items.push({
      type: 'DataListItem',
      label: makeText('CVSS'),
      value: {
        type: 'Chip',
        label: `${vec} (${score})`,
        variant: 'outlined',
      },
    });
  }

  // Summary
  items.push({
    type: 'DataListItem',
    label: makeText('Summary'),
    value: {
      type: 'Markdown',
      content: input.summary,
    },
  });

  // Detailed description if available
  if (input.description) {
    items.push({
      type: 'DataListItem',
      label: makeText('Description'),
      value: {
        type: 'Markdown',
        content: input.description,
      },
    });
  }

  // References: each as a link button
  if (Array.isArray(input.references) && input.references.length > 0) {
    const refButtons: IAutoView.IAutoViewButtonProps[] = input.references.map((url, idx) => ({
      type: 'Button',
      label: `Link ${idx + 1}`,
      variant: 'text',
      startElement: { type: 'Icon', id: 'link' },
      href: url,
    }));
    items.push({
      type: 'DataListItem',
      label: makeText('References'),
      // group buttons inline
      value: refButtons as any, // DataListItem.value can accept array of presentation components
    });
  }

  // Return a DataList component that is responsive and mobile-friendly
  return {
    type: 'DataList',
    childrenProps: items,
  };
}

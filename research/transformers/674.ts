import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type code_scanning_alert_instance = {
        ref?: Schema.code_scanning_ref;
        analysis_key?: Schema.code_scanning_analysis_analysis_key;
        environment?: Schema.code_scanning_alert_environment;
        category?: Schema.code_scanning_analysis_category;
        state?: Schema.code_scanning_alert_state;
        commit_sha?: string;
        message?: {
            text?: string;
        };
        location?: Schema.code_scanning_alert_location;
        html_url?: string;
        /**
         * Classifications that have been applied to the file that triggered the alert.
         * For example identifying it as documentation, or a generated file.
        */
        classifications?: Schema.code_scanning_alert_classification[];
    };
    /**
     * The Git reference, formatted as `refs/pull/<number>/merge`, `refs/pull/<number>/head`,
     * `refs/heads/<branch name>` or simply `<branch name>`.
    */
    export type code_scanning_ref = string;
    /**
     * Identifies the configuration under which the analysis was executed. For example, in GitHub Actions this includes the workflow filename and job name.
    */
    export type code_scanning_analysis_analysis_key = string;
    /**
     * Identifies the variable values associated with the environment in which the analysis that generated this alert instance was performed, such as the language that was analyzed.
    */
    export type code_scanning_alert_environment = string;
    /**
     * Identifies the configuration under which the analysis was executed. Used to distinguish between multiple analyses for the same tool and commit, but performed on different languages or different parts of the code.
    */
    export type code_scanning_analysis_category = string;
    /**
     * State of a code scanning alert.
    */
    export type code_scanning_alert_state = "open" | "dismissed" | "fixed" | null;
    /**
     * Describe a region within a file for the alert.
    */
    export type code_scanning_alert_location = {
        path?: string;
        start_line?: number & tags.Type<"int32">;
        end_line?: number & tags.Type<"int32">;
        start_column?: number & tags.Type<"int32">;
        end_column?: number & tags.Type<"int32">;
    };
    /**
     * A classification of the file. For example to identify it as generated.
    */
    export type code_scanning_alert_classification = "source" | "generated" | "test" | "library" | null;
}
type IAutoViewTransformerInputType = Schema.code_scanning_alert_instance[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there are no alerts, show a friendly message
  if (input.length === 0) {
    return {
      type: "Text",
      variant: "body1",
      content: ["No code scanning alerts found."],
    };
  }

  // Mapping of alert state to an icon name and color
  const stateIconMap: Record<string, { id: string; color: string }> = {
    open: { id: "exclamation-triangle", color: "red" },
    dismissed: { id: "ban", color: "gray" },
    fixed: { id: "check-circle", color: "green" },
    null: { id: "question-circle", color: "gray" },
  };

  // Classification chips color map
  const classificationColor: Record<string, string> = {
    source: "blue",
    generated: "orange",
    test: "green",
    library: "gray",
    null: "darkGray",
  };

  // Build DataListItem for each alert
  const items: IAutoView.IAutoViewDataListItemProps[] = input.map((alert) => {
    // Determine icon for state
    const stateKey = alert.state ?? "null";
    const stateMeta = stateIconMap[stateKey] || stateIconMap["null"];
    const stateIcon: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: stateMeta.id,
      color: stateMeta.color as any,
      size: 20,
    };

    // Build a short location string: "file.ts:12-15"
    const loc = alert.location;
    const locationText =
      loc && loc.path
        ? `${loc.path}:${loc.start_line ?? ""}-${loc.end_line ?? ""}`
        : "Unknown location";

    // Header label: icon + location text
    const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
      stateIcon,
      {
        type: "Text",
        variant: "body1",
        content: [` ${locationText}`],
      },
    ];

    // Primary message content in markdown
    const messageText = alert.message?.text ?? "*No message provided*";
    const markdownContent = `**Message:**\n\n${messageText}`;

    const messageMarkdown: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: markdownContent,
    };

    // Build details chips: analysis key, category, environment
    const detailChips: IAutoView.IAutoViewChipProps[] = [];
    if (alert.analysis_key) {
      detailChips.push({
        type: "Chip",
        label: alert.analysis_key,
        color: "teal",
        size: "small",
      });
    }
    if (alert.category) {
      detailChips.push({
        type: "Chip",
        label: alert.category,
        color: "violet",
        size: "small",
      });
    }
    if (alert.environment) {
      detailChips.push({
        type: "Chip",
        label: alert.environment,
        color: "cyan",
        size: "small",
      });
    }
    const detailsGroup: IAutoView.IAutoViewChipGroupProps = {
      type: "ChipGroup",
      childrenProps: detailChips,
      maxItems: detailChips.length,
    };

    // Build classification chips
    const classificationChips: IAutoView.IAutoViewChipProps[] =
      (alert.classifications ?? [])
        .filter((c) => c != null)
        .map((c) => ({
          type: "Chip",
          label: c as string,
          color: classificationColor[c as string] as any,
          size: "small",
          variant: "outlined",
        }));

    const classificationGroup: IAutoView.IAutoViewChipGroupProps = {
      type: "ChipGroup",
      childrenProps: classificationChips,
      maxItems: classificationChips.length,
    };

    // Compose value area: markdown + detail chips + classification chips + link icon
    const valueComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
      messageMarkdown,
      detailsGroup,
      classificationGroup,
    ];

    // If there is an HTML URL, add an icon button linking to it
    if (alert.html_url) {
      valueComponents.push({
        type: "IconButton",
        icon: "external-link-alt",
        href: alert.html_url,
        color: "primary",
        variant: "text",
        size: "medium",
      } as any);
    }

    return {
      type: "DataListItem",
      label: labelComponents,
      value: valueComponents,
    };
  });

  // Return the DataList containing all alert items
  return {
    type: "DataList",
    childrenProps: items,
  };
}

import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type code_scanning_alert = {
        number: Schema.alert_number;
        created_at: Schema.alert_created_at;
        updated_at?: Schema.alert_updated_at;
        url: Schema.alert_url;
        html_url: Schema.alert_html_url;
        instances_url: Schema.alert_instances_url;
        state: Schema.code_scanning_alert_state;
        fixed_at?: Schema.alert_fixed_at;
        dismissed_by: Schema.nullable_simple_user;
        dismissed_at: Schema.alert_dismissed_at;
        dismissed_reason: Schema.code_scanning_alert_dismissed_reason;
        dismissed_comment?: Schema.code_scanning_alert_dismissed_comment;
        rule: Schema.code_scanning_alert_rule;
        tool: Schema.code_scanning_analysis_tool;
        most_recent_instance: Schema.code_scanning_alert_instance;
        dismissal_approved_by?: Schema.nullable_simple_user;
    };
    /**
     * The security alert number.
    */
    export type alert_number = number & tags.Type<"int32">;
    /**
     * The time that the alert was created in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
    */
    export type alert_created_at = string;
    /**
     * The time that the alert was last updated in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
    */
    export type alert_updated_at = string;
    /**
     * The REST API URL of the alert resource.
    */
    export type alert_url = string;
    /**
     * The GitHub URL of the alert resource.
    */
    export type alert_html_url = string;
    /**
     * The REST API URL for fetching the list of instances for an alert.
    */
    export type alert_instances_url = string;
    /**
     * State of a code scanning alert.
    */
    export type code_scanning_alert_state = "open" | "dismissed" | "fixed" | null;
    /**
     * The time that the alert was no longer detected and was considered fixed in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
    */
    export type alert_fixed_at = (string & tags.Format<"date-time">) | null;
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
     * The time that the alert was dismissed in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
    */
    export type alert_dismissed_at = (string & tags.Format<"date-time">) | null;
    /**
     * **Required when the state is dismissed.** The reason for dismissing or closing the alert.
    */
    export type code_scanning_alert_dismissed_reason = "false positive" | "won't fix" | "used in tests" | null;
    /**
     * The dismissal comment associated with the dismissal of the alert.
    */
    export type code_scanning_alert_dismissed_comment = (string & tags.MaxLength<280>) | null;
    export type code_scanning_alert_rule = {
        /**
         * A unique identifier for the rule used to detect the alert.
        */
        id?: string | null;
        /**
         * The name of the rule used to detect the alert.
        */
        name?: string;
        /**
         * The severity of the alert.
        */
        severity?: "none" | "note" | "warning" | "error" | null;
        /**
         * The security severity of the alert.
        */
        security_severity_level?: "low" | "medium" | "high" | "critical" | null;
        /**
         * A short description of the rule used to detect the alert.
        */
        description?: string;
        /**
         * A description of the rule used to detect the alert.
        */
        full_description?: string;
        /**
         * A set of tags applicable for the rule.
        */
        tags?: string[] | null;
        /**
         * Detailed documentation for the rule as GitHub Flavored Markdown.
        */
        help?: string | null;
        /**
         * A link to the documentation for the rule used to detect the alert.
        */
        help_uri?: string | null;
    };
    export type code_scanning_analysis_tool = {
        name?: Schema.code_scanning_analysis_tool_name;
        version?: Schema.code_scanning_analysis_tool_version;
        guid?: Schema.code_scanning_analysis_tool_guid;
    };
    /**
     * The name of the tool used to generate the code scanning analysis.
    */
    export type code_scanning_analysis_tool_name = string;
    /**
     * The version of the tool used to generate the code scanning analysis.
    */
    export type code_scanning_analysis_tool_version = string | null;
    /**
     * The GUID of the tool used to generate the code scanning analysis, if provided in the uploaded SARIF data.
    */
    export type code_scanning_analysis_tool_guid = string | null;
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
type IAutoViewTransformerInputType = Schema.code_scanning_alert;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Map alert state to chip colors for quick visual cue
  const stateColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
    open: "warning",
    dismissed: "gray",
    fixed: "success",
    unknown: "info",
  };
  const stateLabel = input.state ?? "unknown";
  const stateChip: IAutoView.IAutoViewChipProps = {
    type: "Chip",
    label: stateLabel.charAt(0).toUpperCase() + stateLabel.slice(1),
    color: stateColorMap[stateLabel] ?? "info",
    variant: "filled",
    size: "small",
  };

  // If there's a user who dismissed the alert, show their avatar
  const avatar: IAutoView.IAutoViewAvatarProps | undefined = input.dismissed_by
    ? {
        type: "Avatar",
        src: input.dismissed_by.avatar_url,
        name: input.dismissed_by.login,
        size: 40,
        variant: "primary",
      }
    : undefined;

  // Helper to push rows into our data list
  const listItems: IAutoView.IAutoViewDataListItemProps[] = [];
  const pushItem = (label: string, value: string) => {
    listItems.push({
      type: "DataListItem",
      label: {
        type: "Text",
        content: label,
        variant: "body2",
        color: "gray",
      },
      value: {
        type: "Text",
        content: value,
        variant: "body1",
      },
    });
  };

  pushItem("Created At", input.created_at);
  if (input.updated_at) pushItem("Updated At", input.updated_at);
  if (input.rule.security_severity_level) {
    pushItem("Security Severity", input.rule.security_severity_level);
  }
  if (input.rule.severity) {
    pushItem("Rule Severity", input.rule.severity);
  }
  if (input.tool.name) {
    const toolInfo = input.tool.version
      ? `${input.tool.name} v${input.tool.version}`
      : input.tool.name;
    pushItem("Analysis Tool", toolInfo);
  }
  if (input.html_url) {
    pushItem("Alert URL", input.html_url);
  }

  // Show location (path + line range) if available
  const loc = input.most_recent_instance.location;
  if (loc && (loc.path || loc.start_line != null)) {
    const parts: string[] = [];
    if (loc.path) parts.push(loc.path);
    if (loc.start_line != null) {
      const endLine = loc.end_line != null ? `-${loc.end_line}` : "";
      parts.push(`lines ${loc.start_line}${endLine}`);
    }
    pushItem("Location", parts.join(" "));
  }

  // Assemble the data list
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: listItems,
  };

  // Card header with title, description, avatar and state chip
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: `Alert #${input.number}`,
    description: input.rule.name ?? "",
    startElement: avatar,
    endElement: stateChip,
  };

  // Main card content containing the details list
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [dataList],
  };

  // Footer with a link button to view the alert on GitHub
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: {
      type: "Button",
      label: "View on GitHub",
      href: input.html_url,
      variant: "outlined",
      color: "primary",
    },
  };

  // Wrap everything in a vertical card for responsive display
  return {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };
}

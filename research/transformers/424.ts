import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type code_scanning_organization_alert_items = {
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
        rule: Schema.code_scanning_alert_rule_summary;
        tool: Schema.code_scanning_analysis_tool;
        most_recent_instance: Schema.code_scanning_alert_instance;
        repository: Schema.simple_repository;
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
    export type code_scanning_alert_rule_summary = {
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
    /**
     * A GitHub repository.
     *
     * @title Simple Repository
    */
    export type simple_repository = {
        /**
         * A unique identifier of the repository.
        */
        id: number & tags.Type<"int32">;
        /**
         * The GraphQL identifier of the repository.
        */
        node_id: string;
        /**
         * The name of the repository.
        */
        name: string;
        /**
         * The full, globally unique, name of the repository.
        */
        full_name: string;
        owner: Schema.simple_user;
        /**
         * Whether the repository is private.
        */
        "private": boolean;
        /**
         * The URL to view the repository on GitHub.com.
        */
        html_url: string;
        /**
         * The repository description.
        */
        description: string | null;
        /**
         * Whether the repository is a fork.
        */
        fork: boolean;
        /**
         * The URL to get more information about the repository from the GitHub API.
        */
        url: string;
        /**
         * A template for the API URL to download the repository as an archive.
        */
        archive_url: string;
        /**
         * A template for the API URL to list the available assignees for issues in the repository.
        */
        assignees_url: string;
        /**
         * A template for the API URL to create or retrieve a raw Git blob in the repository.
        */
        blobs_url: string;
        /**
         * A template for the API URL to get information about branches in the repository.
        */
        branches_url: string;
        /**
         * A template for the API URL to get information about collaborators of the repository.
        */
        collaborators_url: string;
        /**
         * A template for the API URL to get information about comments on the repository.
        */
        comments_url: string;
        /**
         * A template for the API URL to get information about commits on the repository.
        */
        commits_url: string;
        /**
         * A template for the API URL to compare two commits or refs.
        */
        compare_url: string;
        /**
         * A template for the API URL to get the contents of the repository.
        */
        contents_url: string;
        /**
         * A template for the API URL to list the contributors to the repository.
        */
        contributors_url: string;
        /**
         * The API URL to list the deployments of the repository.
        */
        deployments_url: string;
        /**
         * The API URL to list the downloads on the repository.
        */
        downloads_url: string;
        /**
         * The API URL to list the events of the repository.
        */
        events_url: string;
        /**
         * The API URL to list the forks of the repository.
        */
        forks_url: string;
        /**
         * A template for the API URL to get information about Git commits of the repository.
        */
        git_commits_url: string;
        /**
         * A template for the API URL to get information about Git refs of the repository.
        */
        git_refs_url: string;
        /**
         * A template for the API URL to get information about Git tags of the repository.
        */
        git_tags_url: string;
        /**
         * A template for the API URL to get information about issue comments on the repository.
        */
        issue_comment_url: string;
        /**
         * A template for the API URL to get information about issue events on the repository.
        */
        issue_events_url: string;
        /**
         * A template for the API URL to get information about issues on the repository.
        */
        issues_url: string;
        /**
         * A template for the API URL to get information about deploy keys on the repository.
        */
        keys_url: string;
        /**
         * A template for the API URL to get information about labels of the repository.
        */
        labels_url: string;
        /**
         * The API URL to get information about the languages of the repository.
        */
        languages_url: string;
        /**
         * The API URL to merge branches in the repository.
        */
        merges_url: string;
        /**
         * A template for the API URL to get information about milestones of the repository.
        */
        milestones_url: string;
        /**
         * A template for the API URL to get information about notifications on the repository.
        */
        notifications_url: string;
        /**
         * A template for the API URL to get information about pull requests on the repository.
        */
        pulls_url: string;
        /**
         * A template for the API URL to get information about releases on the repository.
        */
        releases_url: string;
        /**
         * The API URL to list the stargazers on the repository.
        */
        stargazers_url: string;
        /**
         * A template for the API URL to get information about statuses of a commit.
        */
        statuses_url: string;
        /**
         * The API URL to list the subscribers on the repository.
        */
        subscribers_url: string;
        /**
         * The API URL to subscribe to notifications for this repository.
        */
        subscription_url: string;
        /**
         * The API URL to get information about tags on the repository.
        */
        tags_url: string;
        /**
         * The API URL to list the teams on the repository.
        */
        teams_url: string;
        /**
         * A template for the API URL to create or retrieve a raw Git tree of the repository.
        */
        trees_url: string;
        /**
         * The API URL to list the hooks on the repository.
        */
        hooks_url: string;
    };
    /**
     * A GitHub user.
     *
     * @title Simple User
    */
    export type simple_user = {
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
    };
}
type IAutoViewTransformerInputType = Schema.code_scanning_organization_alert_items[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



// Transforms GitHub Code Scanning alerts into an AutoView List component for display
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper: map alert state to a Chip color
  const mapStateToColor = (state: Schema.code_scanning_alert_state): IAutoView.IAutoViewChipProps["color"] => {
    switch (state) {
      case "open": return "info";
      case "fixed": return "success";
      case "dismissed": return "warning";
      default: return "gray";
    }
  };

  // Helper: map security severity to a Chip color
  const mapSeverityToColor = (
    sev: Schema.code_scanning_alert_rule_summary["security_severity_level"]
  ): IAutoView.IAutoViewChipProps["color"] => {
    switch (sev) {
      case "low": return "success";
      case "medium": return "warning";
      case "high": return "error";
      case "critical": return "error";
      default: return "gray";
    }
  };

  // Build ListItem for each alert
  const listItems: IAutoView.IAutoViewListItemProps[] = input.map(alert => {
    const rule = alert.rule || {};
    const repo = alert.repository;
    const owner = repo.owner;
    // Title: rule name or fallback to rule id
    const titleText = rule.name ?? rule.id ?? `#${alert.number}`;
    // Description: creation date + repo full name
    const created = new Date(alert.created_at).toLocaleDateString();
    const descriptionText = `${created} · ${repo.full_name}`;

    // State chip
    const stateLabel = alert.state ?? "unknown";
    const stateChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: stateLabel,
      color: mapStateToColor(alert.state),
      size: "small",
      variant: "filled",
    };

    // Severity chip (if available)
    const sev = rule.security_severity_level;
    const severityChip: IAutoView.IAutoViewChipProps | null = sev
      ? {
          type: "Chip",
          label: sev,
          color: mapSeverityToColor(sev),
          size: "small",
          variant: "outlined",
        }
      : null;

    // Assemble endElement array
    const endElements = severityChip ? [stateChip, severityChip] : [stateChip];

    return {
      type: "ListItem",
      title: titleText,
      description: descriptionText,
      // Show repo owner's avatar for quick recognition
      startElement: {
        type: "Avatar",
        src: owner.avatar_url,
        name: owner.login,
        size: 32,
      },
      // Show state and severity as chips
      endElement: endElements,
      // Clicking the item navigates to the GitHub alert page
      href: alert.html_url,
    };
  });

  // Wrap all items in a responsive List component
  return {
    type: "List",
    childrenProps: listItems,
  };
}

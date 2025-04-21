import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A run of a CodeQL query against one or more repositories.
     *
     * @title Variant Analysis
    */
    export type code_scanning_variant_analysis = {
        /**
         * The ID of the variant analysis.
        */
        id: number & tags.Type<"int32">;
        controller_repo: Schema.simple_repository;
        actor: Schema.simple_user;
        query_language: Schema.code_scanning_variant_analysis_language;
        /**
         * The download url for the query pack.
        */
        query_pack_url: string;
        /**
         * The date and time at which the variant analysis was created, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
        */
        created_at?: string;
        /**
         * The date and time at which the variant analysis was last updated, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
        */
        updated_at?: string;
        /**
         * The date and time at which the variant analysis was completed, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ. Will be null if the variant analysis has not yet completed or this information is not available.
        */
        completed_at?: (string & tags.Format<"date-time">) | null;
        status: "in_progress" | "succeeded" | "failed" | "cancelled";
        /**
         * The GitHub Actions workflow run used to execute this variant analysis. This is only available if the workflow run has started.
        */
        actions_workflow_run_id?: number & tags.Type<"int32">;
        /**
         * The reason for a failure of the variant analysis. This is only available if the variant analysis has failed.
        */
        failure_reason?: "no_repos_queried" | "actions_workflow_run_failed" | "internal_error";
        scanned_repositories?: {
            repository: Schema.code_scanning_variant_analysis_repository;
            analysis_status: Schema.code_scanning_variant_analysis_status;
            /**
             * The number of results in the case of a successful analysis. This is only available for successful analyses.
            */
            result_count?: number & tags.Type<"int32">;
            /**
             * The size of the artifact. This is only available for successful analyses.
            */
            artifact_size_in_bytes?: number & tags.Type<"int32">;
            /**
             * The reason of the failure of this repo task. This is only available if the repository task has failed.
            */
            failure_message?: string;
        }[];
        /**
         * Information about repositories that were skipped from processing. This information is only available to the user that initiated the variant analysis.
        */
        skipped_repositories?: {
            access_mismatch_repos: Schema.code_scanning_variant_analysis_skipped_repo_group;
            not_found_repos: {
                /**
                 * The total number of repositories that were skipped for this reason.
                */
                repository_count: number & tags.Type<"int32">;
                /**
                 * A list of full repository names that were skipped. This list may not include all repositories that were skipped.
                */
                repository_full_names: string[];
            };
            no_codeql_db_repos: Schema.code_scanning_variant_analysis_skipped_repo_group;
            over_limit_repos: Schema.code_scanning_variant_analysis_skipped_repo_group;
        };
    };
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
    /**
     * The language targeted by the CodeQL query
    */
    export type code_scanning_variant_analysis_language = "cpp" | "csharp" | "go" | "java" | "javascript" | "python" | "ruby" | "rust" | "swift";
    /**
     * Repository Identifier
     *
     * @title Repository Identifier
    */
    export type code_scanning_variant_analysis_repository = {
        /**
         * A unique identifier of the repository.
        */
        id: number & tags.Type<"int32">;
        /**
         * The name of the repository.
        */
        name: string;
        /**
         * The full, globally unique, name of the repository.
        */
        full_name: string;
        /**
         * Whether the repository is private.
        */
        "private": boolean;
        stargazers_count: number & tags.Type<"int32">;
        updated_at: (string & tags.Format<"date-time">) | null;
    };
    /**
     * The new status of the CodeQL variant analysis repository task.
    */
    export type code_scanning_variant_analysis_status = "pending" | "in_progress" | "succeeded" | "failed" | "canceled" | "timed_out";
    export type code_scanning_variant_analysis_skipped_repo_group = {
        /**
         * The total number of repositories that were skipped for this reason.
        */
        repository_count: number & tags.Type<"int32">;
        /**
         * A list of repositories that were skipped. This list may not include all repositories that were skipped. This is only available when the repository was found and the user has access to it.
        */
        repositories: Schema.code_scanning_variant_analysis_repository[];
    };
}
type IAutoViewTransformerInputType = Schema.code_scanning_variant_analysis;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



/**
 * Transforms a CodeQL variant analysis payload into an AutoView UI component props.
 */
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper to map statuses to visual colors
  const mapStatusToColor = (status: string): IAutoView.IAutoViewChipProps["color"] => {
    switch (status) {
      case "succeeded":   return "success";
      case "failed":      return "error";
      case "in_progress": return "info";
      case "cancelled":   return "warning";
      default:            return "gray";
    }
  };

  // Safely format an ISO timestamp into a locale string
  const formatDate = (iso?: string | null): string =>
    iso ? new Date(iso).toLocaleString() : "N/A";

  // Compose the status chip for the header
  const statusChip: IAutoView.IAutoViewChipProps = {
    type: "Chip",
    label: input.status,
    variant: "filled",
    color: mapStatusToColor(input.status),
    size: "small",
  };

  // Build a Markdown summary of main analysis properties
  const summaryMarkdown = `
**Query Language:** ${input.query_language.toUpperCase()}  
**Controller Repo:** ${input.controller_repo.full_name}  
**Initiated By:** ${input.actor.login}  
**Created At:** ${formatDate(input.created_at)}  
**Last Updated:** ${formatDate(input.updated_at)}
`.trim();

  // Build a DataList of scanned repositories (if any)
  const scannedList: IAutoView.IAutoViewDataListProps | IAutoView.IAutoViewMarkdownProps = 
    Array.isArray(input.scanned_repositories) && input.scanned_repositories.length > 0
      ? {
          type: "DataList",
          childrenProps: input.scanned_repositories.map(repoTask => {
            // Chip for per-repo status
            const repoStatusChip: IAutoView.IAutoViewChipProps = {
              type: "Chip",
              label: repoTask.analysis_status,
              variant: "outlined",
              color: mapStatusToColor(repoTask.analysis_status),
              size: "small",
            };
            // Optional result count text
            const resultText: IAutoView.IAutoViewTextProps | null =
              typeof repoTask.result_count === "number"
                ? {
                    type: "Text",
                    content: `Results: ${repoTask.result_count}`,
                    variant: "caption",
                    color: "gray",
                  }
                : null;
            // Optional failure message text
            const failureText: IAutoView.IAutoViewTextProps | null =
              repoTask.failure_message
                ? {
                    type: "Text",
                    content: `⚠️ ${repoTask.failure_message}`,
                    variant: "caption",
                    color: "error",
                  }
                : null;

            // Compose the repository item
            const valueComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
              repoStatusChip,
              resultText,
              failureText,
            ].filter(Boolean) as IAutoView.IAutoViewPresentationComponentProps[];

            return {
              type: "DataListItem",
              label: {
                type: "Text",
                content: repoTask.repository.full_name,
                variant: "body1",
              },
              value: valueComponents.length === 1 ? valueComponents[0] : valueComponents,
            };
          }),
        }
      : {
          // No scanned repositories → notify user
          type: "Markdown",
          content: "_No repository scan data available._",
        };

  // The overall UI: a vertical card with header, summary, and detailed list
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      {
        // Card Header with avatar of the actor and the status chip
        type: "CardHeader",
        title: `Variant Analysis #${input.id}`,
        description: `Status overview`,
        startElement: {
          type: "Avatar",
          src: input.actor.avatar_url,
          name: input.actor.login,
          size: 40,
        },
        endElement: statusChip,
      },
      {
        // Main content: markdown summary + data-list of scanned repos
        type: "CardContent",
        childrenProps: [
          {
            type: "Markdown",
            content: summaryMarkdown,
          },
          scannedList,
        ],
      },
    ],
  };

  return card;
}

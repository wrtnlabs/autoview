import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type code_scanning_variant_analysis_repo_task = {
        repository: Schema.simple_repository;
        analysis_status: Schema.code_scanning_variant_analysis_status;
        /**
         * The size of the artifact. This is only available for successful analyses.
        */
        artifact_size_in_bytes?: number & tags.Type<"int32">;
        /**
         * The number of results in the case of a successful analysis. This is only available for successful analyses.
        */
        result_count?: number & tags.Type<"int32">;
        /**
         * The reason of the failure of this repo task. This is only available if the repository task has failed.
        */
        failure_message?: string;
        /**
         * The SHA of the commit the CodeQL database was built against. This is only available for successful analyses.
        */
        database_commit_sha?: string;
        /**
         * The source location prefix to use. This is only available for successful analyses.
        */
        source_location_prefix?: string;
        /**
         * The URL of the artifact. This is only available for successful analyses.
        */
        artifact_url?: string;
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
     * The new status of the CodeQL variant analysis repository task.
    */
    export type code_scanning_variant_analysis_status = "pending" | "in_progress" | "succeeded" | "failed" | "canceled" | "timed_out";
}
type IAutoViewTransformerInputType = Schema.code_scanning_variant_analysis_repo_task;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



/**
 * Transforms a code scanning variant analysis repo task into a visual UI description.
 * Uses AutoView components to display repository info, status, and relevant details.
 */
function visualizeData(
  input: IAutoViewTransformerInputType
): IAutoView.IAutoViewComponentProps {
  // Helper: map analysis status to icon name and color
  const statusIconMap: Record<
    Schema.code_scanning_variant_analysis_status,
    { icon: string; color: IAutoView.IAutoViewIconProps["color"] }
  > = {
    pending:    { icon: "clock",         color: "blue" },
    in_progress:{ icon: "spinner",       color: "blue" },
    succeeded:  { icon: "check",         color: "green" },
    failed:     { icon: "times",         color: "red" },
    canceled:   { icon: "ban",           color: "gray" },
    timed_out:  { icon: "hourglass-half",color: "orange" }
  };

  // Helper: format bytes into human-readable string
  function humanFileSize(bytes: number): string {
    const thresh = 1024;
    if (bytes < thresh) return bytes + " B";
    const units = ["KB", "MB", "GB", "TB"];
    let u = -1;
    let val = bytes;
    while (++u < units.length && val >= thresh) {
      val = val / thresh;
    }
    return val.toFixed(1) + " " + units[u];
  }

  // Build list of key/value items
  const items: IAutoView.IAutoViewDataListItemProps[] = [];

  // STATUS row: icon + text
  const status = input.analysis_status;
  const { icon, color } = statusIconMap[status];
  items.push({
    type: "DataListItem",
    label: {
      type: "Text",
      content: "Status",
      variant: "subtitle2"
    },
    value: [
      {
        type: "Icon",
        id: icon,
        color,
        size: 20
      },
      {
        type: "Text",
        content: status.replace(/_/g, " "),
        variant: "body2"
      }
    ]
  });

  // RESULT COUNT row
  if (input.result_count != null) {
    items.push({
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Results",
        variant: "subtitle2"
      },
      value: {
        type: "Text",
        content: input.result_count.toString(),
        variant: "body2"
      }
    });
  }

  // ARTIFACT SIZE row
  if (input.artifact_size_in_bytes != null) {
    items.push({
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Artifact Size",
        variant: "subtitle2"
      },
      value: {
        type: "Text",
        content: humanFileSize(input.artifact_size_in_bytes),
        variant: "body2"
      }
    });
  }

  // FAILURE MESSAGE row (only on failure)
  if (input.failure_message) {
    // Use markdown to allow multi-line and emphasis
    items.push({
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Failure",
        variant: "subtitle2"
      },
      value: {
        type: "Markdown",
        content: `**${input.failure_message.trim()}**`
      }
    });
  }

  // DATABASE COMMIT SHA row
  if (input.database_commit_sha) {
    items.push({
      type: "DataListItem",
      label: {
        type: "Text",
        content: "DB Commit SHA",
        variant: "subtitle2"
      },
      value: {
        type: "Text",
        content: input.database_commit_sha,
        variant: "body2"
      }
    });
  }

  // SOURCE LOCATION PREFIX row
  if (input.source_location_prefix) {
    items.push({
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Source Prefix",
        variant: "subtitle2"
      },
      value: {
        type: "Markdown",
        content: "\n" + input.source_location_prefix + "\n```"
      }
    });
  }

  // ARTIFACT DOWNLOAD row
  if (input.artifact_url) {
    items.push({
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Artifact",
        variant: "subtitle2"
      },
      value: {
        type: "Button",
        label: "Download",
        variant: "contained",
        color: "primary",
        size: "small",
        href: input.artifact_url
      }
    });
  }

  // Assemble a DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items
  };

  // Card Header: repo avatar + name + optional description
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.repository.full_name,
    description: input.repository.description ?? "",
    startElement: {
      type: "Avatar",
      src: input.repository.owner.avatar_url,
      name: input.repository.owner.login,
      variant: "primary",
      size: 40
    }
  };

  // Card Content: data table of analysis details
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList
  };

  // Card Footer: link to GitHub repo
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: {
      type: "Button",
      label: "View on GitHub",
      variant: "text",
      color: "primary",
      size: "small",
      href: input.repository.html_url
    }
  };

  // Return a vertical card with header, content, and footer
  return {
    type: "VerticalCard",
    childrenProps: [header, content, footer]
  };
}

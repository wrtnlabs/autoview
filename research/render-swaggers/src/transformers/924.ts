import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A team's access to a repository.
     *
     * @title Team Repository
    */
    export type team_repository = {
        /**
         * Unique identifier of the repository
        */
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * The name of the repository.
        */
        name: string;
        full_name: string;
        license: Schema.nullable_license_simple;
        forks: number & tags.Type<"int32">;
        permissions?: {
            admin: boolean;
            pull: boolean;
            triage?: boolean;
            push: boolean;
            maintain?: boolean;
        };
        role_name?: string;
        owner: Schema.nullable_simple_user;
        /**
         * Whether the repository is private or public.
        */
        "private": boolean;
        html_url: string & tags.Format<"uri">;
        description: string | null;
        fork: boolean;
        url: string & tags.Format<"uri">;
        archive_url: string;
        assignees_url: string;
        blobs_url: string;
        branches_url: string;
        collaborators_url: string;
        comments_url: string;
        commits_url: string;
        compare_url: string;
        contents_url: string;
        contributors_url: string & tags.Format<"uri">;
        deployments_url: string & tags.Format<"uri">;
        downloads_url: string & tags.Format<"uri">;
        events_url: string & tags.Format<"uri">;
        forks_url: string & tags.Format<"uri">;
        git_commits_url: string;
        git_refs_url: string;
        git_tags_url: string;
        git_url: string;
        issue_comment_url: string;
        issue_events_url: string;
        issues_url: string;
        keys_url: string;
        labels_url: string;
        languages_url: string & tags.Format<"uri">;
        merges_url: string & tags.Format<"uri">;
        milestones_url: string;
        notifications_url: string;
        pulls_url: string;
        releases_url: string;
        ssh_url: string;
        stargazers_url: string & tags.Format<"uri">;
        statuses_url: string;
        subscribers_url: string & tags.Format<"uri">;
        subscription_url: string & tags.Format<"uri">;
        tags_url: string & tags.Format<"uri">;
        teams_url: string & tags.Format<"uri">;
        trees_url: string;
        clone_url: string;
        mirror_url: (string & tags.Format<"uri">) | null;
        hooks_url: string & tags.Format<"uri">;
        svn_url: string & tags.Format<"uri">;
        homepage: (string & tags.Format<"uri">) | null;
        language: string | null;
        forks_count: number & tags.Type<"int32">;
        stargazers_count: number & tags.Type<"int32">;
        watchers_count: number & tags.Type<"int32">;
        size: number & tags.Type<"int32">;
        /**
         * The default branch of the repository.
        */
        default_branch: string;
        open_issues_count: number & tags.Type<"int32">;
        /**
         * Whether this repository acts as a template that can be used to generate new repositories.
        */
        is_template?: boolean;
        topics?: string[];
        /**
         * Whether issues are enabled.
        */
        has_issues: boolean;
        /**
         * Whether projects are enabled.
        */
        has_projects: boolean;
        /**
         * Whether the wiki is enabled.
        */
        has_wiki: boolean;
        has_pages: boolean;
        /**
         * Whether downloads are enabled.
        */
        has_downloads: boolean;
        /**
         * Whether the repository is archived.
        */
        archived: boolean;
        /**
         * Returns whether or not this repository disabled.
        */
        disabled: boolean;
        /**
         * The repository visibility: public, private, or internal.
        */
        visibility?: string & tags.Default<"public">;
        pushed_at: (string & tags.Format<"date-time">) | null;
        created_at: (string & tags.Format<"date-time">) | null;
        updated_at: (string & tags.Format<"date-time">) | null;
        /**
         * Whether to allow rebase merges for pull requests.
        */
        allow_rebase_merge?: boolean;
        temp_clone_token?: string;
        /**
         * Whether to allow squash merges for pull requests.
        */
        allow_squash_merge?: boolean;
        /**
         * Whether to allow Auto-merge to be used on pull requests.
        */
        allow_auto_merge?: boolean;
        /**
         * Whether to delete head branches when pull requests are merged
        */
        delete_branch_on_merge?: boolean;
        /**
         * Whether to allow merge commits for pull requests.
        */
        allow_merge_commit?: boolean;
        /**
         * Whether to allow forking this repo
        */
        allow_forking?: boolean;
        /**
         * Whether to require contributors to sign off on web-based commits
        */
        web_commit_signoff_required?: boolean;
        subscribers_count?: number & tags.Type<"int32">;
        network_count?: number & tags.Type<"int32">;
        open_issues: number & tags.Type<"int32">;
        watchers: number & tags.Type<"int32">;
        master_branch?: string;
    };
    /**
     * License Simple
     *
     * @title License Simple
    */
    export type nullable_license_simple = {
        key: string;
        name: string;
        url: (string & tags.Format<"uri">) | null;
        spdx_id: string | null;
        node_id: string;
        html_url?: string & tags.Format<"uri">;
    } | null;
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
}
type IAutoViewTransformerInputType = Schema.team_repository;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper to build a metric chip with an icon
  const buildMetricChip = (
    label: number | string,
    iconId: string,
    color: IAutoView.IAutoViewChipProps["color"]
  ): IAutoView.IAutoViewChipProps => ({
    type: "Chip",
    label: String(label),
    startElement: {
      type: "Icon",
      id: iconId,
      size: 16,
    },
    variant: "filled",
    color,
    size: "small",
  });

  // Format date strings to a human-friendly form, defaulting on failure
  const formatDate = (dt: string | null): string =>
    dt ? new Date(dt).toLocaleDateString() : "Unknown";

  // Card header with repo name, description, owner avatar and public/private chip
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.name,
    description: input.description ?? "No description",
    // Show owner's avatar on the left of the header
    startElement: {
      type: "Avatar",
      src: input.owner?.avatar_url ?? "",
      name: input.owner?.login,
      size: 40,
      variant: "primary",
    },
    // Show a small chip indicating public or private
    endElement: {
      type: "Chip",
      label: input.private ? "Private" : "Public",
      startElement: {
        type: "Icon",
        id: input.private ? "lock" : "unlock",
        size: 16,
      },
      variant: "filled",
      color: input.private ? "error" : "success",
      size: "small",
    },
  };

  // Build a data list of repository metrics and info
  const metricsListItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      label: { type: "Text", content: "Stars" },
      value: buildMetricChip(
        input.stargazers_count,
        "star",
        "yellow"
      ),
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Forks" },
      value: buildMetricChip(
        input.forks_count,
        "code-branch",
        "cyan"
      ),
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Watchers" },
      value: buildMetricChip(
        input.watchers_count,
        "eye",
        "teal"
      ),
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Open Issues" },
      value: buildMetricChip(
        input.open_issues_count,
        "exclamation-circle",
        "error"
      ),
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "License" },
      value: {
        type: "Text",
        content: input.license?.name ?? "No license",
      },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Last Updated" },
      value: {
        type: "Text",
        content: formatDate(input.updated_at),
      },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Created On" },
      value: {
        type: "Text",
        content: formatDate(input.created_at),
      },
    },
  ];

  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "DataList",
      childrenProps: metricsListItems,
    },
  };

  // Card footer with a button linking to the GitHub page
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: {
      type: "Button",
      label: "View on GitHub",
      variant: "contained",
      color: "primary",
      size: "medium",
      href: input.html_url,
    },
  };

  // Compose a vertical card for responsive display
  return {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };
}

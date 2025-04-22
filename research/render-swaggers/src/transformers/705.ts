import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Pull Request Simple
     *
     * @title Pull Request Simple
    */
    export type pull_request_simple = {
        url: string & tags.Format<"uri">;
        id: number & tags.Type<"int32">;
        node_id: string;
        html_url: string & tags.Format<"uri">;
        diff_url: string & tags.Format<"uri">;
        patch_url: string & tags.Format<"uri">;
        issue_url: string & tags.Format<"uri">;
        commits_url: string & tags.Format<"uri">;
        review_comments_url: string & tags.Format<"uri">;
        review_comment_url: string;
        comments_url: string & tags.Format<"uri">;
        statuses_url: string & tags.Format<"uri">;
        number: number & tags.Type<"int32">;
        state: string;
        locked: boolean;
        title: string;
        user: Schema.nullable_simple_user;
        body: string | null;
        labels: {
            id: number & tags.Type<"int32">;
            node_id: string;
            url: string;
            name: string;
            description: string;
            color: string;
            "default": boolean;
        }[];
        milestone: Schema.nullable_milestone;
        active_lock_reason?: string | null;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        closed_at: (string & tags.Format<"date-time">) | null;
        merged_at: (string & tags.Format<"date-time">) | null;
        merge_commit_sha: string | null;
        assignee: Schema.nullable_simple_user;
        assignees?: any[] | null;
        requested_reviewers?: any[] | null;
        requested_teams?: any[] | null;
        head: {
            label: string;
            ref: string;
            repo: Schema.repository;
            sha: string;
            user: Schema.nullable_simple_user;
        };
        base: {
            label: string;
            ref: string;
            repo: Schema.repository;
            sha: string;
            user: Schema.nullable_simple_user;
        };
        _links: {
            comments: Schema.link;
            commits: Schema.link;
            statuses: Schema.link;
            html: Schema.link;
            issue: Schema.link;
            review_comments: Schema.link;
            review_comment: Schema.link;
            self: Schema.link;
        };
        author_association: Schema.author_association;
        auto_merge: Schema.auto_merge;
        /**
         * Indicates whether or not the pull request is a draft.
        */
        draft?: boolean;
    };
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
     * A collection of related issues and pull requests.
     *
     * @title Milestone
    */
    export type nullable_milestone = {
        url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        labels_url: string & tags.Format<"uri">;
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * The number of the milestone.
        */
        number: number & tags.Type<"int32">;
        /**
         * The state of the milestone.
        */
        state: "open" | "closed";
        /**
         * The title of the milestone.
        */
        title: string;
        description: string | null;
        creator: any;
        open_issues: number & tags.Type<"int32">;
        closed_issues: number & tags.Type<"int32">;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        closed_at: (string & tags.Format<"date-time">) | null;
        due_on: (string & tags.Format<"date-time">) | null;
    } | null;
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
    export type team = any;
    /**
     * A repository on GitHub.
     *
     * @title Repository
    */
    export type repository = {
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
        owner: Schema.simple_user;
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
        /**
         * The size of the repository, in kilobytes. Size is calculated hourly. When a repository is initially created, the size is 0.
        */
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
         *
         * @deprecated
        */
        has_downloads: boolean;
        /**
         * Whether discussions are enabled.
        */
        has_discussions?: boolean;
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
         * Whether or not a pull request head branch that is behind its base branch can always be updated even if it is not required to be up to date before merging.
        */
        allow_update_branch?: boolean;
        /**
         * Whether a squash merge commit can use the pull request title as default. **This property is closing down. Please use `squash_merge_commit_title` instead.
         *
         * @deprecated
        */
        use_squash_pr_title_as_default?: boolean;
        /**
         * The default value for a squash merge commit title:
         *
         * - `PR_TITLE` - default to the pull request's title.
         * - `COMMIT_OR_PR_TITLE` - default to the commit's title (if only one commit) or the pull request's title (when more than one commit).
        */
        squash_merge_commit_title?: "PR_TITLE" | "COMMIT_OR_PR_TITLE";
        /**
         * The default value for a squash merge commit message:
         *
         * - `PR_BODY` - default to the pull request's body.
         * - `COMMIT_MESSAGES` - default to the branch's commit messages.
         * - `BLANK` - default to a blank commit message.
        */
        squash_merge_commit_message?: "PR_BODY" | "COMMIT_MESSAGES" | "BLANK";
        /**
         * The default value for a merge commit title.
         *
         * - `PR_TITLE` - default to the pull request's title.
         * - `MERGE_MESSAGE` - default to the classic title for a merge message (e.g., Merge pull request #123 from branch-name).
        */
        merge_commit_title?: "PR_TITLE" | "MERGE_MESSAGE";
        /**
         * The default value for a merge commit message.
         *
         * - `PR_TITLE` - default to the pull request's title.
         * - `PR_BODY` - default to the pull request's body.
         * - `BLANK` - default to a blank commit message.
        */
        merge_commit_message?: "PR_BODY" | "PR_TITLE" | "BLANK";
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
        open_issues: number & tags.Type<"int32">;
        watchers: number & tags.Type<"int32">;
        master_branch?: string;
        starred_at?: string;
        /**
         * Whether anonymous git access is enabled for this repository
        */
        anonymous_access_enabled?: boolean;
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
     * Hypermedia Link
     *
     * @title Link
    */
    export type link = {
        href: string;
    };
    /**
     * How the author is associated with the repository.
     *
     * @title author_association
    */
    export type author_association = "COLLABORATOR" | "CONTRIBUTOR" | "FIRST_TIMER" | "FIRST_TIME_CONTRIBUTOR" | "MANNEQUIN" | "MEMBER" | "NONE" | "OWNER";
    /**
     * The status of auto merging a pull request.
     *
     * @title Auto merge
    */
    export type auto_merge = {
        enabled_by: any;
        /**
         * The merge method to use.
        */
        merge_method: "merge" | "squash" | "rebase";
        /**
         * Title for the merge commit message.
        */
        commit_title: string;
        /**
         * Commit message for the merge commit.
        */
        commit_message: string;
    } | null;
}
type IAutoViewTransformerInputType = Schema.pull_request_simple[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(
  input: IAutoViewTransformerInputType
): IAutoView.IAutoViewComponentProps {
  // If there are no pull requests, show a simple markdown message.
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "### No pull requests found.\n\nThere are currently no pull requests to display.",
    };
  }

  // Helper: create an Avatar or fallback Icon for a user.
  function createUserAvatar(
    user: Schema.nullable_simple_user
  ): IAutoView.IAutoViewAvatarProps | IAutoView.IAutoViewIconProps {
    if (user && user.avatar_url) {
      return {
        type: "Avatar",
        src: user.avatar_url,
        name: user.login,
        size: 40,
      };
    }
    // Fallback icon when user data is absent.
    return {
      type: "Icon",
      id: "user",
      color: "gray",
      size: 40,
    };
  }

  // Helper: create a Chip to reflect PR state or draft status.
  function createStatusChips(
    pr: Schema.pull_request_simple
  ): IAutoView.IAutoViewChipProps[] {
    const chips: IAutoView.IAutoViewChipProps[] = [];

    // Draft chip
    if (pr.draft) {
      chips.push({
        type: "Chip",
        label: "Draft",
        color: "gray",
        variant: "outlined",
        size: "small",
      });
    }

    // State chip: open / closed / merged
    if (pr.merged_at) {
      chips.push({
        type: "Chip",
        label: "Merged",
        color: "success",
        variant: "filled",
        size: "small",
      });
    } else if (pr.state === "open") {
      chips.push({
        type: "Chip",
        label: "Open",
        color: "success",
        variant: "filled",
        size: "small",
      });
    } else {
      // Closed but not merged
      chips.push({
        type: "Chip",
        label: "Closed",
        color: "error",
        variant: "filled",
        size: "small",
      });
    }

    return chips;
  }

  // Compose each pull request into a ListItem.
  const listItems: IAutoView.IAutoViewListItemProps[] = input.map((pr) => {
    // Format creation date for display
    const createdDate = new Date(pr.created_at).toLocaleDateString();

    return {
      type: "ListItem",
      title: pr.title,
      description: `#${pr.number} opened by @${pr.user?.login ||
        "unknown"} on ${createdDate}`,
      // Link to the pull request HTML page
      href: pr.html_url,
      // Show avatar or fallback icon
      startElement: createUserAvatar(pr.user as any),
      // Show chips for state/draft/merge
      endElement: createStatusChips(pr),
    };
  });

  // Return a responsive list of pull requests.
  return {
    type: "List",
    childrenProps: listItems,
  };
}

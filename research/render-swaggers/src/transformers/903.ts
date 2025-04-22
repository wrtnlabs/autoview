import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiSearchRepositories {
        export type GetResponse = {
            total_count: number & tags.Type<"int32">;
            incomplete_results: boolean;
            items: Schema.repo_search_result_item[];
        };
    }
    /**
     * Repo Search Result Item
     *
     * @title Repo Search Result Item
    */
    export type repo_search_result_item = {
        id: number & tags.Type<"int32">;
        node_id: string;
        name: string;
        full_name: string;
        owner: Schema.nullable_simple_user;
        "private": boolean;
        html_url: string & tags.Format<"uri">;
        description: string | null;
        fork: boolean;
        url: string & tags.Format<"uri">;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        pushed_at: string & tags.Format<"date-time">;
        homepage: (string & tags.Format<"uri">) | null;
        size: number & tags.Type<"int32">;
        stargazers_count: number & tags.Type<"int32">;
        watchers_count: number & tags.Type<"int32">;
        language: string | null;
        forks_count: number & tags.Type<"int32">;
        open_issues_count: number & tags.Type<"int32">;
        master_branch?: string;
        default_branch: string;
        score: number;
        forks_url: string & tags.Format<"uri">;
        keys_url: string;
        collaborators_url: string;
        teams_url: string & tags.Format<"uri">;
        hooks_url: string & tags.Format<"uri">;
        issue_events_url: string;
        events_url: string & tags.Format<"uri">;
        assignees_url: string;
        branches_url: string;
        tags_url: string & tags.Format<"uri">;
        blobs_url: string;
        git_tags_url: string;
        git_refs_url: string;
        trees_url: string;
        statuses_url: string;
        languages_url: string & tags.Format<"uri">;
        stargazers_url: string & tags.Format<"uri">;
        contributors_url: string & tags.Format<"uri">;
        subscribers_url: string & tags.Format<"uri">;
        subscription_url: string & tags.Format<"uri">;
        commits_url: string;
        git_commits_url: string;
        comments_url: string;
        issue_comment_url: string;
        contents_url: string;
        compare_url: string;
        merges_url: string & tags.Format<"uri">;
        archive_url: string;
        downloads_url: string & tags.Format<"uri">;
        issues_url: string;
        pulls_url: string;
        milestones_url: string;
        notifications_url: string;
        labels_url: string;
        releases_url: string;
        deployments_url: string & tags.Format<"uri">;
        git_url: string;
        ssh_url: string;
        clone_url: string;
        svn_url: string & tags.Format<"uri">;
        forks: number & tags.Type<"int32">;
        open_issues: number & tags.Type<"int32">;
        watchers: number & tags.Type<"int32">;
        topics?: string[];
        mirror_url: (string & tags.Format<"uri">) | null;
        has_issues: boolean;
        has_projects: boolean;
        has_pages: boolean;
        has_wiki: boolean;
        has_downloads: boolean;
        has_discussions?: boolean;
        archived: boolean;
        /**
         * Returns whether or not this repository disabled.
        */
        disabled: boolean;
        /**
         * The repository visibility: public, private, or internal.
        */
        visibility?: string;
        license: Schema.nullable_license_simple;
        permissions?: {
            admin: boolean;
            maintain?: boolean;
            push: boolean;
            triage?: boolean;
            pull: boolean;
        };
        text_matches?: Schema.search_result_text_matches;
        temp_clone_token?: string;
        allow_merge_commit?: boolean;
        allow_squash_merge?: boolean;
        allow_rebase_merge?: boolean;
        allow_auto_merge?: boolean;
        delete_branch_on_merge?: boolean;
        allow_forking?: boolean;
        is_template?: boolean;
        web_commit_signoff_required?: boolean;
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
     * @title Search Result Text Matches
    */
    export type search_result_text_matches = {
        object_url?: string;
        object_type?: string | null;
        property?: string;
        fragment?: string;
        matches?: {
            text?: string;
            indices?: (number & tags.Type<"int32">)[];
        }[];
    }[];
}
type IAutoViewTransformerInputType = Schema.IApiSearchRepositories.GetResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Destructure total count and list of repository items
  const { total_count, items } = input;

  // Create a list subheader displaying the total number of repositories
  const subheader: IAutoView.IAutoViewListSubheaderProps = {
    type: "ListSubheader",
    stickToTop: true,
    childrenProps: {
      type: "Text",
      // Use markdown-like bold text to highlight the total count
      content: `**Total Repositories:** ${total_count}`
    }
  };

  // Helper to create an icon chip for a numeric metric
  function makeMetricChip(
    iconId: string,
    label: string,
    color: IAutoView.IAutoViewIconProps["color"]
  ): IAutoView.IAutoViewChipProps {
    return {
      type: "Chip",
      variant: "outlined",
      size: "small",
      color: color,
      label: label,
      startElement: {
        type: "Icon",
        id: iconId,
        color: color,
        size: 16
      }
    };
  }

  // Transform each repository into a ListItemProps
  const listItems: IAutoView.IAutoViewListItemProps[] = items.map((repo) => {
    const owner = repo.owner;
    // Prepare the avatar for the repository owner, if available
    const avatar = owner
      ? {
          type: "Avatar" as const,
          src: owner.avatar_url,
          name: owner.login,
          variant: "info" as const,
          size: 40 as const
        }
      : undefined;

    // Collect metric chips: stars, forks, issues, watchers, language
    const metricChips: IAutoView.IAutoViewChipProps[] = [];

    // Stargazers
    metricChips.push(
      makeMetricChip(
        "star",
        repo.stargazers_count.toString(),
        "yellow"
      )
    );
    // Forks
    metricChips.push(
      makeMetricChip(
        "code-branch",
        repo.forks_count.toString(),
        "gray"
      )
    );
    // Open issues
    metricChips.push(
      makeMetricChip(
        "exclamation-circle",
        repo.open_issues_count.toString(),
        "red"
      )
    );
    // Watchers
    metricChips.push(
      makeMetricChip(
        "eye",
        repo.watchers_count.toString(),
        "blue"
      )
    );
    // Language (if present)
    if (repo.language) {
      metricChips.push({
        type: "Chip" as const,
        label: repo.language,
        variant: "filled" as const,
        size: "small" as const,
        color: "primary" as const
      });
    }

    // Optionally collapse extra chips to avoid overflow on small screens
    const MAX_CHIPS = 5;
    let endElements: IAutoView.IAutoViewChipProps[];
    if (metricChips.length > MAX_CHIPS) {
      // Show first MAX_CHIPS-1 and a "+X" chip
      const visible = metricChips.slice(0, MAX_CHIPS - 1);
      visible.push({
        type: "Chip" as const,
        label: `+${metricChips.length - (MAX_CHIPS - 1)}`,
        variant: "outlined" as const,
        size: "small" as const,
        color: "gray" as const
      });
      endElements = visible;
    } else {
      endElements = metricChips;
    }

    return {
      type: "ListItem",
      title: repo.full_name,
      description: repo.description || undefined,
      startElement: avatar,
      endElement: endElements,
      href: repo.html_url
    };
  });

  // Compose the final List component
  const listProps: IAutoView.IAutoViewListProps = {
    type: "List",
    childrenProps: [
      subheader,
      // Spread each item into the childrenProps
      ...listItems
    ]
  };

  return listProps;
}

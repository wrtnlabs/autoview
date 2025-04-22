import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Check suite configuration preferences for a repository.
     *
     * @title Check Suite Preference
    */
    export type check_suite_preference = {
        preferences: {
            auto_trigger_checks?: {
                app_id: number & tags.Type<"int32">;
                setting: boolean;
            }[];
        };
        repository: Schema.minimal_repository;
    };
    /**
     * Minimal Repository
     *
     * @title Minimal Repository
    */
    export type minimal_repository = {
        id: number & tags.Type<"int32">;
        node_id: string;
        name: string;
        full_name: string;
        owner: Schema.simple_user;
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
        git_url?: string;
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
        ssh_url?: string;
        stargazers_url: string & tags.Format<"uri">;
        statuses_url: string;
        subscribers_url: string & tags.Format<"uri">;
        subscription_url: string & tags.Format<"uri">;
        tags_url: string & tags.Format<"uri">;
        teams_url: string & tags.Format<"uri">;
        trees_url: string;
        clone_url?: string;
        mirror_url?: string | null;
        hooks_url: string & tags.Format<"uri">;
        svn_url?: string;
        homepage?: string | null;
        language?: string | null;
        forks_count?: number & tags.Type<"int32">;
        stargazers_count?: number & tags.Type<"int32">;
        watchers_count?: number & tags.Type<"int32">;
        /**
         * The size of the repository, in kilobytes. Size is calculated hourly. When a repository is initially created, the size is 0.
        */
        size?: number & tags.Type<"int32">;
        default_branch?: string;
        open_issues_count?: number & tags.Type<"int32">;
        is_template?: boolean;
        topics?: string[];
        has_issues?: boolean;
        has_projects?: boolean;
        has_wiki?: boolean;
        has_pages?: boolean;
        has_downloads?: boolean;
        has_discussions?: boolean;
        archived?: boolean;
        disabled?: boolean;
        visibility?: string;
        pushed_at?: (string & tags.Format<"date-time">) | null;
        created_at?: (string & tags.Format<"date-time">) | null;
        updated_at?: (string & tags.Format<"date-time">) | null;
        permissions?: {
            admin?: boolean;
            maintain?: boolean;
            push?: boolean;
            triage?: boolean;
            pull?: boolean;
        };
        role_name?: string;
        temp_clone_token?: string;
        delete_branch_on_merge?: boolean;
        subscribers_count?: number & tags.Type<"int32">;
        network_count?: number & tags.Type<"int32">;
        code_of_conduct?: Schema.code_of_conduct;
        license?: {
            key?: string;
            name?: string;
            spdx_id?: string;
            url?: string;
            node_id?: string;
        } | null;
        forks?: number & tags.Type<"int32">;
        open_issues?: number & tags.Type<"int32">;
        watchers?: number & tags.Type<"int32">;
        allow_forking?: boolean;
        web_commit_signoff_required?: boolean;
        security_and_analysis?: Schema.security_and_analysis;
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
     * Code Of Conduct
     *
     * @title Code Of Conduct
    */
    export type code_of_conduct = {
        key: string;
        name: string;
        url: string & tags.Format<"uri">;
        body?: string;
        html_url: (string & tags.Format<"uri">) | null;
    };
    export type security_and_analysis = {
        advanced_security?: {
            status?: "enabled" | "disabled";
        };
        code_security?: {
            status?: "enabled" | "disabled";
        };
        /**
         * Enable or disable Dependabot security updates for the repository.
        */
        dependabot_security_updates?: {
            /**
             * The enablement status of Dependabot security updates for the repository.
            */
            status?: "enabled" | "disabled";
        };
        secret_scanning?: {
            status?: "enabled" | "disabled";
        };
        secret_scanning_push_protection?: {
            status?: "enabled" | "disabled";
        };
        secret_scanning_non_provider_patterns?: {
            status?: "enabled" | "disabled";
        };
        secret_scanning_ai_detection?: {
            status?: "enabled" | "disabled";
        };
    } | null;
}
type IAutoViewTransformerInputType = Schema.check_suite_preference;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Destructure input for easier access
  const {
    repository,
    preferences: { auto_trigger_checks = [] },
  } = input;

  // Build the CardHeader with repository avatar, name, and description
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    // Repository full name as title
    title: repository.full_name,
    // Use description if available, else empty string
    description: repository.description ?? "",
    // Show owner's avatar and login name
    startElement: {
      type: "Avatar",
      src: repository.owner.avatar_url,
      name: repository.owner.login,
      variant: "gray",
      size: 40,
    },
  };

  // Build the list of auto_trigger_checks as a DataList or a Markdown fallback
  const checksComponent: IAutoView.IAutoViewPresentationComponentProps =
    auto_trigger_checks.length > 0
      ? {
          type: "DataList",
          childrenProps: auto_trigger_checks.map(
            (check): IAutoView.IAutoViewDataListItemProps => ({
              type: "DataListItem",
              // Label shows "App ID: <id>"
              label: [
                {
                  type: "Text",
                  content: [`App ID: ${check.app_id}`],
                  variant: "body2",
                },
              ],
              // Value is a toggle icon indicating the setting
              value: {
                type: "Icon",
                id: check.setting ? "toggle-on" : "toggle-off",
                color: check.setting ? "green" : "gray",
                size: 20,
              },
            })
          ),
        }
      : {
          // Fallback markdown when there are no checks configured
          type: "Markdown",
          content: "### No auto-trigger checks configured",
        };

  // Wrap the checks in a CardContent
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: checksComponent,
  };

  // Build summary chips for stars, forks, and watchers
  const statsChips: IAutoView.IAutoViewChipProps[] = [];
  if (typeof repository.stargazers_count === "number") {
    statsChips.push({
      type: "Chip",
      label: `${repository.stargazers_count}`,
      startElement: { type: "Icon", id: "star", color: "yellow", size: 16 },
      color: "yellow",
      variant: "outlined",
      size: "small",
    });
  }
  if (typeof repository.forks_count === "number") {
    statsChips.push({
      type: "Chip",
      label: `${repository.forks_count}`,
      startElement: { type: "Icon", id: "code-branch", color: "blue", size: 16 },
      color: "blue",
      variant: "outlined",
      size: "small",
    });
  }
  if (typeof repository.watchers_count === "number") {
    statsChips.push({
      type: "Chip",
      label: `${repository.watchers_count}`,
      startElement: { type: "Icon", id: "eye", color: "teal", size: 16 },
      color: "teal",
      variant: "outlined",
      size: "small",
    });
  }

  // Action button to view on GitHub
  const viewButton: IAutoView.IAutoViewButtonProps = {
    type: "Button",
    label: "View on GitHub",
    href: repository.html_url,
    variant: "contained",
    color: "primary",
    size: "medium",
    startElement: {
      type: "Icon",
      id: "github",
      color: "gray",
      size: 16,
    },
  };

  // Combine stats and action in the CardFooter
  const cardFooter: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: [...statsChips, viewButton],
  };

  // Assemble the VerticalCard with header, content, and footer
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent, cardFooter],
  };

  return verticalCard;
}

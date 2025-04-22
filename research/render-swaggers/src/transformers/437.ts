import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiOrgsCodespacesSecretsRepositories {
        export type GetResponse = {
            total_count: number & tags.Type<"int32">;
            repositories: Schema.minimal_repository[];
        };
    }
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
type IAutoViewTransformerInputType = Schema.IApiOrgsCodespacesSecretsRepositories.GetResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there are no repositories, show a simple markdown message.
  if (!input.repositories || input.repositories.length === 0) {
    return {
      type: "Markdown",
      content: "**No repositories found.**",
    };
  }

  // Build a DataListItem for each repository.
  const items: IAutoView.IAutoViewDataListItemProps[] = input.repositories.map(repo => {
    // Compose the label: owner's avatar + clickable repo name + optional description.
    const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [];

    // Owner avatar
    labelComponents.push({
      type: "Avatar",
      src: repo.owner.avatar_url,
      name: repo.owner.login,
      size: 32,
      variant: "primary",
    });

    // Repo full name as a markdown link
    labelComponents.push({
      type: "Markdown",
      content: `**[${repo.full_name}](${repo.html_url})**`,
    });

    // Optional description text
    if (repo.description) {
      labelComponents.push({
        type: "Text",
        content: repo.description,
        variant: "body2",
        color: "gray",
      });
    }

    // Prepare chips for stargazers, forks, and open issues
    const chipChildren: IAutoView.IAutoViewChipProps[] = [];

    if (typeof repo.stargazers_count === "number") {
      chipChildren.push({
        type: "Chip",
        label: repo.stargazers_count.toString(),
        startElement: {
          type: "Icon",
          id: "star",
          color: "yellow",
          size: 12,
        },
        color: "yellow",
        size: "small",
        variant: "outlined",
      });
    }

    if (typeof repo.forks_count === "number") {
      chipChildren.push({
        type: "Chip",
        label: repo.forks_count.toString(),
        startElement: {
          type: "Icon",
          id: "code-branch",
          color: "cyan",
          size: 12,
        },
        color: "cyan",
        size: "small",
        variant: "outlined",
      });
    }

    if (typeof repo.open_issues_count === "number") {
      chipChildren.push({
        type: "Chip",
        label: repo.open_issues_count.toString(),
        startElement: {
          type: "Icon",
          id: "exclamation-circle",
          color: "red",
          size: 12,
        },
        color: "error",
        size: "small",
        variant: "outlined",
      });
    }

    // Group chips into a ChipGroup
    const statsGroup: IAutoView.IAutoViewChipGroupProps = {
      type: "ChipGroup",
      childrenProps: chipChildren,
    };

    // Return the DataListItem, using the labelComponents and statsGroup as the value.
    return {
      type: "DataListItem",
      label: labelComponents,
      value: statsGroup,
    };
  });

  // Wrap all items into a DataList
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items,
  };

  // Compose a card with a header and the data list as its content
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Repositories",
    description: `Total: ${input.total_count}`,
    startElement: {
      type: "Icon",
      id: "folder",
      color: "blue",
      size: 24,
    },
  };

  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // The dataList itself is a valid presentation component
    childrenProps: dataList,
  };

  // Return a vertical card containing the header and content
  return {
    type: "VerticalCard",
    childrenProps: [header, content],
  };
}

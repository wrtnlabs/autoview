import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Repository invitations let you manage who you collaborate with.
     *
     * @title Repository Invitation
    */
    export type repository_invitation = {
        /**
         * Unique identifier of the repository invitation.
        */
        id: number & tags.Type<"int32">;
        repository: Schema.minimal_repository;
        invitee: Schema.nullable_simple_user;
        inviter: Schema.nullable_simple_user;
        /**
         * The permission associated with the invitation.
        */
        permissions: "read" | "write" | "admin" | "triage" | "maintain";
        created_at: string & tags.Format<"date-time">;
        /**
         * Whether or not the invitation has expired
        */
        expired?: boolean;
        /**
         * URL for the repository invitation
        */
        url: string;
        html_url: string;
        node_id: string;
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
type IAutoViewTransformerInputType = Schema.repository_invitation[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Map GitHub permission strings to UI chip colors
  const permissionColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
    read: "success",
    write: "info",
    admin: "error",
    triage: "warning",
    maintain: "primary",
  };

  // Build a DataList where each item represents one repository invitation
  const items: IAutoView.IAutoViewDataListItemProps[] = input.map((invitation) => {
    // 1. Owner avatar + repository full name as the label
    const ownerAvatar: IAutoView.IAutoViewAvatarProps = {
      type: "Avatar",
      src: invitation.repository.owner.avatar_url,
      name: invitation.repository.owner.login,
      // primary color to highlight repository owner
      variant: "primary",
      size: 32,
    };
    const repoNameText: IAutoView.IAutoViewTextProps = {
      type: "Text",
      content: invitation.repository.full_name,
      variant: "body1",
    };

    // 2. Invitation details as the value: inviter & invitee avatars, permission chip, date, and link button
    // Gather inviter/invitee avatars if present
    const avatarChildren: IAutoView.IAutoViewAvatarProps[] = [];
    if (invitation.inviter) {
      avatarChildren.push({
        type: "Avatar",
        src: invitation.inviter.avatar_url,
        name: invitation.inviter.login,
        variant: "secondary",
        size: 24,
      });
    }
    if (invitation.invitee) {
      avatarChildren.push({
        type: "Avatar",
        src: invitation.invitee.avatar_url,
        name: invitation.invitee.login,
        variant: "secondary",
        size: 24,
      });
    }
    const inviteeGroup: IAutoView.IAutoViewAvatarGroupProps = {
      type: "AvatarGroup",
      childrenProps: avatarChildren,
      maxItems: avatarChildren.length,
    };

    // Permission chip
    const permissionChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: invitation.permissions,
      color: permissionColorMap[invitation.permissions] || "primary",
      variant: "outlined",
      size: "small",
    };

    // Created date, formatted for display
    const createdAtText: IAutoView.IAutoViewTextProps = {
      type: "Text",
      content: new Date(invitation.created_at).toLocaleDateString(),
      variant: "caption",
    };

    // Link to the invitation page
    const openButton: IAutoView.IAutoViewButtonProps = {
      type: "Button",
      label: "View",
      href: invitation.html_url,
      variant: "outlined",
      color: "primary",
      size: "small",
    };

    return {
      type: "DataListItem",
      // Label shows repository owner + name
      label: [ownerAvatar, repoNameText],
      // Value shows inviter/invitee, permission, date, and action button
      value: [inviteeGroup, permissionChip, createdAtText, openButton],
    };
  });

  // Return the composed DataList component
  return {
    type: "DataList",
    childrenProps: items,
  };
}

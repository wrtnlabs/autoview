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
type IAutoViewTransformerInputType = Schema.repository_invitation;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Map GitHub permission names to UI colors
  const permissionColorMap: Record<string, IAutoView.IAutoViewChipProps['color']> = {
    admin: 'error',
    maintain: 'warning',
    triage: 'success',
    write: 'primary',
    read: 'info',
  };

  // Format ISO timestamp into local datetime string
  const formatDate = (iso: string): string => {
    try {
      const d = new Date(iso);
      return isNaN(d.getTime()) ? iso : d.toLocaleString();
    } catch {
      return iso;
    }
  };

  // Construct a list of DataListItemProps for details
  const details: IAutoView.IAutoViewDataListItemProps[] = [];

  // Invitee
  if (input.invitee) {
    details.push({
      type: 'DataListItem',
      label: { type: 'Text', content: 'Invitee', variant: 'body2' },
      value: {
        type: 'Chip',
        label: input.invitee.login,
        color: 'primary',
        size: 'small',
        variant: 'outlined',
        startElement: {
          type: 'Avatar',
          src: input.invitee.avatar_url,
          name: input.invitee.login,
          size: 20,
          variant: 'gray',
        },
      },
    });
  } else {
    details.push({
      type: 'DataListItem',
      label: { type: 'Text', content: 'Invitee', variant: 'body2' },
      value: { type: 'Text', content: 'None', variant: 'body2' },
    });
  }

  // Inviter
  if (input.inviter) {
    details.push({
      type: 'DataListItem',
      label: { type: 'Text', content: 'Inviter', variant: 'body2' },
      value: {
        type: 'Chip',
        label: input.inviter.login,
        color: 'secondary',
        size: 'small',
        variant: 'outlined',
        startElement: {
          type: 'Avatar',
          src: input.inviter.avatar_url,
          name: input.inviter.login,
          size: 20,
          variant: 'gray',
        },
      },
    });
  } else {
    details.push({
      type: 'DataListItem',
      label: { type: 'Text', content: 'Inviter', variant: 'body2' },
      value: { type: 'Text', content: 'None', variant: 'body2' },
    });
  }

  // Permission
  const perm = input.permissions;
  details.push({
    type: 'DataListItem',
    label: { type: 'Text', content: 'Permission', variant: 'body2' },
    value: {
      type: 'Chip',
      label: perm.charAt(0).toUpperCase() + perm.slice(1),
      color: permissionColorMap[perm] || 'gray',
      size: 'small',
      variant: 'filled',
    },
  });

  // Created At
  details.push({
    type: 'DataListItem',
    label: { type: 'Text', content: 'Created', variant: 'body2' },
    value: { type: 'Text', content: formatDate(input.created_at), variant: 'body2' },
  });

  // Invitation Link
  if (input.html_url) {
    details.push({
      type: 'DataListItem',
      label: { type: 'Text', content: 'View', variant: 'body2' },
      value: {
        type: 'Button',
        label: 'Open Invitation',
        variant: 'outlined',
        size: 'small',
        startElement: { type: 'Icon', id: 'link', color: 'blue', size: 12 },
        href: input.html_url,
      },
    });
  }

  // Expiration status chip
  const statusChip: IAutoView.IAutoViewChipProps = {
    type: 'Chip',
    label: input.expired ? 'Expired' : 'Active',
    color: input.expired ? 'error' : 'success',
    size: 'small',
    variant: 'filled',
  };

  return {
    type: 'VerticalCard',
    // The card is composed of header, content (details), and footer (status)
    childrenProps: [
      {
        type: 'CardHeader',
        title: input.repository.full_name,
        description: input.repository.description ?? '',
        startElement: {
          type: 'Avatar',
          src: input.repository.owner.avatar_url,
          name: input.repository.owner.login,
          size: 40,
          variant: 'gray',
        },
      },
      {
        type: 'CardContent',
        childrenProps: {
          type: 'DataList',
          childrenProps: details,
        },
      },
      {
        type: 'CardFooter',
        childrenProps: statusChip,
      },
    ],
  };
}

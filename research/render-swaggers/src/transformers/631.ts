import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Branch protections protect branches
     *
     * @title Protected Branch
    */
    export type protected_branch = {
        url: string & tags.Format<"uri">;
        required_status_checks?: Schema.status_check_policy;
        required_pull_request_reviews?: {
            url: string & tags.Format<"uri">;
            dismiss_stale_reviews?: boolean;
            require_code_owner_reviews?: boolean;
            required_approving_review_count?: number & tags.Type<"int32">;
            /**
             * Whether the most recent push must be approved by someone other than the person who pushed it.
            */
            require_last_push_approval?: boolean;
            dismissal_restrictions?: {
                url: string & tags.Format<"uri">;
                users_url: string & tags.Format<"uri">;
                teams_url: string & tags.Format<"uri">;
                users: Schema.simple_user[];
                teams: Schema.team[];
                apps?: Schema.integration[];
            };
            bypass_pull_request_allowances?: {
                users: Schema.simple_user[];
                teams: Schema.team[];
                apps?: Schema.integration[];
            };
        };
        required_signatures?: {
            url: string & tags.Format<"uri">;
            enabled: boolean;
        };
        enforce_admins?: {
            url: string & tags.Format<"uri">;
            enabled: boolean;
        };
        required_linear_history?: {
            enabled: boolean;
        };
        allow_force_pushes?: {
            enabled: boolean;
        };
        allow_deletions?: {
            enabled: boolean;
        };
        restrictions?: Schema.branch_restriction_policy;
        required_conversation_resolution?: {
            enabled?: boolean;
        };
        block_creations?: {
            enabled: boolean;
        };
        /**
         * Whether to set the branch as read-only. If this is true, users will not be able to push to the branch.
        */
        lock_branch?: {
            enabled?: boolean;
        };
        /**
         * Whether users can pull changes from upstream when the branch is locked. Set to `true` to allow fork syncing. Set to `false` to prevent fork syncing.
        */
        allow_fork_syncing?: {
            enabled?: boolean;
        };
    };
    /**
     * Status Check Policy
     *
     * @title Status Check Policy
    */
    export type status_check_policy = {
        url: string & tags.Format<"uri">;
        strict: boolean;
        contexts: string[];
        checks: {
            context: string;
            app_id: (number & tags.Type<"int32">) | null;
        }[];
        contexts_url: string & tags.Format<"uri">;
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
     * Groups of organization members that gives permissions on specified repositories.
     *
     * @title Team
    */
    export type team = {
        id: number & tags.Type<"int32">;
        node_id: string;
        name: string;
        slug: string;
        description: string | null;
        privacy?: string;
        notification_setting?: string;
        permission: string;
        permissions?: {
            pull: boolean;
            triage: boolean;
            push: boolean;
            maintain: boolean;
            admin: boolean;
        };
        url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        members_url: string;
        repositories_url: string & tags.Format<"uri">;
        parent: Schema.nullable_team_simple;
    };
    /**
     * Groups of organization members that gives permissions on specified repositories.
     *
     * @title Team Simple
    */
    export type nullable_team_simple = {
        /**
         * Unique identifier of the team
        */
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * URL for the team
        */
        url: string & tags.Format<"uri">;
        members_url: string;
        /**
         * Name of the team
        */
        name: string;
        /**
         * Description of the team
        */
        description: string | null;
        /**
         * Permission that the team will have for its repositories
        */
        permission: string;
        /**
         * The level of privacy this team should have
        */
        privacy?: string;
        /**
         * The notification setting the team has set
        */
        notification_setting?: string;
        html_url: string & tags.Format<"uri">;
        repositories_url: string & tags.Format<"uri">;
        slug: string;
        /**
         * Distinguished Name (DN) that team maps to within LDAP environment
        */
        ldap_dn?: string;
    } | null;
    /**
     * GitHub apps are a new way to extend GitHub. They can be installed directly on organizations and user accounts and granted access to specific repositories. They come with granular permissions and built-in webhooks. GitHub apps are first class actors within GitHub.
     *
     * @title GitHub app
    */
    export type integration = {
        /**
         * Unique identifier of the GitHub app
        */
        id: number & tags.Type<"int32">;
        /**
         * The slug name of the GitHub app
        */
        slug?: string;
        node_id: string;
        client_id?: string;
        owner: any | any;
        /**
         * The name of the GitHub app
        */
        name: string;
        description: string | null;
        external_url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        /**
         * The set of permissions for the GitHub app
        */
        permissions: {
            [key: string]: string;
        };
        /**
         * The list of events for the GitHub app
        */
        events: string[];
        /**
         * The number of installations associated with the GitHub app
        */
        installations_count?: number & tags.Type<"int32">;
        client_secret?: string;
        webhook_secret?: string | null;
        pem?: string;
    } | null;
    export type enterprise = any;
    /**
     * Branch Restriction Policy
     *
     * @title Branch Restriction Policy
    */
    export type branch_restriction_policy = {
        url: string & tags.Format<"uri">;
        users_url: string & tags.Format<"uri">;
        teams_url: string & tags.Format<"uri">;
        apps_url: string & tags.Format<"uri">;
        users: {
            login?: string;
            id?: number & tags.Type<"int32">;
            node_id?: string;
            avatar_url?: string;
            gravatar_id?: string;
            url?: string;
            html_url?: string;
            followers_url?: string;
            following_url?: string;
            gists_url?: string;
            starred_url?: string;
            subscriptions_url?: string;
            organizations_url?: string;
            repos_url?: string;
            events_url?: string;
            received_events_url?: string;
            type?: string;
            site_admin?: boolean;
            user_view_type?: string;
        }[];
        teams: {
            id?: number & tags.Type<"int32">;
            node_id?: string;
            url?: string;
            html_url?: string;
            name?: string;
            slug?: string;
            description?: string | null;
            privacy?: string;
            notification_setting?: string;
            permission?: string;
            members_url?: string;
            repositories_url?: string;
            parent?: string | null;
        }[];
        apps: {
            id?: number & tags.Type<"int32">;
            slug?: string;
            node_id?: string;
            owner?: {
                login?: string;
                id?: number & tags.Type<"int32">;
                node_id?: string;
                url?: string;
                repos_url?: string;
                events_url?: string;
                hooks_url?: string;
                issues_url?: string;
                members_url?: string;
                public_members_url?: string;
                avatar_url?: string;
                description?: string;
                gravatar_id?: string;
                html_url?: string;
                followers_url?: string;
                following_url?: string;
                gists_url?: string;
                starred_url?: string;
                subscriptions_url?: string;
                organizations_url?: string;
                received_events_url?: string;
                type?: string;
                site_admin?: boolean;
                user_view_type?: string;
            };
            name?: string;
            client_id?: string;
            description?: string;
            external_url?: string;
            html_url?: string;
            created_at?: string;
            updated_at?: string;
            permissions?: {
                metadata?: string;
                contents?: string;
                issues?: string;
                single_file?: string;
            };
            events?: string[];
        }[];
    };
}
type IAutoViewTransformerInputType = Schema.protected_branch;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Extract branch name from URL for display
  const branchName = input.url.split("/").pop() || input.url;

  // Prepare header with an icon and branch information
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: branchName,
    description: input.url,
    startElement: {
      type: "Icon",
      id: "code-branch",       // FontAwesome branch icon
      color: "blue",
      size: 24,
    },
  };

  // Helper to render boolean-enabled policies as Chips
  function renderFlag(label: string, enabled: boolean): IAutoView.IAutoViewDataListItemProps {
    return {
      type: "DataListItem",
      label: [
        {
          type: "Text",
          content: label,
          variant: "body2",
        },
      ],
      value: {
        type: "Chip",
        label: enabled ? "Enabled" : "Disabled",
        color: enabled ? "green" : "error",
        variant: "filled",
      },
    };
  }

  // Build list of DataListItemProps
  const items: IAutoView.IAutoViewDataListItemProps[] = [];

  // 1. Required status checks
  if (input.required_status_checks) {
    const s = input.required_status_checks;
    const md = [
      `**Strict**: ${s.strict}`,
      `**Contexts**: ${s.contexts.join(", ") || "None"}`,
      `**Checks Count**: ${s.checks.length}`,
      `**Details**: [View Contexts](${s.contexts_url})`,
    ].join("\n\n");
    items.push({
      type: "DataListItem",
      label: [
        { type: "Text", content: "Status Checks", variant: "body2" },
      ],
      value: {
        type: "Markdown",
        content: md,
      },
    });
  }

  // 2. Pull request reviews policy
  if (input.required_pull_request_reviews) {
    const r = input.required_pull_request_reviews;
    const lines: string[] = [];
    if (typeof r.required_approving_review_count === "number") {
      lines.push(`- **Approvals Required**: ${r.required_approving_review_count}`);
    }
    lines.push(`- **Dismiss Stale Reviews**: ${!!r.dismiss_stale_reviews}`);
    lines.push(`- **Require Code Owner Reviews**: ${!!r.require_code_owner_reviews}`);
    lines.push(`- **Bypass Allowances (users/teams/apps)**: 
    - Users: ${r.bypass_pull_request_allowances?.users.length ?? 0}
    - Teams: ${r.bypass_pull_request_allowances?.teams.length ?? 0}
    - Apps: ${r.bypass_pull_request_allowances?.apps?.length ?? 0}`);
    const md = lines.join("\n");
    items.push({
      type: "DataListItem",
      label: [
        { type: "Text", content: "Pull Request Reviews", variant: "body2" },
      ],
      value: {
        type: "Markdown",
        content: md,
      },
    });
  }

  // 3. Other boolean-based policies
  const booleanPolicies: Array<{
    prop: keyof IAutoViewTransformerInputType;
    label: string;
    getEnabled: (x: any) => boolean;
  }> = [
    {
      prop: "required_signatures",
      label: "Required Signatures",
      getEnabled: (x) => x.enabled === true,
    },
    {
      prop: "enforce_admins",
      label: "Enforce Admins",
      getEnabled: (x) => x.enabled === true,
    },
    {
      prop: "required_linear_history",
      label: "Linear History",
      getEnabled: (x) => x.enabled === true,
    },
    {
      prop: "allow_force_pushes",
      label: "Allow Force Pushes",
      getEnabled: (x) => x.enabled === true,
    },
    {
      prop: "allow_deletions",
      label: "Allow Deletions",
      getEnabled: (x) => x.enabled === true,
    },
    {
      prop: "required_conversation_resolution",
      label: "Conversation Resolution",
      getEnabled: (x) => x.enabled === true,
    },
    {
      prop: "block_creations",
      label: "Block Creations",
      getEnabled: (x) => x.enabled === true,
    },
    {
      prop: "lock_branch",
      label: "Lock Branch",
      getEnabled: (x) => x.enabled === true,
    },
    {
      prop: "allow_fork_syncing",
      label: "Allow Fork Syncing",
      getEnabled: (x) => x.enabled === true,
    },
  ];

  for (const policy of booleanPolicies) {
    // Only render if property is present
    const obj = (input as any)[policy.prop];
    if (obj !== undefined) {
      items.push(renderFlag(policy.label, policy.getEnabled(obj)));
    }
  }

  // 4. Restrictions: users, teams, apps
  if (input.restrictions) {
    const r = input.restrictions;
    const md = [
      `- **Users**: ${r.users.length}`,
      `- **Teams**: ${r.teams.length}`,
      `- **Apps**: ${r.apps.length}`,
    ].join("\n");
    items.push({
      type: "DataListItem",
      label: [
        { type: "Text", content: "Restrictions", variant: "body2" },
      ],
      value: {
        type: "Markdown",
        content: md,
      },
    });
  }

  // Compose the DataList
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items,
  };

  // Wrap everything in a vertical card for a responsive layout
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      header,
      { type: "CardContent", childrenProps: dataList },
    ],
  };

  return card;
}

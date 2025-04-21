import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Protected Branch Pull Request Review
     *
     * @title Protected Branch Pull Request Review
    */
    export type protected_branch_pull_request_review = {
        url?: string & tags.Format<"uri">;
        dismissal_restrictions?: {
            /**
             * The list of users with review dismissal access.
            */
            users?: Schema.simple_user[];
            /**
             * The list of teams with review dismissal access.
            */
            teams?: Schema.team[];
            /**
             * The list of apps with review dismissal access.
            */
            apps?: Schema.integration[];
            url?: string;
            users_url?: string;
            teams_url?: string;
        };
        /**
         * Allow specific users, teams, or apps to bypass pull request requirements.
        */
        bypass_pull_request_allowances?: {
            /**
             * The list of users allowed to bypass pull request requirements.
            */
            users?: Schema.simple_user[];
            /**
             * The list of teams allowed to bypass pull request requirements.
            */
            teams?: Schema.team[];
            /**
             * The list of apps allowed to bypass pull request requirements.
            */
            apps?: Schema.integration[];
        };
        dismiss_stale_reviews: boolean;
        require_code_owner_reviews: boolean;
        required_approving_review_count?: number & tags.Type<"uint32"> & tags.Maximum<6>;
        /**
         * Whether the most recent push must be approved by someone other than the person who pushed it.
        */
        require_last_push_approval?: boolean;
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
}
type IAutoViewTransformerInputType = Schema.protected_branch_pull_request_review;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper to render a boolean value as a colored icon (check or cross)
  const renderBooleanIcon = (value: boolean | undefined): IAutoView.IAutoViewIconProps => ({
    type: "Icon",
    id: value ? "check-circle" : "times-circle",
    color: value ? "green" : "red",
    size: 20,
  });

  // Helper to render counts of users/teams/apps as a ChipGroup
  const renderCountChips = (counts: { users: number; teams: number; apps: number; }): IAutoView.IAutoViewChipGroupProps => ({
    type: "ChipGroup",
    childrenProps: [
      { type: "Chip", label: `Users: ${counts.users}`, variant: "outlined", size: "small" },
      { type: "Chip", label: `Teams: ${counts.teams}`, variant: "outlined", size: "small" },
      { type: "Chip", label: `Apps: ${counts.apps}`, variant: "outlined", size: "small" },
    ],
  });

  // Build the list of DataListItemProps to display each field
  const items: IAutoView.IAutoViewDataListItemProps[] = [];

  // 1) URL (if provided)
  if (input.url) {
    items.push({
      type: "DataListItem",
      label: { type: "Text", content: "URL", variant: "body2", color: "primary" },
      value: {
        type: "Button",
        variant: "text",
        label: "View",
        href: input.url,
        color: "primary",
      },
    });
  }

  // 2) Boolean flags rendered as icons
  items.push({
    type: "DataListItem",
    label: { type: "Text", content: "Dismiss Stale Reviews", variant: "body2" },
    value: renderBooleanIcon(input.dismiss_stale_reviews),
  });
  items.push({
    type: "DataListItem",
    label: { type: "Text", content: "Require Code Owner Reviews", variant: "body2" },
    value: renderBooleanIcon(input.require_code_owner_reviews),
  });

  // 3) Numeric count (if set)
  if (input.required_approving_review_count !== undefined) {
    items.push({
      type: "DataListItem",
      label: { type: "Text", content: "Required Approving Review Count", variant: "body2" },
      value: {
        type: "Text",
        content: String(input.required_approving_review_count),
        variant: "body2",
      },
    });
  }

  // 4) Optional last-push-approval flag
  if (input.require_last_push_approval !== undefined) {
    items.push({
      type: "DataListItem",
      label: { type: "Text", content: "Require Last Push Approval", variant: "body2" },
      value: renderBooleanIcon(input.require_last_push_approval),
    });
  }

  // 5) Dismissal restrictions summary
  if (input.dismissal_restrictions) {
    const dr = input.dismissal_restrictions;
    items.push({
      type: "DataListItem",
      label: { type: "Text", content: "Dismissal Restrictions", variant: "body2" },
      value: renderCountChips({
        users: dr.users?.length ?? 0,
        teams: dr.teams?.length ?? 0,
        apps: dr.apps?.length ?? 0,
      }),
    });
  }

  // 6) Bypass pull request allowances summary
  if (input.bypass_pull_request_allowances) {
    const bp = input.bypass_pull_request_allowances;
    items.push({
      type: "DataListItem",
      label: { type: "Text", content: "Bypass PR Allowances", variant: "body2" },
      value: renderCountChips({
        users: bp.users?.length ?? 0,
        teams: bp.teams?.length ?? 0,
        apps: bp.apps?.length ?? 0,
      }),
    });
  }

  // Compose the DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items,
  };

  // Return a vertical card containing a header and the data list
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        title: "Protected Branch Pull Request Review",
        description: "",
        // Use a shield icon to represent protection
        startElement: {
          type: "Icon",
          id: "shield-alt",
          color: "blue",
          size: 24,
        },
      },
      {
        type: "CardContent",
        // Pass the DataList as the content of the card
        childrenProps: dataList,
      },
    ],
  };
}

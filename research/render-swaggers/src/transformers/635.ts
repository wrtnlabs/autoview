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
  // Utility to create a text component
  const makeText = (content: string): IAutoView.IAutoViewTextProps => ({
    type: "Text",
    content,
  });

  // Utility to create a chip for boolean flags
  const makeFlagChip = (flag: boolean, label: string): IAutoView.IAutoViewChipProps => ({
    type: "Chip",
    label,
    variant: "filled",
    color: flag ? "success" : "error",
  });

  // Build list of DataListItemProps for each setting
  const listItems: IAutoView.IAutoViewDataListItemProps[] = [];

  // 1. dismiss_stale_reviews
  listItems.push({
    type: "DataListItem",
    label: [makeText("Dismiss Stale Reviews")],
    value: makeFlagChip(input.dismiss_stale_reviews, input.dismiss_stale_reviews ? "Enabled" : "Disabled"),
  });

  // 2. require_code_owner_reviews
  listItems.push({
    type: "DataListItem",
    label: [makeText("Require Code Owner Reviews")],
    value: makeFlagChip(input.require_code_owner_reviews, input.require_code_owner_reviews ? "Enabled" : "Disabled"),
  });

  // 3. required_approving_review_count
  listItems.push({
    type: "DataListItem",
    label: [makeText("Required Approving Reviews")],
    value: {
      type: "Text",
      content: (input.required_approving_review_count != null)
        ? String(input.required_approving_review_count)
        : "None",
    },
  });

  // 4. require_last_push_approval (optional)
  if (input.require_last_push_approval !== undefined) {
    listItems.push({
      type: "DataListItem",
      label: [makeText("Last Push Approved by Others")],
      value: makeFlagChip(input.require_last_push_approval, input.require_last_push_approval ? "Yes" : "No"),
    });
  }

  // 5. dismissal_restrictions – show users, teams, apps counts via markdown
  if (input.dismissal_restrictions) {
    const dr = input.dismissal_restrictions;
    const usersCount = dr.users?.length ?? 0;
    const teamsCount = dr.teams?.length ?? 0;
    const appsCount = dr.apps?.length ?? 0;
    const mdLines = [
      `**Users:** ${usersCount}`,
      `**Teams:** ${teamsCount}`,
      `**Apps:** ${appsCount}`,
    ].join("  \n");
    listItems.push({
      type: "DataListItem",
      label: [makeText("Dismissal Restrictions")],
      value: {
        type: "Markdown",
        content: mdLines,
      },
    });
  }

  // 6. bypass_pull_request_allowances – show users, teams, apps counts via markdown
  if (input.bypass_pull_request_allowances) {
    const bp = input.bypass_pull_request_allowances;
    const usersCount = bp.users?.length ?? 0;
    const teamsCount = bp.teams?.length ?? 0;
    const appsCount = bp.apps?.length ?? 0;
    const mdLines = [
      `**Users:** ${usersCount}`,
      `**Teams:** ${teamsCount}`,
      `**Apps:** ${appsCount}`,
    ].join("  \n");
    listItems.push({
      type: "DataListItem",
      label: [makeText("Bypass PR Allowances")],
      value: {
        type: "Markdown",
        content: mdLines,
      },
    });
  }

  // Compose the DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: listItems,
  };

  // Compose the card header
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Protected Branch Review Settings",
    description: input.url ? input.url : undefined,
    startElement: {
      type: "Icon",
      id: "shield-alt", // using a shield icon for protection
      color: "blue",
      size: 20,
    },
  };

  // Compose the card content
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [dataList],
  };

  // Return a vertical card wrapping the header and content
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content],
  };

  return card;
}

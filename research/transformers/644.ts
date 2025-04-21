import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
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
type IAutoViewTransformerInputType = Schema.branch_restriction_policy;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // 1. Build avatar list for users
  const userAvatars: IAutoView.IAutoViewAvatarProps[] = input.users?.map(user => ({
    type: "Avatar",
    src: user.avatar_url,
    name: user.login,
    variant: "gray",
    size: 28,
  })) || [];

  // 2. Build chip list for teams
  const teamChips: IAutoView.IAutoViewChipProps[] = input.teams?.map(team => ({
    type: "Chip",
    label: team.name || "",
    variant: "outlined",
    color: "primary",
    size: "small",
  })) || [];

  // 3. Build chip list for apps
  const appChips: IAutoView.IAutoViewChipProps[] = input.apps?.map(app => ({
    type: "Chip",
    label: app.name || "",
    variant: "outlined",
    color: "secondary",
    size: "small",
  })) || [];

  // 4. Compose markdown for the policy URLs
  const urlsMarkdown = [
    `- Policy URL: [Open](${input.url})`,
    `- Users URL: [Open](${input.users_url})`,
    `- Teams URL: [Open](${input.teams_url})`,
    `- Apps URL: [Open](${input.apps_url})`,
  ].join("\n");

  // 5. Assemble the VerticalCard
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        // Header: title with a lock icon
        type: "CardHeader",
        title: "Branch Restriction Policy",
        startElement: {
          type: "Icon",
          id: "lock",
          color: "blue",
          size: 24,
        },
      },
      {
        // Content: a DataList summarizing users, teams, and apps
        type: "CardContent",
        childrenProps: [
          {
            type: "DataList",
            childrenProps: [
              {
                // Users: show avatar group
                type: "DataListItem",
                label: {
                  type: "Text",
                  content: "Users",
                  variant: "subtitle1",
                },
                value: {
                  type: "AvatarGroup",
                  childrenProps: userAvatars,
                  maxItems: 5,
                  totalItems: userAvatars.length,
                },
              },
              {
                // Teams: show team chips
                type: "DataListItem",
                label: {
                  type: "Text",
                  content: "Teams",
                  variant: "subtitle1",
                },
                value: {
                  type: "ChipGroup",
                  childrenProps: teamChips,
                  maxItems: 5,
                },
              },
              {
                // Apps: show app chips
                type: "DataListItem",
                label: {
                  type: "Text",
                  content: "Apps",
                  variant: "subtitle1",
                },
                value: {
                  type: "ChipGroup",
                  childrenProps: appChips,
                  maxItems: 5,
                },
              },
            ],
          },
        ],
      },
      {
        // Footer: markdown links to all relevant URLs
        type: "CardFooter",
        childrenProps: {
          type: "Markdown",
          content: urlsMarkdown,
        },
      },
    ],
  };
}

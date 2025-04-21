import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * The campaign metadata and alert stats.
     *
     * @title Campaign summary
    */
    export type campaign_summary = {
        /**
         * The number of the newly created campaign
        */
        number: number & tags.Type<"int32">;
        /**
         * The date and time the campaign was created, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
        */
        created_at: string;
        /**
         * The date and time the campaign was last updated, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
        */
        updated_at: string;
        /**
         * The campaign name
        */
        name?: string;
        /**
         * The campaign description
        */
        description: string;
        /**
         * The campaign managers
        */
        managers: Schema.simple_user[];
        /**
         * The campaign team managers
        */
        team_managers?: Schema.team[];
        /**
         * The date and time the campaign was published, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
        */
        published_at?: string;
        /**
         * The date and time the campaign has ended, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
        */
        ends_at: string;
        /**
         * The date and time the campaign was closed, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ. Will be null if the campaign is still open.
        */
        closed_at?: (string & tags.Format<"date-time">) | null;
        state: Schema.campaign_state;
        /**
         * The contact link of the campaign.
        */
        contact_link: (string & tags.Format<"uri">) | null;
        alert_stats?: {
            /**
             * The number of open alerts
            */
            open_count: number & tags.Type<"int32">;
            /**
             * The number of closed alerts
            */
            closed_count: number & tags.Type<"int32">;
            /**
             * The number of in-progress alerts
            */
            in_progress_count: number & tags.Type<"int32">;
        };
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
     * Indicates whether a campaign is open or closed
     *
     * @title Campaign state
    */
    export type campaign_state = "open" | "closed";
}
type IAutoViewTransformerInputType = Schema.campaign_summary;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



// Transforms Schema.campaign_summary into a rich AutoView component tree.
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Prepare a list of AvatarProps for each manager.
  const managerAvatars: IAutoView.IAutoViewAvatarProps[] = input.managers.map(user => ({
    type: "Avatar",
    src: user.avatar_url,
    name: user.login,
    size: 32,
  }));

  // Prepare a Chip for each team manager (if any).
  const teamChips: IAutoView.IAutoViewChipProps[] = input.team_managers
    ?.filter((t): t is NonNullable<typeof t> => t !== null)
    .map(team => ({
      type: "Chip",
      label: team.name,
      variant: "filled",
      size: "small",
    })) ?? [];

  // Prepare chips summarizing alert statistics.
  const alertChips: IAutoView.IAutoViewChipProps[] = input.alert_stats
    ? [
        {
          type: "Chip",
          label: `Open: ${input.alert_stats.open_count}`,
          color: "warning",
          size: "small",
        },
        {
          type: "Chip",
          label: `In Progress: ${input.alert_stats.in_progress_count}`,
          color: "info",
          size: "small",
        },
        {
          type: "Chip",
          label: `Closed: ${input.alert_stats.closed_count}`,
          color: "success",
          size: "small",
        },
      ]
    : [];

  // Build a DataList of campaign details.
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [];

  // 1) Campaign number
  dataListItems.push({
    type: "DataListItem",
    label: [{ type: "Text", content: "Campaign #", variant: "subtitle2" }],
    value: [{ type: "Text", content: input.number.toString(), variant: "body1" }],
  });

  // 2) Date fields (conditionally include published_at / closed_at)
  const dateFields: Array<{ label: string; value: string }> = [
    { label: "Created At", value: input.created_at },
    { label: "Updated At", value: input.updated_at },
    { label: "Ends At", value: input.ends_at },
  ];
  if (input.published_at) dateFields.push({ label: "Published At", value: input.published_at });
  if (input.closed_at) dateFields.push({ label: "Closed At", value: input.closed_at });

  dateFields.forEach(({ label, value }) => {
    // Format date string for readability
    const formatted = new Date(value).toLocaleString();
    dataListItems.push({
      type: "DataListItem",
      label: [{ type: "Text", content: label, variant: "subtitle2" }],
      value: [{ type: "Text", content: formatted, variant: "body2" }],
    });
  });

  // 3) State (open/closed) visualized as a colored chip
  dataListItems.push({
    type: "DataListItem",
    label: [{ type: "Text", content: "State", variant: "subtitle2" }],
    value: [
      {
        type: "Chip",
        label: input.state.charAt(0).toUpperCase() + input.state.slice(1),
        color: input.state === "open" ? "success" : "error",
        size: "small",
        variant: "filled",
      },
    ],
  });

  // 4) Contact link rendered as an inline button
  if (input.contact_link) {
    dataListItems.push({
      type: "DataListItem",
      label: [{ type: "Text", content: "Contact", variant: "subtitle2" }],
      value: [
        {
          type: "Button",
          label: "Open Link",
          href: input.contact_link,
          startElement: { type: "Icon", id: "external-link-alt", size: 16, color: "blue" },
        },
      ],
    });
  }

  // 5) Managers shown as an AvatarGroup
  dataListItems.push({
    type: "DataListItem",
    label: [{ type: "Text", content: "Managers", variant: "subtitle2" }],
    value: managerAvatars.length
      ? {
          type: "AvatarGroup",
          childrenProps: managerAvatars,
          maxItems: 5,
        }
      : [{ type: "Text", content: "None", variant: "body2" }],
  });

  // 6) Team managers (if any) in a ChipGroup
  if (teamChips.length) {
    dataListItems.push({
      type: "DataListItem",
      label: [{ type: "Text", content: "Team Managers", variant: "subtitle2" }],
      value: {
        type: "ChipGroup",
        childrenProps: teamChips,
        maxItems: 3,
      },
    });
  }

  // 7) Alert statistics chips
  if (alertChips.length) {
    dataListItems.push({
      type: "DataListItem",
      label: [{ type: "Text", content: "Alerts", variant: "subtitle2" }],
      value: {
        type: "ChipGroup",
        childrenProps: alertChips,
      },
    });
  }

  // Compose the full VerticalCard
  return {
    type: "VerticalCard",
    childrenProps: [
      // Header with icon, title, and description
      {
        type: "CardHeader",
        startElement: { type: "Icon", id: "bullhorn", size: 24, color: "blue" },
        title: input.name ?? `Campaign #${input.number}`,
        description: input.description,
      },
      // Main content: the DataList of details
      {
        type: "CardContent",
        childrenProps: [
          {
            type: "DataList",
            childrenProps: dataListItems,
          },
        ],
      },
      // Footer with a single Contact button (if link present)
      {
        type: "CardFooter",
        childrenProps: input.contact_link
          ? [
              {
                type: "Button",
                label: "Contact",
                href: input.contact_link,
                startElement: { type: "Icon", id: "envelope", size: 16, color: "blue" },
              },
            ]
          : [],
      },
    ],
  };
}

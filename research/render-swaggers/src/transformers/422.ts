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



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper to safely format ISO datetime strings to locale format
  const formatDateTime = (iso: string): string => {
    try {
      const d = new Date(iso);
      return d.toLocaleString();
    } catch {
      return iso;
    }
  };

  // Title fallback when name is missing
  const title = input.name ?? `Campaign #${input.number}`;

  // Map campaign state to a chip color
  const stateColor = input.state === "open" ? "success" : "gray";

  // Build the CardHeader with title, description, and a state chip
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title,
    description: input.description,
    endElement: {
      type: "Chip",
      label: input.state.charAt(0).toUpperCase() + input.state.slice(1),
      color: stateColor,
      variant: "outlined",
      size: "small",
    },
  };

  // Build an avatar group for campaign managers
  const managerAvatars: IAutoView.IAutoViewAvatarProps[] = input.managers.map((mgr) => ({
    type: "Avatar",
    src: mgr.avatar_url,
    name: mgr.login,
    size: 24,
    variant: "primary",
  }));
  const managersGroup: IAutoView.IAutoViewAvatarGroupProps = {
    type: "AvatarGroup",
    childrenProps: managerAvatars,
    maxItems: 4,
    totalItems: input.managers.length,
  };

  // Create DataListItems for key campaign metadata
  const listItems: IAutoView.IAutoViewDataListItemProps[] = [];

  // Created At
  listItems.push({
    type: "DataListItem",
    label: [
      { type: "Icon", id: "calendar", size: 16, color: "gray" },
      { type: "Text", content: ["Created"], variant: "body2" }
    ],
    value: { type: "Text", content: [formatDateTime(input.created_at)], variant: "body2" }
  });

  // Updated At
  listItems.push({
    type: "DataListItem",
    label: [
      { type: "Icon", id: "sync-alt", size: 16, color: "gray" },
      { type: "Text", content: ["Updated"], variant: "body2" }
    ],
    value: { type: "Text", content: [formatDateTime(input.updated_at)], variant: "body2" }
  });

  // Published At (if available)
  if (input.published_at) {
    listItems.push({
      type: "DataListItem",
      label: [
        { type: "Icon", id: "upload", size: 16, color: "gray" },
        { type: "Text", content: ["Published"], variant: "body2" }
      ],
      value: { type: "Text", content: [formatDateTime(input.published_at)], variant: "body2" }
    });
  }

  // Ends At
  listItems.push({
    type: "DataListItem",
    label: [
      { type: "Icon", id: "hourglass-end", size: 16, color: "gray" },
      { type: "Text", content: ["Ends"], variant: "body2" }
    ],
    value: { type: "Text", content: [formatDateTime(input.ends_at)], variant: "body2" }
  });

  // Closed At (if campaign is closed)
  if (input.closed_at) {
    listItems.push({
      type: "DataListItem",
      label: [
        { type: "Icon", id: "times-circle", size: 16, color: "gray" },
        { type: "Text", content: ["Closed"], variant: "body2" }
      ],
      value: { type: "Text", content: [formatDateTime(input.closed_at)], variant: "body2" }
    });
  }

  // Contact Link (if provided)
  if (input.contact_link) {
    listItems.push({
      type: "DataListItem",
      label: [
        { type: "Icon", id: "link", size: 16, color: "gray" },
        { type: "Text", content: ["Contact"], variant: "body2" }
      ],
      value: {
        type: "Markdown",
        content: `[Open Contact](${input.contact_link})`
      }
    });
  }

  // Managers (avatar group)
  listItems.push({
    type: "DataListItem",
    label: { type: "Text", content: ["Managers"], variant: "body2" },
    value: managersGroup
  });

  // Optionally show team managers count
  if (input.team_managers && input.team_managers.length > 0) {
    listItems.push({
      type: "DataListItem",
      label: { type: "Text", content: ["Team Managers"], variant: "body2" },
      value: {
        type: "Text",
        content: [`${input.team_managers.length} teams`],
        variant: "body2"
      }
    });
  }

  // Assemble DataList
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: listItems
  };

  // Assemble CardContent
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [dataList]
  };

  // Build footer chips for alert stats, if available
  let footer: IAutoView.IAutoViewCardFooterProps | undefined;
  if (input.alert_stats) {
    const stats = input.alert_stats;
    const chips: IAutoView.IAutoViewChipProps[] = [
      { type: "Chip", label: `${stats.open_count} Open`, color: "error", size: "small", variant: "filled" },
      { type: "Chip", label: `${stats.in_progress_count} In-Progress`, color: "warning", size: "small", variant: "filled" },
      { type: "Chip", label: `${stats.closed_count} Closed`, color: "success", size: "small", variant: "filled" },
    ];
    const chipGroup: IAutoView.IAutoViewChipGroupProps = {
      type: "ChipGroup",
      childrenProps: chips,
      maxItems: 3
    };
    footer = {
      type: "CardFooter",
      childrenProps: chipGroup
    };
  }

  // Compose the vertical card and return
  const cardChildren = footer
    ? [header, content, footer]
    : [header, content];

  return {
    type: "VerticalCard",
    childrenProps: cardChildren
  };
}

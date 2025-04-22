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



// Transforms a campaign summary into a visual AutoView component.
// We build a VerticalCard containing a header (with title, state badge),
// content (timeline, managers, teams, contact button) and footer (alert stats).
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper: format ISO timestamps into human-readable strings.
  const formatDate = (iso: string): string => {
    try {
      return new Date(iso).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return iso;
    }
  };

  // Build the card header: icon + campaign name + state badge.
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    // Use provided name or fallback to the campaign number.
    title: input.name ?? `Campaign #${input.number}`,
    description: input.description,
    startElement: {
      type: "Icon",
      id: "bullhorn",
      size: 24,
      color: "blue",
    },
    endElement: {
      type: "Chip",
      label: input.state.toUpperCase(),
      color: input.state === "open" ? "success" : "error",
      size: "small",
      variant: "filled",
    },
  };

  // Prepare a Markdown timeline with all relevant dates.
  const timelineLines: string[] = [
    `- **Created:** ${formatDate(input.created_at)}`,
    `- **Updated:** ${formatDate(input.updated_at)}`,
  ];
  if (input.published_at) {
    timelineLines.push(`- **Published:** ${formatDate(input.published_at)}`);
  }
  timelineLines.push(`- **Ends:** ${formatDate(input.ends_at)}`);
  if (input.closed_at) {
    // closed_at may be null or string; guard null
    timelineLines.push(`- **Closed:** ${formatDate(input.closed_at)}`);
  }
  const timelineMarkdown: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    content: ["### 🗓️ Timeline", "", ...timelineLines].join("\n"),
  };

  // Build an avatar for each manager.
  const managerAvatars: IAutoView.IAutoViewAvatarProps[] = input.managers.map((mgr) => ({
    type: "Avatar",
    src: mgr.avatar_url,
    name: mgr.name ?? mgr.login,
    size: 32,
    variant: "info",
  }));
  const managersGroup: IAutoView.IAutoViewAvatarGroupProps = {
    type: "AvatarGroup",
    childrenProps: managerAvatars,
    maxItems: managerAvatars.length,
  };

  // Build chips for each team manager, if any.
  const teamChips: IAutoView.IAutoViewChipProps[] = [];
  if (input.team_managers && input.team_managers.length > 0) {
    for (const team of input.team_managers) {
      teamChips.push({
        type: "Chip",
        label: team.name,
        variant: "outlined",
        color: "secondary",
        size: "small",
      });
    }
  }

  // Contact button, if a link is provided.
  const contactButton = input.contact_link
    ? {
        type: "Button",
        variant: "text",
        color: "primary",
        href: input.contact_link,
        label: "Contact",
        startElement: {
          type: "Icon",
          id: "envelope",
          size: 16,
        },
      } as IAutoView.IAutoViewButtonProps
    : undefined;

  // Build alert statistics chips, if provided.
  const alertChips: IAutoView.IAutoViewChipProps[] = [];
  if (input.alert_stats) {
    alertChips.push({
      type: "Chip",
      label: `Open: ${input.alert_stats.open_count}`,
      color: "warning",
      size: "small",
      variant: "outlined",
    });
    alertChips.push({
      type: "Chip",
      label: `In Progress: ${input.alert_stats.in_progress_count}`,
      color: "info",
      size: "small",
      variant: "outlined",
    });
    alertChips.push({
      type: "Chip",
      label: `Closed: ${input.alert_stats.closed_count}`,
      color: "success",
      size: "small",
      variant: "outlined",
    });
  }

  // Assemble the CardContent section.
  const contentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [
    timelineMarkdown,
    managersGroup,
  ];
  if (teamChips.length > 0) {
    contentChildren.push({
      type: "ChipGroup",
      childrenProps: teamChips,
      maxItems: teamChips.length,
    } as IAutoView.IAutoViewChipGroupProps);
  }
  if (contactButton) {
    contentChildren.push(contactButton);
  }
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: contentChildren,
  };

  // Assemble the CardFooter section with alert stats.
  const footerChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];
  if (alertChips.length > 0) {
    footerChildren.push({
      type: "ChipGroup",
      childrenProps: alertChips,
      maxItems: alertChips.length,
    } as IAutoView.IAutoViewChipGroupProps);
  }
  const cardFooter: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: footerChildren,
  };

  // Return the full VerticalCard structure.
  return {
    type: "VerticalCard",
    childrenProps: [header, cardContent, cardFooter],
  } as IAutoView.IAutoViewVerticalCardProps;
}

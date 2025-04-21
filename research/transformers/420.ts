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
type IAutoViewTransformerInputType = Schema.campaign_summary[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Transform each campaign summary into a DataListItem with rich visual elements
    const items: IAutoView.IAutoViewDataListItemProps[] = input.map((campaign) => {
        // 1. Prepare manager avatars for the AvatarGroup
        const managerAvatars: IAutoView.IAutoViewAvatarProps[] = campaign.managers.map((mgr) => ({
            type: "Avatar",
            src: mgr.avatar_url,
            name: mgr.login,
            size: 24,
            variant: "primary",
        }));

        // 2. Safely extract alert stats or default to zeros
        const stats = campaign.alert_stats ?? {
            open_count: 0,
            in_progress_count: 0,
            closed_count: 0,
        };

        // 3. Build a ChipGroup to display open/in-progress/closed counts
        const statsChips: IAutoView.IAutoViewChipProps[] = [
            {
                type: "Chip",
                label: `Open: ${stats.open_count}`,
                color: "info",
                size: "small",
                variant: "outlined",
            },
            {
                type: "Chip",
                label: `In Progress: ${stats.in_progress_count}`,
                color: "warning",
                size: "small",
                variant: "outlined",
            },
            {
                type: "Chip",
                label: `Closed: ${stats.closed_count}`,
                color: "success",
                size: "small",
                variant: "outlined",
            },
        ];

        // 4. Prepare the label: campaign title and manager avatars
        const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
            {
                type: "Text",
                content: `#${campaign.number} ${campaign.name ?? "Unnamed Campaign"}`,
                variant: "h6",
                color: "primary",
            },
            {
                type: "AvatarGroup",
                // Show up to 3 avatars, rest can be seen via totalItems
                childrenProps: managerAvatars,
                maxItems: 3,
                totalItems: managerAvatars.length,
            },
        ];

        // 5. Prepare the value: description, stats, and key dates as markdown
        const valueComponents: IAutoView.IAutoViewPresentationComponentProps[] = [];

        // Description in Markdown for better readability
        if (campaign.description) {
            valueComponents.push({
                type: "Markdown",
                content: campaign.description,
            });
        }

        // Stats ChipGroup for visual alert counts
        valueComponents.push({
            type: "ChipGroup",
            childrenProps: statsChips,
            maxItems: statsChips.length,
        });

        // Show creation, end, and optional close dates
        const datesLines = [
            `- **Created:** ${campaign.created_at}`,
            `- **Ends:** ${campaign.ends_at}`,
            campaign.closed_at != null ? `- **Closed:** ${campaign.closed_at}` : null,
        ].filter((line): line is string => Boolean(line));

        valueComponents.push({
            type: "Markdown",
            content: datesLines.join("\n"),
        });

        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponents,
        };
    });

    // Wrap all items in a DataList for responsive display
    return {
        type: "DataList",
        childrenProps: items,
    };
}

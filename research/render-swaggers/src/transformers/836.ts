import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Pull Request Review Request
     *
     * @title Pull Request Review Request
    */
    export type pull_request_review_request = {
        users: Schema.simple_user[];
        teams: Schema.team[];
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
}
type IAutoViewTransformerInputType = Schema.pull_request_review_request;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    const { users, teams } = input;

    // Transform GitHub users into avatar props
    const userAvatars: IAutoView.IAutoViewAvatarProps[] = users.map((user) => ({
        type: "Avatar",
        src: user.avatar_url,
        name: user.login,
        variant: "primary",
        size: 40,
    }));

    // Transform GitHub teams into chip props
    const teamChips: IAutoView.IAutoViewChipProps[] = teams.map((team) => ({
        type: "Chip",
        label: team.name,
        variant: "filled",
        color: "secondary",
        size: "medium",
    }));

    // If there are reviewers, show an avatar group; otherwise fallback to a text note
    const userReviewersComponent:
        | IAutoView.IAutoViewAvatarGroupProps
        | IAutoView.IAutoViewTextProps = users.length
        ? {
              type: "AvatarGroup",
              childrenProps: userAvatars,
              // show up to 5 avatars and indicate the total number if larger
              maxItems: 5,
              totalItems: users.length,
          }
        : {
              type: "Text",
              content: "No individual review requests",
              variant: "body2",
          };

    // If there are team reviewers, show a chip group; otherwise fallback to a text note
    const teamReviewersComponent:
        | IAutoView.IAutoViewChipGroupProps
        | IAutoView.IAutoViewTextProps = teams.length
        ? {
              type: "ChipGroup",
              childrenProps: teamChips,
              // limit visible chips on small screens
              maxItems: 5,
          }
        : {
              type: "Text",
              content: "No team review requests",
              variant: "body2",
          };

    // Build list items for users and teams
    const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [
        {
            type: "DataListItem",
            // Use a subtitle2 text for the label
            label: [
                {
                    type: "Text",
                    content: "Users",
                    variant: "subtitle2",
                },
            ],
            value: userReviewersComponent,
        },
        {
            type: "DataListItem",
            label: [
                {
                    type: "Text",
                    content: "Teams",
                    variant: "subtitle2",
                },
            ],
            value: teamReviewersComponent,
        },
    ];

    // Wrap the items in a DataList
    const dataList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: dataListItems,
    };

    // Compose a vertical card with a header and content
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: "Pull Request Review Requests",
                // Use an icon to visually indicate reviewers
                startElement: {
                    type: "Icon",
                    id: "user-group", // FontAwesome icon name
                    size: 24,
                    color: "blue",
                },
            },
            {
                type: "CardContent",
                // Pass the DataList directly; AutoView will render it responsively
                childrenProps: dataList,
            },
        ],
    };
}

import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A team discussion is a persistent record of a free-form conversation within a team.
     *
     * @title Team Discussion
    */
    export type team_discussion = {
        author: Schema.nullable_simple_user;
        /**
         * The main text of the discussion.
        */
        body: string;
        body_html: string;
        /**
         * The current version of the body content. If provided, this update operation will be rejected if the given version does not match the latest version on the server.
        */
        body_version: string;
        comments_count: number & tags.Type<"int32">;
        comments_url: string & tags.Format<"uri">;
        created_at: string & tags.Format<"date-time">;
        last_edited_at: (string & tags.Format<"date-time">) | null;
        html_url: string & tags.Format<"uri">;
        node_id: string;
        /**
         * The unique sequence number of a team discussion.
        */
        number: number & tags.Type<"int32">;
        /**
         * Whether or not this discussion should be pinned for easy retrieval.
        */
        pinned: boolean;
        /**
         * Whether or not this discussion should be restricted to team members and organization owners.
        */
        "private": boolean;
        team_url: string & tags.Format<"uri">;
        /**
         * The title of the discussion.
        */
        title: string;
        updated_at: string & tags.Format<"date-time">;
        url: string & tags.Format<"uri">;
        reactions?: Schema.reaction_rollup;
    };
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
    /**
     * @title Reaction Rollup
    */
    export type reaction_rollup = {
        url: string & tags.Format<"uri">;
        total_count: number & tags.Type<"int32">;
        "+1": number & tags.Type<"int32">;
        "-1": number & tags.Type<"int32">;
        laugh: number & tags.Type<"int32">;
        confused: number & tags.Type<"int32">;
        heart: number & tags.Type<"int32">;
        hooray: number & tags.Type<"int32">;
        eyes: number & tags.Type<"int32">;
        rocket: number & tags.Type<"int32">;
    };
}
type IAutoViewTransformerInputType = Schema.team_discussion[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // If there's no data, show a friendly message
    if (!input || input.length === 0) {
        return {
            type: "Text",
            content: "No discussions available.",
            variant: "body1",
            color: "gray",
        };
    }

    // Build a list of DataListItemProps for each discussion
    const childrenProps: IAutoView.IAutoViewDataListItemProps[] = input.map((discussion) => {
        // Determine avatar or fallback icon if no author
        const authorAvatar: IAutoView.IAutoViewAvatarProps | IAutoView.IAutoViewIconProps = discussion.author
            ? {
                  type: "Avatar",
                  src: discussion.author.avatar_url,
                  name: discussion.author.login,
                  variant: "info",
                  size: 32,
              }
            : {
                  type: "Icon",
                  id: "user",
                  color: "gray",
                  size: 32,
              };

        // Format creation date into a human-friendly string
        const createdAt = new Date(discussion.created_at);
        const dateString = createdAt.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
        });

        // Generate a short preview of the discussion body
        const raw = discussion.body || "";
        const preview = raw.length > 140 ? raw.slice(0, 140).trim() + "…" : raw;

        // If reactions are present, show a chip with a heart icon
        const reactionChip: IAutoView.IAutoViewChipProps | null =
            discussion.reactions != null
                ? {
                      type: "Chip",
                      label: String(discussion.reactions.total_count),
                      variant: "outlined",
                      color: "pink",
                      size: "small",
                      startElement: {
                          type: "Icon",
                          id: "heart",
                          color: "pink",
                          size: 16,
                      },
                  }
                : null;

        // Assemble the label area: avatar + title + date
        const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
            authorAvatar,
            {
                type: "Text",
                content: discussion.title,
                variant: "h6",
                color: "primary",
                lineClamp: 1, // prevent overflow
            },
            {
                type: "Text",
                content: dateString,
                variant: "caption",
                color: "gray",
            },
        ];

        // Assemble the value area: body preview + optional reactions chip
        const valueComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
            {
                type: "Text",
                content: preview,
                variant: "body2",
                lineClamp: 3, // clamp long text
            },
        ];
        if (reactionChip) {
            valueComponents.push(reactionChip);
        }

        // Return the DataListItemProps for this discussion
        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponents,
        };
    });

    // Wrap all items in a DataList for responsive display
    return {
        type: "DataList",
        childrenProps: childrenProps,
    };
}

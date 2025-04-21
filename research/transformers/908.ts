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
type IAutoViewTransformerInputType = Schema.team_discussion;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Header: show title, issue number, creation date and author avatar
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.title,
    // Format the description to include number, date, and author login
    description: `#${input.number} opened on ${new Date(input.created_at).toLocaleDateString()} by ${input.author?.login ?? "Unknown"}`,
    // If author is available, show their avatar
    startElement: input.author
      ? {
          type: "Avatar",
          src: input.author.avatar_url,
          name: input.author.login,
          variant: "primary",
          size: 40,
        }
      : undefined,
  };

  // Content: render the markdown body for better readability
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "Markdown",
      content: input.body,
    },
  };

  // Footer: display reaction counts as badges and a button linking to GitHub
  const footerChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];

  if (input.reactions) {
    // Map certain reactions to FontAwesome icon IDs
    const mapping: Record<string, { icon: string; count: number }> = {
      "+1": { icon: "thumbs-up", count: input.reactions["+1"] },
      "-1": { icon: "thumbs-down", count: input.reactions["-1"] },
      heart: { icon: "heart", count: input.reactions.heart },
      rocket: { icon: "rocket", count: input.reactions.rocket },
    };

    for (const key of Object.keys(mapping)) {
      const { icon, count } = mapping[key];
      if (count > 0) {
        footerChildren.push({
          type: "Badge",
          count,
          maxCount: 99,
          showZero: false,
          childrenProps: {
            type: "Icon",
            id: icon,
            size: 16,
            color: "gray",
          },
        });
      }
    }
  }

  // Button to navigate to the full discussion on GitHub
  footerChildren.push({
    type: "Button",
    label: "View on GitHub",
    href: input.html_url,
    variant: "contained",
    color: "primary",
    size: "small",
  });

  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: footerChildren,
  };

  // Compose the vertical card with header, content, and footer
  return {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };
}

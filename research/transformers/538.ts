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



// Transforms a GitHub team discussion into a visual AutoView card.
// Displays author avatar, title, creation date, body as markdown,
// and a data list of comments and reaction counts.
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Extract author info (might be null)
  const author = input.author;
  // Build an avatar component for the author
  const authorAvatar: IAutoView.IAutoViewAvatarProps = {
    type: "Avatar",
    src: author?.avatar_url ?? "",     // fallback to empty URI if missing
    name: author?.login ?? "Unknown",  // fallback name
    size: 40,                          // medium avatar size
    variant: "gray",                   // neutral color
  };

  // Format creation date as locale string
  const createdDate = new Date(input.created_at).toLocaleDateString();
  // Include privacy flag in description if discussion is private
  const descriptionText = `by ${author?.login ?? "Unknown"} on ${createdDate}` +
    (input.private ? " (Private)" : "");

  // Card header with avatar, title, and description
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    startElement: authorAvatar,
    title: input.title,
    description: descriptionText,
  };

  // Main body rendered as markdown for rich text display
  const bodyMarkdown: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    content: input.body,
  };
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [bodyMarkdown],
  };

  // Build a list of stats: comments + reactions
  const items: IAutoView.IAutoViewDataListItemProps[] = [];

  // 1) Comments count entry
  items.push({
    type: "DataListItem",
    label: [{
      type: "Text",
      content: ["Comments"],
      variant: "subtitle2",
      color: "gray",
    }],
    value: [{
      type: "Text",
      content: [String(input.comments_count)],
      variant: "subtitle2",
      color: "gray",
    }],
  });

  // 2) Reaction rollup entries (only include non-zero reactions)
  if (input.reactions) {
    const reactions = input.reactions;
    // Map reaction keys to FontAwesome icon IDs
    const reactionMap: Array<[keyof typeof reactions, string]> = [
      ["+1", "thumbs-up"],
      ["-1", "thumbs-down"],
      ["laugh", "laugh"],
      ["confused", "meh"],
      ["heart", "heart"],
      ["hooray", "tada"],
      ["eyes", "eye"],
      ["rocket", "rocket"],
    ];
    reactionMap.forEach(([key, iconId]) => {
      const count = reactions[key] as number;
      if (count > 0) {
        items.push({
          type: "DataListItem",
          // Use an icon to represent the reaction type
          label: [{
            type: "Icon",
            id: iconId,
            color: "gray",
            size: 16,
          }],
          // Show the count as text
          value: [{
            type: "Text",
            content: [String(count)],
            variant: "body2",
            color: "gray",
          }],
        });
      }
    });
  }

  // Wrap stats entries in a data list component
  const statsList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items,
  };

  // Footer of the card containing the stats list
  const cardFooter: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: [statsList],
  };

  // Compose a vertical card: header, body, footer
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent, cardFooter],
  };

  return card;
}

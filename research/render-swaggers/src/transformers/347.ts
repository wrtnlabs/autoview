import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A comment made to a gist.
     *
     * @title Gist Comment
    */
    export type gist_comment = {
        id: number & tags.Type<"int32">;
        node_id: string;
        url: string & tags.Format<"uri">;
        /**
         * The comment text.
        */
        body: string;
        user: Schema.nullable_simple_user;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        author_association: Schema.author_association;
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
     * How the author is associated with the repository.
     *
     * @title author_association
    */
    export type author_association = "COLLABORATOR" | "CONTRIBUTOR" | "FIRST_TIMER" | "FIRST_TIME_CONTRIBUTOR" | "MANNEQUIN" | "MEMBER" | "NONE" | "OWNER";
}
type IAutoViewTransformerInputType = Schema.gist_comment[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



// Transforms an array of GitHub gist comments into an AutoView DataList.
// Each comment becomes a DataListItem displaying the user's avatar (or a fallback icon),
// the username, the comment body in Markdown, and the creation date.
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If no comments, show a placeholder markdown message.
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "_No comments available._",
    };
  }

  // Map each comment to a DataListItemProps
  const items: IAutoView.IAutoViewDataListItemProps[] = input.map((comment) => {
    const user = comment.user;

    // Choose avatar or generic user icon if user data is missing
    const identityComponent: IAutoView.IAutoViewAvatarProps | IAutoView.IAutoViewIconProps = user
      ? {
          type: "Avatar",
          src: user.avatar_url,
          name: user.login,
          variant: "primary",
          size: 40,
        }
      : {
          type: "Icon",
          id: "user-circle",      // generic user icon from FontAwesome
          color: "gray",
          size: 40,
        };

    // Username for display
    const userName = user ? user.login : "Unknown";

    // Compose label: avatar/icon next to the username text
    const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
      identityComponent,
      {
        type: "Text",
        content: userName,
        variant: "body1",
        color: "secondary",
      },
    ];

    // Format creation date for display
    const createdAt = new Date(comment.created_at).toLocaleString();

    // Compose value: comment body as Markdown, then date as caption text
    const valueComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
      {
        type: "Markdown",
        content: comment.body,
      },
      {
        type: "Text",
        content: createdAt,
        variant: "caption",
        color: "gray",
      },
    ];

    return {
      type: "DataListItem",
      label: labelComponents,
      value: valueComponents,
    };
  });

  // Wrap all items in a DataList component for responsive rendering
  return {
    type: "DataList",
    childrenProps: items,
  };
}

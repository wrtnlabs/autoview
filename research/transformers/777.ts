import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Comments provide a way for people to collaborate on an issue.
     *
     * @title Issue Comment
    */
    export type issue_comment = {
        /**
         * Unique identifier of the issue comment
        */
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * URL for the issue comment
        */
        url: string;
        /**
         * Contents of the issue comment
        */
        body?: string;
        body_text?: string;
        body_html?: string;
        html_url: string & tags.Format<"uri">;
        user: Schema.nullable_simple_user;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        issue_url: string & tags.Format<"uri">;
        author_association: Schema.author_association;
        performed_via_github_app?: Schema.nullable_integration;
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
     * How the author is associated with the repository.
     *
     * @title author_association
    */
    export type author_association = "COLLABORATOR" | "CONTRIBUTOR" | "FIRST_TIMER" | "FIRST_TIME_CONTRIBUTOR" | "MANNEQUIN" | "MEMBER" | "NONE" | "OWNER";
    /**
     * GitHub apps are a new way to extend GitHub. They can be installed directly on organizations and user accounts and granted access to specific repositories. They come with granular permissions and built-in webhooks. GitHub apps are first class actors within GitHub.
     *
     * @title GitHub app
    */
    export type nullable_integration = {
        /**
         * Unique identifier of the GitHub app
        */
        id: number & tags.Type<"int32">;
        /**
         * The slug name of the GitHub app
        */
        slug?: string;
        node_id: string;
        client_id?: string;
        owner: any | any;
        /**
         * The name of the GitHub app
        */
        name: string;
        description: string | null;
        external_url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        /**
         * The set of permissions for the GitHub app
        */
        permissions: {
            [key: string]: string;
        };
        /**
         * The list of events for the GitHub app
        */
        events: string[];
        /**
         * The number of installations associated with the GitHub app
        */
        installations_count?: number & tags.Type<"int32">;
        client_secret?: string;
        webhook_secret?: string | null;
        pem?: string;
    } | null;
    export type simple_user = any;
    export type enterprise = any;
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
type IAutoViewTransformerInputType = Schema.issue_comment;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // 1. Build the avatar or fallback icon for the comment author
  const authorElement: IAutoView.IAutoViewAvatarProps | IAutoView.IAutoViewIconProps = input.user && input.user.avatar_url
    ? {
        type: "Avatar",
        src: input.user.avatar_url,
        name: input.user.login,
        variant: "primary",
        size: 40,
      }
    : {
        type: "Icon",
        id: "user",
        color: "gray",
        size: 40,
      };

  // 2. Build a chip for the author's association if available
  const associationChip: IAutoView.IAutoViewChipProps | undefined = input.author_association
    ? {
        type: "Chip",
        label: input.author_association,
        variant: "outlined",
        size: "small",
        color: "primary",
      }
    : undefined;

  // 3. Format the creation date for display
  const createdAtStr = (() => {
    try {
      return new Date(input.created_at).toLocaleString();
    } catch {
      return input.created_at; // fallback to raw string
    }
  })();

  // 4. Build reaction chips if reactions are provided
  const reactionChips: IAutoView.IAutoViewChipProps[] = [];
  if (input.reactions) {
    // Map each known reaction to a FontAwesome icon and a color
    const mapping: Array<[keyof typeof input.reactions, string, string]> = [
      ["+1", "thumbs-up", "green"],
      ["-1", "thumbs-down", "red"],
      ["laugh", "laugh", "primary"],
      ["confused", "confused", "primary"],
      ["heart", "heart", "primary"],
      ["hooray", "tada", "primary"],    // use "tada" for hooray
      ["eyes", "eye", "primary"],       // singular "eye"
      ["rocket", "rocket", "primary"],
    ];
    for (const [key, iconId, color] of mapping) {
      const count = (input.reactions as any)[key] as number;
      if (typeof count === "number" && count > 0) {
        reactionChips.push({
          type: "Chip",
          label: String(count),
          size: "small",
          variant: "outlined",
          color: color as any,
          startElement: {
            type: "Icon",
            id: iconId,
            size: 16,
            color: color as any,
          },
        });
      }
    }
  }

  // 5. Build a Button linking to the GitHub comment page
  const viewButton: IAutoView.IAutoViewButtonProps = {
    type: "Button",
    label: "View on GitHub",
    variant: "text",
    color: "primary",
    size: "small",
    startElement: {
      type: "Icon",
      id: "github",
      size: 16,
      color: "gray",
    },
    href: input.html_url,
  };

  // 6. Assemble children for the CardFooter
  const footerChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];
  if (reactionChips.length > 0) {
    footerChildren.push({
      type: "ChipGroup",
      childrenProps: reactionChips,
      maxItems: reactionChips.length,
    });
  }
  footerChildren.push(viewButton);

  // 7. Build the main Markdown or fallback Text for the comment body
  const bodyContent: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    content: input.body || input.body_text || "*No content*",
  };

  // 8. Compose the VerticalCard with header, content, and footer
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        title: input.user?.login || "Unknown",
        description: createdAtStr,
        startElement: authorElement,
        // only add the association chip if we have one
        ...(associationChip ? { endElement: associationChip } : {}),
      },
      {
        type: "CardContent",
        childrenProps: bodyContent,
      },
      {
        type: "CardFooter",
        childrenProps: footerChildren.length === 1 ? footerChildren[0] : footerChildren,
      },
    ],
  };

  return card;
}

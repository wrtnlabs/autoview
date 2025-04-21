import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Base Gist
     *
     * @title Base Gist
    */
    export type base_gist = {
        url: string & tags.Format<"uri">;
        forks_url: string & tags.Format<"uri">;
        commits_url: string & tags.Format<"uri">;
        id: string;
        node_id: string;
        git_pull_url: string & tags.Format<"uri">;
        git_push_url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        files: {
            [key: string]: {
                filename?: string;
                type?: string;
                language?: string;
                raw_url?: string;
                size?: number & tags.Type<"int32">;
                /**
                 * The encoding used for `content`. Currently, `"utf-8"` and `"base64"` are supported.
                */
                encoding?: string & tags.Default<"utf-8">;
            };
        };
        "public": boolean;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        description: string | null;
        comments: number & tags.Type<"int32">;
        comments_enabled?: boolean;
        user: Schema.nullable_simple_user;
        comments_url: string & tags.Format<"uri">;
        owner?: Schema.simple_user;
        truncated?: boolean;
        forks?: any[];
        history?: any[];
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
}
type IAutoViewTransformerInputType = Schema.base_gist[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Map each gist into a DataListItem composed of visual elements.
  const items: IAutoView.IAutoViewDataListItemProps[] = input.map((gist) => {
    // Safely extract owner information; it may be null.
    const owner = gist.user;
    
    // Build an Avatar component for the owner if available.
    const avatar: IAutoView.IAutoViewAvatarProps | undefined = owner
      ? {
          type: "Avatar",
          src: owner.avatar_url,
          name: owner.login,
          size: 32,
          variant: "primary",
        }
      : undefined;

    // Build a Text component for the owner name.
    const ownerName: IAutoView.IAutoViewTextProps | undefined = owner
      ? {
          type: "Text",
          variant: "body1",
          content: owner.login,
        }
      : undefined;

    // Build a Chip to show the comment count with an icon.
    const commentChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: String(gist.comments),
      color: "gray",
      variant: "outlined",
      startElement: {
        type: "Icon",
        id: "comment",
        color: "gray",
        size: 12,
      },
      size: "small",
    };

    // Build a Chip to show the fork count with an icon.
    const forkChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: gist.forks && Array.isArray(gist.forks) ? String(gist.forks.length) : "0",
      color: "gray",
      variant: "outlined",
      startElement: {
        type: "Icon",
        id: "code-branch",
        color: "gray",
        size: 12,
      },
      size: "small",
    };

    // Build a Tooltip + Icon to show last-updated date on hover.
    const updatedTooltip: IAutoView.IAutoViewTooltipProps = {
      type: "Tooltip",
      message: `Updated: ${new Date(gist.updated_at).toLocaleString()}`,
      childrenProps: {
        type: "Icon",
        id: "calendar",
        color: "gray",
        size: 16,
      },
    };

    // Build a Button to navigate to the gist page.
    const viewButton: IAutoView.IAutoViewButtonProps = {
      type: "Button",
      label: "View",
      variant: "outlined",
      size: "small",
      color: "primary",
      href: gist.html_url,
    };

    // Build an array of "value" components: chips, tooltip, and view button
    const valueComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
      commentChip,
      forkChip,
      updatedTooltip,
      viewButton,
    ];

    // Build the "label" area: avatar + owner name + optional description in markdown.
    // If description exists, include it as Markdown to allow rich formatting.
    const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [];
    if (avatar) labelComponents.push(avatar);
    if (ownerName) labelComponents.push(ownerName);
    if (gist.description) {
      labelComponents.push({
        type: "Markdown",
        content: gist.description.startsWith("#") 
          ? gist.description 
          : `**${gist.description}**`,
      });
    }

    return {
      type: "DataListItem",
      // Use the composed visual label and values.
      label: labelComponents.length === 1 ? labelComponents[0] : labelComponents,
      value: valueComponents.length === 1 ? valueComponents[0] : valueComponents,
    };
  });

  // Wrap all items in a DataList for vertical, responsive layout.
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items,
  };

  return dataList;
}

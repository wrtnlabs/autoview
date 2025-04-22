import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A release.
     *
     * @title Release
    */
    export type release = {
        url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        assets_url: string & tags.Format<"uri">;
        upload_url: string;
        tarball_url: (string & tags.Format<"uri">) | null;
        zipball_url: (string & tags.Format<"uri">) | null;
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * The name of the tag.
        */
        tag_name: string;
        /**
         * Specifies the commitish value that determines where the Git tag is created from.
        */
        target_commitish: string;
        name: string | null;
        body?: string | null;
        /**
         * true to create a draft (unpublished) release, false to create a published one.
        */
        draft: boolean;
        /**
         * Whether to identify the release as a prerelease or a full release.
        */
        prerelease: boolean;
        created_at: string & tags.Format<"date-time">;
        published_at: (string & tags.Format<"date-time">) | null;
        author: Schema.simple_user;
        assets: Schema.release_asset[];
        body_html?: string;
        body_text?: string;
        mentions_count?: number & tags.Type<"int32">;
        /**
         * The URL of the release discussion.
        */
        discussion_url?: string;
        reactions?: Schema.reaction_rollup;
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
     * Data related to a release.
     *
     * @title Release Asset
    */
    export type release_asset = {
        url: string & tags.Format<"uri">;
        browser_download_url: string & tags.Format<"uri">;
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * The file name of the asset.
        */
        name: string;
        label: string | null;
        /**
         * State of the release asset.
        */
        state: "uploaded" | "open";
        content_type: string;
        size: number & tags.Type<"int32">;
        download_count: number & tags.Type<"int32">;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        uploader: Schema.nullable_simple_user;
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
type IAutoViewTransformerInputType = Schema.release;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Choose a human‐readable date string: prefer published_at, fallback to created_at
  const date = input.published_at ?? input.created_at;
  // Format title: use the release name if present, otherwise the tag name
  const title = input.name ?? input.tag_name;

  // Header: show author avatar, title, published date; show a "Pre-release" chip if needed
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title,
    description: `Published at ${date}`,
    startElement: {
      type: "Avatar",
      src: input.author.avatar_url,
      // use login as alt text
      name: input.author.login,
      size: 40,
      variant: "gray",
    },
    endElement: input.prerelease
      ? {
          type: "Chip",
          label: "Pre-release",
          variant: "outlined",
          color: "warning",
          size: "small",
        }
      : undefined,
  };

  // Content: render markdown body if available
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: input.body
      ? {
          type: "Markdown",
          content: input.body,
        }
      : {
          type: "Text",
          content: "No release notes provided.",
          variant: "body2",
        },
  };

  // Footer: list all assets with download buttons
  const assetItems: IAutoView.IAutoViewDataListItemProps[] = input.assets.map((asset) => {
    // A button to download the asset
    const downloadButton: IAutoView.IAutoViewButtonProps = {
      type: "Button",
      label: "Download",
      variant: "contained",
      color: "primary",
      size: "small",
      href: asset.browser_download_url,
    };
    // Each list item: asset name on the left, download button on the right
    return {
      type: "DataListItem",
      label: {
        type: "Text",
        content: asset.name,
        variant: "body1",
      },
      value: downloadButton,
    };
  });

  // If there are no assets, display a descriptive text
  const footerChildren: IAutoView.IAutoViewComponentProps = assetItems.length
    ? {
        type: "DataList",
        childrenProps: assetItems,
      }
    : {
        type: "Text",
        content: "No downloadable assets.",
        variant: "body2",
      };

  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: footerChildren,
  };

  // Assemble a vertical card containing header, content, footer
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };

  return card;
}

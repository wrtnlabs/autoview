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



function visualizeData(
  input: IAutoViewTransformerInputType,
): IAutoView.IAutoViewComponentProps {
  // Prepare the card header with the release tag, name, author avatar, and draft/prerelease chip
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.tag_name,
    // Use the release "name" as description if provided
    description: input.name ?? "",
    // Show author avatar on the left
    startElement: {
      type: "Avatar",
      src: input.author.avatar_url,
      name: input.author.login,
      variant: "primary",
      size: 32,
    },
    // Show a chip on the right indicating draft or prerelease status
    endElement: {
      type: "Chip",
      label: input.draft
        ? "Draft"
        : input.prerelease
        ? "Prerelease"
        : "Release",
      variant: "outlined",
      size: "small",
      color: input.draft
        ? "warning"
        : input.prerelease
        ? "info"
        : "success",
    },
  };

  // Compose the markdown body: include release date and body content
  const mdContent = `**Published:** ${
    input.published_at ?? "N/A"
  }\n\n${input.body ?? "_No release notes provided._"}`;
  const markdown: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    content: mdContent,
  };

  // Build a data list of assets if any; otherwise a simple text
  let assetsSection: IAutoView.IAutoViewComponentProps;
  if (Array.isArray(input.assets) && input.assets.length > 0) {
    const items: IAutoView.IAutoViewDataListItemProps[] = input.assets.map(
      (asset) => ({
        type: "DataListItem",
        // Label is the asset file name
        label: {
          type: "Text",
          content: asset.name,
          variant: "body2",
        },
        // Value is a download button
        value: {
          type: "Button",
          label: "Download",
          variant: "outlined",
          size: "small",
          href: asset.browser_download_url,
        },
      }),
    );
    assetsSection = {
      type: "DataList",
      childrenProps: items,
    };
  } else {
    assetsSection = {
      type: "Text",
      content: "No assets attached to this release.",
      variant: "body2",
    };
  }

  // Footer chips: asset count and reactions if available
  const footerChips: IAutoView.IAutoViewChipProps[] = [];
  // Asset count chip
  footerChips.push({
    type: "Chip",
    label: `Assets: ${input.assets?.length ?? 0}`,
    variant: "outlined",
    size: "small",
    color: "primary",
  });
  // Reaction count chip if present
  if (input.reactions) {
    footerChips.push({
      type: "Chip",
      label: `Reactions: ${input.reactions.total_count}`,
      variant: "outlined",
      size: "small",
      color: "secondary",
    });
  }

  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: {
      type: "ChipGroup",
      childrenProps: footerChips,
      maxItems: footerChips.length,
    },
  };

  // Assemble the vertical card with header, content, and footer
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      header,
      {
        type: "CardContent",
        childrenProps: [markdown, assetsSection],
      },
      footer,
    ],
  };

  return card;
}

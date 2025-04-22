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
  // Build the card header with release title, publish date, and author avatar
  const title = input.name ?? input.tag_name;
  const publishedDate = input.published_at
    ? new Date(input.published_at).toLocaleDateString()
    : "Unpublished";
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title,
    description: `Published at: ${publishedDate}`,
    startElement: {
      type: "Avatar",
      src: input.author.avatar_url,
      name: input.author.login,
    },
    // Show a chip indicating draft/prerelease/full-release status
    endElement: {
      type: "Chip",
      label: input.draft
        ? "Draft"
        : input.prerelease
        ? "Prerelease"
        : "Release",
      color: input.draft
        ? "warning"
        : input.prerelease
        ? "info"
        : "success",
      variant: "filled",
      size: "small",
    },
  };

  // Build content: markdown for release body and a data list of assets
  const contentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];

  if (typeof input.body === "string" && input.body.trim() !== "") {
    contentChildren.push({
      type: "Markdown",
      content: input.body,
    });
  }

  if (Array.isArray(input.assets) && input.assets.length > 0) {
    const assetItems: IAutoView.IAutoViewDataListItemProps[] = input.assets.map(
      (asset) => ({
        type: "DataListItem",
        // Label with an icon + filename
        label: [
          { type: "Icon", id: "file-alt", size: 16, color: "gray" },
          { type: "Text", content: asset.name },
        ],
        // Download button for each asset
        value: {
          type: "Button",
          label: "Download",
          href: asset.browser_download_url,
          variant: "outlined",
          size: "small",
        },
      })
    );
    contentChildren.push({
      type: "DataList",
      childrenProps: assetItems,
    });
  }

  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: contentChildren,
  };

  // Build footer: show reaction counts as a chip group
  const footerChips: IAutoView.IAutoViewChipProps[] = [];
  if (input.reactions) {
    // Map of reaction field to display label
    const reactionFields: [keyof typeof input.reactions, string][] = [
      ["+1", "+1"],
      ["-1", "-1"],
      ["laugh", "laugh"],
      ["confused", "confused"],
      ["heart", "heart"],
      ["hooray", "hooray"],
      ["eyes", "eyes"],
      ["rocket", "rocket"],
    ];
    reactionFields.forEach(([field, label]) => {
      const count = input.reactions![field] as number;
      if (count > 0) {
        footerChips.push({
          type: "Chip",
          label: `${label} ${count}`,
          variant: "outlined",
          size: "small",
          color: "primary",
        });
      }
    });
  }

  const footerChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];
  if (footerChips.length > 0) {
    footerChildren.push({
      type: "ChipGroup",
      childrenProps: footerChips,
    });
  }

  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: footerChildren,
  };

  // Assemble a vertical card with header, content, and footer
  return {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };
}

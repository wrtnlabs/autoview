import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
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
}
type IAutoViewTransformerInputType = Schema.release_asset[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there are no assets, show a friendly markdown message
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "## No release assets available\n\nThere are currently no assets to display."
    };
  }

  // Helper to format bytes into KB/MB for readability
  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(2)} KB`;
    return `${(kb / 1024).toFixed(2)} MB`;
  };

  // Transform each asset into a ListItem component
  const listItems: IAutoView.IAutoViewListItemProps[] = input.map(asset => {
    // Prepare uploader avatar; if missing, show a placeholder avatar
    const uploader = asset.uploader;
    const avatar: IAutoView.IAutoViewAvatarProps = {
      type: "Avatar",
      src: uploader?.avatar_url,
      name: uploader?.login ?? "Unknown",
      size: 32,
      variant: "primary"
    };

    // Download badge to show the number of downloads with a download icon
    const downloadBadge: IAutoView.IAutoViewBadgeProps = {
      type: "Badge",
      count: asset.download_count,
      childrenProps: {
        type: "Icon",
        id: "download",
        size: 16,
        color: "blue"
      },
      showZero: true
    };

    // Download button linking directly to the browser_download_url
    const downloadButton: IAutoView.IAutoViewButtonProps = {
      type: "Button",
      variant: "outlined",
      size: "small",
      label: "Download",
      href: asset.browser_download_url
    };

    // Compose human-friendly description: size and upload date
    const sizeText = formatSize(asset.size);
    const dateText = new Date(asset.created_at).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
    const description = `${sizeText} · Uploaded on ${dateText}`;

    // Each list item is clickable, takes user to download link
    return {
      type: "ListItem",
      title: asset.name,
      description,
      startElement: avatar,
      endElement: [downloadButton, downloadBadge],
      href: asset.browser_download_url
    };
  });

  // Return a responsive list of assets
  return {
    type: "List",
    childrenProps: listItems
  };
}

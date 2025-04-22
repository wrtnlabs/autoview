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
type IAutoViewTransformerInputType = Schema.release_asset;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



/**
 * Transforms a GitHub release asset into a visual AutoView component.
 * Uses a vertical card with header (asset name + uploader avatar),
 * markdown content (detailed properties + download link),
 * and footer chips (state & download count).
 */
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper: format bytes into human-readable form
  function humanReadableSize(bytes: number): string {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let idx = 0;
    let size = bytes;
    while (size >= 1024 && idx < units.length - 1) {
      size /= 1024;
      idx++;
    }
    // Keep one decimal if under MB, otherwise integer
    const formatted = idx < 2 ? size.toFixed(1) : Math.round(size).toString();
    return `${formatted} ${units[idx]}`;
  }

  // Map asset state to chip color
  const stateColorMap: Record<string, IAutoView.IAutoViewChipProps['color']> = {
    uploaded: 'success',
    open: 'warning',
  };

  // Build the card header: asset name, optional label/state, optional uploader avatar
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: 'CardHeader',
    title: input.name,
    // Show label if present, else fallback to state only
    description: input.label
      ? `${input.label} (${input.state})`
      : `State: ${input.state}`,
    // If uploader info is available, show their avatar
    ...(input.uploader
      ? {
          startElement: {
            type: 'Avatar',
            src: input.uploader.avatar_url,
            name: input.uploader.login,
            variant: 'primary',
            size: 40,
          } as IAutoView.IAutoViewAvatarProps,
        }
      : {}),
  };

  // Compose markdown details for the card content
  const markdownLines: string[] = [
    `**Asset ID:** ${input.id}`,
    `**Content-Type:** ${input.content_type}`,
    `**Size:** ${humanReadableSize(input.size)}`,
    `**Created:** ${new Date(input.created_at).toLocaleString()}`,
    `**Updated:** ${new Date(input.updated_at).toLocaleString()}`,
    '',
    // Provide a direct download link
    `[Download Asset](${input.browser_download_url})`,
  ];
  const content: IAutoView.IAutoViewCardContentProps = {
    type: 'CardContent',
    childrenProps: {
      type: 'Markdown',
      content: markdownLines.join('\n'),
    } as IAutoView.IAutoViewMarkdownProps,
  };

  // Footer chips: one for asset state, one for download count
  const stateChip: IAutoView.IAutoViewChipProps = {
    type: 'Chip',
    label: input.state,
    color: stateColorMap[input.state] || 'gray',
    variant: 'filled',
    size: 'small',
  };
  const downloadChip: IAutoView.IAutoViewChipProps = {
    type: 'Chip',
    label: input.download_count.toString(),
    startElement: {
      type: 'Icon',
      id: 'download',
      color: 'blue',
      size: 16,
    } as IAutoView.IAutoViewIconProps,
    variant: 'outlined',
    size: 'small',
  };
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: 'CardFooter',
    childrenProps: [stateChip, downloadChip],
  };

  // Return a responsive vertical card combining header, content, and footer
  return {
    type: 'VerticalCard',
    childrenProps: [header, content, footer],
  } as IAutoView.IAutoViewVerticalCardProps;
}

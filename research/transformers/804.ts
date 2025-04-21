import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * License Content
     *
     * @title License Content
    */
    export type license_content = {
        name: string;
        path: string;
        sha: string;
        size: number & tags.Type<"int32">;
        url: string & tags.Format<"uri">;
        html_url: (string & tags.Format<"uri">) | null;
        git_url: (string & tags.Format<"uri">) | null;
        download_url: (string & tags.Format<"uri">) | null;
        type: string;
        content: string;
        encoding: string;
        _links: {
            git: (string & tags.Format<"uri">) | null;
            html: (string & tags.Format<"uri">) | null;
            self: string & tags.Format<"uri">;
        };
        license: Schema.nullable_license_simple;
    };
    /**
     * License Simple
     *
     * @title License Simple
    */
    export type nullable_license_simple = {
        key: string;
        name: string;
        url: (string & tags.Format<"uri">) | null;
        spdx_id: string | null;
        node_id: string;
        html_url?: string & tags.Format<"uri">;
    } | null;
}
type IAutoViewTransformerInputType = Schema.license_content;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper to convert bytes to a human-readable string
  const humanFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const size = parseFloat((bytes / Math.pow(k, i)).toFixed(2));
    return `${size} ${sizes[i]}`;
  };

  // Build a list of metadata items
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [];

  // Path
  dataListItems.push({
    type: 'DataListItem',
    label: { type: 'Text', variant: 'body2', content: 'Path' },
    value: { type: 'Text', variant: 'body2', content: input.path },
  });

  // SHA
  dataListItems.push({
    type: 'DataListItem',
    label: { type: 'Text', variant: 'body2', content: 'SHA' },
    value: { type: 'Text', variant: 'body2', content: input.sha },
  });

  // Size (raw + human-readable)
  dataListItems.push({
    type: 'DataListItem',
    label: { type: 'Text', variant: 'body2', content: 'Size' },
    value: {
      type: 'Text',
      variant: 'body2',
      content: `${input.size} bytes (${humanFileSize(input.size)})`,
    },
  });

  // Encoding
  dataListItems.push({
    type: 'DataListItem',
    label: { type: 'Text', variant: 'body2', content: 'Encoding' },
    value: { type: 'Text', variant: 'body2', content: input.encoding },
  });

  // License simple info (if exists)
  if (input.license) {
    dataListItems.push({
      type: 'DataListItem',
      label: { type: 'Text', variant: 'body2', content: 'License' },
      value: { type: 'Text', variant: 'body2', content: input.license.name },
    });
    if (input.license.spdx_id) {
      dataListItems.push({
        type: 'DataListItem',
        label: { type: 'Text', variant: 'body2', content: 'SPDX ID' },
        value: { type: 'Text', variant: 'body2', content: input.license.spdx_id },
      });
    }
  }

  // Links: raw, HTML, git, download
  const buttons: IAutoView.IAutoViewButtonProps[] = [];
  if (input.url) {
    buttons.push({
      type: 'Button',
      label: 'Raw',
      variant: 'outlined',
      size: 'small',
      href: input.url,
      color: 'primary',
    });
  }
  if (input.html_url) {
    buttons.push({
      type: 'Button',
      label: 'HTML',
      variant: 'outlined',
      size: 'small',
      href: input.html_url,
      color: 'secondary',
    });
  }
  if (input.git_url) {
    buttons.push({
      type: 'Button',
      label: 'Git',
      variant: 'outlined',
      size: 'small',
      href: input.git_url,
      color: 'info',
    });
  }
  if (input.download_url) {
    buttons.push({
      type: 'Button',
      label: 'Download',
      variant: 'contained',
      size: 'small',
      href: input.download_url,
      color: 'success',
    });
  }

  // Compose the card
  return {
    type: 'VerticalCard',
    childrenProps: [
      // Card header with icon, title and path as description
      {
        type: 'CardHeader',
        startElement: {
          type: 'Icon',
          id: 'file-code',
          size: 24,
          color: 'blue',
        },
        title: input.name,
        description: input.path,
      },
      // Card content with a data list of metadata
      {
        type: 'CardContent',
        childrenProps: [
          {
            type: 'DataList',
            childrenProps: dataListItems,
          },
          // Show the beginning of the license content as markdown,
          // clipping if too long for performance/responsiveness.
          {
            type: 'Markdown',
            content:
              input.content.length > 1000
                ? input.content.slice(0, 1000) + '\n\n*…content truncated…*'
                : input.content,
          },
        ],
      },
      // Card footer with action buttons
      {
        type: 'CardFooter',
        childrenProps: buttons,
      },
    ],
  };
}

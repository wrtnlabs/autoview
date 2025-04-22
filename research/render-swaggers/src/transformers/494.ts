import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A version of a software package
     *
     * @title Package Version
    */
    export type package_version = {
        /**
         * Unique identifier of the package version.
        */
        id: number & tags.Type<"int32">;
        /**
         * The name of the package version.
        */
        name: string;
        url: string;
        package_html_url: string;
        html_url?: string;
        license?: string;
        description?: string;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        deleted_at?: string & tags.Format<"date-time">;
        /**
         * @title Package Version Metadata
        */
        metadata?: {
            package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
            /**
             * @title Container Metadata
            */
            container?: {
                tags: string[];
            };
            /**
             * @title Docker Metadata
            */
            docker?: {
                tag?: string[];
            };
        };
    };
}
type IAutoViewTransformerInputType = Schema.package_version;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // 1. Build the card header: show an icon, version name, and optionally a license badge
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    // A simple package icon; adjust if you have a different preferred icon name
    startElement: {
      type: "Icon",
      id: "cube",
      color: "blue",
      size: 24,
    },
    title: input.name,
    description: input.description,
    // If there's a license, display it as a small outlined chip at the header's end
    ...(input.license
      ? {
          endElement: {
            type: "Chip",
            label: input.license,
            variant: "outlined",
            size: "small",
            color: "secondary",
          },
        }
      : {}),
  };

  // 2. Build the key/value list of properties
  const items: IAutoView.IAutoViewDataListItemProps[] = [];

  // Version ID
  items.push({
    type: "DataListItem",
    label: { type: "Text", content: "Version ID" },
    value: { type: "Text", content: input.id.toString() },
  });

  // Primary URL
  items.push({
    type: "DataListItem",
    label: { type: "Text", content: "URL" },
    value: {
      type: "Button",
      label: "Open",
      variant: "text",
      href: input.url,
    },
  });

  // Package HTML URL
  items.push({
    type: "DataListItem",
    label: { type: "Text", content: "Package Page" },
    value: {
      type: "Button",
      label: "Open",
      variant: "text",
      href: input.package_html_url,
    },
  });

  // Optional generic HTML URL
  if (input.html_url) {
    items.push({
      type: "DataListItem",
      label: { type: "Text", content: "Extra Link" },
      value: {
        type: "Button",
        label: "Open",
        variant: "text",
        href: input.html_url,
      },
    });
  }

  // Created/Updated timestamps (formatted for readability)
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString();

  items.push({
    type: "DataListItem",
    label: { type: "Text", content: "Created At" },
    value: { type: "Text", content: formatDate(input.created_at) },
  });
  items.push({
    type: "DataListItem",
    label: { type: "Text", content: "Updated At" },
    value: { type: "Text", content: formatDate(input.updated_at) },
  });

  // If marked deleted, show deletion timestamp with an error color
  if (input.deleted_at) {
    items.push({
      type: "DataListItem",
      label: { type: "Text", content: "Deleted At" },
      value: {
        type: "Text",
        content: formatDate(input.deleted_at),
        color: "error",
      },
    });
  }

  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items,
  };

  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [dataList],
  };

  // 3. Build chips summarizing metadata (package type, container tags, docker tags)
  const chips: IAutoView.IAutoViewChipProps[] = [];

  if (input.metadata) {
    // Show package type
    chips.push({
      type: "Chip",
      label: input.metadata.package_type,
      variant: "outlined",
      size: "small",
      color: "primary",
    });

    // Container tags
    if (input.metadata.container?.tags?.length) {
      input.metadata.container.tags.forEach((tag) =>
        chips.push({
          type: "Chip",
          label: tag,
          variant: "filled",
          size: "small",
          color: "teal",
        })
      );
    }

    // Docker tags
    if (input.metadata.docker?.tag?.length) {
      input.metadata.docker.tag.forEach((tag) =>
        chips.push({
          type: "Chip",
          label: tag,
          variant: "filled",
          size: "small",
          color: "cyan",
        })
      );
    }
  }

  // Only render a footer if there's at least one metadata chip
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps:
      chips.length > 0
        ? [
            {
              type: "ChipGroup",
              childrenProps: chips,
            },
          ]
        : [],
  };

  // 4. Compose the vertical card
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };

  return card;
}

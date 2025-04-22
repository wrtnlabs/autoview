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
  // Helper to format ISO date-times into a more readable string
  const formatDate = (iso?: string): string =>
    iso ? new Date(iso).toLocaleString() : "N/A";

  // Build the list of metadata fields to display in a DataList
  const dataItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      label: { type: "Text", content: "Version Name", variant: "subtitle2" },
      value: { type: "Text", content: input.name },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "ID", variant: "subtitle2" },
      value: { type: "Text", content: String(input.id) },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Created At", variant: "subtitle2" },
      value: { type: "Text", content: formatDate(input.created_at) },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Updated At", variant: "subtitle2" },
      value: { type: "Text", content: formatDate(input.updated_at) },
    },
  ];

  // Only include deleted date if it exists
  if (input.deleted_at) {
    dataItems.push({
      type: "DataListItem",
      label: { type: "Text", content: "Deleted At", variant: "subtitle2" },
      value: { type: "Text", content: formatDate(input.deleted_at) },
    });
  }

  // Provide a quick "Open" button if we have any URL
  const linkTarget = input.html_url ?? input.url;
  if (linkTarget) {
    dataItems.push({
      type: "DataListItem",
      label: { type: "Text", content: "View Source", variant: "subtitle2" },
      value: {
        type: "Button",
        variant: "text",
        color: "primary",
        size: "small",
        label: "Open",
        href: linkTarget,
        startElement: {
          type: "Icon",
          id: "external-link-alt",
          size: 16,
          color: "gray",
        },
      },
    });
  }

  // Build chips summarizing the package type and any tags
  const chips: IAutoView.IAutoViewChipProps[] = [];
  if (input.metadata) {
    // Main package type
    chips.push({
      type: "Chip",
      label: input.metadata.package_type.toUpperCase(),
      color: "primary",
      variant: "filled",
    });
    // Container tags, if present
    if (input.metadata.container?.tags) {
      for (const tag of input.metadata.container.tags) {
        chips.push({
          type: "Chip",
          label: tag,
          color: "secondary",
          variant: "outlined",
        });
      }
    }
    // Docker tags, if present
    if (input.metadata.docker?.tag) {
      for (const tag of input.metadata.docker.tag) {
        chips.push({
          type: "Chip",
          label: tag,
          color: "info",
          variant: "outlined",
        });
      }
    }
  }

  // Compose the overall card visualizing the package version
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        // Header with an archive icon and optional description
        type: "CardHeader",
        title: input.name,
        description: input.description ?? input.license,
        startElement: {
          type: "Icon",
          id: "archive",
          size: 32,
          color: "gray",
        },
      },
      {
        // Main content: a DataList of key fields
        type: "CardContent",
        childrenProps: {
          type: "DataList",
          childrenProps: dataItems,
        },
      },
      {
        // Footer: chips for package type and tags
        type: "CardFooter",
        childrenProps: {
          type: "ChipGroup",
          childrenProps: chips,
        },
      },
    ],
  };
}

import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiOrgsActionsHostedRunnersImagesGithubOwned {
        export type GetResponse = {
            total_count: number & tags.Type<"int32">;
            images: Schema.actions_hosted_runner_image[];
        };
    }
    /**
     * Provides details of a hosted runner image
     *
     * @title GitHub-hosted runner image details.
    */
    export type actions_hosted_runner_image = {
        /**
         * The ID of the image. Use this ID for the `image` parameter when creating a new larger runner.
        */
        id: string;
        /**
         * The operating system of the image.
        */
        platform: string;
        /**
         * Image size in GB.
        */
        size_gb: number & tags.Type<"int32">;
        /**
         * Display name for this image.
        */
        display_name: string;
        /**
         * The image provider.
        */
        source: "github" | "partner" | "custom";
    };
}
type IAutoViewTransformerInputType = Schema.IApiOrgsActionsHostedRunnersImagesGithubOwned.GetResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Utility to map platform names to a consistent chip color
  const mapPlatformColor = (platform: string): IAutoView.IAutoViewChipProps["color"] => {
    const key = platform.toLowerCase();
    if (key.includes("windows")) return "blue";
    if (key.includes("ubuntu") || key.includes("linux")) return "orange";
    if (key.includes("mac") || key.includes("osx")) return "gray";
    return "teal";
  };

  // Utility to map source types to a chip color
  const mapSourceColor = (source: string): IAutoView.IAutoViewChipProps["color"] => {
    switch (source) {
      case "github":
        return "cyan";
      case "partner":
        return "green";
      case "custom":
        return "secondary";
      default:
        return "gray";
    }
  };

  // Build a DataListItem for each runner image
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = input.images.map((image) => {
    // A chip showing the OS/platform
    const platformChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: image.platform,
      variant: "filled",
      size: "small",
      color: mapPlatformColor(image.platform),
    };

    // A chip showing the disk size in GB
    const sizeChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: `${image.size_gb} GB`,
      variant: "outlined",
      size: "small",
      color: "info",
    };

    // A chip showing the image source
    const sourceChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: image.source,
      variant: "outlined",
      size: "small",
      color: mapSourceColor(image.source),
    };

    return {
      type: "DataListItem",
      // The display name as the label
      label: [
        {
          type: "Text",
          content: image.display_name,
          variant: "body1",
        },
      ],
      // Show platform, size, and source as chips in the value area
      value: [platformChip, sizeChip, sourceChip],
    };
  });

  // The card header summarizing the total
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Hosted Runner Images",
    description: `${input.total_count} image${input.total_count !== 1 ? "s" : ""}`,
    startElement: {
      type: "Icon",
      id: "server",    // using a server icon to hint at runner hosts
      size: 24,
      color: "blue",
    },
  };

  // Depending on whether we have any images, show a DataList or a friendly markdown message
  const contentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];
  if (input.images.length > 0) {
    const dataList: IAutoView.IAutoViewDataListProps = {
      type: "DataList",
      childrenProps: dataListItems,
    };
    contentChildren.push(dataList);
  } else {
    // Graceful empty state
    const markdown: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: "### No runner images found.\n\nPlease check back later or supply custom images.",
    };
    contentChildren.push(markdown);
  }

  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // We embed the DataList or Markdown as a child component
    childrenProps: contentChildren,
  };

  // Wrap everything in a VerticalCard for a compact, responsive layout
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, cardContent],
  };

  return card;
}

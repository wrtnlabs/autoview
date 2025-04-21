import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiOrgsActionsHostedRunnersImagesPartner {
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
type IAutoViewTransformerInputType = Schema.IApiOrgsActionsHostedRunnersImagesPartner.GetResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  /**
   * Map runner source to a chip color variant.
   */
  const getSourceColor = (source: string): IAutoView.IAutoViewChipProps["color"] => {
    switch (source) {
      case "github":
        return "cyan";
      case "partner":
        return "green";
      case "custom":
        return "orange";
      default:
        return "gray";
    }
  };

  /**
   * Map platform keyword to an avatar color variant.
   */
  const getPlatformVariant = (platform: string): IAutoView.IAutoViewAvatarProps["variant"] => {
    const p = platform.toLowerCase();
    if (p.includes("win")) return "blue";
    if (p.includes("ubuntu") || p.includes("linux")) return "orange";
    if (p.includes("mac") || p.includes("osx")) return "darkGray";
    return "teal";
  };

  // If there are no images, show a markdown notice.
  if (!input.images || input.images.length === 0) {
    return {
      type: "Markdown",
      content: "**No hosted runner images found.**",
    };
  }

  // Build a DataListItem for each runner image.
  const listItems: IAutoView.IAutoViewDataListItemProps[] = input.images.map((img) => {
    const avatar: IAutoView.IAutoViewAvatarProps = {
      type: "Avatar",
      name: img.platform,
      variant: getPlatformVariant(img.platform),
      size: 28,
    };

    const titleText: IAutoView.IAutoViewTextProps = {
      type: "Text",
      content: img.display_name,
      variant: "body1",
      color: "primary",
    };

    // Chip for size in GB
    const sizeChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: `${img.size_gb} GB`,
      size: "small",
      variant: "outlined",
      color: "secondary",
    };

    // Chip for source
    const sourceChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: img.source,
      size: "small",
      variant: "filled",
      color: getSourceColor(img.source),
    };

    return {
      type: "DataListItem",
      // combine avatar + text as label
      label: [avatar, titleText],
      // show size and source as inline chips
      value: [sizeChip, sourceChip],
    };
  });

  // Wrap the list items in a DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: listItems,
  };

  // Construct a header for the card summarizing total images
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Hosted Runner Images",
    description: `${input.total_count} image${input.total_count !== 1 ? "s" : ""}`,
    // use a generic server icon for the header
    startElement: {
      type: "Icon",
      id: "server",
      size: 32,
      color: "teal",
    },
  };

  // Place the data list into the card content area
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList,
  };

  // Return a vertical card with header + content
  return {
    type: "VerticalCard",
    childrenProps: [header, content],
  };
}

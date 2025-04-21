import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiUserCodespacesMachines {
        export type GetResponse = {
            total_count: number & tags.Type<"int32">;
            machines: Schema.codespace_machine[];
        };
    }
    /**
     * A description of the machine powering a codespace.
     *
     * @title Codespace machine
    */
    export type codespace_machine = {
        /**
         * The name of the machine.
        */
        name: string;
        /**
         * The display name of the machine includes cores, memory, and storage.
        */
        display_name: string;
        /**
         * The operating system of the machine.
        */
        operating_system: string;
        /**
         * How much storage is available to the codespace.
        */
        storage_in_bytes: number & tags.Type<"int32">;
        /**
         * How much memory is available to the codespace.
        */
        memory_in_bytes: number & tags.Type<"int32">;
        /**
         * How many cores are available to the codespace.
        */
        cpus: number & tags.Type<"int32">;
        /**
         * Whether a prebuild is currently available when creating a codespace for this machine and repository. If a branch was not specified as a ref, the default branch will be assumed. Value will be "null" if prebuilds are not supported or prebuild availability could not be determined. Value will be "none" if no prebuild is available. Latest values "ready" and "in_progress" indicate the prebuild availability status.
        */
        prebuild_availability: "none" | "ready" | "in_progress" | null;
    };
}
type IAutoViewTransformerInputType = Schema.IApiUserCodespacesMachines.GetResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper: format bytes to human-readable string (GiB)
  const formatBytes = (bytes: number): string => {
    const gb = bytes / (1024 ** 3);
    return `${gb.toFixed(2)} GiB`;
  };

  const machines = input.machines || [];

  // If no machines, show a friendly markdown message
  if (machines.length === 0) {
    return {
      type: "Markdown",
      content: "### No codespace machines available.\nPlease check back later or contact support.",
    };
  }

  // Map each machine to a VerticalCard containing header, content, and footer
  const cards: IAutoView.IAutoViewVerticalCardProps[] = machines.map((machine) => {
    // Prebuild availability chip
    let prebuildLabel = "Unknown";
    let prebuildColor: IAutoView.IAutoViewChipProps["color"] = "gray";
    let prebuildVariant: IAutoView.IAutoViewChipProps["variant"] = "outlined";

    switch (machine.prebuild_availability) {
      case "ready":
        prebuildLabel = "Prebuild Ready";
        prebuildColor = "success";
        prebuildVariant = "filled";
        break;
      case "in_progress":
        prebuildLabel = "Prebuild In Progress";
        prebuildColor = "warning";
        prebuildVariant = "filled";
        break;
      case "none":
        prebuildLabel = "No Prebuild";
        prebuildColor = "error";
        prebuildVariant = "outlined";
        break;
      default:
        // null or unexpected
        prebuildLabel = "Prebuild Unknown";
    }

    // Chips for machine specs
    const specChips: IAutoView.IAutoViewChipProps[] = [
      {
        type: "Chip",
        label: machine.operating_system,
        startElement: { type: "Icon", id: "server", size: 16 },
        color: "primary",
        variant: "filled",
      },
      {
        type: "Chip",
        label: `${machine.cpus} CPU${machine.cpus !== 1 ? "s" : ""}`,
        startElement: { type: "Icon", id: "microchip", size: 16 },
        color: "info",
        variant: "filled",
      },
      {
        type: "Chip",
        label: formatBytes(machine.memory_in_bytes),
        startElement: { type: "Icon", id: "memory", size: 16 },
        color: "teal",
        variant: "filled",
      },
      {
        type: "Chip",
        label: formatBytes(machine.storage_in_bytes),
        startElement: { type: "Icon", id: "hdd", size: 16 },
        color: "cyan",
        variant: "filled",
      },
    ];

    return {
      type: "VerticalCard",
      // Compose header, content, footer
      childrenProps: [
        {
          type: "CardHeader",
          title: machine.display_name,
          description: machine.name,
          startElement: { type: "Icon", id: "laptop", size: 24 },
        },
        {
          type: "CardContent",
          childrenProps: specChips,
        },
        {
          type: "CardFooter",
          childrenProps: {
            type: "Chip",
            label: prebuildLabel,
            color: prebuildColor,
            variant: prebuildVariant,
            size: "small",
          },
        },
      ],
    };
  });

  // Return a carousel of machine cards for responsive, swipeable UI
  return {
    type: "Carousel",
    childrenProps: cards,
    gutter: 16,
    infinite: false,
    navControls: true,
    indicators: true,
    // autoplay would distract from informational display
    autoPlay: false,
  };
}

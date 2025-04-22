import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiReposActionsRunners {
        export type GetResponse = {
            total_count: number & tags.Type<"int32">;
            runners: Schema.runner[];
        };
    }
    /**
     * A self hosted runner
     *
     * @title Self hosted runners
    */
    export type runner = {
        /**
         * The ID of the runner.
        */
        id: number & tags.Type<"int32">;
        /**
         * The ID of the runner group.
        */
        runner_group_id?: number & tags.Type<"int32">;
        /**
         * The name of the runner.
        */
        name: string;
        /**
         * The Operating System of the runner.
        */
        os: string;
        /**
         * The status of the runner.
        */
        status: string;
        busy: boolean;
        labels: Schema.runner_label[];
        ephemeral?: boolean;
    };
    /**
     * A label for a self hosted runner
     *
     * @title Self hosted runner label
    */
    export type runner_label = {
        /**
         * Unique identifier of the label.
        */
        id?: number & tags.Type<"int32">;
        /**
         * Name of the label.
        */
        name: string;
        /**
         * The type of label. Read-only labels are applied automatically when the runner is configured.
        */
        type?: "read-only" | "custom";
    };
}
type IAutoViewTransformerInputType = Schema.IApiReposActionsRunners.GetResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there are no runners, display a friendly markdown message
  if (!input.runners || input.runners.length === 0) {
    return {
      type: "Markdown",
      content: "## No self-hosted runners available\nThere are currently no self-hosted GitHub Actions runners to display.",
    };
  }

  // Map runner status to a colored chip color
  const statusColor = (status: string): IAutoView.IAutoViewChipProps["color"] => {
    switch (status.toLowerCase()) {
      case "online":
        return "success";
      case "offline":
        return "error";
      default:
        return "info";
    }
  };

  // Map operating system name to an icon identifier
  const osIconId = (os: string): string => {
    const lower = os.toLowerCase();
    if (lower.includes("windows")) return "windows";
    if (lower.includes("linux")) return "linux";
    if (lower.includes("mac")) return "apple";
    return "desktop";
  };

  // Build a DataListItem for each runner
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = input.runners.map((runner) => {
    // Text component for the runner's name
    const nameText: IAutoView.IAutoViewTextProps = {
      type: "Text",
      content: runner.name,
      variant: "body1",
    };

    // OS Chip with an icon
    const osChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: runner.os,
      startElement: {
        type: "Icon",
        id: osIconId(runner.os),
        color: "gray",
        size: 16,
      },
      variant: "outlined",
      size: "small",
      color: "gray",
    };

    // Status chip indicating online/offline/etc.
    const statusChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: runner.status,
      color: statusColor(runner.status),
      size: "small",
      variant: "filled",
    };

    // Optional busy indicator chip
    const busyChip: IAutoView.IAutoViewChipProps | null = runner.busy
      ? {
          type: "Chip",
          label: "Busy",
          color: "warning",
          size: "small",
          variant: "filled",
          startElement: {
            type: "Icon",
            id: "spinner",
            color: "yellow",
            size: 12,
          },
        }
      : null;

    // Chips for each runner label
    const labelChips: IAutoView.IAutoViewChipProps[] = (runner.labels || []).map((lbl) => ({
      type: "Chip",
      label: lbl.name,
      color: lbl.type === "custom" ? "info" : "gray",
      size: "small",
      variant: "outlined",
    }));

    // Group status and busy chips together
    const statusGroup: IAutoView.IAutoViewChipGroupProps = {
      type: "ChipGroup",
      childrenProps: busyChip ? [statusChip, busyChip] : [statusChip],
    };

    // Group the runner's labels
    const labelsGroup: IAutoView.IAutoViewChipGroupProps = {
      type: "ChipGroup",
      childrenProps: labelChips,
    };

    return {
      type: "DataListItem",
      // Show name and OS in the label area
      label: [nameText, osChip],
      // Show status/busy and label chips in the value area
      value: [statusGroup, labelsGroup],
    };
  });

  // The DataList component that holds all runner items
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListItems,
  };

  // Header for the card, including a server icon and total count
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: `Self-hosted Runners (${input.total_count})`,
    description: "Overview of GitHub Actions self‑hosted runners",
    startElement: {
      type: "Icon",
      id: "server",
      color: "blue",
      size: 32,
    },
  };

  // Wrap the DataList inside card content
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList,
  };

  // Return a vertical card composed of the header and content
  return {
    type: "VerticalCard",
    childrenProps: [header, content],
  };
}

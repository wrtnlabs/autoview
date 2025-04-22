import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiOrgsActionsRunners {
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
type IAutoViewTransformerInputType = Schema.IApiOrgsActionsRunners.GetResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there are no runners, show a friendly markdown message
  if (input.runners.length === 0) {
    return {
      type: "Markdown",
      content: "### No self‑hosted runners found\n\nThere are currently no runners registered for this organization."
    };
  }

  // Map each runner to a DataListItem component
  const listItems: IAutoView.IAutoViewDataListItemProps[] = input.runners.map(runner => {
    // Avatar representing the runner by name initials, colored by busy status
    const avatar: IAutoView.IAutoViewAvatarProps = {
      type: "Avatar",
      name: runner.name,
      variant: runner.busy ? "warning" : "success",
      size: 32
    };

    // Text component for the runner name
    const nameText: IAutoView.IAutoViewTextProps = {
      type: "Text",
      content: runner.name,
      variant: "subtitle1",
      color: "primary"
    };

    // Icon representing the runner OS, wrapped in a tooltip for clarity
    const osIcon: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: runner.os.toLowerCase().replace(/\s+/g, "-"),
      color: "gray",
      size: 20
    };
    const osTooltip: IAutoView.IAutoViewTooltipProps = {
      type: "Tooltip",
      message: `OS: ${runner.os}`,
      childrenProps: osIcon
    };

    // Chip for the runner status, colored semantically
    const statusChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: runner.status,
      variant: "filled",
      // Map common statuses to colors
      color:
        runner.status.toLowerCase() === "online"
          ? "success"
          : runner.status.toLowerCase() === "offline"
          ? "error"
          : "secondary",
      size: "small"
    };

    // Chip to highlight ephemeral runners
    const ephemeralChip: IAutoView.IAutoViewChipProps | undefined = runner.ephemeral
      ? {
          type: "Chip",
          label: "Ephemeral",
          variant: "outlined",
          color: "warning",
          size: "small"
        }
      : undefined;

    // Transform runner labels into chips
    const labelChips: IAutoView.IAutoViewChipProps[] = runner.labels.map(lbl => ({
      type: "Chip",
      label: lbl.name,
      variant: "outlined",
      color: lbl.type === "read-only" ? "secondary" : "primary",
      size: "small"
    }));
    const labelGroup: IAutoView.IAutoViewChipGroupProps = {
      type: "ChipGroup",
      childrenProps: labelChips,
      maxItems: 4
    };

    // Compose the label area: avatar + name
    const labelArea: IAutoView.IAutoViewPresentationComponentProps[] = [
      avatar,
      nameText
    ];

    // Compose the value area: OS tooltip, status, optional ephemeral chip, and label group
    const valueArea: IAutoView.IAutoViewPresentationComponentProps[] = [
      osTooltip,
      statusChip
    ];
    if (ephemeralChip) {
      valueArea.push(ephemeralChip);
    }
    valueArea.push(labelGroup);

    // Build the DataListItem
    const item: IAutoView.IAutoViewDataListItemProps = {
      type: "DataListItem",
      label: labelArea,
      value: valueArea
    };

    return item;
  });

  // Wrap all items in a DataList
  return {
    type: "DataList",
    childrenProps: listItems
  };
}

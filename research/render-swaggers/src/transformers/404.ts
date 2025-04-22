import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
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
type IAutoViewTransformerInputType = Schema.runner;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Map the OS string to a FontAwesome icon ID.
  const osIconId = (() => {
    const os = input.os.toLowerCase();
    if (os.includes("linux")) return "linux";
    if (os.includes("windows")) return "windows";
    if (os.includes("mac") || os.includes("darwin") || os.includes("os x")) return "apple";
    return "desktop";
  })();

  // Map the runner status to a semantic color for a Chip.
  const statusLower = input.status.toLowerCase();
  const statusColor: IAutoView.IAutoViewChipProps["color"] =
    statusLower === "online" || statusLower === "idle"
      ? "success"
      : statusLower === "offline"
      ? "error"
      : "primary";

  // Busy indicator mapping.
  const busyLabel = input.busy ? "Busy" : "Idle";
  const busyColor: IAutoView.IAutoViewChipProps["color"] = input.busy ? "warning" : "success";

  // 1. Build the card header with name, OS icon, group id, and ephemeral/persistent chip.
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.name,
    description: `Group: ${input.runner_group_id ?? "N/A"}`,
    startElement: {
      type: "Icon",
      id: osIconId,
      color: "gray",
      size: 24,
    },
    endElement: {
      type: "Chip",
      label: input.ephemeral ? "Ephemeral" : "Persistent",
      variant: "filled",
      color: input.ephemeral ? "info" : "secondary",
      size: "small",
    },
  };

  // 2. Build a list of key/value pairs to show the runner properties.
  const listItems: IAutoView.IAutoViewDataListItemProps[] = [
    // ID
    {
      type: "DataListItem",
      label: { type: "Text", content: "ID", variant: "subtitle2" },
      value: { type: "Text", content: String(input.id), variant: "body1" },
    },
    // Status
    {
      type: "DataListItem",
      label: { type: "Text", content: "Status", variant: "subtitle2" },
      value: {
        type: "Chip",
        label: input.status,
        color: statusColor,
        size: "small",
        variant: "filled",
      },
    },
    // Busy
    {
      type: "DataListItem",
      label: { type: "Text", content: "Busy", variant: "subtitle2" },
      value: {
        type: "Chip",
        label: busyLabel,
        color: busyColor,
        size: "small",
        variant: "outlined",
      },
    },
    // OS (text fallback)
    {
      type: "DataListItem",
      label: { type: "Text", content: "OS", variant: "subtitle2" },
      value: { type: "Text", content: input.os, variant: "body1" },
    },
  ];

  // Optionally show the runner_group_id if present.
  if (input.runner_group_id !== undefined) {
    listItems.push({
      type: "DataListItem",
      label: { type: "Text", content: "Group ID", variant: "subtitle2" },
      value: { type: "Text", content: String(input.runner_group_id), variant: "body1" },
    });
  }

  // 3. Wrap the list in a DataList inside CardContent.
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "DataList",
      childrenProps: listItems,
    },
  };

  // 4. If there are labels, render them as a ChipGroup in the CardFooter.
  let footer: IAutoView.IAutoViewCardFooterProps | undefined;
  if (input.labels?.length) {
    const chips = input.labels.map((lbl) => ({
      type: "Chip" as const,
      label: lbl.name,
      variant: "outlined" as const,
      size: "small" as const,
      color: lbl.type === "read-only" ? "gray" as const : "primary" as const,
    }));
    footer = {
      type: "CardFooter",
      childrenProps: {
        type: "ChipGroup",
        childrenProps: chips,
      },
    };
  }

  // 5. Assemble the VerticalCard with header, content, and optional footer.
  const cardChildren = footer ? [header, content, footer] : [header, content];
  return {
    type: "VerticalCard",
    childrenProps: cardChildren,
  };
}

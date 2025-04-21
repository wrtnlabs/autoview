import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiOrgsActionsRunnersGenerateJitconfig {
        export type PostResponse = {
            runner: Schema.runner;
            /**
             * The base64 encoded runner configuration.
            */
            encoded_jit_config: string;
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
type IAutoViewTransformerInputType = Schema.IApiOrgsActionsRunnersGenerateJitconfig.PostResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  const runner = input.runner;

  // Map runner.status to a color for visual emphasis
  const statusColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
    online: "success",
    offline: "error",
    idle: "warning",
  };
  const statusColor = statusColorMap[runner.status] ?? "info";

  // Helper to build a small status chip
  const makeStatusChip = (label: string, color: IAutoView.IAutoViewChipProps["color"]) =>
    ({
      type: "Chip",
      label: label,
      color: color,
      size: "small",
      variant: "filled",
    } as IAutoView.IAutoViewChipProps);

  // Build a list of DataListItemProps for each field we want to show
  const items: IAutoView.IAutoViewDataListItemProps[] = [];

  // Runner ID
  items.push({
    type: "DataListItem",
    label: { type: "Text", content: "ID" },
    value: { type: "Text", content: runner.id.toString() },
  });

  // Runner group ID (optional)
  if (runner.runner_group_id !== undefined) {
    items.push({
      type: "DataListItem",
      label: { type: "Text", content: "Group ID" },
      value: { type: "Text", content: runner.runner_group_id.toString() },
    });
  }

  // Status
  items.push({
    type: "DataListItem",
    label: { type: "Text", content: "Status" },
    value: makeStatusChip(runner.status, statusColor),
  });

  // Busy flag
  items.push({
    type: "DataListItem",
    label: { type: "Text", content: "Busy" },
    value: makeStatusChip(runner.busy ? "Yes" : "No", runner.busy ? "error" : "success"),
  });

  // Ephemeral flag
  items.push({
    type: "DataListItem",
    label: { type: "Text", content: "Ephemeral" },
    value: makeStatusChip(runner.ephemeral ? "Yes" : "No", runner.ephemeral ? "info" : "secondary"),
  });

  // Labels array
  if (Array.isArray(runner.labels) && runner.labels.length > 0) {
    // Convert each label into a Chip
    const labelChips: IAutoView.IAutoViewChipProps[] = runner.labels.map(lbl => ({
      type: "Chip",
      label: lbl.name,
      variant: "outlined",
      size: "small",
      color: "primary",
    }));
    items.push({
      type: "DataListItem",
      label: { type: "Text", content: "Labels" },
      value: {
        type: "ChipGroup",
        childrenProps: labelChips,
      },
    });
  }

  // Put all items into a DataList
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items,
  };

  // Prepare a download button for the JIT configuration
  // We use a data URI with application/json to allow direct download in-browser
  const downloadHref = `data:application/json;base64,${input.encoded_jit_config}`;
  const downloadButton: IAutoView.IAutoViewButtonProps = {
    type: "Button",
    label: "Download Config",
    variant: "outlined",
    color: "primary",
    size: "small",
    href: downloadHref,
  };

  // Assemble the card header with an icon and runner name & OS
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: runner.name,
    description: runner.os,
    startElement: {
      type: "Icon",
      id: "server",      // server icon to represent a runner
      color: "cyan",
      size: 24,
    },
  };

  // Assemble the card content holding our DataList
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [dataList],
  };

  // Assemble the card footer with the download button
  const cardFooter: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: downloadButton,
  };

  // Return a VerticalCard wrapping header, content, and footer for a responsive layout
  return {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent, cardFooter],
  };
}

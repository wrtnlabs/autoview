import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiOrgsActionsRunnerGroupsRunners {
        export type GetResponse = {
            total_count: number;
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
type IAutoViewTransformerInputType = Schema.IApiOrgsActionsRunnerGroupsRunners.GetResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there are no runners, show a friendly Markdown message
  if (!input.runners || input.runners.length === 0) {
    return {
      type: "Markdown",
      content: "**No self-hosted runners found**",
    };
  }

  // Helper: Choose an icon for the OS name
  const getOsIconId = (os: string): string => {
    const lower = os.toLowerCase();
    if (lower.includes("windows")) return "windows";
    if (lower.includes("linux"))   return "linux";
    if (lower.includes("mac") || lower.includes("darwin") || lower.includes("os x")) return "apple";
    return "desktop"; // fallback
  };

  // Subheader showing the total count of runners
  const subheader: IAutoView.IAutoViewListSubheaderProps = {
    type: "ListSubheader",
    stickToTop: true,
    childrenProps: [
      {
        type: "Text",
        content: `Total runners: ${input.total_count}`,
      },
    ],
  };

  // Create one ListItem per runner
  const items: IAutoView.IAutoViewListItemProps[] = input.runners.map((r) => {
    // Start icon reflects OS and status (online=green, offline=gray)
    const startIcon: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: getOsIconId(r.os),
      color: r.status.toLowerCase() === "online" ? "green" : "gray",
      size: 24,
    };

    // End-element chips for busy/ephemeral flags + custom labels
    const chips: IAutoView.IAutoViewChipProps[] = [];

    if (r.busy) {
      chips.push({
        type: "Chip",
        label: "busy",
        color: "orange",
        size: "small",
        variant: "filled",
      });
    }

    if (r.ephemeral) {
      chips.push({
        type: "Chip",
        label: "ephemeral",
        color: "blue",
        size: "small",
        variant: "outlined",
      });
    }

    for (const lbl of r.labels || []) {
      chips.push({
        type: "Chip",
        label: lbl.name,
        color: lbl.type === "custom" ? "cyan" : "gray",
        size: "small",
        variant: "outlined",
      });
    }

    return {
      type: "ListItem",
      title: r.name,
      description: r.os,
      startElement: startIcon,
      endElement: chips.length ? chips : undefined,
    };
  });

  // Compose the final List component
  return {
    type: "List",
    childrenProps: [subheader, ...items],
  };
}

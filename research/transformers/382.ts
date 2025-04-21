import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiOrgsActionsHostedRunnersMachineSizes {
        export type GetResponse = {
            total_count: number & tags.Type<"int32">;
            machine_specs: Schema.actions_hosted_runner_machine_spec[];
        };
    }
    /**
     * Provides details of a particular machine spec.
     *
     * @title Github-owned VM details.
    */
    export type actions_hosted_runner_machine_spec = {
        /**
         * The ID used for the `size` parameter when creating a new runner.
        */
        id: string;
        /**
         * The number of cores.
        */
        cpu_cores: number & tags.Type<"int32">;
        /**
         * The available RAM for the machine spec.
        */
        memory_gb: number & tags.Type<"int32">;
        /**
         * The available SSD storage for the machine spec.
        */
        storage_gb: number & tags.Type<"int32">;
    };
}
type IAutoViewTransformerInputType = Schema.IApiOrgsActionsHostedRunnersMachineSizes.GetResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  const { total_count, machine_specs } = input;

  // Transform each machine spec into a DataListItem with icon-based Chips for CPU, Memory, and Storage
  const specItems: IAutoView.IAutoViewDataListItemProps[] = machine_specs.map(spec => ({
    type: "DataListItem",
    // Label column: the machine spec ID
    label: [
      {
        type: "Text",
        // Display the spec ID as plain text
        content: spec.id
      }
    ],
    // Value column: a row of Chips, each with an icon and value
    value: [
      {
        type: "Chip",
        label: `${spec.cpu_cores} cores`,
        startElement: {
          type: "Icon",
          id: "microchip",    // CPU icon
          size: 16,
          color: "gray"
        },
        color: "primary",
        size: "small",
        variant: "outlined"
      },
      {
        type: "Chip",
        label: `${spec.memory_gb} GB`,
        startElement: {
          type: "Icon",
          id: "memory",       // RAM icon
          size: 16,
          color: "gray"
        },
        color: "info",
        size: "small",
        variant: "outlined"
      },
      {
        type: "Chip",
        label: `${spec.storage_gb} GB`,
        startElement: {
          type: "Icon",
          id: "hdd",          // Storage icon
          size: 16,
          color: "gray"
        },
        color: "secondary",
        size: "small",
        variant: "outlined"
      }
    ]
  }));

  // If no specs, show a friendly Markdown message
  const contentChildren: IAutoView.IAutoViewPresentationComponentProps[] =
    specItems.length > 0
      ? [
          {
            type: "DataList",
            childrenProps: specItems
          }
        ]
      : [
          {
            type: "Markdown",
            content: "_No machine specs available._"
          }
        ];

  // Compose the final VerticalCard with a header and the content
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        title: "Hosted Runner Machine Specs",
        description: `Total specs: ${total_count}`,
        startElement: {
          type: "Icon",
          id: "server",   // A server icon to represent the collection
          size: 24,
          color: "blue"
        }
      },
      {
        type: "CardContent",
        childrenProps: contentChildren
      }
    ]
  };
}

import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiReposCodespacesDevcontainers {
        export type GetResponse = {
            total_count: number & tags.Type<"int32">;
            devcontainers: {
                path: string;
                name?: string;
                display_name?: string;
            }[];
        };
    }
}
type IAutoViewTransformerInputType = Schema.IApiReposCodespacesDevcontainers.GetResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Construct a DataListItem for each devcontainer
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = input.devcontainers.map((dc) => {
    // Derive a display name: prefer display_name, then name, then fallback to path
    const displayName = dc.display_name ?? dc.name ?? dc.path;

    return {
      type: 'DataListItem',
      // Left column: friendly name
      label: {
        type: 'Text',
        content: displayName,
      },
      // Right column: the actual filesystem path
      value: {
        type: 'Text',
        content: dc.path,
      },
    };
  });

  // Wrap the items in a DataList component
  const devcontainerList: IAutoView.IAutoViewDataListProps = {
    type: 'DataList',
    childrenProps: dataListItems,
  };

  // Header showing total count with a badge+icon
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: 'CardHeader',
    title: `Devcontainers (${input.total_count})`,
    startElement: {
      type: 'Badge',
      count: input.total_count,
      showZero: true,
      childrenProps: {
        type: 'Icon',
        id: 'folder',
        color: 'blue',
        size: 20,
      },
    },
  };

  // If there are no devcontainers, show a friendly markdown message
  if (input.devcontainers.length === 0) {
    const emptyMessage: IAutoView.IAutoViewMarkdownProps = {
      type: 'Markdown',
      content: '### No devcontainers found.',
    };
    return {
      type: 'VerticalCard',
      childrenProps: [
        header,
        { type: 'CardContent', childrenProps: emptyMessage },
      ],
    };
  }

  // Return a vertical card with header and list of devcontainers
  return {
    type: 'VerticalCard',
    childrenProps: [
      header,
      { type: 'CardContent', childrenProps: devcontainerList },
    ],
  };
}

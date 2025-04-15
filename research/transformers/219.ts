import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace TryPagination_lt_AlarmType {
    export type ReadResponseType_gt_ = {
        result: true & tags.JsonSchemaPlugin<{
            "x-typia-required": true,
            "x-typia-optional": false
        }>;
        code: 1000 & tags.JsonSchemaPlugin<{
            "x-typia-required": true,
            "x-typia-optional": false
        }>;
        requestToResponse?: string & tags.JsonSchemaPlugin<{
            "x-typia-required": false,
            "x-typia-optional": true
        }>;
        data: PaginationResponseType_lt_AlarmType.ReadResponseType_gt_;
    };
}
namespace PaginationResponseType_lt_AlarmType {
    export type ReadResponseType_gt_ = {
        list: AlarmType.Element[] & tags.JsonSchemaPlugin<{
            "x-typia-required": true,
            "x-typia-optional": false
        }>;
        count: number & tags.JsonSchemaPlugin<{
            "x-typia-required": true,
            "x-typia-optional": false
        }>;
        totalResult: number & tags.JsonSchemaPlugin<{
            "x-typia-required": true,
            "x-typia-optional": false
        }>;
        totalPage: number & tags.JsonSchemaPlugin<{
            "x-typia-required": true,
            "x-typia-optional": false
        }>;
        search?: string & tags.JsonSchemaPlugin<{
            "x-typia-required": false,
            "x-typia-optional": true
        }>;
        page: number & tags.JsonSchemaPlugin<{
            "x-typia-required": true,
            "x-typia-optional": false
        }>;
    };
}
namespace AlarmType {
    export type Element = {
        id: number & tags.JsonSchemaPlugin<{
            "x-typia-required": true,
            "x-typia-optional": false
        }>;
        /**
         * 유저의 아이디
        */
        userId: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
            "x-typia-metaTags": [
                {
                    kind: "type",
                    value: "int"
                }
            ],
            "x-typia-jsDocTags": [
                {
                    name: "type",
                    text: [
                        {
                            text: "int",
                            kind: "text"
                        }
                    ]
                }
            ],
            "x-typia-required": true,
            "x-typia-optional": false
        }>;
        resourceName?: string & tags.JsonSchemaPlugin<{
            "x-typia-required": false,
            "x-typia-optional": true
        }>;
        /**
         * 알람이 가리키는 리소스의 아이디로, 리소스마다 동일한 숫자의 아이디를 가질 수 있기에 유니크한 값이 아니다.
        */
        resourceId?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
            "x-typia-metaTags": [
                {
                    kind: "type",
                    value: "int"
                }
            ],
            "x-typia-jsDocTags": [
                {
                    name: "type",
                    text: [
                        {
                            text: "int",
                            kind: "text"
                        }
                    ]
                }
            ],
            "x-typia-required": false,
            "x-typia-optional": true
        }>;
        redirectLink?: number & tags.JsonSchemaPlugin<{
            "x-typia-required": false,
            "x-typia-optional": true
        }>;
    };
}
type IAutoViewTransformerInputType = TryPagination_lt_AlarmType.ReadResponseType_gt_;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Extract the pagination data from the input response.
  const { data } = input;
  // data is of type PaginationResponseType_lt_AlarmType.ReadResponseType_gt_
  const { list, totalResult, totalPage, page } = data;

  // Compose the card header to display a summary of the alarms.
  // We use an icon alongside text to make the UI more visually engaging.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Alarm Notifications",
    description: `Total Alarms: ${totalResult}. Showing page ${page} of ${totalPage}.`,
    // The startElement is an icon representing alarms.
    startElement: {
      type: "Icon",
      id: "bell", // assuming "bell" is a valid icon name in kebab-case
      color: "red",
      size: 24,
    },
  };

  // Build the list of alarm items as DataList items.
  // Each alarm is transformed into a DataListItem with visual components.
  let dataListItems: IAutoView.IAutoViewDataListItemProps[];

  if (list.length > 0) {
    dataListItems = list.map((alarm) => {
      // For each alarm, we design a list item that shows its details using both an icon and markdown.
      // The icon emphasizes the nature of the item,
      // while the markdown component provides formatted information.
      return {
        type: "DataListItem",
        label: [
          {
            // Use an icon to visually indicate an alert.
            type: "Icon",
            id: "alert", // assuming "alert" is a valid icon name in kebab-case
            color: "orange",
            size: 16,
          },
          {
            // Use markdown for formatted presentation of the alarm details.
            type: "Markdown",
            content: `**Alarm ID:** ${alarm.id}\n\n` +
                     `- **User ID:** ${alarm.userId}\n` +
                     `- **Resource:** ${alarm.resourceName ?? "N/A"}\n` +
                     `- **Resource ID:** ${alarm.resourceId !== undefined ? alarm.resourceId : "N/A"}\n` +
                     `- **Redirect Link:** ${alarm.redirectLink !== undefined ? alarm.redirectLink : "N/A"}`,
          },
        ],
      } as IAutoView.IAutoViewDataListItemProps;
    });
  } else {
    // If there are no alarms in the list, provide a single DataListItem indicating an empty state.
    dataListItems = [
      {
        type: "DataListItem",
        label: {
          type: "Markdown",
          content: "### No Alarms to Display\n\nThere are currently no alarms.",
        },
      } as IAutoView.IAutoViewDataListItemProps,
    ];
  }

  // Compose the DataList component that will contain all the alarm items.
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListItems,
  };

  // Wrap the DataList inside a CardContent component.
  // This allows for a structured and visually engaging layout.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList,
  };

  // Finally, we compose a Vertical Card to present the header and the content.
  // Vertical Cards are suitable for responsive designs on both web and mobile devices.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent],
  };

  // Return the composed AutoView component props.
  return verticalCard;
}

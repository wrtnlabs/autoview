import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace TryPagination_lt_AlarmType {
        export type ReadResponseType_gt_ = {
            result: true;
            code: 1000;
            requestToResponse?: string;
            data: Schema.PaginationResponseType_lt_AlarmType.ReadResponseType_gt_;
        };
    }
    export namespace PaginationResponseType_lt_AlarmType {
        export type ReadResponseType_gt_ = {
            list: Schema.AlarmType.Element[];
            count: number;
            totalResult: number;
            totalPage: number;
            search?: string;
            page: number;
        };
    }
    export namespace AlarmType {
        export type Element = {
            id: number;
            /**
             * 유저의 아이디
            */
            userId: number & tags.Type<"int32">;
            resourceName?: string;
            /**
             * 알람이 가리키는 리소스의 아이디로, 리소스마다 동일한 숫자의 아이디를 가질 수 있기에 유니크한 값이 아니다.
            */
            resourceId?: number & tags.Type<"int32">;
            redirectLink?: number;
        };
    }
}
type IAutoViewTransformerInputType = Schema.TryPagination_lt_AlarmType.ReadResponseType_gt_;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Destructure pagination and list data
  const {
    data: { list, page, totalPage, totalResult },
  } = input;

  // Edge case: no alarms to display
  if (!Array.isArray(list) || list.length === 0) {
    return {
      type: "Markdown",
      content: "### No alarms found",
    };
  }

  // Build each DataListItem for alarms
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = list.map((alarm) => {
    // Icon to denote an alarm
    const alarmIcon: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: "bell",           // FontAwesome bell icon
      color: "orange",
      size: 24,
    };

    // Text showing the user ID
    const userText: IAutoView.IAutoViewTextProps = {
      type: "Text",
      variant: "body2",
      content: `User ${alarm.userId}`,
    };

    // Assemble label: [Icon, Text]
    const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
      alarmIcon,
      userText,
    ];

    // Build chips for resource info if available
    const chips: IAutoView.IAutoViewChipProps[] = [];
    if (typeof alarm.resourceName === "string") {
      chips.push({
        type: "Chip",
        label: alarm.resourceName,
        variant: "filled",
        size: "small",
        color: "primary",
      });
    }
    if (typeof alarm.resourceId === "number") {
      chips.push({
        type: "Chip",
        label: `#${alarm.resourceId}`,
        variant: "outlined",
        size: "small",
        color: "secondary",
      });
    }

    // Wrap chips in a ChipGroup if any exist
    const valueComponent: IAutoView.IAutoViewChipGroupProps | undefined =
      chips.length > 0
        ? {
            type: "ChipGroup",
            childrenProps: chips,
            maxItems: chips.length,
          }
        : undefined;

    return {
      type: "DataListItem",
      // label can be an array of presentation components
      label: labelComponents,
      // value can be a single presentation component (ChipGroup)
      value: valueComponent,
    };
  });

  // The DataList component to list all alarms
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListItems,
  };

  // Card header with title and pagination summary
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Alarm Notifications",
    description: `Page ${page} of ${totalPage} • ${totalResult} total`,
    startElement: {
      type: "Icon",
      id: "bell",
      color: "orange",
      size: 32,
    },
  };

  // Card content to embed the DataList
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList,
  };

  // Wrap everything in a vertical card for a clean, responsive layout
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent],
  };

  return card;
}

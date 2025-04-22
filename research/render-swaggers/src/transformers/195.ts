import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export type LegacyV4OneTimeMsgView = {
                    oneTimeMsg?: Schema.legacy.v4.marketing.LegacyV4OneTimeMsg;
                };
            }
        }
        export namespace v4 {
            export namespace marketing {
                export type LegacyV4OneTimeMsg = {
                    id?: string;
                    channelId?: string;
                    name: string;
                    state: "draft" | "waiting" | "sent" | "canceled" | "removed";
                    sendMode?: "immediately" | "reservedWithSenderTime" | "reservedWithReceiverTime";
                    sendMedium?: "appAlimtalk" | "appLine" | "email" | "inAppChat" | "xms";
                    settings?: Schema.marketing.SendMediumSettings;
                    userQuery?: Schema.Expression;
                    goalEventName?: string;
                    goalEventQuery?: Schema.Expression;
                    enableSupportBot: boolean;
                    followingSupportBotId?: string;
                    advertising: boolean;
                    sendToOfflineXms?: boolean;
                    sendToOfflineEmail?: boolean;
                    startAt?: number;
                    draft?: Schema.marketing.OneTimeMsgDraft;
                    createdAt?: number;
                    updatedAt?: number;
                    sent?: number & tags.Type<"int32">;
                    view?: number & tags.Type<"int32">;
                    goal?: number & tags.Type<"int32">;
                    click?: number & tags.Type<"int32">;
                    userChatExpireDuration?: string;
                };
            }
        }
    }
    export namespace marketing {
        export type SendMediumSettings = {
            type: string;
        };
        export type OneTimeMsgDraft = {
            oneTimeMsg: Schema.marketing.OneTimeMsg;
        };
        export type OneTimeMsg = {
            id?: string;
            channelId?: string;
            name: string;
            state: "draft" | "waiting" | "sent" | "canceled" | "removed";
            sendMode?: "immediately" | "reservedWithSenderTime" | "reservedWithReceiverTime";
            channelOperationId?: string;
            sendMedium?: "appAlimtalk" | "appLine" | "email" | "inAppChat" | "xms";
            settings?: Schema.marketing.SendMediumSettings;
            userQuery?: Schema.Expression;
            goalEventName?: string;
            goalEventQuery?: Schema.Expression;
            goalEventDuration?: string;
            advertising: boolean;
            sendToOfflineXms?: boolean;
            sendToOfflineEmail?: boolean;
            startAt?: number;
            localStartAt?: string & tags.Format<"date-time">;
            draft?: Schema.marketing.OneTimeMsgDraft;
            createdAt?: number;
            updatedAt?: number;
            sent?: number & tags.Type<"int32">;
            view?: number & tags.Type<"int32">;
            goal?: number & tags.Type<"int32">;
            click?: number & tags.Type<"int32">;
            userChatExpireDuration?: string;
        };
    }
    export type Expression = {
        key?: string;
        type?: "boolean" | "date" | "datetime" | "list" | "listOfNumber" | "number" | "string" | "listOfObject";
        operator?: Schema.Operator;
        values?: {}[];
        and?: Schema.Expression[];
        or?: Schema.Expression[];
    };
    export type Operator = {};
}
type IAutoViewTransformerInputType = Schema.legacy.open.v4.LegacyV4OneTimeMsgView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  const msg = input.oneTimeMsg;
  // If there's no message data, show a simple markdown notice
  if (!msg) {
    return {
      type: "Markdown",
      content: "### No message data available."
    };
  }

  // Helper: format timestamps (milliseconds) into a locale string
  const formatDate = (ts?: number): string =>
    ts != null ? new Date(ts).toLocaleString() : "-";

  // Map message state to a chip color
  const stateColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
    draft: "gray",
    waiting: "yellow",
    sent: "green",
    canceled: "red",
    removed: "darkGray"
  };

  // Map send mediums to icons
  const mediumIconMap: Record<string, string> = {
    appAlimtalk: "comment",
    appLine: "line",
    email: "envelope",
    inAppChat: "comments",
    xms: "sms"
  };

  // Build header: show name, channel, an icon and a state badge
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: msg.name,
    description: msg.channelId ? `Channel: ${msg.channelId}` : undefined,
    // Marketing bullhorn icon
    startElement: {
      type: "Icon",
      id: "bullhorn",
      color: "blue",
      size: 24
    },
    // State chip on the right
    endElement: {
      type: "Chip",
      label: msg.state,
      color: stateColorMap[msg.state] ?? "primary",
      variant: "filled"
    }
  };

  // Build a data list of key properties
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [
    { key: "ID",             value: msg.id ?? "-",           icon: "hashtag"   },
    { key: "State",          value: msg.state,               icon: "info-circle" },
    { key: "Send Mode",      value: msg.sendMode ?? "-",      icon: "clock"     },
    { key: "Medium",         value: msg.sendMedium ?? "-",    icon: mediumIconMap[msg.sendMedium ?? ""] ?? "question" },
    { key: "Start At",       value: formatDate(msg.startAt),  icon: "calendar"  },
    { key: "Created At",     value: formatDate(msg.createdAt),icon: "calendar-check" },
    { key: "Updated At",     value: formatDate(msg.updatedAt),icon: "edit"      }
  ].map(item => {
    // For each entry, use DataListItem with an icon + markdown label and markdown value
    const labelMd = `![icon](/icon/${item.icon}) **${item.key}**`;
    return {
      type: "DataListItem",
      label: [
        {
          type: "Markdown",
          content: labelMd
        }
      ],
      value: [
        {
          type: "Text",
          content: item.value
        }
      ]
    };
  });

  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListItems
  };

  // Build a set of metric chips for sent/view/click/goal
  const metricChips: IAutoView.IAutoViewChipProps[] = [];
  if (msg.sent != null) {
    metricChips.push({ type: "Chip", label: `Sent: ${msg.sent}`, color: "primary", variant: "outlined" });
  }
  if (msg.view != null) {
    metricChips.push({ type: "Chip", label: `Viewed: ${msg.view}`, color: "secondary", variant: "outlined" });
  }
  if (msg.click != null) {
    metricChips.push({ type: "Chip", label: `Clicked: ${msg.click}`, color: "success", variant: "outlined" });
  }
  if (msg.goal != null) {
    metricChips.push({ type: "Chip", label: `Goal: ${msg.goal}`, color: "info", variant: "outlined" });
  }

  const metricsGroup: IAutoView.IAutoViewChipGroupProps | undefined =
    metricChips.length > 0
      ? {
          type: "ChipGroup",
          childrenProps: metricChips,
          maxItems: 4
        }
      : undefined;

  // Assemble the card content: DataList and metrics
  const contentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [
    dataList,
    { type: "Divider", orientation: "horizontal", color: "#eee" }
  ];
  if (metricsGroup) {
    contentChildren.push(metricsGroup);
  }

  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: contentChildren
  };

  // Footer: a chip summarizing send mode, if available
  const footerChild: IAutoView.IAutoViewChipProps | undefined = msg.sendMode
    ? {
        type: "Chip",
        label: `Mode: ${msg.sendMode}`,
        variant: "outlined",
        color: "gray"
      }
    : undefined;

  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: footerChild ? footerChild : []
  };

  // Return a vertical card with header, content, footer
  return {
    type: "VerticalCard",
    childrenProps: [header, content, footer]
  };
}

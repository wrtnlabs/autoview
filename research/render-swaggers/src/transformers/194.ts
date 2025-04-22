import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export type LegacyV4OneTimeMsgsView = {
                    oneTimeMsgs?: Schema.legacy.v4.marketing.LegacyV4OneTimeMsg[];
                    next?: number;
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
type IAutoViewTransformerInputType = Schema.legacy.open.v4.LegacyV4OneTimeMsgsView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  const msgs = input.oneTimeMsgs ?? [];

  // If there are no messages, show a friendly markdown message
  if (msgs.length === 0) {
    return {
      type: "Markdown",
      content: "## No one-time messages found."
    };
  }

  // Define mappings for message state to icon and color
  const stateIconMap: Record<string, string> = {
    draft: "pencil-alt",
    waiting: "clock",
    sent: "check",
    canceled: "times",
    removed: "trash"
  };
  const stateColorMap: Record<string, IAutoView.IAutoViewIconProps["color"]> = {
    draft: "gray",
    waiting: "yellow",
    sent: "green",
    canceled: "red",
    removed: "darkGray"
  };

  // Transform each message into a DataListItem
  const childrenProps: IAutoView.IAutoViewDataListItemProps[] = msgs.map(msg => {
    const iconId = stateIconMap[msg.state] || "info-circle";
    const iconColor = stateColorMap[msg.state] || "blue";

    // Label: icon + message name
    const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
      {
        type: "Icon",
        id: iconId,
        color: iconColor,
        size: 16
      },
      {
        type: "Text",
        variant: "body1",
        content: msg.name
      }
    ];

    // Prepare metric chips for sent, viewed, clicked, goal
    const metricChips: IAutoView.IAutoViewChipProps[] = [];
    const metrics: { label: string; value?: number }[] = [
      { label: "Sent", value: msg.sent },
      { label: "Viewed", value: msg.view },
      { label: "Clicked", value: msg.click },
      { label: "Goal", value: msg.goal }
    ];
    metrics.forEach(m => {
      if (typeof m.value === "number") {
        metricChips.push({
          type: "Chip",
          label: `${m.label}: ${m.value}`,
          size: "small",
          variant: "outlined",
          color: "primary"
        });
      }
    });

    // Value: either a ChipGroup of metrics or a fallback text
    const valueComponent: IAutoView.IAutoViewPresentationComponentProps = metricChips.length > 0
      ? {
          type: "ChipGroup",
          childrenProps: metricChips
        }
      : {
          type: "Text",
          variant: "caption",
          content: "No metrics available"
        };

    return {
      type: "DataListItem",
      label: labelComponents,
      value: valueComponent
    };
  });

  // Compose the DataList to render all items
  return {
    type: "DataList",
    childrenProps
  };
}

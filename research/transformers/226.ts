import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace open {
        export namespace marketing {
            export type CampaignView = {
                campaign?: Schema.marketing.Campaign;
                msgs?: Schema.marketing.CampaignMsg[];
            };
        }
    }
    export namespace marketing {
        /**
         * ### 이벤트 기록
         *
         * - 마케팅 이벤트 기록에 대한 [문서](https://www.notion.so/channelio/e5d745446b6342198e9e5b004e48d312)
        */
        export type Campaign = {
            id?: string;
            channelId?: string;
            name: string;
            state?: "draft" | "active" | "stopped" | "removed";
            sendMedium: "appAlimtalk" | "appLine" | "email" | "inAppChat" | "xms";
            userQuery?: Schema.Expression;
            triggerEventName: string;
            triggerEventQuery?: Schema.Expression;
            waitingTime: string;
            filterEventName?: string;
            filterEventQuery?: Schema.Expression;
            filterMatch?: "positive" | "negative";
            filterHpc?: Schema.marketing.HoldingPropertyConstant;
            goalEventName?: string;
            goalEventQuery?: Schema.Expression;
            goalEventDuration?: string;
            goalHpc?: Schema.marketing.HoldingPropertyConstant;
            advertising: boolean;
            sendToOfflineXms?: boolean;
            sendToOfflineEmail?: boolean;
            cooldown?: string;
            sendMode: "always" | "away" | "inOperation" | "customUsingSenderTime" | "customUsingReceiverTime" | "custom";
            channelOperationId?: string;
            sendTimeRanges?: Schema.TimeRange[];
            startAt?: number;
            endAt?: number;
            deleteMessageAfterStop?: boolean;
            draft?: Schema.marketing.CampaignDraft;
            createdAt?: number;
            updatedAt?: number;
            sent?: number & tags.Type<"int32">;
            view?: number & tags.Type<"int32">;
            goal?: number & tags.Type<"int32">;
            click?: number & tags.Type<"int32">;
            userChatExpireDuration?: string;
            managerId?: string;
            recipeCaseId?: string;
        };
        export type HoldingPropertyConstant = {
            baseEventName: string;
            baseEventKey: string;
            eventQuery?: Schema.Expression;
            baseEventType: "triggerEvent" | "additionalFilter";
            operator?: Schema.EventSchema;
            values?: {};
        };
        export type CampaignDraft = {
            campaign: Schema.marketing.Campaign;
            msgs: Schema.marketing.CampaignMsg[] & tags.MinItems<1> & tags.MaxItems<4>;
        };
        export type CampaignMsg = {
            id: string;
            campaignId?: string;
            channelId?: string;
            name: string;
            sendMedium: "appAlimtalk" | "appLine" | "email" | "inAppChat" | "xms";
            settings: Schema.marketing.SendMediumSettings;
            createdAt?: number;
            updatedAt?: number;
            sent?: number & tags.Type<"int32">;
            view?: number & tags.Type<"int32">;
            goal?: number & tags.Type<"int32">;
            click?: number & tags.Type<"int32">;
        };
        export type SendMediumSettings = {
            type: string;
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
    export type EventSchema = {
        id?: string;
        channelId?: string;
        eventName?: string;
        key?: string;
        parentKey?: string;
        type?: "boolean" | "date" | "datetime" | "list" | "listOfNumber" | "number" | "string" | "listOfObject";
        createdAt?: number;
        updatedAt?: number;
        icon?: string;
    };
    export type TimeRange = {
        dayOfWeeks: ("mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun")[] & tags.UniqueItems;
        from: number & tags.Type<"uint32"> & tags.Maximum<1440>;
        to: number & tags.Type<"uint32"> & tags.Maximum<1440>;
    };
}
type IAutoViewTransformerInputType = Schema.open.marketing.CampaignView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  const campaign = input.campaign;
  // If there's no campaign data, show a simple text notice
  if (!campaign) {
    return {
      type: "Text",
      content: "No campaign data available.",
      variant: "body1",
    };
  }

  // Map sendMedium to a FontAwesome icon name
  const mediumIconMap: Record<string, string> = {
    email: "envelope",
    appAlimtalk: "comment",
    appLine: "comment-dots",
    inAppChat: "comments",
    xms: "sms",
  };
  const mediumIcon = mediumIconMap[campaign.sendMedium] || "bell";

  // Map campaign state to a color for the Chip
  const stateColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
    draft: "gray",
    active: "success",
    stopped: "warning",
    removed: "error",
  };
  const stateColor = stateColorMap[campaign.state ?? ""] ?? "gray";

  // Build the CardHeader: name + trigger event, with icons and state chip
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: campaign.name,
    description: campaign.triggerEventName,
    startElement: {
      type: "Icon",
      id: mediumIcon,
      size: 24,
      color: "blue",
    },
    endElement: {
      type: "Chip",
      label: campaign.state ?? "unknown",
      variant: "filled",
      color: stateColor,
    },
  };

  // Helper to collect key/value pairs into DataListItems
  const details: IAutoView.IAutoViewDataListItemProps[] = [];
  function addDetail(label: string, value: string) {
    details.push({
      type: "DataListItem",
      label: [
        {
          type: "Text",
          content: label,
          variant: "subtitle2",
        },
      ],
      value: [
        {
          type: "Text",
          content: value,
          variant: "body2",
        },
      ],
    });
  }

  // Core campaign details
  addDetail("Send Medium", campaign.sendMedium);
  addDetail("Waiting Time", campaign.waitingTime);
  if (campaign.startAt !== undefined) {
    addDetail(
      "Start At",
      new Date(campaign.startAt).toLocaleString()
    );
  }
  if (campaign.endAt !== undefined) {
    addDetail("End At", new Date(campaign.endAt).toLocaleString());
  }
  if (campaign.filterEventName) {
    addDetail("Filter Event", campaign.filterEventName);
  }
  if (campaign.goalEventName) {
    addDetail("Goal Event", campaign.goalEventName);
  }
  // Aggregate stats if present
  if (campaign.sent !== undefined) {
    addDetail("Sent", campaign.sent.toString());
  }
  if (campaign.view !== undefined) {
    addDetail("Viewed", campaign.view.toString());
  }
  if (campaign.click !== undefined) {
    addDetail("Clicked", campaign.click.toString());
  }

  // CardContent with a DataList of campaign properties
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "DataList",
      childrenProps: details,
    },
  };

  // Footer: list out each message with its own stats
  const msgs = input.msgs ?? [];
  let footerChildren: IAutoView.IAutoViewComponentProps;
  if (msgs.length > 0) {
    const msgItems: IAutoView.IAutoViewDataListItemProps[] = msgs.map(
      (msg) => {
        const stats = `Sent: ${msg.sent ?? 0}, View: ${msg.view ?? 0}, Click: ${msg.click ?? 0}`;
        return {
          type: "DataListItem",
          label: [
            {
              type: "Text",
              content: msg.name,
              variant: "body1",
            },
          ],
          value: [
            {
              type: "Text",
              content: stats,
              variant: "body2",
            },
          ],
        };
      }
    );
    footerChildren = {
      type: "DataList",
      childrenProps: msgItems,
    };
  } else {
    footerChildren = {
      type: "Text",
      content: "No messages associated with this campaign.",
      variant: "body2",
    };
  }

  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: footerChildren,
  };

  // Wrap everything in a VerticalCard for a responsive, stacked layout
  return {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };
}

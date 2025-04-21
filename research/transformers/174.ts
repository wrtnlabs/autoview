import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export type LegacyV4CampaignView = {
                    campaign?: Schema.legacy.v4.marketing.LegacyV4Campaign;
                    msgs?: Schema.legacy.v4.marketing.LegacyV4CampaignMsg[];
                };
            }
        }
        export namespace v4 {
            export namespace marketing {
                /**
                 * ### 이벤트 기록
                 *
                 * - 마케팅 이벤트 기록에 대한 [문서](https://www.notion.so/channelio/e5d745446b6342198e9e5b004e48d312)
                */
                export type LegacyV4Campaign = {
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
                    goalEventName?: string;
                    goalEventQuery?: Schema.Expression;
                    advertising: boolean;
                    enableSupportBot: boolean;
                    followingSupportBotId?: string;
                    sendToOfflineXms?: boolean;
                    sendToOfflineEmail?: boolean;
                    cooldown?: string;
                    sendMode: "always" | "away" | "inOperation" | "customUsingSenderTime" | "customUsingReceiverTime" | "custom";
                    sendTimeRanges?: Schema.TimeRange[];
                    startAt?: number;
                    endAt?: number;
                    draft?: Schema.marketing.CampaignDraft;
                    createdAt?: number;
                    updatedAt?: number;
                    sent?: number & tags.Type<"int32">;
                    view?: number & tags.Type<"int32">;
                    goal?: number & tags.Type<"int32">;
                    click?: number & tags.Type<"int32">;
                    userChatExpireDuration?: string;
                    managerId?: string;
                };
                export type LegacyV4CampaignMsg = {
                    id: string;
                    campaignId?: string;
                    name: string;
                    sendMedium: "appAlimtalk" | "appLine" | "email" | "inAppChat" | "xms";
                    settings?: Schema.marketing.SendMediumSettings;
                    createdAt?: number;
                    updatedAt?: number;
                    sent?: number & tags.Type<"int32">;
                    view?: number & tags.Type<"int32">;
                    goal?: number & tags.Type<"int32">;
                    click?: number & tags.Type<"int32">;
                };
            }
        }
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
    export type TimeRange = {
        dayOfWeeks: ("mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun")[] & tags.UniqueItems;
        from: number & tags.Type<"uint32"> & tags.Maximum<1440>;
        to: number & tags.Type<"uint32"> & tags.Maximum<1440>;
    };
    export namespace marketing {
        export type CampaignDraft = {
            campaign: Schema.marketing.Campaign;
            msgs: Schema.marketing.CampaignMsg[] & tags.MinItems<1> & tags.MaxItems<4>;
        };
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
}
type IAutoViewTransformerInputType = Schema.legacy.open.v4.LegacyV4CampaignView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



// Transform LegacyV4CampaignView into a visual AutoView component
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  const campaign = input.campaign;
  // Fallback for missing campaign data
  if (!campaign) {
    return {
      type: "Text",
      content: "No campaign data available",
    };
  }

  /**
   * Map each sendMedium to a FontAwesome icon and color.
   * We use this for the card header's startElement.
   */
  const mediumIconMap: Record<string, { id: string; color: IAutoView.IAutoViewIconProps["color"] }> = {
    appAlimtalk: { id: "bell", color: "orange" },
    appLine:     { id: "comment", color: "green" },
    email:       { id: "envelope", color: "blue" },
    inAppChat:   { id: "comments", color: "teal" },
    xms:         { id: "mobile-alt", color: "indigo" },
  };
  const med = mediumIconMap[campaign.sendMedium] || { id: "bell", color: "gray" };
  const headerIcon: IAutoView.IAutoViewIconProps = {
    type: "Icon",
    id: med.id,
    color: med.color,
    size: 32,
  };

  // Convert campaign.state into an uppercase label chip with a color code
  const stateColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
    draft:   "gray",
    active:  "green",
    stopped: "orange",
    removed: "red",
  };
  const stateChip: IAutoView.IAutoViewChipProps = {
    type:    "Chip",
    label:   (campaign.state || "unknown").toUpperCase(),
    variant: "filled",
    color:   stateColorMap[campaign.state || "draft"],
    size:    "medium",
  };

  // Build a list of DataListItemProps for the core campaign details
  const items: IAutoView.IAutoViewDataListItemProps[] = [];
  const addItem = (
    label: string,
    value: string | IAutoView.IAutoViewMarkdownProps | IAutoView.IAutoViewTextProps
  ) => {
    // Wrap plain strings into Text components
    const valComponent: IAutoView.IAutoViewPresentationComponentProps =
      typeof value === "string"
        ? { type: "Text", content: value }
        : value;
    items.push({
      type:  "DataListItem",
      label: { type: "Text", content: label },
      value: valComponent,
    });
  };

  // Mandatory fields
  addItem("Trigger Event", campaign.triggerEventName);
  addItem("Waiting Time", campaign.waitingTime);

  // Optional filter event
  if (campaign.filterEventName) {
    addItem("Filter Event", campaign.filterEventName);
  }

  // Human‑friendly schedule rendering via Markdown list
  if (campaign.sendTimeRanges && campaign.sendTimeRanges.length > 0) {
    const md = campaign.sendTimeRanges
      .map(tr => `- **Days**: ${tr.dayOfWeeks.join(", ")}, **From**: ${tr.from}, **To**: ${tr.to}`)
      .join("\n");
    addItem("Schedule", { type: "Markdown", content: md });
  }

  // Boolean flags
  addItem("Advertising", campaign.advertising ? "Yes" : "No");
  addItem("Support Bot", campaign.enableSupportBot ? "Enabled" : "Disabled");

  // Send mode
  addItem("Send Mode", campaign.sendMode);

  // Summarize all messages if present using Markdown bullets
  if (input.msgs && input.msgs.length > 0) {
    const msgsMd = input.msgs
      .map(m => {
        const parts = [
          `**${m.name}** (${m.sendMedium})`,
          m.sent   !== undefined ? `Sent: ${m.sent}` : null,
          m.view   !== undefined ? `View: ${m.view}` : null,
          m.click  !== undefined ? `Click: ${m.click}` : null,
          m.goal   !== undefined ? `Goal: ${m.goal}` : null,
        ].filter(Boolean).join(" | ");
        return `- ${parts}`;
      })
      .join("\n");
    addItem("Messages", { type: "Markdown", content: msgsMd });
  }

  // Wrap into a DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type:         "DataList",
    childrenProps: items,
  };

  // Metrics chips at the footer: Sent / Views / Goals / Clicks
  const metrics = [
    { key: "Sent",  value: campaign.sent, icon: "paper-plane"      },
    { key: "Views", value: campaign.view, icon: "eye"               },
    { key: "Goals", value: campaign.goal, icon: "bullseye"          },
    { key: "Clicks",value: campaign.click, icon: "mouse-pointer"    },
  ];
  const metricChips: IAutoView.IAutoViewChipProps[] = metrics
    .filter(m => m.value !== undefined)
    .map(m => ({
      type:         "Chip",
      label:        `${m.value}`,
      startElement: { type: "Icon", id: m.icon, size: 16 },
      color:        "primary",
      size:         "small",
      variant:      "outlined",
    }));
  const footerChips: IAutoView.IAutoViewChipGroupProps = {
    type:         "ChipGroup",
    childrenProps: metricChips,
    maxItems:     4,
  };

  // Assemble the VerticalCard with Header, Content, and Footer
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type:         "CardHeader",
    title:        campaign.name,
    startElement: headerIcon,
    endElement:   stateChip,
  };
  const content: IAutoView.IAutoViewCardContentProps = {
    type:          "CardContent",
    childrenProps: dataList,
  };
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type:          "CardFooter",
    childrenProps: footerChips,
  };

  return {
    type:         "VerticalCard",
    childrenProps: [header, content, footer],
  };
}

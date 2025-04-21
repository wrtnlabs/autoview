import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace open {
        export namespace marketing {
            export type CampaignsView = {
                next?: number;
                campaigns?: Schema.marketing.Campaign[];
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
type IAutoViewTransformerInputType = Schema.open.marketing.CampaignsView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Utility: escape Markdown special characters in headings/content
  const escapeMarkdown = (text: string): string =>
    text.replace(/([\\`*_{}\[\]()#+\-.!])/g, "\\$1");

  // Map campaign state to emoji for visual cue
  const stateEmoji = (state?: string): string => {
    switch (state) {
      case "draft":
        return "📝";
      case "active":
        return "✔️";
      case "stopped":
        return "⏹️";
      case "removed":
        return "🗑️";
      default:
        return "❔";
    }
  };

  // Map sendMedium to emoji for visual cue
  const mediumEmoji = (medium: string): string => {
    switch (medium) {
      case "email":
        return "📧";
      case "appAlimtalk":
        return "💬";
      case "appLine":
        return "🔗";
      case "inAppChat":
        return "🗨️";
      case "xms":
        return "📱";
      default:
        return "ℹ️";
    }
  };

  // When there are no campaigns, show a friendly message
  if (!input.campaigns || input.campaigns.length === 0) {
    return {
      type: "Markdown",
      content: "### No campaigns available\nPlease check back later or ensure campaigns are configured correctly.",
    };
  }

  // Build a list of DataListItem components, one per campaign
  const items: IAutoView.IAutoViewDataListItemProps[] = input.campaigns.map((camp) => {
    // Compose the markdown for the details of this campaign
    const lines: string[] = [];

    // State line
    lines.push(
      `**State**: ${stateEmoji(camp.state)} ${escapeMarkdown(camp.state ?? "unknown")}`
    );

    // Medium line
    lines.push(
      `**Medium**: ${mediumEmoji(camp.sendMedium)} ${escapeMarkdown(camp.sendMedium)}`
    );

    // Timing lines
    if (camp.startAt !== undefined || camp.endAt !== undefined) {
      const start = camp.startAt !== undefined ? new Date(camp.startAt).toLocaleString() : "–";
      const end = camp.endAt !== undefined ? new Date(camp.endAt).toLocaleString() : "–";
      lines.push(`**Period**: ${start} → ${end}`);
    }

    // Key metrics lines
    if (camp.sent !== undefined) lines.push(`**Sent**: ${camp.sent}`);
    if (camp.view !== undefined) lines.push(`**Viewed**: ${camp.view}`);
    if (camp.click !== undefined) lines.push(`**Clicked**: ${camp.click}`);
    if (camp.goal !== undefined) lines.push(`**Goal**: ${camp.goal}`);

    // Join with two spaces + newline for markdown line break
    const detailContent = lines.join("  \n");

    return {
      type: "DataListItem",
      // Use markdown for the label (campaign title)
      label: {
        type: "Markdown",
        content: `#### ${escapeMarkdown(camp.name)}`,
      },
      // Use markdown for the value/details
      value: {
        type: "Markdown",
        content: detailContent,
      },
    };
  });

  // Return the DataList component wrapping all campaigns
  return {
    type: "DataList",
    childrenProps: items,
  };
}

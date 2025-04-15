import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace legacy {
    export namespace open {
        export namespace v4 {
            export type LegacyV4ChannelView = {
                channel?: legacy.v4.LegacyV4Channel;
                manager?: legacy.v4.LegacyV4Manager;
                managerBadge?: legacy.v4.LegacyV4ManagerBadge;
            };
        }
    }
    export namespace v4 {
        export type LegacyV4Channel = {
            id?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            name: string & tags.Pattern<"^[^@#$%:/\\\\]+$">;
            homepageUrl?: string;
            description?: string;
            nameDescI18nMap?: {
                [key: string]: NameDesc;
            };
            country?: string;
            createdAt?: number & tags.JsonSchemaPlugin<{
                format: "int64",
                readOnly: true
            }>;
            domain?: string & tags.Pattern<"^[0-9a-z][0-9a-z-]*[0-9a-z]$">;
            color: string & tags.Default<"#123456">;
            userInfoUrl?: string;
            timeZone: string & tags.Default<"UTC">;
            inOperation?: boolean;
            operationTimeScheduling?: boolean;
            operationTimeRanges?: TimeRange[];
            trafficSource?: {
                [key: string]: {};
            };
            phoneNumber?: string & tags.Default<"+18004424000">;
            avatar?: TinyFile;
            billAccountId?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            servicePlan?: "xsmall" | "small" | "medium" | "large" | "entA" | "entAA";
            operationFeature?: boolean & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            mktFeature?: boolean & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            whiteLabelFeature?: boolean & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            billingPeriod?: "yearly" | "monthly";
            billingDay?: number & tags.Type<"int32"> & tags.Minimum<1> & tags.Maximum<31> & tags.JsonSchemaPlugin<{
                format: "int32"
            }>;
            stopRenewal?: boolean;
            mau?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
                format: "int32",
                readOnly: true
            }>;
            enableTexting: boolean;
            enableEmail: boolean;
            state?: "waiting" | "active" | "restricted" | "preIndebted" | "indebted" | "banned" | "removed";
            bizGrade: "AA" | "A" | "B" | "C" | "D" | "F" | "unknown";
            /**
             * - 2022 BM 개편으로 인해 메인 모델에서 필드가 사라짐.
             * - SDK 에서 mapping 은 하지만 사용하지 않아서 null 처리.
             * - https://desk.channel.io/root/threads/groups/(TF)BM개편_개발-176808/62ff2b5fa88ef94f0923/62ff2b5fa88ef94f0923
            */
            trialBeginDate?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            /**
             * - 2022 BM 개편으로 인해 메인 모델에서 필드가 사라짐.
             * - SDK 에서 mapping 은 하지만 사용하지 않아서 null 처리.
             * - https://desk.channel.io/root/threads/groups/(TF)BM개편_개발-176808/62ff2b5fa88ef94f0923/62ff2b5fa88ef94f0923
            */
            trialEndDate?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            /**
             * @deprecated
            */
            autoSolvingTimeMinutes?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
                format: "int32"
            }>;
            blockReplyingAfterClosed?: boolean;
            blockReplyingAfterClosedTime?: string;
            defaultPluginId?: string;
            expectedResponseDelay?: "instant" | "normal" | "delayed";
            workingType?: "always" | "never" | "custom";
            awayOption?: "active" | "disabled" | "hidden";
            sourceSurvey?: {
                [key: string]: {};
            };
            bizCategory?: string;
            staffs?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
                format: "int32"
            }>;
            appCommerceId?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            appCommerceType?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            enableMemberHash?: boolean & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            memberHashSalt?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            defaultEmailDomainId?: string;
            enableMfa?: boolean;
            hideAppMessenger?: boolean;
            /**
             * @deprecated
            */
            useSecureFile?: boolean;
            /**
             * @deprecated
            */
            limited?: boolean;
            messengerPlan?: "none" | "standard" | "pro";
            blocked?: boolean;
            working?: boolean;
            avatarUrl?: string;
            trial?: boolean;
            textColor?: string;
            nextOperatingAt?: number & tags.JsonSchemaPlugin<{
                format: "int64"
            }>;
            initial?: string;
            utcOffset?: string;
            systemDomain?: string;
        };
        export type LegacyV4Manager = {
            id?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            channelId?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            accountId?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            name: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            description?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            showDescriptionToFront?: boolean & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            nameDescI18nMap?: {
                [key: string]: NameDesc;
            };
            profile?: {
                [key: string]: {};
            };
            email: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            showEmailToFront?: boolean & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            mobileNumber?: string & tags.Default<"+18004424000"> & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            showMobileNumberToFront?: boolean & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            role: "owner" | "member";
            removed?: boolean & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            createdAt?: number & tags.JsonSchemaPlugin<{
                format: "int64",
                readOnly: true
            }>;
            displayAsChannel?: boolean;
            defaultGroupWatch?: "all" | "info" | "none";
            defaultDirectChatWatch?: "all" | "info" | "none";
            defaultUserChatWatch?: "all" | "info" | "none";
            operatorScore?: number & tags.JsonSchemaPlugin<{
                format: "float",
                readOnly: true
            }>;
            touchScore?: number & tags.JsonSchemaPlugin<{
                format: "float",
                readOnly: true
            }>;
            avatar?: TinyFile;
            operatorEmailReminder?: boolean & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            operator?: boolean;
            statusEmoji?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            statusText?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            statusClearAt?: number & tags.JsonSchemaPlugin<{
                format: "int64",
                readOnly: true
            }>;
            managerId?: string;
            avatarUrl?: string;
            emailForFront?: string;
            mobileNumberForFront?: string & tags.Default<"+18004424000">;
        };
        export type LegacyV4ManagerBadge = {
            id?: string;
            teamChatAlert?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
                format: "int32"
            }>;
            teamChatUnread?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
                format: "int32"
            }>;
            userChatAlert?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
                format: "int32"
            }>;
            userChatUnread?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
                format: "int32"
            }>;
            teamChatThreadAlert?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
                format: "int32"
            }>;
            teamChatThreadUnread?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
                format: "int32"
            }>;
            updatedAt?: number & tags.JsonSchemaPlugin<{
                format: "int64"
            }>;
            version?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
                format: "int64"
            }>;
            managerId?: string;
            alert?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
                format: "int32"
            }>;
            unread?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
                format: "int32"
            }>;
        };
    }
}
type NameDesc = {
    name: string & tags.Pattern<"^[^@#$%:/\\\\]+$">;
    description?: string;
};
type TimeRange = {
    dayOfWeeks: ("mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun")[] & tags.UniqueItems;
    from: number & tags.Type<"uint32"> & tags.Maximum<1440> & tags.JsonSchemaPlugin<{
        format: "int32"
    }>;
    to: number & tags.Type<"uint32"> & tags.Maximum<1440> & tags.JsonSchemaPlugin<{
        format: "int32"
    }>;
};
type TinyFile = {
    bucket: string;
    key: string;
    width?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
        format: "int32"
    }>;
    height?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
        format: "int32"
    }>;
};
type IAutoViewTransformerInputType = legacy.open.v4.LegacyV4ChannelView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // We extract legacy channel view properties from input
  const { channel, manager, managerBadge } = input;

  // Prepare a Card Header component to display channel basic information.
  // If an avatar URL is available, we use it in the startElement.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: channel?.name,
    description: channel?.description,
    // Use an Avatar component as startElement if we have an avatar URL available.
    startElement: channel && (channel.avatarUrl || (channel.avatar && channel.avatar.bucket && channel.avatar.key))
      ? {
          type: "Avatar",
          // Prefer channel.avatarUrl if available; otherwise, fake a URL by combining bucket/key (assumes production provides valid URIs)
          src: channel.avatarUrl ? channel.avatarUrl : `https://cdn.example.com/${channel.avatar!.bucket}/${channel.avatar!.key}`,
          name: channel.name,
          variant: "primary",
          size: 40
        }
      : undefined,
    // Optionally if we want, add an icon on the end representing channel state (for instance, use a default icon)
    endElement: !channel ? {
      type: "Icon",
      id: "alert",
      color: "red",
      size: 16
    } : undefined
  };

  // Prepare a Markdown component to display additional information,
  // including manager details and manager badge information if available.
  // We use markdown for better formatting.
  let markdownContent = "";
  if (manager) {
    markdownContent += `**Manager Information**\n\n`;
    markdownContent += `- **Name:** ${manager.name}\n`;
    markdownContent += `- **Email:** ${manager.email}\n`;
    if (manager.mobileNumber) {
      markdownContent += `- **Mobile:** ${manager.mobileNumber}\n`;
    }
    markdownContent += `- **Role:** ${manager.role}\n\n`;
  }
  if (managerBadge) {
    markdownContent += `**Manager Badge Alerts**\n\n`;
    // List some badge metrics if they exist (only include if the values are defined).
    if (typeof managerBadge.teamChatAlert === "number") {
      markdownContent += `- **Team Chat Alert:** ${managerBadge.teamChatAlert}\n`;
    }
    if (typeof managerBadge.teamChatUnread === "number") {
      markdownContent += `- **Team Chat Unread:** ${managerBadge.teamChatUnread}\n`;
    }
    if (typeof managerBadge.userChatAlert === "number") {
      markdownContent += `- **User Chat Alert:** ${managerBadge.userChatAlert}\n`;
    }
    if (typeof managerBadge.userChatUnread === "number") {
      markdownContent += `- **User Chat Unread:** ${managerBadge.userChatUnread}\n`;
    }
    // In case there are no badge numbers, we can leave it empty.
  }
  // If no extra information, provide a fallback message.
  if (!markdownContent) {
    markdownContent = "No additional details available.";
  }

  // Prepare a Card Content component that wraps the markdown element.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // childrenProps accepts a component (or array) and here we use a Markdown component
    childrenProps: {
      type: "Markdown",
      content: markdownContent
    }
  };

  // Optionally prepare a Card Media component if a homepage image is available.
  // Here we treat channel.homepageUrl as an image source if provided.
  let cardMedia: IAutoView.IAutoViewCardMediaProps | undefined = undefined;
  if (channel?.homepageUrl) {
    cardMedia = {
      type: "CardMedia",
      src: channel.homepageUrl
    };
  }

  // Compose children for the vertical card.
  // We include the Card Header, then optionally the Card Media, and then Card Content.
  const childrenComponents: (IAutoView.IAutoViewCardHeaderProps | IAutoView.IAutoViewCardMediaProps | IAutoView.IAutoViewCardContentProps)[] = [];
  childrenComponents.push(cardHeader);
  if (cardMedia) {
    childrenComponents.push(cardMedia);
  }
  childrenComponents.push(cardContent);

  // Return a Vertical Card that aggregates all the components.
  // Vertical cards naturally support different viewport sizes and are responsive.
  return {
    type: "VerticalCard",
    childrenProps: childrenComponents
  };
}

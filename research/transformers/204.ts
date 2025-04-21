import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export type LegacyV4UserChatView = {
                    campaign?: Schema.legacy.v4.marketing.LegacyV4Campaign;
                    bookmark?: Schema.legacy.v4.LegacyV4ChatBookmark;
                    session?: Schema.legacy.v4.LegacyV4ChatSession;
                    userSession?: Schema.legacy.v4.LegacyV4ChatSession;
                    chatTags?: Schema.legacy.v4.LegacyV4ChatTag[];
                    message?: Schema.legacy.v4.message.LegacyV4Message;
                    oneTimeMsg?: Schema.legacy.v4.marketing.LegacyV4OneTimeMsg;
                    supportBot?: Schema.legacy.v4.LegacyV4SupportBot;
                    user?: Schema.legacy.v4.LegacyV4User;
                    userChat?: Schema.legacy.v4.LegacyV4UserChat;
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
            export type LegacyV4ChatBookmark = {
                key?: string;
                chatId?: string;
                chatKey?: string;
                bookmarkKey?: string;
                channelId?: string;
                version?: number & tags.Type<"int32">;
                chatType?: string;
                personType?: string;
                personId?: string;
            };
            export type LegacyV4ChatSession = {
                key?: string;
                chatId?: string;
                chatKey?: string;
                updatedKey?: string;
                unreadKey?: string;
                channelId?: string;
                alert?: number & tags.Type<"int32">;
                unread?: number & tags.Type<"int32">;
                watch?: "all" | "info" | "none";
                readAt?: number;
                receivedAt?: number;
                postedAt?: number;
                updatedAt?: number;
                createdAt?: number;
                version?: number & tags.Type<"int32">;
                id?: string;
                chatType?: string;
                personType?: string;
                personId?: string;
            };
            export type LegacyV4ChatTag = {
                id?: string;
                channelId?: string;
                colorVariant?: "red" | "orange" | "yellow" | "olive" | "green" | "cobalt" | "purple" | "pink" | "navy";
                name: string;
                key: string;
                description?: string;
                followerIds?: string[] & tags.MinItems<1> & tags.MaxItems<2147483647> & tags.UniqueItems;
                createdAt?: number;
            };
            export namespace message {
                export type LegacyV4Message = {
                    chatKey?: string;
                    id?: string;
                    mainKey?: string;
                    threadKey?: string;
                    root?: boolean;
                    channelId?: string;
                    chatType?: string;
                    chatId?: string;
                    personType?: string;
                    personId?: string;
                    requestId?: string;
                    language?: string;
                    createdAt?: number;
                    version?: number & tags.Type<"int32">;
                    blocks?: Schema.legacy.v4.message.LegacyV4Block[];
                    plainText?: string;
                    updatedAt?: number;
                    buttons?: Schema.legacy.v4.message.LegacyV4Button[] & tags.MinItems<1> & tags.MaxItems<2>;
                    files?: Schema.legacy.v4.message.LegacyV4File[] & tags.MinItems<1> & tags.MaxItems<4>;
                    webPage?: Schema.legacy.v4.LegacyV4WebPage;
                    log?: Schema.legacy.v4.message.LegacyV4Log;
                    reactions?: Schema.legacy.v4.message.LegacyV4Reaction[];
                    profileBot?: Schema.legacy.v4.message.LegacyV4ProfileBotInput[] & tags.MinItems<1> & tags.MaxItems<2147483647>;
                    state?: "sending" | "sent" | "failed" | "removed";
                    options?: ("actAsManager" | "displayAsChannel" | "doNotPost" | "doNotSearch" | "doNotSendApp" | "doNotUpdateDesk" | "immutable" | "private" | "silent")[] & tags.UniqueItems;
                    marketing?: Schema.legacy.v4.message.LegacyV4MessageMarketing;
                    supportBot?: Schema.legacy.v4.message.LegacyV4MessageSupportBot;
                    threadMsg?: boolean;
                    broadcastedMsg?: boolean;
                    rootMessageId?: string;
                };
                export type LegacyV4Block = {
                    type: "bullets" | "code" | "text";
                    language?: string;
                    value?: string;
                    blocks?: Schema.legacy.v4.message.LegacyV4Block[];
                };
                export type LegacyV4Button = {
                    title: string;
                    colorVariant?: "cobalt" | "green" | "orange" | "red" | "black" | "pink" | "purple";
                    url: string;
                };
                export type LegacyV4File = {
                    id: string;
                    type?: string;
                    name: string;
                    size: number & tags.Type<"int32">;
                    contentType?: string;
                    duration?: number;
                    width?: number & tags.Type<"int32">;
                    height?: number & tags.Type<"int32">;
                    orientation?: number & tags.Type<"int32">;
                    animated?: boolean;
                    bucket: string;
                    key: string;
                    previewKey?: string;
                    channelId?: string;
                    chatType?: string;
                    chatId?: string;
                };
                export type LegacyV4Log = {
                    action?: "changeName" | "changeScope" | "close" | "create" | "invite" | "join" | "assign" | "unassign" | "leave" | "open" | "remove" | "snooze" | "addTags" | "removeTags";
                    values?: string[];
                };
                export type LegacyV4Reaction = {
                    emojiName: string;
                    personKeys?: string[] & tags.UniqueItems;
                    empty?: boolean;
                };
                export type LegacyV4ProfileBotInput = {
                    id?: string;
                    key?: string;
                    type?: string;
                    name?: string;
                    value?: Schema.AttributeValue;
                };
                export type LegacyV4MessageMarketing = {
                    type?: string;
                    id?: string;
                    advertising?: boolean;
                    sendToOfflineXms?: boolean;
                    sendToOfflineEmail?: boolean;
                    exposureType?: "fullScreen";
                };
                export type LegacyV4MessageSupportBot = {
                    id?: string;
                    revisionId?: string;
                    sectionId?: string;
                    stepIndex?: number & tags.Type<"int32">;
                    buttons?: Schema.legacy.v4.LegacyV4SupportBotRouteSection_dollar_LegacyV4Button[];
                    submitButtonIndex?: number & tags.Type<"int32">;
                };
            }
            export type LegacyV4WebPage = {
                id: string;
                url: string;
                title?: string;
                description?: string;
                imageUrl?: string;
                videoUrl?: string;
                publisher?: string;
                author?: string;
                width?: number & tags.Type<"int32">;
                height?: number & tags.Type<"int32">;
                bucket?: string;
                previewKey?: string;
                logo?: string;
                name?: string;
            };
            export type LegacyV4SupportBotRouteSection_dollar_LegacyV4Button = {
                text: string;
                nextSectionId: string;
            };
            export type LegacyV4SupportBot = {
                id?: string;
                channelId: string;
                pluginId?: string;
                botName: string;
                name: string;
                order: number & tags.Minimum<0>;
                pageQuery?: Schema.Expression;
                userQuery?: Schema.Expression;
                draft?: Schema.supportbot.SupportBotDraft;
                revisionId?: string;
                state: "draft" | "active" | "stopped";
                runMode: "always" | "away" | "inOperation" | "private";
                start?: number & tags.Type<"int32">;
                stop?: number & tags.Type<"int32">;
                chatOpen?: number & tags.Type<"int32">;
                createdAt?: number;
                updatedAt?: number;
                userChatExpireDuration?: string;
                managerId?: string;
            };
            export type LegacyV4User = {
                id?: string;
                channelId?: string;
                memberId?: string;
                veilId?: string;
                unifiedId?: string;
                name?: string;
                profile?: {
                    [key: string]: {};
                };
                profileOnce?: Schema.profile.UserProfile;
                tags?: string[] & tags.MinItems<0> & tags.MaxItems<10> & tags.UniqueItems;
                alert?: number & tags.Type<"int32">;
                unread?: number & tags.Type<"int32">;
                popUpChatId?: string;
                blocked?: boolean;
                unsubscribed?: boolean;
                hasChat?: boolean;
                hasPushToken?: boolean;
                language?: string & tags.Default<"en">;
                country?: string;
                city?: string;
                latitude?: number;
                longitude?: number;
                web?: Schema.WebInfo;
                mobile?: Schema.MobileInfo;
                sessionsCount?: number & tags.Type<"int32">;
                lastSeenAt?: number;
                createdAt?: number;
                updatedAt?: number;
                expireAt?: number;
                version?: number & tags.Type<"int32">;
                managedKey?: number & tags.Type<"int32">;
                member?: boolean;
                email?: string;
                userId?: string;
                avatarUrl?: string;
                managed?: boolean;
                mobileNumber?: string & tags.Default<"+18004424000">;
                systemLanguage?: string & tags.Default<"en">;
            };
            export type LegacyV4UserChat = {
                id?: string;
                channelId?: string;
                appUserKey?: string;
                state?: "closed" | "opened" | "snoozed" | "queued";
                managed?: boolean;
                userId?: string;
                name?: string;
                description?: string;
                handling?: "waiting" | "supportBot";
                supportBot?: Schema.legacy.v4.LegacyV4UserChat_dollar_LegacyV4UserChatSupportBot;
                marketing?: Schema.legacy.v4.LegacyV4UserChat_dollar_LegacyV4UserChatMarketing;
                pluginId?: string;
                sourcePage?: string;
                messengerType?: string;
                messengerId?: string;
                managerIds?: string[] & tags.MinItems<1> & tags.MaxItems<2147483647> & tags.UniqueItems;
                assigneeId?: string;
                tags?: string[] & tags.MinItems<1> & tags.MaxItems<8> & tags.UniqueItems;
                firstOpenedAt?: number;
                openedAt?: number;
                createdAt?: number;
                frontMessageId?: string;
                frontUpdatedAt?: number;
                deskMessageId?: string;
                deskUpdatedAt?: number;
                firstAssigneeIdAfterOpen?: string;
                firstRepliedAtAfterOpen?: number;
                oneStop?: boolean;
                waitingTime?: number & tags.Type<"int32">;
                avgReplyTime?: number & tags.Type<"int32">;
                totalReplyTime?: number & tags.Type<"int32">;
                replyCount?: number & tags.Type<"int32">;
                resolutionTime?: number & tags.Type<"int32">;
                operationWaitingTime?: number & tags.Type<"int32">;
                operationAvgReplyTime?: number & tags.Type<"int32">;
                operationTotalReplyTime?: number & tags.Type<"int32">;
                operationReplyCount?: number & tags.Type<"int32">;
                operationResolutionTime?: number & tags.Type<"int32">;
                firstAskedAt?: number;
                askedAt?: number;
                closedAt?: number;
                snoozedAt?: number;
                expiresAt?: number;
                version?: number & tags.Type<"int32">;
            };
            export type LegacyV4UserChat_dollar_LegacyV4UserChatSupportBot = {
                id?: string;
                revisionId?: string;
                sectionPath?: string[];
            };
            export type LegacyV4UserChat_dollar_LegacyV4UserChatMarketing = {
                type?: string;
                id?: string;
                enableSupportBot?: boolean;
                supportBotId?: string;
            };
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
    export type AttributeValue = {
        s?: string;
        n?: string;
        b?: {
            short?: number & tags.Type<"int32">;
            char?: string;
            int?: number & tags.Type<"int32">;
            long?: number & tags.Type<"int32">;
            float?: number;
            double?: number;
            direct?: boolean;
            readOnly?: boolean;
        };
        m?: {
            [key: string]: Schema.AttributeValue;
        };
        l?: Schema.AttributeValue[];
        ss?: string[];
        ns?: string[];
        bs?: {
            short?: number & tags.Type<"int32">;
            char?: string;
            int?: number & tags.Type<"int32">;
            long?: number & tags.Type<"int32">;
            float?: number;
            double?: number;
            direct?: boolean;
            readOnly?: boolean;
        }[];
        "null"?: boolean;
        bool?: boolean;
    };
    export namespace supportbot {
        export type SupportBotDraft = {
            supportBot?: Schema.supportbot.SupportBot;
            sections?: Schema.supportbot.SupportBotSection[];
        };
        export type SupportBot = {
            id?: string;
            channelId: string;
            botName: string;
            name: string;
            order: number & tags.Minimum<0>;
            pageQuery?: Schema.Expression;
            userQuery?: Schema.Expression;
            draft?: Schema.supportbot.SupportBotDraft;
            revisionId?: string;
            state: "draft" | "active" | "stopped";
            runMode: "always" | "away" | "inOperation" | "private";
            start?: number & tags.Type<"int32">;
            stop?: number & tags.Type<"int32">;
            chatOpen?: number & tags.Type<"int32">;
            createdAt?: number;
            updatedAt?: number;
            userChatExpireDuration?: string;
            managerId?: string;
        };
        export type SupportBotSection = {
            name?: string;
            actions?: Schema.userchat.UserChatStaticAction[];
            id?: string;
            steps?: Schema.supportbot.SupportBotSection_dollar_Step[];
            type: string;
        };
        export type SupportBotSection_dollar_Step = {
            message: Schema.message.NestedMessage;
        };
    }
    export namespace userchat {
        export type UserChatStaticAction = {
            type: string;
        };
    }
    export namespace message {
        export type NestedMessage = {
            blocks?: Schema.message.Block[];
            buttons?: Schema.message.Button[] & tags.MinItems<1> & tags.MaxItems<2>;
            files?: Schema.message.File[] & tags.MinItems<1> & tags.MaxItems<30>;
            webPage?: Schema.message.WebPage;
            form?: Schema.message.form.Form;
        };
        export type Block = {
            type: "bullets" | "code" | "text";
            language?: string;
            value?: string;
            blocks?: Schema.message.Block[];
        };
        export type Button = {
            title: string;
            colorVariant?: "cobalt" | "green" | "orange" | "red" | "black" | "pink" | "purple";
            action: Schema.message.action.Action;
            /**
             * @deprecated
            */
            url?: string;
        };
        export namespace action {
            export type Action = {
                attributes?: Schema.message.action.Attributes;
                type: string;
            };
            export type Attributes = {};
        }
        export type File = {
            id: string;
            type?: string;
            name: string;
            size: number & tags.Type<"int32">;
            contentType?: string;
            duration?: number;
            width?: number & tags.Type<"int32">;
            height?: number & tags.Type<"int32">;
            orientation?: number & tags.Type<"int32">;
            animated?: boolean;
            bucket: string;
            key: string;
            previewKey?: string;
            channelId?: string;
            chatType?: string;
            chatId?: string;
        };
        export type WebPage = {
            id: string;
            url: string;
            title?: string;
            description?: string;
            imageUrl?: string;
            videoUrl?: string;
            publisher?: string;
            author?: string;
            width?: number & tags.Type<"int32">;
            height?: number & tags.Type<"int32">;
            bucket?: string;
            previewKey?: string;
            logo?: string;
            name?: string;
        };
        export namespace form {
            export type Form = {
                submittedAt?: number;
                inputs?: Schema.message.form.FormInput[];
                type: string;
            };
            export type FormInput = {
                value?: {};
                readOnly?: boolean;
                type?: "text" | "number" | "bool" | "date" | "datetime" | "radio" | "singleSelect" | "checkbox" | "multiSelect";
                label?: string;
                bindingKey?: string;
                dataType?: "string" | "date" | "list" | "listOfNumber" | "number" | "datetime" | "boolean";
                userChatProfileBindingKey?: boolean;
                userProfileBindingKey?: boolean;
            };
        }
    }
    export namespace profile {
        export type UserProfile = {
            [key: string]: {};
        };
    }
    export type WebInfo = {
        device?: string;
        os?: string;
        osName?: string;
        browser?: string;
        browserName?: string;
        sessionsCount?: number & tags.Type<"int32">;
        lastSeenAt?: number;
    };
    export type MobileInfo = {
        device?: string;
        os?: string;
        osName?: string;
        appName?: string;
        appVersion?: string;
        sdkName?: string;
        sdkVersion?: string;
        sessionsCount?: number & tags.Type<"int32">;
        lastSeenAt?: number;
    };
}
type IAutoViewTransformerInputType = Schema.legacy.open.v4.LegacyV4UserChatView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Build header with user info (avatar + name + identifier)
  const user = input.user;
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: user?.name ?? "Chat",
    description: user?.email ?? user?.userId ?? "",
    // only include avatar if URL is provided
    startElement: user?.avatarUrl
      ? {
          type: "Avatar",
          src: user.avatarUrl,
          name: user.name,
        }
      : undefined,
  };

  // Prepare an array of presentation components for the card content
  const contentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];

  // 1. Render the latest message as Markdown if available
  const msg = input.message;
  if (msg) {
    // Prefer plainText, fallback to concatenated block values
    let messageContent = msg.plainText;
    if (!messageContent && Array.isArray(msg.blocks)) {
      messageContent = msg.blocks.map((b) => b.value ?? "").join("\n\n");
    }
    if (messageContent) {
      contentChildren.push({
        type: "Markdown",
        content: messageContent,
      });
    }
  }

  // 2. Render chat tags as a group of chips
  if (Array.isArray(input.chatTags) && input.chatTags.length > 0) {
    // Map legacy colorVariant to AutoView chip color
    const mapColor = (
      variant?: string
    ): IAutoView.IAutoViewChipProps["color"] => {
      switch (variant) {
        case "olive":
        case "yellow":
          return "yellow";
        case "cobalt":
        case "blue":
          return "blue";
        case "navy":
        case "indigo":
          return "indigo";
        case "purple":
        case "violet":
          return "violet";
        case "pink":
          return "pink";
        case "green":
          return "green";
        case "red":
          return "red";
        case "orange":
          return "orange";
        default:
          return "gray";
      }
    };

    const chips: IAutoView.IAutoViewChipProps[] = input.chatTags.map(
      (tag) => ({
        type: "Chip",
        label: tag.name,
        color: mapColor(tag.colorVariant),
        size: "small",
        variant: "filled",
      })
    );
    contentChildren.push({
      type: "ChipGroup",
      childrenProps: chips,
    });
  }

  // 3. Render session statistics as a data list
  const ses = input.session;
  if (ses) {
    const items: IAutoView.IAutoViewDataListItemProps[] = [];
    if (ses.unread !== undefined) {
      items.push({
        type: "DataListItem",
        label: [
          { type: "Text", content: "Unread", variant: "subtitle2" },
        ],
        value: [{ type: "Text", content: `${ses.unread}`, variant: "body2" }],
      });
    }
    if (ses.alert !== undefined) {
      items.push({
        type: "DataListItem",
        label: [
          { type: "Text", content: "Alerts", variant: "subtitle2" },
        ],
        value: [{ type: "Text", content: `${ses.alert}`, variant: "body2" }],
      });
    }
    if (ses.watch) {
      items.push({
        type: "DataListItem",
        label: [
          { type: "Text", content: "Watch", variant: "subtitle2" },
        ],
        value: [{ type: "Text", content: ses.watch, variant: "body2" }],
      });
    }
    if (items.length > 0) {
      contentChildren.push({
        type: "DataList",
        childrenProps: items,
      });
    }
  }

  // 4. Fallback text if there's nothing to show
  if (contentChildren.length === 0) {
    contentChildren.push({
      type: "Text",
      content: "No details available.",
    });
  }

  // Wrap content children into a CardContent component
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: contentChildren,
  };

  // Assemble everything into a VerticalCard for responsive display
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, cardContent],
  };

  return card;
}

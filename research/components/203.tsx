import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export type LegacyV4UserChatView = {
                    campaign?: AutoViewInputSubTypes.legacy.v4.marketing.LegacyV4Campaign;
                    bookmark?: AutoViewInputSubTypes.legacy.v4.LegacyV4ChatBookmark;
                    session?: AutoViewInputSubTypes.legacy.v4.LegacyV4ChatSession;
                    userSession?: AutoViewInputSubTypes.legacy.v4.LegacyV4ChatSession;
                    chatTags?: AutoViewInputSubTypes.legacy.v4.LegacyV4ChatTag[];
                    message?: AutoViewInputSubTypes.legacy.v4.message.LegacyV4Message;
                    oneTimeMsg?: AutoViewInputSubTypes.legacy.v4.marketing.LegacyV4OneTimeMsg;
                    supportBot?: AutoViewInputSubTypes.legacy.v4.LegacyV4SupportBot;
                    user?: AutoViewInputSubTypes.legacy.v4.LegacyV4User;
                    userChat?: AutoViewInputSubTypes.legacy.v4.LegacyV4UserChat;
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
                    userQuery?: AutoViewInputSubTypes.Expression;
                    triggerEventName: string;
                    triggerEventQuery?: AutoViewInputSubTypes.Expression;
                    waitingTime: string;
                    filterEventName?: string;
                    filterEventQuery?: AutoViewInputSubTypes.Expression;
                    filterMatch?: "positive" | "negative";
                    goalEventName?: string;
                    goalEventQuery?: AutoViewInputSubTypes.Expression;
                    advertising: boolean;
                    enableSupportBot: boolean;
                    followingSupportBotId?: string;
                    sendToOfflineXms?: boolean;
                    sendToOfflineEmail?: boolean;
                    cooldown?: string;
                    sendMode: "always" | "away" | "inOperation" | "customUsingSenderTime" | "customUsingReceiverTime" | "custom";
                    sendTimeRanges?: AutoViewInputSubTypes.TimeRange[];
                    startAt?: number;
                    endAt?: number;
                    draft?: AutoViewInputSubTypes.marketing.CampaignDraft;
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
                    settings?: AutoViewInputSubTypes.marketing.SendMediumSettings;
                    userQuery?: AutoViewInputSubTypes.Expression;
                    goalEventName?: string;
                    goalEventQuery?: AutoViewInputSubTypes.Expression;
                    enableSupportBot: boolean;
                    followingSupportBotId?: string;
                    advertising: boolean;
                    sendToOfflineXms?: boolean;
                    sendToOfflineEmail?: boolean;
                    startAt?: number;
                    draft?: AutoViewInputSubTypes.marketing.OneTimeMsgDraft;
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
                    blocks?: AutoViewInputSubTypes.legacy.v4.message.LegacyV4Block[];
                    plainText?: string;
                    updatedAt?: number;
                    buttons?: AutoViewInputSubTypes.legacy.v4.message.LegacyV4Button[] & tags.MinItems<1> & tags.MaxItems<2>;
                    files?: AutoViewInputSubTypes.legacy.v4.message.LegacyV4File[] & tags.MinItems<1> & tags.MaxItems<4>;
                    webPage?: AutoViewInputSubTypes.legacy.v4.LegacyV4WebPage;
                    log?: AutoViewInputSubTypes.legacy.v4.message.LegacyV4Log;
                    reactions?: AutoViewInputSubTypes.legacy.v4.message.LegacyV4Reaction[];
                    profileBot?: AutoViewInputSubTypes.legacy.v4.message.LegacyV4ProfileBotInput[] & tags.MinItems<1> & tags.MaxItems<2147483647>;
                    state?: "sending" | "sent" | "failed" | "removed";
                    options?: ("actAsManager" | "displayAsChannel" | "doNotPost" | "doNotSearch" | "doNotSendApp" | "doNotUpdateDesk" | "immutable" | "private" | "silent")[] & tags.UniqueItems;
                    marketing?: AutoViewInputSubTypes.legacy.v4.message.LegacyV4MessageMarketing;
                    supportBot?: AutoViewInputSubTypes.legacy.v4.message.LegacyV4MessageSupportBot;
                    threadMsg?: boolean;
                    broadcastedMsg?: boolean;
                    rootMessageId?: string;
                };
                export type LegacyV4Block = {
                    type: "bullets" | "code" | "text";
                    language?: string;
                    value?: string;
                    blocks?: AutoViewInputSubTypes.legacy.v4.message.LegacyV4Block[];
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
                    value?: AutoViewInputSubTypes.AttributeValue;
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
                    buttons?: AutoViewInputSubTypes.legacy.v4.LegacyV4SupportBotRouteSection_dollar_LegacyV4Button[];
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
                pageQuery?: AutoViewInputSubTypes.Expression;
                userQuery?: AutoViewInputSubTypes.Expression;
                draft?: AutoViewInputSubTypes.supportbot.SupportBotDraft;
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
                profileOnce?: AutoViewInputSubTypes.profile.UserProfile;
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
                web?: AutoViewInputSubTypes.WebInfo;
                mobile?: AutoViewInputSubTypes.MobileInfo;
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
                supportBot?: AutoViewInputSubTypes.legacy.v4.LegacyV4UserChat_dollar_LegacyV4UserChatSupportBot;
                marketing?: AutoViewInputSubTypes.legacy.v4.LegacyV4UserChat_dollar_LegacyV4UserChatMarketing;
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
        operator?: AutoViewInputSubTypes.Operator;
        values?: {}[];
        and?: AutoViewInputSubTypes.Expression[];
        or?: AutoViewInputSubTypes.Expression[];
    };
    export type Operator = {};
    export type TimeRange = {
        dayOfWeeks: ("mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun")[] & tags.UniqueItems;
        from: number & tags.Type<"uint32"> & tags.Maximum<1440>;
        to: number & tags.Type<"uint32"> & tags.Maximum<1440>;
    };
    export namespace marketing {
        export type CampaignDraft = {
            campaign: AutoViewInputSubTypes.marketing.Campaign;
            msgs: AutoViewInputSubTypes.marketing.CampaignMsg[] & tags.MinItems<1> & tags.MaxItems<4>;
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
            userQuery?: AutoViewInputSubTypes.Expression;
            triggerEventName: string;
            triggerEventQuery?: AutoViewInputSubTypes.Expression;
            waitingTime: string;
            filterEventName?: string;
            filterEventQuery?: AutoViewInputSubTypes.Expression;
            filterMatch?: "positive" | "negative";
            filterHpc?: AutoViewInputSubTypes.marketing.HoldingPropertyConstant;
            goalEventName?: string;
            goalEventQuery?: AutoViewInputSubTypes.Expression;
            goalEventDuration?: string;
            goalHpc?: AutoViewInputSubTypes.marketing.HoldingPropertyConstant;
            advertising: boolean;
            sendToOfflineXms?: boolean;
            sendToOfflineEmail?: boolean;
            cooldown?: string;
            sendMode: "always" | "away" | "inOperation" | "customUsingSenderTime" | "customUsingReceiverTime" | "custom";
            channelOperationId?: string;
            sendTimeRanges?: AutoViewInputSubTypes.TimeRange[];
            startAt?: number;
            endAt?: number;
            deleteMessageAfterStop?: boolean;
            draft?: AutoViewInputSubTypes.marketing.CampaignDraft;
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
            eventQuery?: AutoViewInputSubTypes.Expression;
            baseEventType: "triggerEvent" | "additionalFilter";
            operator?: AutoViewInputSubTypes.EventSchema;
            values?: {};
        };
        export type CampaignMsg = {
            id: string;
            campaignId?: string;
            channelId?: string;
            name: string;
            sendMedium: "appAlimtalk" | "appLine" | "email" | "inAppChat" | "xms";
            settings: AutoViewInputSubTypes.marketing.SendMediumSettings;
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
            oneTimeMsg: AutoViewInputSubTypes.marketing.OneTimeMsg;
        };
        export type OneTimeMsg = {
            id?: string;
            channelId?: string;
            name: string;
            state: "draft" | "waiting" | "sent" | "canceled" | "removed";
            sendMode?: "immediately" | "reservedWithSenderTime" | "reservedWithReceiverTime";
            channelOperationId?: string;
            sendMedium?: "appAlimtalk" | "appLine" | "email" | "inAppChat" | "xms";
            settings?: AutoViewInputSubTypes.marketing.SendMediumSettings;
            userQuery?: AutoViewInputSubTypes.Expression;
            goalEventName?: string;
            goalEventQuery?: AutoViewInputSubTypes.Expression;
            goalEventDuration?: string;
            advertising: boolean;
            sendToOfflineXms?: boolean;
            sendToOfflineEmail?: boolean;
            startAt?: number;
            localStartAt?: string & tags.Format<"date-time">;
            draft?: AutoViewInputSubTypes.marketing.OneTimeMsgDraft;
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
            [key: string]: AutoViewInputSubTypes.AttributeValue;
        };
        l?: AutoViewInputSubTypes.AttributeValue[];
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
            supportBot?: AutoViewInputSubTypes.supportbot.SupportBot;
            sections?: AutoViewInputSubTypes.supportbot.SupportBotSection[];
        };
        export type SupportBot = {
            id?: string;
            channelId: string;
            botName: string;
            name: string;
            order: number & tags.Minimum<0>;
            pageQuery?: AutoViewInputSubTypes.Expression;
            userQuery?: AutoViewInputSubTypes.Expression;
            draft?: AutoViewInputSubTypes.supportbot.SupportBotDraft;
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
            actions?: AutoViewInputSubTypes.userchat.UserChatStaticAction[];
            id?: string;
            steps?: AutoViewInputSubTypes.supportbot.SupportBotSection_dollar_Step[];
            type: string;
        };
        export type SupportBotSection_dollar_Step = {
            message: AutoViewInputSubTypes.message.NestedMessage;
        };
    }
    export namespace userchat {
        export type UserChatStaticAction = {
            type: string;
        };
    }
    export namespace message {
        export type NestedMessage = {
            blocks?: AutoViewInputSubTypes.message.Block[];
            buttons?: AutoViewInputSubTypes.message.Button[] & tags.MinItems<1> & tags.MaxItems<2>;
            files?: AutoViewInputSubTypes.message.File[] & tags.MinItems<1> & tags.MaxItems<30>;
            webPage?: AutoViewInputSubTypes.message.WebPage;
            form?: AutoViewInputSubTypes.message.form.Form;
        };
        export type Block = {
            type: "bullets" | "code" | "text";
            language?: string;
            value?: string;
            blocks?: AutoViewInputSubTypes.message.Block[];
        };
        export type Button = {
            title: string;
            colorVariant?: "cobalt" | "green" | "orange" | "red" | "black" | "pink" | "purple";
            action: AutoViewInputSubTypes.message.action.Action;
            /**
             * @deprecated
            */
            url?: string;
        };
        export namespace action {
            export type Action = {
                attributes?: AutoViewInputSubTypes.message.action.Attributes;
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
                inputs?: AutoViewInputSubTypes.message.form.FormInput[];
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
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4UserChatView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    (e.g., const displayName = `${value.firstName} ${value.lastName}`;)
  //    (e.g., const formattedDate = new Date(value.timestamp).toLocaleDateString(...);)

  // Flatten nested message blocks into plain string
  const renderBlocks = (
    blocks?: AutoViewInputSubTypes.legacy.v4.message.LegacyV4Block[],
  ): string => {
    if (!blocks) return "";
    return blocks
      .map((b) => b.value ?? renderBlocks(b.blocks))
      .filter(Boolean)
      .join(" ");
  };

  // User display name
  const userName =
    value.user?.name ??
    value.user?.unifiedId ??
    "Unknown User";

  // Avatar URL or placeholder
  const avatarUrl = value.user?.avatarUrl;

  // Chat state mapping
  const stateMap: Record<string, string> = {
    opened: "Open",
    closed: "Closed",
    snoozed: "Snoozed",
    queued: "Queued",
  };
  const rawState = value.userChat?.state;
  const chatState = rawState ? stateMap[rawState] ?? rawState : "";

  // Message text (plain or flattened blocks)
  const messageText = value.message
    ? value.message.plainText?.trim() ||
      renderBlocks(value.message.blocks)?.trim() ||
      "—"
    : "—";

  // Timestamp formatting
  const timestamp = value.message?.createdAt
    ? new Date(value.message.createdAt).toLocaleString()
    : "";

  // Campaign name (if any)
  const campaignName = value.campaign?.name;

  // Tag color mapping
  const tagColorMap: Record<string, string> = {
    red: "bg-red-100 text-red-800",
    orange: "bg-orange-100 text-orange-800",
    yellow: "bg-yellow-100 text-yellow-800",
    olive: "bg-green-100 text-green-800",
    green: "bg-green-100 text-green-800",
    cobalt: "bg-blue-100 text-blue-800",
    purple: "bg-purple-100 text-purple-800",
    pink: "bg-pink-100 text-pink-800",
    navy: "bg-indigo-100 text-indigo-800",
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  //    (e.g., return <div className="p-4 bg-white rounded-lg shadow-md">...</div>;)
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header: Avatar, User Name, State & Timestamp */}
      <div className="flex items-center space-x-3">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={userName}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 bg-gray-300 rounded-full" />
        )}
        <div className="flex-1">
          <p className="text-lg font-semibold text-gray-900 truncate">
            {userName}
          </p>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            {chatState && (
              <span className="capitalize">{chatState}</span>
            )}
            {timestamp && <span>• {timestamp}</span>}
          </div>
        </div>
      </div>

      {/* Campaign Label */}
      {campaignName && (
        <p className="mt-2 text-sm text-blue-600 truncate">
          Campaign: {campaignName}
        </p>
      )}

      {/* Message Preview */}
      <p className="mt-3 text-gray-700 overflow-hidden line-clamp-2">
        {messageText}
      </p>

      {/* Chat Tags */}
      {value.chatTags && value.chatTags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {value.chatTags.map((tag) => {
            const colorClass =
              tagColorMap[tag.colorVariant ?? "green"];
            return (
              <span
                key={tag.key}
                className={`text-xs font-medium px-2 py-1 rounded ${colorClass}`}
              >
                {tag.name}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

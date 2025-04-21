import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export type LegacyV4ChatBasedUserChatsView = {
                    messages?: Schema.legacy.v4.message.LegacyV4Message[];
                    sessions?: Schema.legacy.v4.LegacyV4ChatSession[];
                    userChats?: Schema.legacy.v4.LegacyV4UserChat[];
                    users?: Schema.legacy.v4.LegacyV4User[];
                    managers?: Schema.legacy.v4.LegacyV4Manager[];
                    chatTags?: Schema.legacy.v4.LegacyV4ChatTag[];
                    prev?: string;
                    next?: string;
                };
            }
        }
        export namespace v4 {
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
            export type LegacyV4Manager = {
                id?: string;
                channelId?: string;
                accountId?: string;
                name: string;
                description?: string;
                showDescriptionToFront?: boolean;
                nameDescI18nMap?: {
                    [key: string]: Schema.NameDesc;
                };
                profile?: {
                    [key: string]: {};
                };
                email: string;
                showEmailToFront?: boolean;
                mobileNumber?: string & tags.Default<"+18004424000">;
                showMobileNumberToFront?: boolean;
                role: "owner" | "member";
                removed?: boolean;
                createdAt?: number;
                displayAsChannel?: boolean;
                defaultGroupWatch?: "all" | "info" | "none";
                defaultDirectChatWatch?: "all" | "info" | "none";
                defaultUserChatWatch?: "all" | "info" | "none";
                operatorScore?: number;
                touchScore?: number;
                avatar?: Schema.TinyFile;
                operatorEmailReminder?: boolean;
                operator?: boolean;
                statusEmoji?: string;
                statusText?: string;
                statusClearAt?: number;
                managerId?: string;
                avatarUrl?: string;
                emailForFront?: string;
                mobileNumberForFront?: string & tags.Default<"+18004424000">;
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
        }
    }
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
    export type NameDesc = {
        name: string & tags.Pattern<"^[^@#$%:/\\\\]+$">;
        description?: string;
    };
    export type TinyFile = {
        bucket: string;
        key: string;
        width?: number & tags.Type<"int32">;
        height?: number & tags.Type<"int32">;
    };
}
type IAutoViewTransformerInputType = Schema.legacy.open.v4.LegacyV4ChatBasedUserChatsView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // If there are no chats to display, show a simple markdown notice
    if (!input.userChats || input.userChats.length === 0) {
        return {
            type: "Markdown",
            content: "**No chats available**",
        } as IAutoView.IAutoViewMarkdownProps;
    }

    // Build lookup maps for users and chat tags to avoid repeated scans
    const userMap: Map<string, Schema.legacy.v4.LegacyV4User> = new Map();
    input.users?.forEach(user => {
        if (user.id) userMap.set(user.id, user);
    });

    const tagMap: Map<string, Schema.legacy.v4.LegacyV4ChatTag> = new Map();
    input.chatTags?.forEach(tag => {
        if (tag.key) tagMap.set(tag.key, tag);
    });

    // Helper to map legacy tag colorVariant to AutoView chip color
    const mapTagColor = (
        variant: string | undefined
    ): IAutoView.IAutoViewChipProps["color"] => {
        const mapping: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
            red: "red",
            orange: "orange",
            yellow: "yellow",
            olive: "lime",
            green: "green",
            cobalt: "blue",
            purple: "violet",
            pink: "pink",
            navy: "indigo",
        };
        return variant && mapping[variant] ? mapping[variant] : "gray";
    };

    // Transform each user chat into a DataListItem
    const dataListItems: IAutoView.IAutoViewDataListItemProps[] = input.userChats.map(chat => {
        // Determine avatar or fallback icon for the chat's user
        const user = chat.userId ? userMap.get(chat.userId) : undefined;
        const startElement: IAutoView.IAutoViewAvatarProps | IAutoView.IAutoViewIconProps = user?.avatarUrl
            ? {
                  type: "Avatar",
                  src: user.avatarUrl,
                  name: user.name,
                  size: 32,
              }
            : {
                  type: "Icon",
                  id: "user",
                  size: 32,
              };

        // Create chips for each tag on this chat
        const chipProps: IAutoView.IAutoViewChipProps[] = (chat.tags ?? []).map(tagKey => {
            const tag = tagMap.get(tagKey);
            return {
                type: "Chip",
                label: tag?.name ?? tagKey,
                color: mapTagColor(tag?.colorVariant),
                variant: "outlined",
            };
        });

        // If tags exist, wrap them in a ChipGroup
        const endElement = chipProps.length
            ? {
                  type: "ChipGroup",
                  childrenProps: chipProps,
              }
            : undefined;

        return {
            type: "DataListItem",
            title: chat.name ?? `Chat ${chat.id}`,
            description: `State: ${chat.state ?? "unknown"}`,
            startElement,
            endElement,
        };
    });

    // Compose pagination buttons if prev/next links are provided
    const footerButtons: IAutoView.IAutoViewButtonProps[] = [];
    if (input.prev) {
        footerButtons.push({
            type: "Button",
            label: "Prev",
            href: input.prev,
            variant: "outlined",
            startElement: { type: "Icon", id: "arrow-left" },
        });
    }
    if (input.next) {
        footerButtons.push({
            type: "Button",
            label: "Next",
            href: input.next,
            variant: "outlined",
            endElement: { type: "Icon", id: "arrow-right" },
        });
    }

    // Build the final VerticalCard containing header, the chat list, and optional footer
    const cardChildren: Array<
        | IAutoView.IAutoViewCardHeaderProps
        | IAutoView.IAutoViewCardContentProps
        | IAutoView.IAutoViewCardFooterProps
    > = [];

    // Header with overall summary
    cardChildren.push({
        type: "CardHeader",
        title: "Chat Overview",
        description: `${input.userChats.length} chats, ${input.messages?.length ?? 0} messages`,
        startElement: { type: "Icon", id: "comments" },
    });

    // Content section holding the list of chats
    cardChildren.push({
        type: "CardContent",
        childrenProps: {
            type: "DataList",
            childrenProps: dataListItems,
        },
    });

    // Footer with pagination if needed
    if (footerButtons.length > 0) {
        cardChildren.push({
            type: "CardFooter",
            childrenProps: footerButtons,
        });
    }

    // Return the assembled vertical card
    return {
        type: "VerticalCard",
        childrenProps: cardChildren,
    } as IAutoView.IAutoViewVerticalCardProps;
}

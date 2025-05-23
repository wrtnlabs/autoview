import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export interface LegacyV4ChatBasedUserChatsView {
                    messages?: AutoViewInputSubTypes.legacy.v4.message.LegacyV4Message[];
                    sessions?: AutoViewInputSubTypes.legacy.v4.LegacyV4ChatSession[];
                    userChats?: AutoViewInputSubTypes.legacy.v4.LegacyV4UserChat[];
                    users?: AutoViewInputSubTypes.legacy.v4.LegacyV4User[];
                    managers?: AutoViewInputSubTypes.legacy.v4.LegacyV4Manager[];
                    chatTags?: AutoViewInputSubTypes.legacy.v4.LegacyV4ChatTag[];
                    prev?: string;
                    next?: string;
                }
            }
        }
        export namespace v4 {
            export namespace message {
                export interface LegacyV4Message {
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
                }
                export interface LegacyV4Block {
                    type: "bullets" | "code" | "text";
                    language?: string;
                    value?: string;
                    blocks?: AutoViewInputSubTypes.legacy.v4.message.LegacyV4Block[];
                }
                export interface LegacyV4Button {
                    title: string;
                    colorVariant?: "cobalt" | "green" | "orange" | "red" | "black" | "pink" | "purple";
                    url: string;
                }
                export interface LegacyV4File {
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
                }
                export interface LegacyV4Log {
                    action?: "changeName" | "changeScope" | "close" | "create" | "invite" | "join" | "assign" | "unassign" | "leave" | "open" | "remove" | "snooze" | "addTags" | "removeTags";
                    values?: string[];
                }
                export interface LegacyV4Reaction {
                    emojiName: string;
                    personKeys?: string[] & tags.UniqueItems;
                    empty?: boolean;
                }
                export interface LegacyV4ProfileBotInput {
                    id?: string;
                    key?: string;
                    type?: string;
                    name?: string;
                    value?: AutoViewInputSubTypes.AttributeValue;
                }
                export interface LegacyV4MessageMarketing {
                    type?: string;
                    id?: string;
                    advertising?: boolean;
                    sendToOfflineXms?: boolean;
                    sendToOfflineEmail?: boolean;
                    exposureType?: "fullScreen";
                }
                export interface LegacyV4MessageSupportBot {
                    id?: string;
                    revisionId?: string;
                    sectionId?: string;
                    stepIndex?: number & tags.Type<"int32">;
                    buttons?: AutoViewInputSubTypes.legacy.v4.LegacyV4SupportBotRouteSection_dollar_LegacyV4Button[];
                    submitButtonIndex?: number & tags.Type<"int32">;
                }
            }
            export interface LegacyV4WebPage {
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
            }
            export interface LegacyV4SupportBotRouteSection_dollar_LegacyV4Button {
                text: string;
                nextSectionId: string;
            }
            export interface LegacyV4ChatSession {
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
            }
            export interface LegacyV4UserChat {
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
            }
            export interface LegacyV4UserChat_dollar_LegacyV4UserChatSupportBot {
                id?: string;
                revisionId?: string;
                sectionPath?: string[];
            }
            export interface LegacyV4UserChat_dollar_LegacyV4UserChatMarketing {
                type?: string;
                id?: string;
                enableSupportBot?: boolean;
                supportBotId?: string;
            }
            export interface LegacyV4User {
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
            }
            export interface LegacyV4Manager {
                id?: string;
                channelId?: string;
                accountId?: string;
                name: string;
                description?: string;
                showDescriptionToFront?: boolean;
                nameDescI18nMap?: {
                    [key: string]: AutoViewInputSubTypes.NameDesc;
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
                avatar?: AutoViewInputSubTypes.TinyFile;
                operatorEmailReminder?: boolean;
                operator?: boolean;
                statusEmoji?: string;
                statusText?: string;
                statusClearAt?: number;
                managerId?: string;
                avatarUrl?: string;
                emailForFront?: string;
                mobileNumberForFront?: string & tags.Default<"+18004424000">;
            }
            export interface LegacyV4ChatTag {
                id?: string;
                channelId?: string;
                colorVariant?: "red" | "orange" | "yellow" | "olive" | "green" | "cobalt" | "purple" | "pink" | "navy";
                name: string;
                key: string;
                description?: string;
                followerIds?: string[] & tags.MinItems<1> & tags.MaxItems<2147483647> & tags.UniqueItems;
                createdAt?: number;
            }
        }
    }
    export interface AttributeValue {
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
    }
    export namespace profile {
        export interface UserProfile {
            [key: string]: {};
        }
    }
    export interface WebInfo {
        device?: string;
        os?: string;
        osName?: string;
        browser?: string;
        browserName?: string;
        sessionsCount?: number & tags.Type<"int32">;
        lastSeenAt?: number;
    }
    export interface MobileInfo {
        device?: string;
        os?: string;
        osName?: string;
        appName?: string;
        appVersion?: string;
        sdkName?: string;
        sdkVersion?: string;
        sessionsCount?: number & tags.Type<"int32">;
        lastSeenAt?: number;
    }
    export interface NameDesc {
        name: string & tags.Pattern<"^[^@#$%:/\\\\]+$">;
        description?: string;
    }
    export interface TinyFile {
        bucket: string;
        key: string;
        width?: number & tags.Type<"int32">;
        height?: number & tags.Type<"int32">;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4ChatBasedUserChatsView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const messageCount = value.messages?.length ?? 0;
  const sessionCount = value.sessions?.length ?? 0;
  const userChatCount = value.userChats?.length ?? 0;
  const userCount = value.users?.length ?? 0;
  const managerCount = value.managers?.length ?? 0;
  const tagCount = value.chatTags?.length ?? 0;
  const tagNames = value.chatTags?.map((tag) => tag.name) ?? [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Header */}
      <h2 className="text-xl font-semibold text-gray-800">Chat Overview</h2>

      {/* Summary Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="flex items-center p-2 bg-gray-50 rounded">
          <LucideReact.MessageSquare size={20} className="text-blue-500" />
          <span className="ml-2 text-sm font-medium text-gray-700">Messages</span>
          <span className="ml-auto text-sm font-semibold text-gray-900">
            {messageCount.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center p-2 bg-gray-50 rounded">
          <LucideReact.Clock size={20} className="text-indigo-500" />
          <span className="ml-2 text-sm font-medium text-gray-700">Sessions</span>
          <span className="ml-auto text-sm font-semibold text-gray-900">
            {sessionCount.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center p-2 bg-gray-50 rounded">
          <LucideReact.MessageCircle size={20} className="text-green-500" />
          <span className="ml-2 text-sm font-medium text-gray-700">User Chats</span>
          <span className="ml-auto text-sm font-semibold text-gray-900">
            {userChatCount.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center p-2 bg-gray-50 rounded">
          <LucideReact.Users size={20} className="text-yellow-500" />
          <span className="ml-2 text-sm font-medium text-gray-700">Users</span>
          <span className="ml-auto text-sm font-semibold text-gray-900">
            {userCount.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center p-2 bg-gray-50 rounded">
          <LucideReact.UserCheck size={20} className="text-purple-500" />
          <span className="ml-2 text-sm font-medium text-gray-700">Managers</span>
          <span className="ml-auto text-sm font-semibold text-gray-900">
            {managerCount.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center p-2 bg-gray-50 rounded">
          <LucideReact.Tag size={20} className="text-pink-500" />
          <span className="ml-2 text-sm font-medium text-gray-700">Tags</span>
          <span className="ml-auto text-sm font-semibold text-gray-900">
            {tagCount.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Tag Badges */}
      {tagNames.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Chat Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tagNames.map((name) => (
              <span
                key={name}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full max-w-xs truncate"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Pagination Cursors */}
      {(value.prev || value.next) && (
        <div className="flex justify-between text-sm text-gray-600">
          {value.prev ? (
            <span className="flex items-center">
              <LucideReact.ChevronLeft size={16} className="mr-1" />
              <span className="truncate max-w-xs">{value.prev}</span>
            </span>
          ) : (
            <span />
          )}

          {value.next ? (
            <span className="flex items-center">
              <span className="truncate max-w-xs">{value.next}</span>
              <LucideReact.ChevronRight size={16} className="ml-1" />
            </span>
          ) : (
            <span />
          )}
        </div>
      )}
    </div>
  );
}

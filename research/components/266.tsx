import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace meet {
        export interface MeetStreamMessagesView {
            prev?: string;
            next?: string;
            messages?: AutoViewInputSubTypes.Message[];
            bots?: AutoViewInputSubTypes.bot.Bot[];
            users?: AutoViewInputSubTypes.user.User[];
        }
        export namespace ivr {
            export interface MessageIvr {
                audioFile?: AutoViewInputSubTypes.message.File;
            }
        }
    }
    export interface Message {
        chatKey: string;
        id: string;
        mainKey?: string;
        threadKey?: string;
        meetKey?: string;
        frontKey?: string;
        channelId: string;
        chatType: string;
        chatId: string;
        personType: string;
        personId: string;
        requestId?: string;
        language?: string;
        createdAt: number;
        version?: number & tags.Type<"int32">;
        blocks?: AutoViewInputSubTypes.message.Block[];
        plainText?: string;
        updatedAt?: number;
        inboundEmailId?: string;
        thread?: AutoViewInputSubTypes.message.MessageThread;
        meet?: AutoViewInputSubTypes.message.meet.MessageMeet;
        removerKey?: string;
        buttons?: AutoViewInputSubTypes.message.Button[] & tags.MinItems<1> & tags.MaxItems<2>;
        files?: AutoViewInputSubTypes.message.File[] & tags.MinItems<1> & tags.MaxItems<30>;
        webPage?: AutoViewInputSubTypes.message.WebPage;
        log?: AutoViewInputSubTypes.message.Log;
        reactions?: AutoViewInputSubTypes.message.Reaction[];
        form?: AutoViewInputSubTypes.message.form.Form;
        state?: "sending" | "sent" | "failed" | "removed";
        options?: ("actAsManager" | "displayAsChannel" | "doNotPost" | "doNotSearch" | "doNotSendApp" | "doNotUpdateDesk" | "immutable" | "private" | "silent" | "silentToManager" | "silentToUser")[] & tags.MinItems<1> & tags.MaxItems<2147483647> & tags.UniqueItems;
        marketing?: AutoViewInputSubTypes.message.userchat.MessageMarketing;
        supportBot?: AutoViewInputSubTypes.message.userchat.MessageSupportBot;
        workflow?: AutoViewInputSubTypes.message.userchat.MessageWorkflow;
        alf?: AutoViewInputSubTypes.message.alf.MessageAlf;
        alertLevel?: "alert" | "unread" | "none";
        ivr?: AutoViewInputSubTypes.meet.ivr.MessageIvr;
        threadMsg?: boolean;
        meetMsg?: boolean;
        broadcastedMsg?: boolean;
        workflowButton?: boolean;
        rootMessageId?: string;
        removedByWriter?: boolean;
        threadRoot?: boolean;
        meetRoot?: boolean;
    }
    export namespace message {
        export interface Block {
            type: "bullets" | "code" | "text";
            language?: string;
            value?: string;
            blocks?: AutoViewInputSubTypes.message.Block[];
        }
        export interface MessageThread {
            id?: string;
            managerIds?: string[] & tags.MinItems<1> & tags.MaxItems<2147483647> & tags.UniqueItems;
            repliedManagerIds?: string[] & tags.UniqueItems;
            replyCount?: number & tags.Type<"int32">;
            chatType?: string;
            chatId?: string;
            rootMessageId?: string;
        }
        export namespace meet {
            export interface MessageMeet {
                id?: string;
                chatType?: string;
                channelId?: string;
                state?: "live" | "ended" | "transcribing" | "transcribed" | "transcribeFailed";
                mode?: "audio" | "video";
                amassedPersons?: string[] & tags.UniqueItems;
                roomStartedAt?: number;
                call?: AutoViewInputSubTypes.message.meet.Call;
                front?: AutoViewInputSubTypes.message.meet.Front;
                recording?: AutoViewInputSubTypes.message.meet.Recording;
                country?: string;
                stateV2?: "live" | "ended" | "transcribing" | "transcribed" | "transcribeFailed";
                meetEndedAt?: number;
                managerIds?: string[] & tags.UniqueItems;
                meetType?: "front" | "call" | "team";
            }
            export interface Call {
                id?: string;
                from?: string & tags.Default<"+18004424000">;
                to?: string & tags.Default<"+18004424000">;
                direction?: "inbound" | "outbound";
                callServerIp?: string;
                missedReason?: "notInOperation" | "userLeft" | "ringTimeOver" | "inboundRateLimit" | "noOperator" | "exceededQueue" | "abandonedInQueue" | "workflow" | "preservedNumber" | "unregisteredNumber" | "blockedUser";
                firstWaitingStartedAt?: number;
                createAt?: number;
                engagedAt?: number;
                closedAt?: number;
                missedHandledAt?: number;
                voiceMail?: boolean;
                userPhoneNumberType?: "mobileNumber" | "landlineNumber";
            }
            export interface Front {
                id?: string;
                direction?: "inbound" | "outbound";
                missedReason?: "notInOperation" | "userLeft" | "ringTimeOver" | "inboundRateLimit" | "noOperator" | "exceededQueue" | "abandonedInQueue" | "workflow" | "preservedNumber" | "unregisteredNumber" | "blockedUser";
                engagedAt?: number;
                firstWaitingStartedAt?: number;
                missedHandledAt?: number;
            }
            export interface Recording {
                id: string;
                bucket: string;
                key: string;
                contentType?: string;
                duration?: number;
                size?: number & tags.Type<"int32"> & tags.Maximum<10485760>;
                name?: string;
                type?: "file" | "image" | "video" | "audio";
                channelId?: string;
                chatType?: string;
                chatId?: string;
            }
        }
        export interface Button {
            title: string;
            colorVariant?: "cobalt" | "green" | "orange" | "red" | "black" | "pink" | "purple";
            action: AutoViewInputSubTypes.message.action.Action;
            /**
             * @deprecated
            */
            url?: string;
        }
        export namespace action {
            export interface Action {
                attributes?: AutoViewInputSubTypes.message.action.Attributes;
                type: string;
            }
            export interface Attributes {
            }
        }
        export interface File {
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
        export interface WebPage {
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
        export interface Log {
            action?: "changeName" | "changeScope" | "close" | "autoClose" | "create" | "invite" | "join" | "assign" | "autoAssign" | "unassign" | "leave" | "open" | "autoOpen" | "enqueue" | "remove" | "snooze" | "addTags" | "removeTags" | "assignTeam" | "unassignTeam" | "joinMeet" | "leaveMeet" | "inviteMeet" | "missMeet" | "callbackMeet" | "processBranch" | "sendXms" | "addUserTags" | "removeUserTags" | "updatePriority" | "startWorkflow" | "endWorkflow" | "interruptWorkflow" | "interruptWorkflowByBot" | "tryOpenWithAlf";
            values?: string[];
            triggerType?: string;
            triggerId?: string;
        }
        export interface Reaction {
            emojiName: string;
            personKeys?: string[] & tags.UniqueItems;
        }
        export namespace form {
            export interface Form {
                submittedAt?: number;
                inputs?: AutoViewInputSubTypes.message.form.FormInput[];
                type: string;
            }
            export interface FormInput {
                value?: {};
                readOnly?: boolean;
                type?: "text" | "number" | "bool" | "date" | "datetime" | "radio" | "singleSelect" | "checkbox" | "multiSelect";
                label?: string;
                bindingKey?: string;
                dataType?: "string" | "date" | "list" | "listOfNumber" | "number" | "datetime" | "boolean";
                userChatProfileBindingKey?: boolean;
                userProfileBindingKey?: boolean;
            }
        }
        export namespace userchat {
            export interface MessageMarketing {
                type?: string;
                id?: string;
                advertising?: boolean;
                sendToOfflineXms?: boolean;
                sendToOfflineEmail?: boolean;
                exposureType?: "fullScreen";
            }
            /**
             * @deprecated
            */
            export interface MessageSupportBot {
                id?: string;
                revisionId?: string;
                sectionId?: string;
                stepIndex?: number & tags.Type<"int32">;
                buttons?: AutoViewInputSubTypes.supportbot.SupportBotRouteSection_dollar_Button[];
                submitButtonIndex?: number & tags.Type<"int32">;
            }
            export interface MessageWorkflow {
                id?: string;
                revisionId?: string;
                sectionId?: string;
                actionIndex?: number & tags.Type<"int32">;
                submitButtonId?: string;
                buttonBotMessage?: boolean;
            }
        }
        export namespace alf {
            export interface MessageAlf {
                type?: "complete" | "rag" | "incomplete" | "impossible" | "command" | "faq" | "failed" | "rateLimited" | "openUserChat" | "system";
                references?: AutoViewInputSubTypes.message.alf.Reference[];
                mentionAlfAnswered?: boolean;
            }
            export interface Reference {
                index?: string;
                type: string;
            }
        }
    }
    export namespace supportbot {
        export interface SupportBotRouteSection_dollar_Button {
            text: string;
            nextSectionId: string;
        }
    }
    export namespace bot {
        export interface Bot {
            color?: string & tags.Default<"#123456">;
            createdAt?: number;
            avatarUrl?: string;
            ai?: boolean;
            name?: string;
            channelId?: string;
            id?: string;
            description?: string;
            nameDescI18nMap?: {
                [key: string]: AutoViewInputSubTypes.NameDesc;
            };
        }
    }
    export interface NameDesc {
        name: string & tags.Pattern<"^[^@#$%:/\\\\]+$">;
        description?: string;
    }
    export namespace user {
        export interface User {
            id?: string;
            channelId?: string;
            memberId?: string;
            veilId?: string;
            unifiedId?: string;
            type?: "member" | "lead" | "unified";
            name?: string;
            mobileNumberQualified?: boolean;
            emailQualified?: boolean;
            profile?: {
                [key: string]: {};
            };
            profileOnce?: AutoViewInputSubTypes.profile.UserProfile;
            tags?: string[] & tags.MinItems<0> & tags.MaxItems<20> & tags.UniqueItems;
            userImportTags?: string[] & tags.MinItems<0> & tags.MaxItems<30>;
            alert?: number & tags.Type<"int32">;
            unread?: number & tags.Type<"int32">;
            popUpChatId?: string;
            blocked?: boolean;
            blockedKey?: string;
            unsubscribeEmail?: boolean;
            unsubscribeEmailUpdatedAt?: number;
            unsubscribeTexting?: boolean;
            unsubscribeTextingUpdatedAt?: number;
            hasChat?: boolean;
            mainChatId?: string;
            hasPushToken?: boolean;
            language?: string & tags.Default<"en">;
            country?: string;
            timeZone?: string;
            province?: string;
            city?: string;
            latitude?: number;
            longitude?: number;
            web?: AutoViewInputSubTypes.WebInfo;
            mobile?: AutoViewInputSubTypes.MobileInfo;
            sessionsCount?: number & tags.Type<"int32">;
            lastSeenAt?: number;
            createdAt?: number;
            updatedAt?: number;
            version?: number & tags.Type<"int32">;
            managedKey?: number & tags.Type<"int32">;
            named?: boolean;
            member?: boolean;
            email?: string;
            avatarUrl?: string;
            mobileNumber?: string & tags.Default<"+18004424000">;
            landlineNumber?: string & tags.Default<"+18004424000">;
            constrainted?: boolean;
            systemLanguage?: string & tags.Default<"en">;
        }
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
}
export type AutoViewInput = AutoViewInputSubTypes.meet.MeetStreamMessagesView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const messages = value.messages ?? [];
  const users = value.users ?? [];
  const bots = value.bots ?? [];
  const messageCount = messages.length;
  const userCount = users.length;
  const botCount = bots.length;

  // Build quick lookup maps for authors
  const userMap = new Map<string, string>();
  users.forEach((u) => {
    if (u.id && u.name) userMap.set(u.id, u.name);
  });

  const botMap = new Map<string, string>();
  bots.forEach((b) => {
    if (b.id && b.name) botMap.set(b.id, b.name);
  });

  // Format timestamp to "MMM d, hh:mm AM/PM" style
  const formatDate = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  // Limit how many messages to show in preview
  const previewMessages = messages.slice(0, 5);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Summary Header */}
      <div className="flex items-center justify-between mb-4 text-gray-600">
        <div className="flex items-center gap-1">
          <LucideReact.MessageSquare size={16} className="text-gray-500" />
          <span className="text-sm">{messageCount}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Users size={16} className="text-gray-500" />
          <span className="text-sm">{userCount}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Bot size={16} className="text-gray-500" role="img" aria-label="Bot count" />
          <span className="text-sm">{botCount}</span>
        </div>
      </div>

      {/* Messages Preview */}
      {previewMessages.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {previewMessages.map((msg, idx) => {
            // Determine author and icon
            const authorId = msg.personId ?? "";
            const isBot = msg.personType === "bot" && botMap.has(authorId);
            const authorName = isBot
              ? botMap.get(authorId)!
              : userMap.get(authorId) || msg.personType || "Unknown";

            // Extract text content
            const content =
              msg.plainText ||
              msg.blocks?.[0]?.value ||
              "—";

            const timeLabel = msg.createdAt ? formatDate(msg.createdAt) : "";

            const reactionCount = msg.reactions?.length ?? 0;

            return (
              <li key={idx} className="py-2">
                <div className="flex items-start">
                  {/* Author Icon */}
                  <div className="flex-none">
                    {isBot ? (
                      <LucideReact.Bot
                        size={24}
                        className="text-indigo-500"
                        role="img"
                        aria-label="Bot"
                      />
                    ) : (
                      <LucideReact.User
                        size={24}
                        className="text-gray-500"
                        role="img"
                        aria-label="User"
                      />
                    )}
                  </div>

                  {/* Message Body */}
                  <div className="ml-3 flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-800 truncate">
                        {authorName}
                      </span>
                      {timeLabel && (
                        <span className="text-xs text-gray-400 ml-2">
                          {timeLabel}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-gray-700 truncate">
                      {content}
                    </p>
                  </div>

                  {/* Reactions */}
                  {reactionCount > 0 && (
                    <div className="ml-2 flex items-center text-gray-500 text-xs">
                      <LucideReact.ThumbsUp size={12} />
                      <span className="ml-1">{reactionCount}</span>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="flex flex-col items-center py-8 text-gray-400">
          <LucideReact.AlertCircle size={32} />
          <span className="mt-2 text-sm">No messages available</span>
        </div>
      )}
    </div>
  );
}

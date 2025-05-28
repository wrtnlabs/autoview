import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface MessageView {
        message?: AutoViewInputSubTypes.Message;
        bot?: AutoViewInputSubTypes.bot.CustomBot;
        user?: AutoViewInputSubTypes.user.User;
        savedMessage?: AutoViewInputSubTypes.IndexedMessage;
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
    export namespace meet {
        export namespace ivr {
            export interface MessageIvr {
                audioFile?: AutoViewInputSubTypes.message.File;
            }
        }
    }
    export namespace bot {
        export interface CustomBot {
            id?: string;
            channelId?: string;
            name: string;
            description?: string;
            nameDescI18nMap?: {
                [key: string]: AutoViewInputSubTypes.NameDesc;
            };
            createdAt?: number;
            avatar?: AutoViewInputSubTypes.TinyFile;
            color: string & tags.Default<"#123456">;
            avatarUrl?: string;
            ai?: boolean;
        }
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
    export interface IndexedMessage {
        messageId?: string;
        indexedAt?: number;
        type?: "mentioned" | "teamMentioned" | "reacted" | "saved";
        chatId?: string;
        chatType?: string;
        personId?: string;
        personType?: string;
        channelId?: string;
        expireAt?: number;
        updatedAt?: number;
        createdAt?: number;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.MessageView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Utility to format timestamps
  const formatDate = (ms?: number): string =>
    ms ? new Date(ms).toLocaleString() : "";

  // 1. User profile view
  if (value.user) {
    const user = value.user;
    return (
      <div className="p-4 bg-white rounded-lg shadow-md flex items-center gap-4 max-w-md">
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={user.name ?? "User"}
            onError={(e) => {
              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                user.name ?? "User"
              )}&background=random`;
            }}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
            <LucideReact.User size={24} />
          </div>
        )}
        <div className="flex-1">
          <h2 className="text-lg font-medium text-gray-800">
            {user.name ?? "Unknown User"}
          </h2>
          {user.email && (
            <div className="flex items-center text-gray-500 text-sm mt-1">
              <LucideReact.Mail size={16} />
              <span className="ml-1">{user.email}</span>
            </div>
          )}
          {user.mobileNumber && (
            <div className="flex items-center text-gray-500 text-sm mt-1">
              <LucideReact.Phone size={16} />
              <span className="ml-1">{user.mobileNumber}</span>
            </div>
          )}
          {(user.lastSeenAt || user.createdAt) && (
            <div className="flex items-center text-gray-500 text-sm mt-1">
              <LucideReact.Calendar size={16} />
              <span className="ml-1">
                {user.lastSeenAt
                  ? `Last seen: ${formatDate(user.lastSeenAt)}`
                  : `Joined: ${formatDate(user.createdAt)}`}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 2. Bot profile view
  if (value.bot) {
    const bot = value.bot;
    return (
      <div className="p-4 bg-white rounded-lg shadow-md flex items-start gap-4 max-w-md">
        {bot.avatarUrl ? (
          <img
            src={bot.avatarUrl}
            alt={bot.name}
            onError={(e) => {
              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                bot.name
              )}&background=${encodeURIComponent(bot.color)}`;
            }}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
            <LucideReact.Cpu size={24} />
          </div>
        )}
        <div className="flex-1">
          <h2 className="text-lg font-medium text-gray-800">{bot.name}</h2>
          {bot.description && (
            <p className="mt-1 text-gray-600 text-sm">{bot.description}</p>
          )}
          {bot.createdAt && (
            <div className="flex items-center text-gray-500 text-sm mt-2">
              <LucideReact.Calendar size={16} />
              <span className="ml-1">Created: {formatDate(bot.createdAt)}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 3. Message view
  if (value.message) {
    const msg = value.message;
    const authorLabel = msg.personType
      ? `${msg.personType.charAt(0).toUpperCase()}${msg.personType.slice(1)}`
      : "Unknown";
    const content = msg.plainText?.trim() || "";

    return (
      <div className="p-4 bg-white rounded-lg shadow-md max-w-md">
        <div className="flex items-center gap-2">
          <LucideReact.MessageSquare className="text-gray-500" size={20} />
          <span className="font-medium text-gray-800">{authorLabel}</span>
          {msg.createdAt && (
            <span className="ml-auto flex items-center text-gray-500 text-sm">
              <LucideReact.Calendar size={14} />
              <span className="ml-1">{formatDate(msg.createdAt)}</span>
            </span>
          )}
        </div>
        {content && (
          <p className="mt-2 text-gray-700 text-sm line-clamp-3">{content}</p>
        )}
        {msg.files && msg.files.length > 0 && (
          <div className="mt-3 flex items-center text-gray-500 text-sm gap-1">
            <LucideReact.Paperclip size={16} />
            <span>
              {msg.files.length} attachment{msg.files.length > 1 ? "s" : ""}
            </span>
          </div>
        )}
      </div>
    );
  }

  // 4. Saved-message view
  if (value.savedMessage) {
    const saved = value.savedMessage;
    const title = saved.type
      ? `${saved.type.charAt(0).toUpperCase()}${saved.type.slice(1)}`
      : "Saved Message";
    return (
      <div className="p-4 bg-white rounded-lg shadow-md flex items-center gap-3 max-w-sm">
        <LucideReact.Bookmark className="text-gray-500" size={20} />
        <div>
          <h2 className="text-md font-medium text-gray-800">{title}</h2>
          {saved.indexedAt && (
            <p className="text-sm text-gray-500">
              Saved at: {formatDate(saved.indexedAt)}
            </p>
          )}
        </div>
      </div>
    );
  }

  // 5. Fallback when no relevant data is provided
  return (
    <div className="flex flex-col items-center text-gray-400 p-4">
      <LucideReact.AlertCircle size={24} />
      <span className="mt-2">No data available</span>
    </div>
  );
}

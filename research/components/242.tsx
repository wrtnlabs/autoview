import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace desk {
        export namespace message {
            export type ThreadStreamMessagesView = {
                prev?: string;
                next?: string;
                messages?: AutoViewInputSubTypes.Message[];
                bots?: AutoViewInputSubTypes.bot.Bot[];
                savedMessages?: AutoViewInputSubTypes.IndexedMessage[];
            };
        }
    }
    export type Message = {
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
    };
    export namespace message {
        export type Block = {
            type: "bullets" | "code" | "text";
            language?: string;
            value?: string;
            blocks?: AutoViewInputSubTypes.message.Block[];
        };
        export type MessageThread = {
            id?: string;
            managerIds?: string[] & tags.MinItems<1> & tags.MaxItems<2147483647> & tags.UniqueItems;
            repliedManagerIds?: string[] & tags.UniqueItems;
            replyCount?: number & tags.Type<"int32">;
            chatType?: string;
            chatId?: string;
            rootMessageId?: string;
        };
        export namespace meet {
            export type MessageMeet = {
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
            };
            export type Call = {
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
            };
            export type Front = {
                id?: string;
                direction?: "inbound" | "outbound";
                missedReason?: "notInOperation" | "userLeft" | "ringTimeOver" | "inboundRateLimit" | "noOperator" | "exceededQueue" | "abandonedInQueue" | "workflow" | "preservedNumber" | "unregisteredNumber" | "blockedUser";
                engagedAt?: number;
                firstWaitingStartedAt?: number;
                missedHandledAt?: number;
            };
            export type Recording = {
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
            };
        }
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
        export type Log = {
            action?: "changeName" | "changeScope" | "close" | "autoClose" | "create" | "invite" | "join" | "assign" | "autoAssign" | "unassign" | "leave" | "open" | "autoOpen" | "enqueue" | "remove" | "snooze" | "addTags" | "removeTags" | "assignTeam" | "unassignTeam" | "joinMeet" | "leaveMeet" | "inviteMeet" | "missMeet" | "callbackMeet" | "processBranch" | "sendXms" | "addUserTags" | "removeUserTags" | "updatePriority" | "startWorkflow" | "endWorkflow" | "interruptWorkflow" | "interruptWorkflowByBot" | "tryOpenWithAlf";
            values?: string[];
            triggerType?: string;
            triggerId?: string;
        };
        export type Reaction = {
            emojiName: string;
            personKeys?: string[] & tags.UniqueItems;
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
        export namespace userchat {
            export type MessageMarketing = {
                type?: string;
                id?: string;
                advertising?: boolean;
                sendToOfflineXms?: boolean;
                sendToOfflineEmail?: boolean;
                exposureType?: "fullScreen";
            };
            /**
             * @deprecated
            */
            export type MessageSupportBot = {
                id?: string;
                revisionId?: string;
                sectionId?: string;
                stepIndex?: number & tags.Type<"int32">;
                buttons?: AutoViewInputSubTypes.supportbot.SupportBotRouteSection_dollar_Button[];
                submitButtonIndex?: number & tags.Type<"int32">;
            };
            export type MessageWorkflow = {
                id?: string;
                revisionId?: string;
                sectionId?: string;
                actionIndex?: number & tags.Type<"int32">;
                submitButtonId?: string;
                buttonBotMessage?: boolean;
            };
        }
        export namespace alf {
            export type MessageAlf = {
                type?: "complete" | "rag" | "incomplete" | "impossible" | "command" | "faq" | "failed" | "rateLimited" | "openUserChat" | "system";
                references?: AutoViewInputSubTypes.message.alf.Reference[];
                mentionAlfAnswered?: boolean;
            };
            export type Reference = {
                index?: string;
                type: string;
            };
        }
    }
    export namespace supportbot {
        export type SupportBotRouteSection_dollar_Button = {
            text: string;
            nextSectionId: string;
        };
    }
    export namespace meet {
        export namespace ivr {
            export type MessageIvr = {
                audioFile?: AutoViewInputSubTypes.message.File;
            };
        }
    }
    export namespace bot {
        export type Bot = {
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
        };
    }
    export type NameDesc = {
        name: string & tags.Pattern<"^[^@#$%:/\\\\]+$">;
        description?: string;
    };
    export type IndexedMessage = {
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
    };
}
export type AutoViewInput = AutoViewInputSubTypes.desk.message.ThreadStreamMessagesView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const bots: AutoViewInputSubTypes.bot.Bot[] = value.bots ?? [];
  const messages: AutoViewInputSubTypes.Message[] = value.messages ?? [];
  const savedCount: number = value.savedMessages?.length ?? 0;

  // Build a map of bot IDs to bot data for quick lookup
  const botsMap = new Map<string, AutoViewInputSubTypes.bot.Bot>();
  bots.forEach((bot) => {
    if (bot.id) botsMap.set(bot.id, bot);
  });

  // Format each message: time, snippet, author
  const formattedMessages = messages.map((m) => {
    const time = m.createdAt
      ? new Date(m.createdAt).toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";

    let snippet = m.plainText?.trim() ?? "";
    if (!snippet && m.blocks) {
      const flatten = (blocks: AutoViewInputSubTypes.message.Block[]): string =>
        blocks.map((b) => b.value ?? "").join(" ");
      snippet = flatten(m.blocks).trim();
    }
    if (snippet.length > 100) snippet = snippet.slice(0, 100) + "...";

    const pid = m.personId;
    const author =
      pid && botsMap.has(pid)
        ? botsMap.get(pid)!.name ?? "Bot"
        : m.personType ?? "User";

    return {
      id: m.id,
      time,
      snippet: snippet || "[No content]",
      author,
    };
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Participants (bots) */}
      {bots.length > 0 && (
        <div className="mb-4 flex items-center space-x-2 overflow-x-auto">
          <span className="text-sm font-semibold text-gray-700 flex-shrink-0">
            Participants:
          </span>
          <div className="flex space-x-3">
            {bots.map((bot) => (
              <div key={bot.id} className="flex items-center space-x-1">
                {bot.avatarUrl && (
                  <img
                    src={bot.avatarUrl}
                    alt={bot.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                )}
                <span className="text-sm text-gray-600 truncate">
                  {bot.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Saved messages badge */}
      {savedCount > 0 && (
        <div className="mb-4">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
            Saved Messages: {savedCount}
          </span>
        </div>
      )}

      {/* Message list */}
      <ul className="space-y-4">
        {formattedMessages.length > 0 ? (
          formattedMessages.map((msg) => (
            <li key={msg.id} className="border-t pt-4">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-medium text-gray-800 truncate">
                  {msg.author}
                </span>
                <span className="text-xs text-gray-500">{msg.time}</span>
              </div>
              <p className="mt-1 text-sm text-gray-700 line-clamp-3">
                {msg.snippet}
              </p>
            </li>
          ))
        ) : (
          <li className="text-center text-sm text-gray-500">
            No messages to display.
          </li>
        )}
      </ul>
    </div>
  );
}

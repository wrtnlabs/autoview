import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace desk {
    export namespace message {
      export type MessagesView = {
        prev?: string;
        next?: string;
        messages?: AutoViewInputSubTypes.Message[];
        bots?: AutoViewInputSubTypes.bot.Bot[];
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
    buttons?: AutoViewInputSubTypes.message.Button[] &
      tags.MinItems<1> &
      tags.MaxItems<2>;
    files?: AutoViewInputSubTypes.message.File[] &
      tags.MinItems<1> &
      tags.MaxItems<30>;
    webPage?: AutoViewInputSubTypes.message.WebPage;
    log?: AutoViewInputSubTypes.message.Log;
    reactions?: AutoViewInputSubTypes.message.Reaction[];
    form?: AutoViewInputSubTypes.message.form.Form;
    state?: "sending" | "sent" | "failed" | "removed";
    options?: (
      | "actAsManager"
      | "displayAsChannel"
      | "doNotPost"
      | "doNotSearch"
      | "doNotSendApp"
      | "doNotUpdateDesk"
      | "immutable"
      | "private"
      | "silent"
      | "silentToManager"
      | "silentToUser"
    )[] &
      tags.MinItems<1> &
      tags.MaxItems<2147483647> &
      tags.UniqueItems;
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
      managerIds?: string[] &
        tags.MinItems<1> &
        tags.MaxItems<2147483647> &
        tags.UniqueItems;
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
        state?:
          | "live"
          | "ended"
          | "transcribing"
          | "transcribed"
          | "transcribeFailed";
        mode?: "audio" | "video";
        amassedPersons?: string[] & tags.UniqueItems;
        roomStartedAt?: number;
        call?: AutoViewInputSubTypes.message.meet.Call;
        front?: AutoViewInputSubTypes.message.meet.Front;
        recording?: AutoViewInputSubTypes.message.meet.Recording;
        country?: string;
        stateV2?:
          | "live"
          | "ended"
          | "transcribing"
          | "transcribed"
          | "transcribeFailed";
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
        missedReason?:
          | "notInOperation"
          | "userLeft"
          | "ringTimeOver"
          | "inboundRateLimit"
          | "noOperator"
          | "exceededQueue"
          | "abandonedInQueue"
          | "workflow"
          | "preservedNumber"
          | "unregisteredNumber"
          | "blockedUser";
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
        missedReason?:
          | "notInOperation"
          | "userLeft"
          | "ringTimeOver"
          | "inboundRateLimit"
          | "noOperator"
          | "exceededQueue"
          | "abandonedInQueue"
          | "workflow"
          | "preservedNumber"
          | "unregisteredNumber"
          | "blockedUser";
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
      colorVariant?:
        | "cobalt"
        | "green"
        | "orange"
        | "red"
        | "black"
        | "pink"
        | "purple";
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
      action?:
        | "changeName"
        | "changeScope"
        | "close"
        | "autoClose"
        | "create"
        | "invite"
        | "join"
        | "assign"
        | "autoAssign"
        | "unassign"
        | "leave"
        | "open"
        | "autoOpen"
        | "enqueue"
        | "remove"
        | "snooze"
        | "addTags"
        | "removeTags"
        | "assignTeam"
        | "unassignTeam"
        | "joinMeet"
        | "leaveMeet"
        | "inviteMeet"
        | "missMeet"
        | "callbackMeet"
        | "processBranch"
        | "sendXms"
        | "addUserTags"
        | "removeUserTags"
        | "updatePriority"
        | "startWorkflow"
        | "endWorkflow"
        | "interruptWorkflow"
        | "interruptWorkflowByBot"
        | "tryOpenWithAlf";
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
        type?:
          | "text"
          | "number"
          | "bool"
          | "date"
          | "datetime"
          | "radio"
          | "singleSelect"
          | "checkbox"
          | "multiSelect";
        label?: string;
        bindingKey?: string;
        dataType?:
          | "string"
          | "date"
          | "list"
          | "listOfNumber"
          | "number"
          | "datetime"
          | "boolean";
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
        type?:
          | "complete"
          | "rag"
          | "incomplete"
          | "impossible"
          | "command"
          | "faq"
          | "failed"
          | "rateLimited"
          | "openUserChat"
          | "system";
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
}
export type AutoViewInput = AutoViewInputSubTypes.desk.message.MessagesView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (timestamp: number): string =>
    new Date(timestamp).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

  const botMap = React.useMemo(() => {
    const map = new Map<string, AutoViewInputSubTypes.bot.Bot>();
    if (value.bots) {
      for (const bot of value.bots) {
        if (bot.id) map.set(bot.id, bot);
      }
    }
    return map;
  }, [value.bots]);

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      e.currentTarget.alt,
    )}&background=random`;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // If there are no messages, show an empty state
  if (!value.messages || value.messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={24} />
        <span className="mt-2">No messages to display</span>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <div className="mb-4 text-sm text-gray-600">
        <LucideReact.MessageSquare size={16} className="inline-block mr-1" />
        Messages ({value.messages.length})
      </div>
      <div className="space-y-4">
        {value.messages.map((msg) => {
          const bot = botMap.get(msg.personId);
          const isBot = Boolean(bot);
          const displayName = isBot
            ? (bot?.name ?? "Bot")
            : msg.personType === "user"
              ? "User"
              : msg.personType || "Unknown";
          const avatarSrc =
            isBot && bot?.avatarUrl
              ? bot.avatarUrl
              : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  displayName,
                )}&background=random`;

          return (
            <div key={msg.id} className="flex items-start space-x-3">
              <img
                src={avatarSrc}
                alt={displayName}
                onError={handleImageError}
                className="w-8 h-8 rounded-full bg-gray-200 object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">
                    {displayName}
                  </span>
                  {typeof msg.createdAt === "number" && (
                    <span className="text-xs text-gray-500 flex items-center">
                      <LucideReact.Calendar size={12} className="mr-1" />
                      {formatDate(msg.createdAt)}
                    </span>
                  )}
                </div>
                {msg.plainText ? (
                  <p className="mt-1 text-sm text-gray-700 line-clamp-3">
                    {msg.plainText}
                  </p>
                ) : (
                  <p className="mt-1 text-sm text-gray-500 italic">
                    [No text content]
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

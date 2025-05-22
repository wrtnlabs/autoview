import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export type MessageView = {
    message?: AutoViewInputSubTypes.Message;
    bot?: AutoViewInputSubTypes.bot.CustomBot;
    user?: AutoViewInputSubTypes.user.User;
    savedMessage?: AutoViewInputSubTypes.IndexedMessage;
  };
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
    export type CustomBot = {
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
    };
  }
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
  export namespace user {
    export type User = {
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
    };
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
export type AutoViewInput = AutoViewInputSubTypes.MessageView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (ts?: number): string =>
    ts ? new Date(ts).toLocaleString() : "—";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  //    Branch rendering based on which subtype is present.

  // 2.1. User View
  if (value.user) {
    const user = value.user;
    const name = user.name || "Unknown User";
    const email = user.email || "—";
    const phone = user.mobileNumber;
    const avatarSrc =
      user.avatarUrl ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        name,
      )}&background=0D8ABC&color=fff`;

    return (
      <div className="p-4 bg-white rounded-lg shadow flex items-start space-x-4">
        <img
          src={avatarSrc}
          alt={name}
          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                name,
              )}&background=0D8ABC&color=fff`;
          }}
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800 truncate">
              {name}
            </h3>
            <span className="text-sm text-gray-500">
              Last seen {formatDate(user.lastSeenAt)}
            </span>
          </div>
          <div className="mt-2 space-y-1 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <LucideReact.Mail size={16} className="text-gray-400" />
              <span className="truncate">{email}</span>
            </div>
            {phone && (
              <div className="flex items-center gap-2">
                <LucideReact.Phone size={16} className="text-gray-400" />
                <span>{phone}</span>
              </div>
            )}
            {user.unread != null && (
              <div className="flex items-center gap-2">
                <LucideReact.Inbox size={16} className="text-gray-400" />
                <span>{user.unread} unread</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 2.2. Bot View
  if (value.bot) {
    const bot = value.bot;
    const name = bot.name;
    const description = bot.description;
    return (
      <div className="p-4 bg-white rounded-lg shadow flex items-start space-x-4">
        <div
          className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: bot.color }}
        >
          <LucideReact.Cpu size={24} color="white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {name}
          </h3>
          {description && (
            <p className="mt-1 text-sm text-gray-600 line-clamp-2">
              {description}
            </p>
          )}
        </div>
      </div>
    );
  }

  // 2.3. Message View
  if (value.message) {
    const msg = value.message;
    const content = msg.plainText || msg.blocks?.[0]?.value || "";
    const created = formatDate(msg.createdAt);
    const state = msg.state || "sent";
    const stateIconMap: Record<string, JSX.Element> = {
      sending: (
        <LucideReact.Clock
          className="text-amber-500"
          size={16}
          strokeWidth={1.5}
        />
      ),
      sent: (
        <LucideReact.CheckCircle
          className="text-green-500"
          size={16}
          strokeWidth={1.5}
        />
      ),
      failed: (
        <LucideReact.AlertTriangle
          className="text-red-500"
          size={16}
          strokeWidth={1.5}
        />
      ),
      removed: (
        <LucideReact.XCircle
          className="text-gray-400"
          size={16}
          strokeWidth={1.5}
        />
      ),
    };
    return (
      <div className="p-4 bg-white rounded-lg shadow">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            {stateIconMap[state]}
            <span>{created}</span>
          </div>
          {msg.updatedAt && (
            <span className="italic">Edited {formatDate(msg.updatedAt)}</span>
          )}
        </div>
        {content && (
          <p className="mt-2 text-gray-800 text-sm line-clamp-3 whitespace-pre-wrap">
            {content}
          </p>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
          {msg.files && msg.files.length > 0 && (
            <div className="flex items-center gap-1">
              <LucideReact.Paperclip size={16} />
              <span>
                {msg.files.length} file{msg.files.length > 1 ? "s" : ""}
              </span>
            </div>
          )}
          {msg.buttons && msg.buttons.length > 0 && (
            <div className="flex items-center gap-1">
              <LucideReact.CircleDot size={16} />
              <span>
                {msg.buttons.length} button
                {msg.buttons.length > 1 ? "s" : ""}
              </span>
            </div>
          )}
          {msg.reactions && msg.reactions.length > 0 && (
            <div className="flex items-center gap-1">
              <LucideReact.Heart size={16} className="text-pink-500" />
              <span>{msg.reactions.length}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 2.4. Saved Message View
  if (value.savedMessage) {
    const sm = value.savedMessage;
    const when = formatDate(sm.indexedAt);
    const type = sm.type || "saved";
    const iconMap: Record<string, JSX.Element> = {
      saved: <LucideReact.Bookmark className="text-blue-500" size={16} />,
      reacted: <LucideReact.ThumbsUp className="text-pink-500" size={16} />,
      mentioned: <LucideReact.AtSign className="text-indigo-500" size={16} />,
      teamMentioned: (
        <LucideReact.Users className="text-purple-500" size={16} />
      ),
    };
    const label = type.charAt(0).toUpperCase() + type.slice(1);
    return (
      <div className="p-4 bg-white rounded-lg shadow flex items-center space-x-2">
        {iconMap[type] || <LucideReact.Bell size={16} />}
        <span className="text-sm text-gray-700">{label}</span>
        <span className="ml-auto text-xs text-gray-500">{when}</span>
      </div>
    );
  }

  // 3. Fallback for no recognizable subtype
  return (
    <div className="p-4 bg-white rounded-lg shadow flex items-center justify-center text-gray-400">
      <LucideReact.AlertCircle className="text-gray-400" size={24} />
      <span className="ml-2">No data available</span>
    </div>
  );
}

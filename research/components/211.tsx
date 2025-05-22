import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
          sendMode:
            | "always"
            | "away"
            | "inOperation"
            | "customUsingSenderTime"
            | "customUsingReceiverTime"
            | "custom";
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
          sendMode?:
            | "immediately"
            | "reservedWithSenderTime"
            | "reservedWithReceiverTime";
          sendMedium?:
            | "appAlimtalk"
            | "appLine"
            | "email"
            | "inAppChat"
            | "xms";
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
        colorVariant?:
          | "red"
          | "orange"
          | "yellow"
          | "olive"
          | "green"
          | "cobalt"
          | "purple"
          | "pink"
          | "navy";
        name: string;
        key: string;
        description?: string;
        followerIds?: string[] &
          tags.MinItems<1> &
          tags.MaxItems<2147483647> &
          tags.UniqueItems;
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
          buttons?: AutoViewInputSubTypes.legacy.v4.message.LegacyV4Button[] &
            tags.MinItems<1> &
            tags.MaxItems<2>;
          files?: AutoViewInputSubTypes.legacy.v4.message.LegacyV4File[] &
            tags.MinItems<1> &
            tags.MaxItems<4>;
          webPage?: AutoViewInputSubTypes.legacy.v4.LegacyV4WebPage;
          log?: AutoViewInputSubTypes.legacy.v4.message.LegacyV4Log;
          reactions?: AutoViewInputSubTypes.legacy.v4.message.LegacyV4Reaction[];
          profileBot?: AutoViewInputSubTypes.legacy.v4.message.LegacyV4ProfileBotInput[] &
            tags.MinItems<1> &
            tags.MaxItems<2147483647>;
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
          )[] &
            tags.UniqueItems;
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
          colorVariant?:
            | "cobalt"
            | "green"
            | "orange"
            | "red"
            | "black"
            | "pink"
            | "purple";
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
          action?:
            | "changeName"
            | "changeScope"
            | "close"
            | "create"
            | "invite"
            | "join"
            | "assign"
            | "unassign"
            | "leave"
            | "open"
            | "remove"
            | "snooze"
            | "addTags"
            | "removeTags";
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
        tags?: string[] &
          tags.MinItems<0> &
          tags.MaxItems<10> &
          tags.UniqueItems;
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
        managerIds?: string[] &
          tags.MinItems<1> &
          tags.MaxItems<2147483647> &
          tags.UniqueItems;
        assigneeId?: string;
        tags?: string[] &
          tags.MinItems<1> &
          tags.MaxItems<8> &
          tags.UniqueItems;
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
    type?:
      | "boolean"
      | "date"
      | "datetime"
      | "list"
      | "listOfNumber"
      | "number"
      | "string"
      | "listOfObject";
    operator?: AutoViewInputSubTypes.Operator;
    values?: {}[];
    and?: AutoViewInputSubTypes.Expression[];
    or?: AutoViewInputSubTypes.Expression[];
  };
  export type Operator = {};
  export type TimeRange = {
    dayOfWeeks: ("mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun")[] &
      tags.UniqueItems;
    from: number & tags.Type<"uint32"> & tags.Maximum<1440>;
    to: number & tags.Type<"uint32"> & tags.Maximum<1440>;
  };
  export namespace marketing {
    export type CampaignDraft = {
      campaign: AutoViewInputSubTypes.marketing.Campaign;
      msgs: AutoViewInputSubTypes.marketing.CampaignMsg[] &
        tags.MinItems<1> &
        tags.MaxItems<4>;
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
      sendMode:
        | "always"
        | "away"
        | "inOperation"
        | "customUsingSenderTime"
        | "customUsingReceiverTime"
        | "custom";
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
      sendMode?:
        | "immediately"
        | "reservedWithSenderTime"
        | "reservedWithReceiverTime";
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
    type?:
      | "boolean"
      | "date"
      | "datetime"
      | "list"
      | "listOfNumber"
      | "number"
      | "string"
      | "listOfObject";
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
    null?: boolean;
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
      buttons?: AutoViewInputSubTypes.message.Button[] &
        tags.MinItems<1> &
        tags.MaxItems<2>;
      files?: AutoViewInputSubTypes.message.File[] &
        tags.MinItems<1> &
        tags.MaxItems<30>;
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
export type AutoViewInput =
  AutoViewInputSubTypes.legacy.open.v4.LegacyV4UserChatView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const displayName =
    value.user?.name ||
    value.user?.memberId ||
    value.user?.unifiedId ||
    "Unknown User";
  const avatarUrl =
    value.user?.avatarUrl ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      displayName,
    )}&background=random&color=fff`;
  const messageText =
    value.message?.plainText ||
    value.message?.blocks
      ?.map((b) => b.value)
      .filter(Boolean)
      .join(" ") ||
    "No message content";
  const formattedTime = value.message?.createdAt
    ? new Date(value.message.createdAt).toLocaleString()
    : "";
  const chatState = value.userChat?.state
    ? value.userChat.state.charAt(0).toUpperCase() +
      value.userChat.state.slice(1)
    : "";
  const unreadCount = value.session?.unread ?? 0;
  const tags = value.chatTags ?? [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow border">
      <div className="flex items-start">
        <img
          src={avatarUrl}
          alt={displayName}
          onError={(e) => {
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              displayName,
            )}&background=random&color=fff`;
          }}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        />
        <div className="ml-4 flex-1">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-gray-900 truncate">
              {displayName}
            </h2>
            {formattedTime && (
              <div className="flex items-center text-xs text-gray-500">
                <LucideReact.Calendar size={14} className="mr-1" />
                <span>{formattedTime}</span>
              </div>
            )}
          </div>
          {chatState && (
            <div className="mt-1 flex items-center text-xs text-gray-500">
              <LucideReact.MessageSquare size={12} className="mr-1" />
              <span className="capitalize">{chatState}</span>
            </div>
          )}
          <p className="mt-2 text-sm text-gray-700 line-clamp-2">
            {messageText}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {tags.map((tag) => (
              <span
                key={tag.key}
                className="flex items-center text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded"
              >
                <LucideReact.Tag size={12} className="mr-1" />
                {tag.name}
              </span>
            ))}
            {unreadCount > 0 && (
              <span className="ml-auto flex items-center text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                <LucideReact.MessageCircle size={12} className="mr-1" />
                {unreadCount} unread
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

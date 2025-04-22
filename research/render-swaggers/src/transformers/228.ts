import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace desk {
        export type ChannelView = {
            channel?: Schema.Channel;
            manager?: Schema.Manager;
            managerBadge?: Schema.ManagerBadge;
        };
    }
    export type Channel = {
        id?: string;
        welcomeMessage: Schema.message.NestedMessage;
        welcomeMessageI18nMap?: {
            [key: string]: Schema.message.NestedMessage;
        };
        createdAt?: number;
        updatedAt?: number;
        userInfoUrl?: string;
        trafficSource?: {
            [key: string]: {};
        };
        billAccountId?: string;
        name: string & tags.Pattern<"^[^@#$%:/\\x08\\\\]+$">;
        nameDescI18nMap?: {
            [key: string]: Schema.NameDesc;
        };
        coverImageColor?: string & tags.Default<"#123456">;
        botName: string;
        color: string & tags.Default<"#123456">;
        description?: string;
        country?: string;
        domain?: string;
        homepageUrl?: string;
        phoneNumber?: string & tags.Default<"+18004424000">;
        timeZone: string & tags.Default<"UTC">;
        showOperatorProfile?: boolean;
        disableNewChatButton?: boolean;
        indebtedDueDate?: string & tags.Format<"date">;
        followUpTexting: boolean;
        followUpEmail: boolean;
        followUpAskName?: boolean;
        followUpMandatory?: boolean;
        state?: "waiting" | "active" | "restricted" | "preIndebted" | "indebted" | "banned" | "removed";
        entVerified?: boolean;
        bizGrade: "AA" | "A" | "B" | "C" | "D" | "F" | "unknown";
        defaultPluginId?: string;
        workingType?: "always" | "never" | "custom";
        sourceSurvey?: {
            [key: string]: {};
        };
        bizCategory?: string;
        staffs?: number & tags.Type<"int32">;
        appCommerceId?: string;
        appCommerceType?: string;
        appCommerceDomain?: string;
        enableMemberHash?: boolean;
        defaultEmailDomainId?: string;
        enableMfa?: boolean;
        hideAppMessenger?: boolean;
        baseTutorialCompleted: boolean;
        bizCertificated?: boolean;
        mktAlimtalkAllowed?: boolean;
        bizCertificatedCountries?: string[];
        managedUserChatRetentionDuration?: string;
        blocked?: boolean;
        working?: boolean;
        avatarUrl?: string;
        expectedResponseDelay?: "instant" | "normal" | "delayed";
        inOperation?: boolean;
        operationTimeScheduling?: boolean;
        nextWorkingTime?: number;
        nextAwayTime?: number;
        operationTimeRanges?: Schema.TimeRange[];
        awayOption?: "active" | "disabled" | "hidden";
        blockReplyingAfterClosed?: boolean;
        blockReplyingAfterClosedTime?: string;
        /**
         * @deprecated
        */
        bright?: boolean;
        borderColor?: string;
        gradientColor?: string;
        textColor?: string;
        nextOperatingAt?: number;
        usingFollowUp?: boolean;
        initial?: string;
        utcOffset?: string;
        systemDomain?: string;
        pluginIconColor?: string;
        brightness?: number;
        coverImageUrl?: string;
        coverImageBright?: boolean;
        dayUntilIndebted?: number & tags.Type<"int32">;
    };
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
    export type NameDesc = {
        name: string & tags.Pattern<"^[^@#$%:/\\\\]+$">;
        description?: string;
    };
    export type TimeRange = {
        dayOfWeeks: ("mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun")[] & tags.UniqueItems;
        from: number & tags.Type<"uint32"> & tags.Maximum<1440>;
        to: number & tags.Type<"uint32"> & tags.Maximum<1440>;
    };
    export type Manager = {
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
        email?: string;
        showEmailToFront?: boolean;
        mobileNumber?: string & tags.Default<"+18004424000">;
        showMobileNumberToFront?: boolean;
        roleId?: string;
        removed?: boolean;
        createdAt?: number;
        updatedAt?: number;
        removedAt?: number;
        displayAsChannel?: boolean;
        defaultGroupWatch?: "all" | "info" | "none";
        defaultDirectChatWatch?: "all" | "info" | "none";
        defaultUserChatWatch?: "all" | "info" | "none";
        chatAlertSound?: "none" | "drop" | "woody" | "bounce" | "crystal" | "xylo" | "quickKnock" | "candy" | "shine";
        meetAlertSound?: "cute" | "basic" | "gentle" | "marimba";
        showPrivateMessagePreview?: boolean;
        operatorScore?: number;
        touchScore?: number;
        avatar?: Schema.TinyFile;
        operatorEmailReminder?: boolean;
        receiveUnassignedAlert?: boolean;
        receiveUnassignedChatAlert?: boolean;
        receiveUnassignedMeetAlert?: boolean;
        operator?: boolean;
        operatorStatusId?: string;
        defaultAllMentionImportant?: boolean;
        userMessageImportant?: boolean;
        assignableUserChatTypes?: ("sync" | "async")[] & tags.UniqueItems;
        autoAssignCapacity?: number & tags.Type<"uint32"> & tags.Maximum<100>;
        enableAutoAssignOnSync?: boolean;
        statusEmoji?: string;
        statusText?: string;
        statusClearAt?: number;
        doNotDisturb?: boolean;
        doNotDisturbClearAt?: number;
        accountDoNotDisturb?: boolean;
        accountDoNotDisturbClearAt?: number;
        enableReactedMessageIndex?: boolean;
        enableTeamMentionedMessageIndex?: boolean;
        operatorUpdatedAt?: number;
        pcInboxMeetAlert?: boolean;
        mobileInboxMeetAlert?: boolean;
        pcTeamChatMeetAlert?: boolean;
        mobileTeamChatMeetAlert?: boolean;
        managerId?: string;
        avatarUrl?: string;
        /**
         * @deprecated
        */
        meetOperator?: boolean;
        emailForFront?: string;
        mobileNumberForFront?: string & tags.Default<"+18004424000">;
    };
    export type TinyFile = {
        bucket: string;
        key: string;
        width?: number & tags.Type<"int32">;
        height?: number & tags.Type<"int32">;
    };
    export type ManagerBadge = {
        id?: string;
        teamChatAlert?: number & tags.Type<"int32">;
        teamChatUnread?: number & tags.Type<"int32">;
        userChatAlert?: number & tags.Type<"int32">;
        userChatUnread?: number & tags.Type<"int32">;
        teamChatThreadAlert?: number & tags.Type<"int32">;
        teamChatThreadUnread?: number & tags.Type<"int32">;
        updatedAt?: number;
        version?: number & tags.Type<"int32">;
        managerId?: string;
        alert?: number & tags.Type<"int32">;
        unread?: number & tags.Type<"int32">;
    };
}
type IAutoViewTransformerInputType = Schema.desk.ChannelView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  const channel = input.channel;
  // Fallback if no channel data is provided
  if (!channel) {
    return {
      type: "Text",
      content: "No channel data available",
      variant: "body1",
    };
  }

  // Helper to convert message blocks to a markdown string
  function blocksToMarkdown(blocks?: Schema.message.Block[]): string {
    if (!blocks || blocks.length === 0) return "";
    return blocks
      .map((blk) => {
        switch (blk.type) {
          case "text":
            return blk.value ?? "";
          case "code":
            // wrap code block with language if provided
            return "" + (blk.language ?? "") + "\n" + (blk.value ?? "") + "\n```";
          case "bullets":
            // flatten nested bullets if any
            if (blk.blocks && blk.blocks.length > 0) {
              return blk.blocks.map((b) => "- " + (b.value ?? "")).join("\n");
            }
            return "- " + (blk.value ?? "");
          default:
            return blk.value ?? "";
        }
      })
      .join("\n\n");
  }

  // Map channel.state to chip color
  const stateColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
    waiting: "orange",
    active: "green",
    restricted: "red",
    preIndebted: "warning",
    indebted: "error",
    banned: "darkGray",
    removed: "gray",
  };

  // Build CardHeader
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: channel.name,
    description: channel.description,
    startElement: channel.avatarUrl
      ? {
          type: "Avatar",
          src: channel.avatarUrl,
          name: channel.name,
          size: 40,
        }
      : undefined,
  };

  // Prepare CardContent children
  const contentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];

  // Show cover image if available
  if (channel.coverImageUrl) {
    contentChildren.push({
      type: "Image",
      src: channel.coverImageUrl,
      alt: channel.name,
    });
  }

  // Show welcome message as markdown
  const welcomeMd = blocksToMarkdown(channel.welcomeMessage?.blocks);
  if (welcomeMd) {
    contentChildren.push({
      type: "Markdown",
      content: welcomeMd,
    });
  }

  // Build a list of key/value pairs for channel metadata
  const dataItems: IAutoView.IAutoViewDataListItemProps[] = [];

  // Utility to push a DataListItem
  function pushItem(
    labelText: string,
    valueComp: IAutoView.IAutoViewPresentationComponentProps
  ) {
    dataItems.push({
      type: "DataListItem",
      label: [{ type: "Text", content: labelText, variant: "subtitle2" }],
      value: valueComp,
    });
  }

  if (channel.state) {
    pushItem("State", {
      type: "Chip",
      label: channel.state,
      color: stateColorMap[channel.state] || "gray",
      variant: "outlined",
    });
  }
  if (channel.bizGrade) {
    pushItem("Business Grade", {
      type: "Chip",
      label: channel.bizGrade,
      color: "primary",
      variant: "filled",
    });
  }
  if (channel.country) {
    pushItem("Country", {
      type: "Text",
      content: channel.country,
      variant: "body2",
    });
  }
  if (channel.domain) {
    pushItem("Domain", {
      type: "Text",
      content: channel.domain,
      variant: "body2",
    });
  }
  if (channel.phoneNumber) {
    pushItem("Phone", {
      type: "Text",
      content: channel.phoneNumber,
      variant: "body2",
    });
  }
  if (channel.timeZone) {
    pushItem("Time Zone", {
      type: "Chip",
      label: channel.timeZone,
      color: "secondary",
      variant: "outlined",
    });
  }

  // Assemble DataList with the metadata
  if (dataItems.length > 0) {
    contentChildren.push({
      type: "DataList",
      childrenProps: dataItems,
    });
  }

  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: contentChildren,
  };

  // Build CardFooter with manager info if present
  let footer: IAutoView.IAutoViewCardFooterProps | undefined;
  if (input.manager) {
    const mgr = input.manager;
    const badgeCount = input.managerBadge?.unread ?? 0;

    // Avatar wrapped in a badge showing unread count
    const avatarWithBadge: IAutoView.IAutoViewBadgeProps = {
      type: "Badge",
      count: badgeCount,
      showZero: false,
      childrenProps: {
        type: "Avatar",
        src: mgr.avatarUrl,
        name: mgr.name,
        size: 40,
      },
    };

    // Manager name
    const nameText: IAutoView.IAutoViewTextProps = {
      type: "Text",
      content: mgr.name,
      variant: "body1",
    };

    footer = {
      type: "CardFooter",
      childrenProps: [avatarWithBadge, nameText],
    };
  }

  // Compose the vertical card
  const childrenProps: IAutoView.IAutoViewVerticalCardProps["childrenProps"] = [
    header,
    content,
  ];
  if (footer) {
    childrenProps.push(footer);
  }

  return {
    type: "VerticalCard",
    childrenProps,
  };
}

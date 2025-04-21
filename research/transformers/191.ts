import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export type LegacyV4MessageView = {
                    message?: Schema.legacy.v4.message.LegacyV4Message;
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
}
type IAutoViewTransformerInputType = Schema.legacy.open.v4.LegacyV4MessageView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Extract the message object, bail out if missing
  const msg = input.message;
  if (!msg) {
    return {
      type: 'Text',
      content: 'No message available',
      variant: 'body1',
    };
  }

  // ---------- Header ----------
  // Show who sent it (personId) or fallback to message ID, with timestamp
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: 'CardHeader',
    title: msg.personId || msg.id || 'Message',
    description: msg.createdAt ? new Date(msg.createdAt).toLocaleString() : undefined,
    startElement: {
      type: 'Icon',
      id: 'comment',
      color: 'blue',
      size: 20,
    },
  };

  // ---------- Media Preview ----------
  // If the message has a linked webpage with an image, show it
  let media: IAutoView.IAutoViewCardMediaProps | undefined;
  if (msg.webPage && msg.webPage.imageUrl) {
    media = {
      type: 'CardMedia',
      src: msg.webPage.imageUrl,
    };
  }

  // ---------- Content ----------
  // Accumulate blocks, plain text, files, and buttons into card content
  const contentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];

  // 1) Render each block (text or code) as Markdown
  if (Array.isArray(msg.blocks)) {
    msg.blocks.forEach((block) => {
      if (!block.value) return;
      // Wrap code blocks in triple backticks with optional language
      const text =
        block.type === 'code'
          ? '' + (block.language || '') + '\n' + block.value + '\n```'
          : block.value;
      contentChildren.push({
        type: 'Markdown',
        content: text,
      });
    });
  }

  // 2) Fallback plainText as Markdown
  if (msg.plainText) {
    contentChildren.push({
      type: 'Markdown',
      content: msg.plainText,
    });
  }

  // 3) File attachments shown as outlined chips with file icon
  if (Array.isArray(msg.files) && msg.files.length > 0) {
    const fileChips: IAutoView.IAutoViewChipProps[] = msg.files.map((file) => ({
      type: 'Chip',
      label: file.name,
      startElement: {
        type: 'Icon',
        id: 'file',
      },
      variant: 'outlined',
    }));
    contentChildren.push({
      type: 'ChipGroup',
      childrenProps: fileChips,
    });
  }

  // 4) Action buttons (e.g., call-to-action URLs)
  if (Array.isArray(msg.buttons) && msg.buttons.length > 0) {
    msg.buttons.forEach((btn) => {
      contentChildren.push({
        type: 'Button',
        label: btn.title,
        href: btn.url,
        variant: 'outlined',
        startElement: {
          type: 'Icon',
          id: 'link',
        },
      });
    });
  }

  const content: IAutoView.IAutoViewCardContentProps = {
    type: 'CardContent',
    childrenProps: contentChildren,
  };

  // ---------- Footer ----------
  // Show reactions as simple chips (e.g., "smile 3")
  let footer: IAutoView.IAutoViewCardFooterProps | undefined;
  if (Array.isArray(msg.reactions) && msg.reactions.length > 0) {
    const reactionChips: IAutoView.IAutoViewChipProps[] = msg.reactions.map((r) => ({
      type: 'Chip',
      label: r.emojiName + (r.personKeys ? ` ${r.personKeys.length}` : ''),
    }));
    footer = {
      type: 'CardFooter',
      childrenProps: {
        type: 'ChipGroup',
        childrenProps: reactionChips,
      } as IAutoView.IAutoViewChipGroupProps,
    };
  }

  // ---------- Assemble Vertical Card ----------
  const children: IAutoView.IAutoViewVerticalCardProps['childrenProps'] = [header];
  if (media) children.push(media);
  children.push(content);
  if (footer) children.push(footer);

  return {
    type: 'VerticalCard',
    childrenProps: children,
  };
}

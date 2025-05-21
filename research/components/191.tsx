import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export type LegacyV4MessageView = {
                    message?: AutoViewInputSubTypes.legacy.v4.message.LegacyV4Message;
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
                };
                export type LegacyV4Block = {
                    type: "bullets" | "code" | "text";
                    language?: string;
                    value?: string;
                    blocks?: AutoViewInputSubTypes.legacy.v4.message.LegacyV4Block[];
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
    };
}
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4MessageView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const msg = value.message;
  if (!msg) {
    return (
      <div className="p-4 text-gray-500 italic text-center">
        No message content.
      </div>
    );
  }

  const {
    plainText,
    blocks,
    files,
    buttons,
    webPage,
    createdAt,
    state,
    reactions,
  } = msg;

  // Format timestamp
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : null;

  // Map state to a badge style and label
  const stateMap: Record<
    string,
    { label: string; classes: string }
  > = {
    sending: { label: "Sending", classes: "bg-gray-100 text-gray-700" },
    sent: { label: "Sent", classes: "bg-green-100 text-green-800" },
    failed: { label: "Failed", classes: "bg-red-100 text-red-800" },
    removed: { label: "Removed", classes: "bg-gray-100 text-gray-500 line-through" },
  };
  const stateInfo = stateMap[state ?? ""] || {
    label: state ?? "Unknown",
    classes: "bg-gray-100 text-gray-700",
  };

  // Utility: human-readable file size
  const formatBytes = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    const kb = bytes / 1024;
    if (kb < 1024) return kb.toFixed(1) + " KB";
    const mb = kb / 1024;
    return mb.toFixed(1) + " MB";
  };

  // Render structured blocks
  const renderBlock = (
    block: AutoViewInputSubTypes.legacy.v4.message.LegacyV4Block,
    idx: number
  ): React.ReactNode => {
    const text = block.value ?? "";
    switch (block.type) {
      case "text":
        return (
          <p key={idx} className="mb-2 text-gray-800 whitespace-pre-wrap">
            {text}
          </p>
        );
      case "code":
        return (
          <pre
            key={idx}
            className="mb-2 bg-gray-100 p-2 rounded text-sm font-mono overflow-x-auto"
          >
            {text}
          </pre>
        );
      case "bullets":
        {
          const items = text.split("\n").filter((line) => line.trim() !== "");
          return (
            <ul key={idx} className="mb-2 list-disc list-inside text-gray-800">
              {items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          );
        }
      default:
        return null;
    }
  };

  // Render file attachments
  const renderFile = (
    file: AutoViewInputSubTypes.legacy.v4.message.LegacyV4File,
    idx: number
  ): React.ReactNode => {
    const isImage = file.contentType?.startsWith("image/");
    const src = file.previewKey
      ? `https://cdn.example.com/${file.previewKey}`
      : `https://cdn.example.com/${file.key}`;
    return (
      <div
        key={idx}
        className="border rounded overflow-hidden flex flex-col"
      >
        {isImage ? (
          <img
            src={src}
            alt={file.name}
            className="object-cover w-full h-32"
          />
        ) : (
          <div className="flex items-center justify-center h-32 bg-gray-50">
            <span className="text-gray-600 text-sm truncate px-2">
              {file.name}
            </span>
          </div>
        )}
        <div className="px-2 py-1 text-xs text-gray-500">
          {formatBytes(file.size)}
        </div>
      </div>
    );
  };

  // Render emoji reactions
  const renderReaction = (
    reaction: AutoViewInputSubTypes.legacy.v4.message.LegacyV4Reaction,
    idx: number
  ): React.ReactNode => {
    const count = reaction.personKeys?.length ?? 0;
    return (
      <div
        key={idx}
        className="flex items-center space-x-1 bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
      >
        <span>{reaction.emojiName}</span>
        {count > 0 && <span>· {count}</span>}
      </div>
    );
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="w-full max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-3">
        <span
          className={`px-2 py-1 text-xs font-medium rounded ${stateInfo.classes}`}
        >
          {stateInfo.label}
        </span>
        {formattedDate && (
          <span className="text-xs text-gray-500">{formattedDate}</span>
        )}
      </div>

      <div className="mb-4 text-gray-800 text-sm leading-relaxed">
        {plainText ? (
          <p className="whitespace-pre-wrap">{plainText}</p>
        ) : blocks && blocks.length > 0 ? (
          blocks.map(renderBlock)
        ) : (
          <p className="italic text-gray-500">[No textual content]</p>
        )}
      </div>

      {webPage && (
        <a
          href={webPage.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block mb-4 border rounded-lg overflow-hidden hover:shadow-sm transition-shadow"
        >
          {webPage.imageUrl && (
            <img
              src={webPage.imageUrl}
              alt={webPage.title ?? "Preview"}
              className="w-full h-40 object-cover"
            />
          )}
          <div className="p-3 bg-gray-50">
            <h4 className="text-gray-800 font-semibold truncate">
              {webPage.title || webPage.url}
            </h4>
            {webPage.description && (
              <p className="mt-1 text-gray-600 text-xs line-clamp-2">
                {webPage.description}
              </p>
            )}
          </div>
        </a>
      )}

      {files && files.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mb-4">
          {files.map(renderFile)}
        </div>
      )}

      {buttons && buttons.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {buttons.map((btn, i) => (
            <a
              key={i}
              href={btn.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-3 py-1 text-sm font-medium rounded border ${
                btn.colorVariant
                  ? `text-${btn.colorVariant}-600 border-${btn.colorVariant}-300 hover:bg-${btn.colorVariant}-50`
                  : "text-blue-600 border-blue-300 hover:bg-blue-50"
              } transition-colors`}
            >
              {btn.title}
            </a>
          ))}
        </div>
      )}

      {reactions && reactions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {reactions.map(renderReaction)}
        </div>
      )}
    </div>
  );
}

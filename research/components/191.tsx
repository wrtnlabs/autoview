import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
    null?: boolean;
    bool?: boolean;
  };
}
export type AutoViewInput =
  AutoViewInputSubTypes.legacy.open.v4.LegacyV4MessageView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const msg = value.message;
  // Date formatting
  const formattedDate = msg?.createdAt
    ? new Date(msg.createdAt).toLocaleString()
    : undefined;

  // Map message state to icon
  const renderStatusIcon = () => {
    switch (msg?.state) {
      case "sending":
        return <LucideReact.Clock className="text-amber-500" size={16} />;
      case "sent":
        return <LucideReact.CheckCircle className="text-green-500" size={16} />;
      case "failed":
        return <LucideReact.AlertTriangle className="text-red-500" size={16} />;
      case "removed":
        return <LucideReact.XCircle className="text-red-400" size={16} />;
      default:
        return null;
    }
  };

  // Format file sizes
  const formatBytes = (bytes?: number): string => {
    if (!bytes && bytes !== 0) return "";
    if (bytes < 1024) return bytes + " B";
    const kb = bytes / 1024;
    if (kb < 1024) return kb.toFixed(1) + " KB";
    const mb = kb / 1024;
    return mb.toFixed(1) + " MB";
  };

  // Recursive renderer for blocks
  const renderBlocks = (
    blocks: AutoViewInputSubTypes.legacy.v4.message.LegacyV4Block[] = [],
  ): React.ReactNode => (
    <div className="prose prose-sm text-gray-800 space-y-2">
      {blocks.map((blk, idx) => {
        if (blk.type === "text") {
          return <p key={idx}>{blk.value}</p>;
        }
        if (blk.type === "code") {
          return (
            <pre
              key={idx}
              className="bg-gray-100 p-2 rounded-md overflow-auto text-xs"
            >
              <code>{blk.value}</code>
            </pre>
          );
        }
        if (blk.type === "bullets") {
          return (
            <ul key={idx} className="list-disc list-inside space-y-1">
              {blk.blocks?.map((child, cidx) => (
                <li key={cidx}>{child.value}</li>
              ))}
            </ul>
          );
        }
        return null;
      })}
    </div>
  );

  if (!msg) {
    return <div className="p-4 text-gray-500 italic">No message available</div>;
  }

  // Fallback for web page preview image
  const previewFallback =
    "https://placehold.co/400x300/f1f5f9/64748b?text=Preview";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full space-y-4">
      {/* Header: Timestamp & Status */}
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>{formattedDate}</span>
        {msg.state && (
          <div className="flex items-center space-x-1">
            {renderStatusIcon()}
            <span className="capitalize">{msg.state}</span>
          </div>
        )}
      </div>

      {/* Message Content */}
      {msg.plainText ? (
        <p className="text-gray-800 line-clamp-3">{msg.plainText}</p>
      ) : (
        msg.blocks && renderBlocks(msg.blocks)
      )}

      {/* Files Attachments */}
      {msg.files && msg.files.length > 0 && (
        <div className="space-y-2">
          {msg.files.map((file) => {
            const isImage = file.contentType?.startsWith("image");
            return (
              <div
                key={file.id}
                className="flex items-center space-x-2 bg-gray-50 p-2 rounded-md"
              >
                {isImage ? (
                  <img
                    src={
                      file.previewKey || `https://${file.bucket}.s3/${file.key}`
                    }
                    alt={file.name}
                    className="w-12 h-12 object-cover rounded"
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://placehold.co/100x100/e2e8f0/1e293b?text=Image")
                    }
                  />
                ) : (
                  <LucideReact.FileText className="text-indigo-500" size={20} />
                )}
                <div className="flex-1 truncate text-sm">
                  <div className="font-medium text-gray-800 truncate">
                    {file.name}
                  </div>
                  <div className="text-gray-500">{formatBytes(file.size)}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Action Buttons */}
      {msg.buttons && msg.buttons.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {msg.buttons.map((btn, idx) => (
            <a
              key={idx}
              href={btn.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 text-sm"
            >
              <LucideReact.Link size={16} className="mr-1" />
              {btn.title}
            </a>
          ))}
        </div>
      )}

      {/* Web Page Preview */}
      {msg.webPage && (
        <div className="border rounded-md overflow-hidden">
          <img
            src={
              msg.webPage.imageUrl || msg.webPage.previewKey || previewFallback
            }
            alt={msg.webPage.title || msg.webPage.url}
            className="w-full h-32 object-cover"
            onError={(e) => (e.currentTarget.src = previewFallback)}
          />
          <div className="p-2">
            <h3 className="text-sm font-medium text-gray-800 truncate">
              {msg.webPage.title || msg.webPage.url}
            </h3>
            {msg.webPage.description && (
              <p className="text-xs text-gray-500 line-clamp-2">
                {msg.webPage.description}
              </p>
            )}
            <a
              href={msg.webPage.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-xs text-blue-600 mt-1"
            >
              <LucideReact.Link size={12} className="mr-1" />
              Visit
            </a>
          </div>
        </div>
      )}

      {/* Reactions */}
      {msg.reactions && msg.reactions.length > 0 && (
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span>Reactions:</span>
          <div className="flex items-center space-x-2">
            {msg.reactions.map((r) => (
              <div key={r.emojiName} className="flex items-center space-x-1">
                <span>{r.emojiName}</span>
                <span className="font-medium">{r.personKeys?.length ?? 0}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Log Entry */}
      {msg.log && (
        <div className="text-xs text-gray-400">
          <span className="font-medium">Log:</span>{" "}
          <span>
            {msg.log.action}
            {msg.log.values ? ` (${msg.log.values.join(", ")})` : ""}
          </span>
        </div>
      )}
    </div>
  );
}

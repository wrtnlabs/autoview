import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export interface LegacyV4MessageView {
                    message?: AutoViewInputSubTypes.legacy.v4.message.LegacyV4Message;
                }
            }
        }
        export namespace v4 {
            export namespace message {
                export interface LegacyV4Message {
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
                }
                export interface LegacyV4Block {
                    type: "bullets" | "code" | "text";
                    language?: string;
                    value?: string;
                    blocks?: AutoViewInputSubTypes.legacy.v4.message.LegacyV4Block[];
                }
                export interface LegacyV4Button {
                    title: string;
                    colorVariant?: "cobalt" | "green" | "orange" | "red" | "black" | "pink" | "purple";
                    url: string;
                }
                export interface LegacyV4File {
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
                export interface LegacyV4Log {
                    action?: "changeName" | "changeScope" | "close" | "create" | "invite" | "join" | "assign" | "unassign" | "leave" | "open" | "remove" | "snooze" | "addTags" | "removeTags";
                    values?: string[];
                }
                export interface LegacyV4Reaction {
                    emojiName: string;
                    personKeys?: string[] & tags.UniqueItems;
                    empty?: boolean;
                }
                export interface LegacyV4ProfileBotInput {
                    id?: string;
                    key?: string;
                    type?: string;
                    name?: string;
                    value?: AutoViewInputSubTypes.AttributeValue;
                }
                export interface LegacyV4MessageMarketing {
                    type?: string;
                    id?: string;
                    advertising?: boolean;
                    sendToOfflineXms?: boolean;
                    sendToOfflineEmail?: boolean;
                    exposureType?: "fullScreen";
                }
                export interface LegacyV4MessageSupportBot {
                    id?: string;
                    revisionId?: string;
                    sectionId?: string;
                    stepIndex?: number & tags.Type<"int32">;
                    buttons?: AutoViewInputSubTypes.legacy.v4.LegacyV4SupportBotRouteSection_dollar_LegacyV4Button[];
                    submitButtonIndex?: number & tags.Type<"int32">;
                }
            }
            export interface LegacyV4WebPage {
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
            export interface LegacyV4SupportBotRouteSection_dollar_LegacyV4Button {
                text: string;
                nextSectionId: string;
            }
        }
    }
    export interface AttributeValue {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4MessageView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const msg = value.message;
  // Format timestamps
  const formattedCreatedAt = msg?.createdAt
    ? new Date(msg.createdAt).toLocaleString()
    : "";
  const formattedUpdatedAt = msg?.updatedAt
    ? new Date(msg.updatedAt).toLocaleString()
    : "";
  // File size formatter
  const formatFileSize = (bytes: number): string => {
    if (bytes >= 1_048_576) {
      return `${(bytes / 1_048_576).toFixed(1)} MB`;
    }
    if (bytes >= 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${bytes} B`;
  };
  // Button color mapping
  const colorClass = (variant?: string): string => {
    switch (variant) {
      case "cobalt":
        return "bg-indigo-600";
      case "green":
        return "bg-green-500";
      case "orange":
        return "bg-orange-500";
      case "red":
        return "bg-red-500";
      case "black":
        return "bg-gray-800";
      case "pink":
        return "bg-pink-500";
      case "purple":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };
  // State icon
  const renderStateIcon = (state?: string) => {
    switch (state) {
      case "sent":
        return <LucideReact.CheckCircle className="text-green-500" size={16} />;
      case "sending":
        return <LucideReact.Clock className="text-amber-500" size={16} />;
      case "failed":
        return <LucideReact.AlertTriangle className="text-red-500" size={16} />;
      case "removed":
        return <LucideReact.XCircle className="text-gray-400" size={16} />;
      default:
        return <LucideReact.HelpCircle className="text-gray-400" size={16} />;
    }
  };
  // Recursive block renderer
  const renderBlocks = (
    blocks: AutoViewInputSubTypes.legacy.v4.message.LegacyV4Block[] | undefined
  ): React.ReactNode => {
    if (!blocks || !blocks.length) return null;
    return blocks.map((blk, idx) => {
      if (blk.type === "text") {
        return (
          <p key={idx} className="text-gray-800 mb-2">
            {blk.value}
          </p>
        );
      }
      if (blk.type === "code") {
        return (
          <pre
            key={idx}
            className="bg-gray-100 p-2 rounded text-sm font-mono overflow-auto mb-2"
          >
            {blk.value}
          </pre>
        );
      }
      if (blk.type === "bullets") {
        return (
          <ul key={idx} className="list-disc pl-5 mb-2 space-y-1">
            {blk.blocks?.map((sub, sidx) => (
              <li key={sidx} className="text-gray-800">
                {sub.value}
                {sub.blocks && renderBlocks(sub.blocks)}
              </li>
            ))}
          </ul>
        );
      }
      return null;
    });
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!msg) {
    return (
      <div className="flex items-center justify-center text-gray-400 text-sm p-4">
        <LucideReact.AlertCircle size={24} />
        <span className="ml-2">No message available</span>
      </div>
    );
  }

  return (
    <article className="p-4 bg-white rounded-lg shadow-md space-y-4 max-w-full">
      {/* Message Content */}
      <div className="prose prose-sm">
        {msg.blocks && msg.blocks.length > 0
          ? renderBlocks(msg.blocks)
          : msg.plainText
          ? (
            <p className="text-gray-800">{msg.plainText}</p>
          )
          : null}
      </div>

      {/* Attachments & Extras */}
      <div className="space-y-4">
        {/* Files */}
        {msg.files && msg.files.length > 0 && (
          <div className="space-y-1">
            <div className="font-semibold text-gray-700">Attachments</div>
            {msg.files.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-2 text-gray-600 text-sm"
              >
                <LucideReact.FileText size={16} />
                <span>
                  {file.name} ({formatFileSize(file.size)})
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Buttons */}
        {msg.buttons && msg.buttons.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {msg.buttons.map((btn, idx) => (
              <div
                key={idx}
                className={`px-2 py-1 text-xs font-semibold text-white rounded ${colorClass(
                  btn.colorVariant
                )}`}
              >
                {btn.title}
              </div>
            ))}
          </div>
        )}

        {/* Web page preview */}
        {msg.webPage && (
          <div className="border rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 bg-gray-100">
                <img
                  src={
                    msg.webPage.imageUrl ||
                    "https://placehold.co/400x300/f1f5f9/64748b?text=WebPage"
                  }
                  alt={msg.webPage.title || "Preview"}
                  className="w-full h-32 object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "https://placehold.co/400x300/f1f5f9/64748b?text=WebPage";
                  }}
                />
              </div>
              <div className="p-3 flex-1">
                {msg.webPage.title && (
                  <h3 className="font-semibold text-gray-800 text-sm">
                    {msg.webPage.title}
                  </h3>
                )}
                {msg.webPage.description && (
                  <p className="text-gray-600 text-xs line-clamp-3">
                    {msg.webPage.description}
                  </p>
                )}
                {msg.webPage.url && (
                  <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                    <LucideReact.Link size={14} />
                    <span className="truncate">{msg.webPage.url}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Log */}
        {msg.log?.action && (
          <div className="text-gray-600 text-sm">
            <span className="font-medium">Log:</span> {msg.log.action}
            {msg.log.values && msg.log.values.length > 0
              ? ` (${msg.log.values.join(", ")})`
              : ""}
          </div>
        )}
      </div>

      {/* Reactions */}
      {msg.reactions && msg.reactions.length > 0 && (
        <div className="flex flex-wrap items-center gap-4 pt-2">
          {msg.reactions.map((r, idx) => (
            <div key={idx} className="flex items-center gap-1 text-gray-600">
              <span>{r.emojiName}</span>
              <span className="text-gray-500">
                ×{r.personKeys?.length ?? 0}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Footer: status and timestamps */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-gray-500 text-xs pt-3 border-t">
        <div className="flex items-center gap-2 mb-1 sm:mb-0">
          {renderStateIcon(msg.state)}
          <span className="capitalize">{msg.state || "unknown"}</span>
        </div>
        <div className="flex items-center gap-2">
          <LucideReact.Calendar size={16} />
          <span>{formattedCreatedAt}</span>
          {formattedUpdatedAt && (
            <>
              <span className="mx-1">·</span>
              <span>Edited: {formattedUpdatedAt}</span>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

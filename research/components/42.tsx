import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Channel information.
     *
     * `IShoppingChannel` is a concept that shapes the distribution channel in the
     * market. Therefore, the difference in the channel in this e-commerce system
     * means that it is another site or application.
     *
     * By the way, if your shopping mall system requires only one channel, then
     * just use only one. This concept is designed to be expandable in the future.
    */
    export interface IShoppingChannel {
        /**
         * Primary Key.
         *
         * @title Primary Key
        */
        id: string;
        /**
         * Creation time of record.
         *
         * @title Creation time of record
        */
        created_at: string;
        /**
         * Identifier code.
         *
         * @title Identifier code
        */
        code: string;
        /**
         * Name of the channel.
         *
         * @title Name of the channel
        */
        name: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingChannel;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdDate = new Date(value.created_at);
  const formattedCreatedAt = createdDate.toLocaleString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm w-full">
      <div className="flex items-center gap-2">
        <LucideReact.Globe size={20} className="text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-800 truncate">{value.name}</h2>
      </div>
      <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
        <LucideReact.Hash size={16} className="text-gray-500" />
        <span className="truncate">{value.code}</span>
      </div>
      <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
        <LucideReact.Calendar size={16} className="text-gray-500" />
        <time dateTime={value.created_at}>{formattedCreatedAt}</time>
      </div>
    </div>
  );
}

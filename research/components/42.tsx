import * as LucideReact from "lucide-react";
import React, { JSX } from "react";

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
  export type IShoppingChannel = {
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
  };
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingChannel;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Format creation date into a human-readable string.
  const formattedCreatedAt = new Date(value.created_at).toLocaleString(
    undefined,
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Channel Name */}
      <div className="flex items-center mb-2">
        <LucideReact.ShoppingCart
          className="text-indigo-500"
          size={20}
          aria-hidden="true"
        />
        <h2 className="ml-2 text-lg font-semibold text-gray-800 truncate">
          {value.name}
        </h2>
      </div>

      {/* Channel Code */}
      <div className="flex items-center text-gray-600 text-sm mb-1">
        <LucideReact.Tag
          className="text-gray-400"
          size={16}
          aria-hidden="true"
        />
        <span className="ml-1">
          Code:&nbsp;
          <span className="font-medium text-gray-700">{value.code}</span>
        </span>
      </div>

      {/* Creation Date */}
      <div className="flex items-center text-gray-600 text-sm">
        <LucideReact.Calendar
          className="text-gray-400"
          size={16}
          aria-hidden="true"
        />
        <time dateTime={value.created_at} className="ml-1">
          Created: {formattedCreatedAt}
        </time>
      </div>
    </div>
  );
}

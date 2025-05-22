import * as LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {
  /**
   * Section information.
   *
   * `IShoppingSection` is a concept that refers to the spatial information of
   * the market.
   *
   * If we compare the section mentioned here to the offline market, it means a
   * spatially separated area within the store, such as the "fruit corner" or
   * "butcher corner". Therefore, in the {@link IShoppingSale sale} entity, it is
   * not possible to classify multiple sections simultaneously, but only one section
   * can be classified.
   *
   * By the way, if your shopping mall system requires only one section, then just
   * use only one. This concept is designed to be expandable in the future.
   */
  export type IShoppingSection = {
    /**
     * Primary Key.
     *
     * @title Primary Key
     */
    id: string;
    /**
     * Identifier code.
     *
     * @title Identifier code
     */
    code: string;
    /**
     * Representative name of the section.
     *
     * @title Representative name of the section
     */
    name: string;
    /**
     * Creation time of record.
     *
     * @title Creation time of record
     */
    created_at: string;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingSection;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdDate = new Date(value.created_at);
  const now = new Date();
  const diffMs = now.getTime() - createdDate.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);
  const diffDays = diffHours / 24;

  const relativeTime =
    diffHours < 1
      ? `${Math.floor(diffMs / (1000 * 60))} minute${Math.floor(diffMs / (1000 * 60)) !== 1 ? "s" : ""} ago`
      : diffHours < 24
        ? `${Math.floor(diffHours)} hour${Math.floor(diffHours) !== 1 ? "s" : ""} ago`
        : diffDays < 7
          ? `${Math.floor(diffDays)} day${Math.floor(diffDays) !== 1 ? "s" : ""} ago`
          : null;

  const formattedDate = createdDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm w-full">
      <h2 className="text-lg font-semibold text-gray-900 truncate">
        {value.name}
      </h2>

      <div className="mt-2 flex items-center text-sm text-gray-600">
        <LucideReact.Tag
          size={16}
          className="text-blue-500 mr-1 flex-shrink-0"
        />
        <span className="truncate">{value.code}</span>
      </div>

      <div className="mt-1 flex items-center text-sm text-gray-500">
        <LucideReact.Calendar
          size={16}
          className="text-gray-400 mr-1 flex-shrink-0"
        />
        <span>
          {relativeTime ? `${relativeTime} (${formattedDate})` : formattedDate}
        </span>
      </div>
    </div>
  );
}

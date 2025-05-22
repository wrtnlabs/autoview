import LucideReact from "lucide-react";
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
  //    Format the ISO timestamp into a human-readable date and time.
  const formattedDate: string = new Date(value.created_at).toLocaleString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    },
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Section Name */}
      <h2
        className="text-xl font-semibold text-gray-800 truncate"
        title={value.name}
      >
        {value.name}
      </h2>

      {/* Section Code and Creation Time */}
      <div className="mt-3 space-y-2">
        <div className="flex items-center text-sm text-gray-500">
          <LucideReact.Tag
            size={16}
            className="flex-shrink-0 text-gray-400"
            aria-hidden="true"
          />
          <span className="ml-1">{value.code}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <LucideReact.Calendar
            size={16}
            className="flex-shrink-0 text-gray-400"
            aria-hidden="true"
          />
          <time dateTime={value.created_at} className="ml-1">
            {formattedDate}
          </time>
        </div>
      </div>
    </div>
  );
}

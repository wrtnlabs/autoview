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
  const createdDate = new Date(value.created_at);
  const formattedDate = createdDate.toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div
      role="region"
      aria-label={`Shopping section: ${value.name}`}
      className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md p-4"
    >
      {/* Section Name */}
      <div className="flex items-center mb-3">
        <LucideReact.MapPin
          size={20}
          className="text-blue-500 flex-shrink-0"
          aria-hidden="true"
        />
        <h2 className="ml-2 text-lg font-semibold text-gray-800 truncate">
          {value.name}
        </h2>
      </div>

      {/* Section Code */}
      <div className="flex items-center mb-2 text-gray-600">
        <LucideReact.Tag
          size={16}
          className="text-gray-500 flex-shrink-0"
          aria-hidden="true"
        />
        <span className="ml-1 font-medium truncate">{value.code}</span>
      </div>

      {/* Creation Date */}
      <div className="flex items-center text-sm text-gray-500">
        <LucideReact.Calendar
          size={16}
          className="text-gray-400 flex-shrink-0"
          aria-hidden="true"
        />
        <span className="ml-1 whitespace-nowrap">{formattedDate}</span>
      </div>
    </div>
  );
}

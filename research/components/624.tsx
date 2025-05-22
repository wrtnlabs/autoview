import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * An autolink reference.
     *
     * @title Autolink reference
    */
    export type autolink = {
        id: number & tags.Type<"int32">;
        /**
         * The prefix of a key that is linkified.
        */
        key_prefix: string;
        /**
         * A template for the target URL that is generated if a key was found.
        */
        url_template: string;
        /**
         * Whether this autolink reference matches alphanumeric characters. If false, this autolink reference only matches numeric characters.
        */
        is_alphanumeric: boolean;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.autolink[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Derived constant: total count of autolink references
  const totalCount = value.length;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800">
        Autolink References ({totalCount})
      </h2>

      {totalCount === 0 ? (
        <p className="mt-2 text-sm text-gray-600">
          No autolink references available.
        </p>
      ) : (
        <ul className="mt-4 space-y-4">
          {value.map((item) => {
            // Determine badge label and style
            const badgeLabel = item.is_alphanumeric ? "Alphanumeric" : "Numeric Only";
            const badgeColor = item.is_alphanumeric
              ? "bg-green-100 text-green-800"
              : "bg-blue-100 text-blue-800";

            return (
              <li
                key={item.id}
                className="p-4 bg-gray-50 border border-gray-200 rounded-lg"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-gray-900 break-words">
                      Prefix:{" "}
                      <span className="font-normal text-gray-700">
                        {item.key_prefix}
                      </span>
                    </span>
                  </div>
                  <span
                    className={`mt-2 sm:mt-0 inline-block px-2 py-1 text-xs font-semibold rounded-full ${badgeColor}`}
                  >
                    {badgeLabel}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-700 truncate">
                  {item.url_template}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

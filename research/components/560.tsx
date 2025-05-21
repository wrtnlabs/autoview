import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Project columns contain cards of work.
     *
     * @title Project Column
    */
    export type project_column = {
        url: string & tags.Format<"uri">;
        project_url: string & tags.Format<"uri">;
        cards_url: string & tags.Format<"uri">;
        /**
         * The unique identifier of the project column
        */
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * Name of the project column
        */
        name: string;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.project_column;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdDate = new Date(value.created_at);
  const updatedDate = new Date(value.updated_at);

  const formattedCreated = createdDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedUpdated = updatedDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200 max-w-full">
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{value.name}</h2>
        <div className="mt-2 flex flex-wrap text-sm text-gray-500">
          <span className="mr-4">
            <time dateTime={value.created_at}>Created: {formattedCreated}</time>
          </span>
          <span>
            <time dateTime={value.updated_at}>Updated: {formattedUpdated}</time>
          </span>
        </div>
      </div>
    </div>
  );
}

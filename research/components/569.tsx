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

  const formattedCreated = createdDate.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const formattedUpdated = updatedDate.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="max-w-sm w-full mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-2 truncate">
        {value.name}
      </h2>
      <dl className="text-sm text-gray-600 space-y-1">
        <div className="flex justify-between">
          <dt className="font-medium text-gray-700">Created</dt>
          <dd>{formattedCreated}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-medium text-gray-700">Updated</dt>
          <dd>{formattedUpdated}</dd>
        </div>
      </dl>
    </div>
  );
}

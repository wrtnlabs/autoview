import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Tag
     *
     * @title Tag
    */
    export type tag = {
        name: string;
        commit: {
            sha: string;
            url: string & tags.Format<"uri">;
        };
        zipball_url: string & tags.Format<"uri">;
        tarball_url: string & tags.Format<"uri">;
        node_id: string;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.tag[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Here we derive a short SHA and a display host for each tag's commit URL.
  const tags = value;
  
  if (tags.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 italic">
        No tags to display.
      </div>
    );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    We render a vertical list of tag cards showing name, short SHA, and commit URL host.
  const list = (
    <ul className="space-y-4 p-4">
      {tags.map((tag) => {
        const shortSha = tag.commit.sha.slice(0, 7);
        const host = tag.commit.url.replace(/^https?:\/\//, '').split('/')[0];
        return (
          <li
            key={tag.node_id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm p-4"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {tag.name}
              </h3>
              <span className="mt-2 sm:mt-0 text-sm font-mono text-gray-500">
                {shortSha}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-600 truncate">
              {host}
            </p>
          </li>
        );
      })}
    </ul>
  );

  // 3. Return the React element.
  return list;
}

import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * System Information.
    */
    export interface ISystem {
        /**
         * Random Unique ID.
         *
         * @title Random Unique ID
        */
        uid: number;
        /**
         * `process.argv`
        */
        arguments: string[];
        /**
         * Git commit info.
         *
         * @title Git commit info
        */
        commit: AutoViewInputSubTypes.ISystem.ICommit;
        /**
         * `package.json`
        */
        "package": AutoViewInputSubTypes.ISystem.IPackage;
        /**
         * Creation time of this server.
         *
         * @title Creation time of this server
        */
        created_at: string;
    }
    export namespace ISystem {
        /**
         * Git commit info.
        */
        export interface ICommit {
            shortHash: string;
            branch: string;
            hash: string;
            subject: string;
            sanitizedSubject: string;
            body: string;
            author: AutoViewInputSubTypes.ISystem.ICommit.IUser;
            committer: AutoViewInputSubTypes.ISystem.ICommit.IUser;
            authored_at: string;
            committed_at: string;
            notes?: string;
            tags: string[];
        }
        export namespace ICommit {
            /**
             * Git user account info.
            */
            export interface IUser {
                name: string;
                email: string;
            }
        }
        /**
         * NPM package info.
        */
        export interface IPackage {
            name: string;
            version: string;
            description: string;
            main?: string;
            typings?: string;
            scripts: AutoViewInputSubTypes.Recordstringstring;
            repository: {
                type: "git";
                url: string;
            };
            author: string;
            license: string;
            bugs: {
                url: string;
            };
            homepage: string;
            devDependencies?: AutoViewInputSubTypes.Recordstringstring;
            dependencies: AutoViewInputSubTypes.Recordstringstring;
            publishConfig?: {
                registry: string;
            };
            files?: string[];
        }
    }
    /**
     * Construct a type with a set of properties K of type T
    */
    export interface Recordstringstring {
        [key: string]: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.ISystem;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdAt = new Date(value.created_at).toLocaleString();

  const commit = value.commit;
  const {
    subject: commitSubject,
    shortHash,
    branch,
    author: { name: commitAuthor },
    committed_at,
    tags = [],
  } = commit;
  const commitDate = new Date(committed_at).toLocaleString();

  const pkg = value["package"];
  const {
    name: packageName,
    version: packageVersion,
    description,
    repository: { url: repoUrl },
    homepage,
    bugs: { url: bugUrl },
    license,
  } = pkg;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-6">
      {/* Server Creation Time */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <LucideReact.Calendar className="text-gray-500" size={20} />
          <span>Server Created</span>
        </h2>
        <div className="mt-1 text-gray-600 flex items-center gap-2">
          <LucideReact.Calendar size={16} />
          <span>{createdAt}</span>
        </div>
      </section>

      {/* Latest Commit */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <LucideReact.GitBranch className="text-gray-500" size={20} />
          <span>Latest Commit</span>
        </h2>
        <div className="mt-2 space-y-1">
          <div className="flex items-center gap-2 text-gray-700">
            <LucideReact.GitCommit size={16} />
            <span className="font-medium">{commitSubject}</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm">
            <div className="flex items-center gap-1">
              <LucideReact.GitBranch size={16} />
              <span>{branch}</span>
            </div>
            <div className="flex items-center gap-1">
              <LucideReact.Hash size={16} />
              <span>{shortHash}</span>
            </div>
            <div className="flex items-center gap-1">
              <LucideReact.User size={16} />
              <span>{commitAuthor}</span>
            </div>
            <div className="flex items-center gap-1">
              <LucideReact.Calendar size={16} />
              <span>{commitDate}</span>
            </div>
          </div>
          {tags.length > 0 && (
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <LucideReact.Tag size={16} />
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Package Information */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <LucideReact.Archive className="text-gray-500" size={20} />
          <span>Package</span>
        </h2>
        <div className="mt-2 space-y-2 text-gray-600 text-sm">
          <div className="text-gray-800">
            <span className="font-medium">{packageName}</span>
            <span className="ml-1">v{packageVersion}</span>
          </div>
          <p className="line-clamp-2">{description}</p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-600 hover:underline text-xs"
            >
              <LucideReact.Link size={16} />
              <span>Repository</span>
            </a>
            <a
              href={homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-600 hover:underline text-xs"
            >
              <LucideReact.Link size={16} />
              <span>Homepage</span>
            </a>
            <a
              href={bugUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-600 hover:underline text-xs"
            >
              <LucideReact.Bug size={16} />
              <span>Issues</span>
            </a>
            <div className="flex items-center gap-1 text-xs">
              <LucideReact.Tag size={16} />
              <span>{license}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

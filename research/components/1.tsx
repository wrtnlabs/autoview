import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * System Information.
    */
    export type ISystem = {
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
    };
    export namespace ISystem {
        /**
         * Git commit info.
        */
        export type ICommit = {
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
        };
        export namespace ICommit {
            /**
             * Git user account info.
            */
            export type IUser = {
                name: string;
                email: string;
            };
        }
        /**
         * NPM package info.
        */
        export type IPackage = {
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
        };
    }
    /**
     * Construct a type with a set of properties K of type T
    */
    export type Recordstringstring = {
        [key: string]: string;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.ISystem;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const startedAt = new Date(value.created_at).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  const commitDate = new Date(value.commit.committed_at).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const pkg = value["package"];
  const pkgDisplay = `${pkg.name} v${pkg.version}`;
  const argsCount = value.arguments.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Header */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">System Overview</h2>

      {/* Core System Info */}
      <dl className="grid grid-cols-2 gap-x-4 text-sm text-gray-600 mb-6">
        <div>
          <dt className="font-medium">ID</dt>
          <dd>{value.uid}</dd>
        </div>
        <div>
          <dt className="font-medium">Started</dt>
          <dd>{startedAt}</dd>
        </div>
        <div>
          <dt className="font-medium">Args</dt>
          <dd>{argsCount} item{argsCount !== 1 ? 's' : ''}</dd>
        </div>
      </dl>

      {/* Commit Section */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Last Commit</h3>
        <div className="text-gray-600 text-sm mb-1">
          <span className="font-medium">{value.commit.branch}</span>
          <span className="mx-2 text-gray-400">/</span>
          <span className="font-mono">{value.commit.shortHash}</span>
        </div>
        <p className="text-gray-800 text-sm mb-1 line-clamp-2">{value.commit.subject}</p>
        <div className="flex items-center text-gray-500 text-xs mb-2">
          <span>{value.commit.author.name}</span>
          <span className="mx-1">•</span>
          <span>{commitDate}</span>
        </div>
        {value.commit.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {value.commit.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full truncate"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </section>

      {/* Package Section */}
      <section>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Package</h3>
        <p className="text-gray-800 font-medium mb-1">{pkgDisplay}</p>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{pkg.description}</p>
        <div className="flex flex-wrap items-center text-gray-500 text-xs space-x-4">
          <span>License: {pkg.license}</span>
          {pkg.repository?.url && (
            <span>Repo: {pkg.repository.url.replace(/^(https?:\/\/)?/, '')}</span>
          )}
        </div>
      </section>
    </div>
  );
}

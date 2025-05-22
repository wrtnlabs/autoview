import LucideReact from "lucide-react";
import React, { JSX } from "react";

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
    package: AutoViewInputSubTypes.ISystem.IPackage;
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
  const createdAt = new Date(value.created_at).toLocaleString();
  const commitDate = new Date(value.commit.committed_at).toLocaleString();
  const numArgs = value.arguments.length;
  const numDeps = Object.keys(value.package.dependencies).length;
  const numDevDeps = value.package.devDependencies
    ? Object.keys(value.package.devDependencies).length
    : 0;
  const numScripts = Object.keys(value.package.scripts).length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-lg mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">System Overview</h1>
        <div className="flex items-center text-gray-500 text-sm">
          <LucideReact.Calendar size={16} className="mr-1" />
          <span>{createdAt}</span>
        </div>
      </div>

      {/* Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
        <div className="flex items-center space-x-2">
          <LucideReact.Command size={20} className="text-gray-400" />
          <span>Arguments: {numArgs}</span>
        </div>
        <div className="flex items-center space-x-2">
          <LucideReact.Package size={20} className="text-gray-400" />
          <span>Deps: {numDeps}</span>
          {numDevDeps > 0 && <span className="ml-4">Dev: {numDevDeps}</span>}
        </div>
        <div className="flex items-center space-x-2">
          <LucideReact.Code size={20} className="text-gray-400" />
          <span>Scripts: {numScripts}</span>
        </div>
        <div className="flex items-baseline space-x-2">
          <LucideReact.Tag size={20} className="text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-800">
            {value.package.name}
          </h2>
          <span className="text-sm text-gray-500">
            v{value.package.version}
          </span>
        </div>
      </div>

      {/* Package Description */}
      {value.package.description && (
        <p className="text-gray-600 text-sm line-clamp-2">
          {value.package.description}
        </p>
      )}

      {/* Links */}
      <div className="flex flex-col space-y-1 text-gray-500 text-sm">
        <div className="flex items-center space-x-2">
          <LucideReact.Link size={16} className="text-gray-400" />
          <span className="truncate">{value.package.repository.url}</span>
        </div>
        <div className="flex items-center space-x-2">
          <LucideReact.Link size={16} className="text-gray-400" />
          <span className="truncate">{value.package.homepage}</span>
        </div>
      </div>

      {/* Author & License */}
      <div className="flex flex-wrap items-center text-gray-600 text-sm space-x-4">
        <div className="flex items-center space-x-1">
          <LucideReact.User size={16} className="text-gray-400" />
          <span>{value.package.author}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.FileText size={16} className="text-gray-400" />
          <span>{value.package.license}</span>
        </div>
      </div>

      {/* Commit Section */}
      <div className="border-t pt-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
          <LucideReact.GitCommit size={20} className="text-gray-400" />
          <span>Latest Commit</span>
        </h3>
        <div className="mt-2 text-gray-700">
          <p className="font-medium">{value.commit.subject}</p>
          {value.commit.body && (
            <p className="text-gray-500 text-sm line-clamp-2">
              {value.commit.body}
            </p>
          )}
        </div>
        <div className="flex flex-wrap items-center mt-3 text-gray-500 text-sm space-x-4">
          <div className="flex items-center space-x-1">
            <LucideReact.Hash size={16} className="text-gray-400" />
            <span>{value.commit.shortHash}</span>
          </div>
          <div className="flex items-center space-x-1">
            <LucideReact.GitBranch size={16} className="text-gray-400" />
            <span>{value.commit.branch}</span>
          </div>
          <div className="flex items-center space-x-1">
            <LucideReact.User size={16} className="text-gray-400" />
            <span>{value.commit.author.name}</span>
          </div>
          <div className="flex items-center space-x-1">
            <LucideReact.Calendar size={16} className="text-gray-400" />
            <span>{commitDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

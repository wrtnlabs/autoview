import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A diff of the dependencies between two commits.
     *
     * @title Dependency Graph Diff
    */
    export type dependency_graph_diff = {
        change_type: "added" | "removed";
        manifest: string;
        ecosystem: string;
        name: string;
        version: string;
        package_url: string | null;
        license: string | null;
        source_repository_url: string | null;
        vulnerabilities: {
            severity: string;
            advisory_ghsa_id: string;
            advisory_summary: string;
            advisory_url: string;
        }[];
        /**
         * Where the dependency is utilized. `development` means that the dependency is only utilized in the development environment. `runtime` means that the dependency is utilized at runtime and in the development environment.
        */
        scope: "unknown" | "runtime" | "development";
    }[];
}
export type AutoViewInput = AutoViewInputSubTypes.dependency_graph_diff;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data aggregation: split into added and removed groups
  const added = value.filter((pkg) => pkg.change_type === "added");
  const removed = value.filter((pkg) => pkg.change_type === "removed");

  // 2. Helper for scope badge classes
  const getScopeBadge = (scope: string) => {
    switch (scope) {
      case "runtime":
        return "bg-blue-100 text-blue-800";
      case "development":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // 3. Empty state
  if (value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={32} />
        <span className="mt-2">No dependency changes detected.</span>
      </div>
    );
  }

  // 4. Compose the visual structure
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Dependency Graph Diff
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            title: "Added Dependencies",
            items: added,
            Icon: LucideReact.PlusCircle,
            iconColor: "text-green-500",
          },
          {
            title: "Removed Dependencies",
            items: removed,
            Icon: LucideReact.XCircle,
            iconColor: "text-red-500",
          },
        ].map((group) => (
          <div key={group.title} className="space-y-3">
            <div className="flex items-center gap-2">
              <group.Icon className={group.iconColor} size={20} />
              <h3 className="text-lg font-medium text-gray-700">
                {group.title} ({group.items.length})
              </h3>
            </div>
            {group.items.length === 0 ? (
              <div className="text-sm text-gray-500">No changes</div>
            ) : (
              <ul className="space-y-2">
                {group.items.map((pkg) => (
                  <li
                    key={`${pkg.name}@${pkg.version}`}
                    className="flex flex-col md:flex-row md:items-center md:justify-between p-3 border border-gray-100 rounded-md hover:bg-gray-50"
                  >
                    <div className="flex items-baseline space-x-2 truncate">
                      <span className="font-medium text-gray-800 truncate">
                        {pkg.name}@{pkg.version}
                      </span>
                      <span className="text-xs text-gray-500 uppercase truncate">
                        {pkg.ecosystem}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-2 md:mt-0">
                      {pkg.license && (
                        <span className="text-xs text-gray-500 truncate">
                          {pkg.license}
                        </span>
                      )}
                      <span
                        className={`px-2 py-0.5 text-xs font-medium rounded ${getScopeBadge(
                          pkg.scope
                        )}`}
                      >
                        {pkg.scope}
                      </span>
                      {pkg.package_url && (
                        <a
                          href={pkg.package_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-500"
                          title="View package URL"
                        >
                          <LucideReact.Link size={16} />
                        </a>
                      )}
                      {pkg.source_repository_url && (
                        <a
                          href={pkg.source_repository_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-600"
                          title="View source repository"
                        >
                          <LucideReact.GitBranch size={16} />
                        </a>
                      )}
                      {pkg.vulnerabilities.length > 0 && (
                        <div className="flex items-center text-red-500 text-xs">
                          <LucideReact.AlertTriangle size={16} />
                          <span className="ml-1">
                            {pkg.vulnerabilities.length}
                          </span>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

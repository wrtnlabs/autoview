import LucideReact from "lucide-react";
import React, { JSX } from "react";

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
  // 1. Data aggregation and transformation
  type DiffItem = AutoViewInputSubTypes.dependency_graph_diff[0];
  const addedItems = value.filter((item) => item.change_type === "added");
  const removedItems = value.filter((item) => item.change_type === "removed");
  const totalAdded = addedItems.length;
  const totalRemoved = removedItems.length;

  const formatScope = (scope: DiffItem["scope"]) => {
    switch (scope) {
      case "runtime":
        return "Runtime";
      case "development":
        return "Development";
      default:
        return "Unknown";
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      {/* Summary */}
      <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0 mb-6">
        <div className="flex items-center text-green-600">
          <LucideReact.PlusCircle size={20} className="mr-2" />
          <span className="font-medium">{totalAdded} Added</span>
        </div>
        <div className="flex items-center text-red-600">
          <LucideReact.MinusCircle size={20} className="mr-2" />
          <span className="font-medium">{totalRemoved} Removed</span>
        </div>
      </div>

      {/* Grouped Lists */}
      <div className="space-y-8">
        {["added", "removed"].map((type) => {
          const items = type === "added" ? addedItems : removedItems;
          if (items.length === 0) return null;
          const isAdded = type === "added";
          return (
            <div key={type}>
              <h3 className="text-lg font-semibold capitalize">{type}</h3>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {items.map((item, idx) => (
                  <div
                    key={`${item.name}@${item.version}-${idx}`}
                    className={`p-4 bg-white rounded-lg shadow-sm border-l-4 ${
                      isAdded ? "border-green-500" : "border-red-500"
                    }`}
                  >
                    {/* Header: name@version & ecosystem */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <LucideReact.Package
                          size={18}
                          className="text-gray-500"
                        />
                        <h4 className="text-md font-medium text-gray-800 truncate">
                          {item.name}@{item.version}
                        </h4>
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                        {item.ecosystem}
                      </span>
                    </div>

                    {/* Manifest */}
                    <p className="mt-1 text-sm text-gray-600 truncate">
                      {item.manifest}
                    </p>

                    {/* Metadata */}
                    <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-500">
                      {item.license && (
                        <div className="flex items-center space-x-1">
                          <LucideReact.Copyright size={16} />
                          <span>{item.license.toUpperCase()}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1">
                        <LucideReact.Tag size={16} />
                        <span>{formatScope(item.scope)}</span>
                      </div>
                      {item.vulnerabilities.length > 0 && (
                        <div className="flex items-center space-x-1 text-red-500">
                          <LucideReact.AlertTriangle size={16} />
                          <span>
                            {item.vulnerabilities.length} vuln
                            {item.vulnerabilities.length > 1 ? "s" : ""}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

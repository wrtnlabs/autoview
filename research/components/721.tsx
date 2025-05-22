import React from "react";
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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalAdded = value.filter((item) => item.change_type === "added").length;
  const totalRemoved = value.filter((item) => item.change_type === "removed").length;

  // Sort: added first, then removed, then by name
  const sortedDeps = [...value].sort((a, b) => {
    if (a.change_type !== b.change_type) {
      return a.change_type === "added" ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
  });

  // Helper to map severity to badge styles
  const severityStyles: Record<string, string> = {
    critical: "bg-red-100 text-red-800",
    high: "bg-orange-100 text-orange-800",
    moderate: "bg-yellow-100 text-yellow-800",
    low: "bg-green-100 text-green-800",
    unknown: "bg-gray-100 text-gray-800",
  };

  // Helper to map scope to badge styles and labels
  const scopeStyles: Record<string, { label: string; classes: string }> = {
    runtime: { label: "Runtime", classes: "bg-green-100 text-green-800" },
    development: { label: "Development", classes: "bg-purple-100 text-purple-800" },
    unknown: { label: "Unknown", classes: "bg-gray-100 text-gray-800" },
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      {/* Summary Header */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Dependency Changes
        </h2>
        <p className="text-sm text-gray-600">
          {totalAdded} added, {totalRemoved} removed
        </p>
      </div>

      {/* List of Dependency Diffs */}
      <ul className="divide-y divide-gray-200">
        {sortedDeps.map((dep, idx) => {
          // Count vulnerabilities by severity
          const vulnCounts = dep.vulnerabilities.reduce(
            (acc: Record<string, number>, vuln) => {
              const sev = vuln.severity.toLowerCase() || "unknown";
              acc[sev] = (acc[sev] || 0) + 1;
              return acc;
            },
            {}
          );

          return (
            <li key={idx} className="py-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div className="flex items-center space-x-2">
                  {/* Change Type Badge */}
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded ${
                      dep.change_type === "added"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {dep.change_type.charAt(0).toUpperCase() +
                      dep.change_type.slice(1)}
                  </span>
                  {/* Name and Version */}
                  <span className="text-gray-900 font-semibold truncate">
                    {dep.name}@{dep.version}
                  </span>
                </div>
                {/* Scope Badge */}
                <span
                  className={`mt-2 sm:mt-0 inline-block px-2 py-1 text-xs font-medium rounded ${
                    scopeStyles[dep.scope]?.classes ||
                    scopeStyles.unknown.classes
                  }`}
                >
                  {scopeStyles[dep.scope]?.label || "Unknown"}
                </span>
              </div>

              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-y-1 gap-x-4 text-sm text-gray-700">
                {/* Ecosystem */}
                <div>
                  <span className="font-medium">Ecosystem:</span>{" "}
                  {dep.ecosystem}
                </div>
                {/* Manifest */}
                <div className="truncate">
                  <span className="font-medium">Manifest:</span>{" "}
                  <span className="text-gray-600 truncate">
                    {dep.manifest}
                  </span>
                </div>
                {/* License */}
                <div>
                  <span className="font-medium">License:</span>{" "}
                  {dep.license || "N/A"}
                </div>
                {/* Vulnerabilities Summary */}
                {dep.vulnerabilities.length > 0 && (
                  <div className="flex flex-wrap items-center space-x-1">
                    <span className="font-medium">Vulns:</span>
                    {Object.entries(vulnCounts).map(
                      ([severity, count], sevIdx) => {
                        const sevKey = severityStyles[severity]
                          ? severity
                          : "unknown";
                        return (
                          <span
                            key={sevIdx}
                            className={`px-1.5 py-0.5 text-xs rounded ${severityStyles[sevKey]}`}
                          >
                            {severity.charAt(0).toUpperCase() +
                              severity.slice(1)}{" "}
                            {count}
                          </span>
                        );
                      }
                    )}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

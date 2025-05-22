import LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {
  /**
   * A repository rule with ruleset details.
   *
   * @title Repository Rule
   */
  export type repository_rule_detailed =
    | any
    | any
    | any
    | any
    | any
    | any
    | any
    | any
    | any
    | any
    | any
    | any
    | any
    | any
    | any
    | any
    | any
    | any
    | any
    | any
    | any;
}
export type AutoViewInput = AutoViewInputSubTypes.repository_rule_detailed[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  const rules = Array.isArray(value) ? value : [];

  // Determine if a rule is active
  const isRuleActive = (rule: any): boolean => {
    if (typeof rule.isEnabled === "boolean") return rule.isEnabled;
    if (typeof rule.enabled === "boolean") return rule.enabled;
    if (typeof rule.active === "boolean") return rule.active;
    return false;
  };

  // Map severity to label and Tailwind color classes
  const getSeverity = (rule: any): { label: string; colorClass: string } => {
    const sev = (rule.severity as string)?.toLowerCase() || "";
    switch (sev) {
      case "low":
        return { label: "Low", colorClass: "bg-green-100 text-green-800" };
      case "medium":
        return { label: "Medium", colorClass: "bg-amber-100 text-amber-800" };
      case "high":
        return { label: "High", colorClass: "bg-red-100 text-red-800" };
      default:
        const label = sev
          ? sev.charAt(0).toUpperCase() + sev.slice(1)
          : "Unknown";
        return { label, colorClass: "bg-gray-100 text-gray-800" };
    }
  };

  // Format ISO date strings as "Jan 1, 2023"
  const formatDate = (dateStr: string | undefined): string | null => {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return null;
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {rules.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-500">
          <LucideReact.AlertCircle size={48} />
          <span className="mt-2">No rules available.</span>
        </div>
      ) : (
        rules.map((rule, idx) => {
          const isActive = isRuleActive(rule);
          const { label: severityLabel, colorClass: severityColor } =
            getSeverity(rule);
          const createdAt = formatDate(rule.createdAt ?? rule.created_at);
          const title = rule.name ?? rule.id ?? `Rule ${idx + 1}`;
          const description = rule.description ?? "No description available.";

          return (
            <div
              key={idx}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {title}
                </h3>
                {isActive ? (
                  <LucideReact.CheckCircle
                    className="text-green-500"
                    size={20}
                    aria-label="Active"
                  />
                ) : (
                  <LucideReact.XCircle
                    className="text-red-500"
                    size={20}
                    aria-label="Inactive"
                  />
                )}
              </div>
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {description}
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className={`px-2 py-1 rounded ${severityColor}`}>
                  {severityLabel}
                </span>
                {createdAt && (
                  <div className="flex items-center gap-1 text-gray-500">
                    <LucideReact.Calendar size={16} />
                    <span>{createdAt}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

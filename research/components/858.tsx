import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A repository rule with ruleset details.
     *
     * @title Repository Rule
    */
    export type repository_rule_detailed = any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any;
}
export type AutoViewInput = AutoViewInputSubTypes.repository_rule_detailed[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Helper to turn camelCase or snake_case into Title Case
  const formatKey = (key: string) =>
    key
      .replace(/([A-Z])/g, ' $1')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());

  // Type guards
  const isDateString = (v: any): v is string =>
    typeof v === 'string' && !isNaN(Date.parse(v));
  const isPrimitive = (v: any) =>
    ['string', 'number', 'boolean'].includes(typeof v);

  const rules = value;

  if (rules.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <p className="mt-4 text-lg">No repository rules available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {rules.map((rule, idx) => {
        // Filter out internal or complex fields
        const entries = Object.entries(rule)
          .filter(
            ([k, v]) =>
              !/^(_|internal|metadata|__|.*Id$)/i.test(k) &&
              (isPrimitive(v) ||
                (Array.isArray(v) && v.every((item) => isPrimitive(item))) ||
                isDateString(v))
          );

        // Derive a title
        const title =
          typeof (rule as any).name === 'string'
            ? (rule as any).name
            : typeof (rule as any).ruleName === 'string'
            ? (rule as any).ruleName
            : `Rule ${idx + 1}`;

        return (
          <div key={idx} className="bg-white p-5 rounded-lg shadow-sm">
            <div className="flex items-center border-b pb-2 mb-4">
              <LucideReact.GitBranch size={20} className="text-gray-700 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            </div>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {entries.map(([k, v]) => {
                const displayName = formatKey(k);
                let content: React.ReactNode;

                if (typeof v === 'boolean') {
                  content = (
                    <div className="flex items-center gap-1">
                      {v ? (
                        <LucideReact.CheckCircle
                          size={16}
                          className="text-green-500"
                          aria-label="True"
                        />
                      ) : (
                        <LucideReact.XCircle
                          size={16}
                          className="text-red-500"
                          aria-label="False"
                        />
                      )}
                      <span>{v ? 'True' : 'False'}</span>
                    </div>
                  );
                } else if (isDateString(v)) {
                  const date = new Date(v);
                  const formatted = date.toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  });
                  content = (
                    <div className="flex items-center gap-1 text-gray-700">
                      <LucideReact.Calendar
                        size={16}
                        className="text-gray-400"
                        aria-label="Date"
                      />
                      <span>{formatted}</span>
                    </div>
                  );
                } else if (Array.isArray(v)) {
                  content = (
                    <div className="flex flex-wrap gap-2">
                      {v.map((item, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded"
                        >
                          {String(item)}
                        </span>
                      ))}
                    </div>
                  );
                } else {
                  content = (
                    <span className="text-gray-900">{String(v)}</span>
                  );
                }

                return (
                  <div key={k}>
                    <dt className="text-sm font-medium text-gray-500">
                      {displayName}
                    </dt>
                    <dd className="mt-1 text-sm">{content}</dd>
                  </div>
                );
              })}
            </dl>
          </div>
        );
      })}
    </div>
  );
}

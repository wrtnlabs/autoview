import * as LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {
  /**
   * Pages Health Check Status
   *
   * @title Pages Health Check Status
   */
  export type pages_health_check = {
    domain?: {
      host?: string;
      uri?: string;
      nameservers?: string;
      dns_resolves?: boolean;
      is_proxied?: boolean | null;
      is_cloudflare_ip?: boolean | null;
      is_fastly_ip?: boolean | null;
      is_old_ip_address?: boolean | null;
      is_a_record?: boolean | null;
      has_cname_record?: boolean | null;
      has_mx_records_present?: boolean | null;
      is_valid_domain?: boolean;
      is_apex_domain?: boolean;
      should_be_a_record?: boolean | null;
      is_cname_to_github_user_domain?: boolean | null;
      is_cname_to_pages_dot_github_dot_com?: boolean | null;
      is_cname_to_fastly?: boolean | null;
      is_pointed_to_github_pages_ip?: boolean | null;
      is_non_github_pages_ip_present?: boolean | null;
      is_pages_domain?: boolean;
      is_served_by_pages?: boolean | null;
      is_valid?: boolean;
      reason?: string | null;
      responds_to_https?: boolean;
      enforces_https?: boolean;
      https_error?: string | null;
      is_https_eligible?: boolean | null;
      caa_error?: string | null;
    };
    alt_domain?: {
      host?: string;
      uri?: string;
      nameservers?: string;
      dns_resolves?: boolean;
      is_proxied?: boolean | null;
      is_cloudflare_ip?: boolean | null;
      is_fastly_ip?: boolean | null;
      is_old_ip_address?: boolean | null;
      is_a_record?: boolean | null;
      has_cname_record?: boolean | null;
      has_mx_records_present?: boolean | null;
      is_valid_domain?: boolean;
      is_apex_domain?: boolean;
      should_be_a_record?: boolean | null;
      is_cname_to_github_user_domain?: boolean | null;
      is_cname_to_pages_dot_github_dot_com?: boolean | null;
      is_cname_to_fastly?: boolean | null;
      is_pointed_to_github_pages_ip?: boolean | null;
      is_non_github_pages_ip_present?: boolean | null;
      is_pages_domain?: boolean;
      is_served_by_pages?: boolean | null;
      is_valid?: boolean;
      reason?: string | null;
      responds_to_https?: boolean;
      enforces_https?: boolean;
      https_error?: string | null;
      is_https_eligible?: boolean | null;
      caa_error?: string | null;
    } | null;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.pages_health_check;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  type DomainData = NonNullable<AutoViewInput["domain"]>;
  const domain = value.domain;
  const altDomain = value.alt_domain;

  // Render boolean/null status icons
  const renderIcon = (flag: boolean | null | undefined) => {
    if (flag === true) {
      return <LucideReact.CheckCircle className="text-green-500" size={16} />;
    } else if (flag === false) {
      return <LucideReact.XCircle className="text-red-500" size={16} />;
    }
    return <LucideReact.AlertTriangle className="text-gray-400" size={16} />;
  };

  // Render one domain health section
  const renderSection = (title: string, d: DomainData) => {
    const items: [string, boolean | null | undefined][] = [
      ["Valid Format", d.is_valid_domain],
      ["DNS Resolves", d.dns_resolves],
      ["Proxied", d.is_proxied],
      ["Cloudflare IP", d.is_cloudflare_ip],
      ["Fastly IP", d.is_fastly_ip],
      ["Pages Domain", d.is_pages_domain],
      ["Served by Pages", d.is_served_by_pages],
      ["Responds to HTTPS", d.responds_to_https],
      ["Enforces HTTPS", d.enforces_https],
      ["HTTPS Eligible", d.is_https_eligible],
    ];

    return (
      <div className="border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-md font-semibold text-gray-800">{title}</h3>
          {renderIcon(d.is_valid)}
        </div>
        <div className="flex items-center text-gray-700 mb-3">
          <LucideReact.Globe size={18} />
          <span className="ml-2 truncate">{d.host || "Unknown host"}</span>
        </div>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700">
          {items
            .filter(([, flag]) => flag !== undefined && flag !== null)
            .map(([label, flag]) => (
              <li key={label} className="flex items-center">
                {renderIcon(flag)}
                <span className="ml-2">{label}</span>
              </li>
            ))}
        </ul>
        {d.reason && (
          <div className="mt-2 text-sm text-red-600 flex items-center">
            <LucideReact.AlertTriangle size={16} />
            <span className="ml-2 italic">{d.reason}</span>
          </div>
        )}
        {(d.https_error || d.caa_error) && (
          <div className="mt-2 space-y-1">
            {d.https_error && (
              <div className="text-sm text-red-600 flex items-center">
                <LucideReact.AlertTriangle size={16} />
                <span className="ml-2 italic">{d.https_error}</span>
              </div>
            )}
            {d.caa_error && (
              <div className="text-sm text-red-600 flex items-center">
                <LucideReact.AlertTriangle size={16} />
                <span className="ml-2 italic">{d.caa_error}</span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Pages Health Check</h2>

      {domain ? (
        renderSection("Main Domain", domain)
      ) : (
        <div className="text-gray-500 flex items-center">
          <LucideReact.AlertCircle className="text-gray-400" size={20} />
          <span className="ml-2">No domain data available</span>
        </div>
      )}

      {altDomain && renderSection("Alternative Domain", altDomain)}
    </div>
  );
}

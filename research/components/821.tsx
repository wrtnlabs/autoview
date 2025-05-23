import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Pages Health Check Status
     *
     * @title Pages Health Check Status
    */
    export interface pages_health_check {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.pages_health_check;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Define a type for guaranteed domain object
  type DomainInfo = NonNullable<AutoViewInputSubTypes.pages_health_check["domain"]>;

  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  // Collect primary and alternative domains if present
  const domainsArr: { title: string; data: DomainInfo }[] = [];
  if (value.domain) {
    domainsArr.push({ title: "Primary Domain", data: value.domain });
  }
  if (value.alt_domain) {
    domainsArr.push({ title: "Alternative Domain", data: value.alt_domain });
  }

  // If no domain data, show placeholder
  if (domainsArr.length === 0) {
    return (
      <div className="p-4 text-gray-500 flex items-center">
        <LucideReact.AlertCircle size={24} className="mr-2" />
        No domain data available
      </div>
    );
  }

  // Helper to render an individual status check with icon
  const renderStatus = (
    label: string,
    status: boolean | null | undefined
  ): React.ReactNode => {
    let icon: React.ReactNode;
    if (status === true) {
      icon = <LucideReact.CheckCircle size={16} className="text-green-500 mr-1" />;
    } else if (status === false) {
      icon = <LucideReact.XCircle size={16} className="text-red-500 mr-1" />;
    } else {
      icon = <LucideReact.HelpCircle size={16} className="text-gray-400 mr-1" />;
    }
    return (
      <li key={label} className="flex items-center text-sm text-gray-700">
        {icon}
        {label}
      </li>
    );
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-6">
      {domainsArr.map(({ title, data }) => (
        <div key={title} className="p-4 bg-white rounded-lg shadow-md">
          <div className="flex items-center text-lg font-semibold text-gray-800">
            <LucideReact.Globe size={20} className="mr-2 text-gray-600" />
            {title}:
            <span className="ml-1 truncate">{data.host || data.uri || "—"}</span>
          </div>

          <ul className="mt-3 space-y-1">
            {renderStatus("Valid Domain", data.is_valid_domain)}
            {renderStatus("DNS Resolves", data.dns_resolves)}
            {renderStatus("Served by GitHub Pages", data.is_served_by_pages)}
            {renderStatus("HTTPS Available", data.responds_to_https)}
            {renderStatus("HTTPS Enforced", data.enforces_https)}
            {renderStatus("Apex Domain", data.is_apex_domain)}
          </ul>

          {(data.reason || data.https_error || data.caa_error) && (
            <div className="mt-3 space-y-1">
              {data.reason && (
                <div className="flex items-center text-sm text-red-600">
                  <LucideReact.AlertTriangle size={16} className="mr-1" />
                  <span className="truncate">{data.reason}</span>
                </div>
              )}
              {data.https_error && (
                <div className="flex items-center text-sm text-red-600">
                  <LucideReact.AlertTriangle size={16} className="mr-1" />
                  <span className="truncate">{data.https_error}</span>
                </div>
              )}
              {data.caa_error && (
                <div className="flex items-center text-sm text-red-600">
                  <LucideReact.AlertTriangle size={16} className="mr-1" />
                  <span className="truncate">{data.caa_error}</span>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

import React from "react";
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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const domain = value.domain || {};
  const alt = value.alt_domain;

  // Utility to render a status badge for boolean|undefined|null values
  function StatusBadge(status: boolean | null | undefined): React.ReactNode {
    let text: string;
    let bg: string;
    let fg: string;
    if (status === true) {
      text = 'Yes';
      bg = 'bg-green-100';
      fg = 'text-green-800';
    } else if (status === false) {
      text = 'No';
      bg = 'bg-red-100';
      fg = 'text-red-800';
    } else {
      text = 'Unknown';
      bg = 'bg-gray-100';
      fg = 'text-gray-800';
    }
    return (
      <span className={`${bg} ${fg} px-2 py-0.5 text-xs font-medium rounded-full`}>
        {text}
      </span>
    );
  }

  // Helper to render a domain block (primary or alternate)
  function renderDomainBlock(title: string, data: typeof domain): React.ReactNode {
    const items: { label: string; content: React.ReactNode }[] = [];

    // Textual fields
    if (data.host) items.push({ label: 'Host', content: data.host });
    if (data.uri) items.push({ label: 'URI', content: data.uri });
    if (data.nameservers) items.push({ label: 'Nameservers', content: data.nameservers });

    // Boolean status fields
    const boolFields: [keyof typeof domain, string][] = [
      ['dns_resolves', 'DNS Resolves'],
      ['is_valid_domain', 'Valid Domain'],
      ['is_apex_domain', 'Apex Domain'],
      ['is_a_record', 'Has A Record'],
      ['has_cname_record', 'Has CNAME Record'],
      ['is_proxied', 'Proxied'],
      ['is_cloudflare_ip', 'Cloudflare IP'],
      ['is_fastly_ip', 'Fastly IP'],
      ['is_old_ip_address', 'Old IP Address'],
      ['is_pointed_to_github_pages_ip', 'Pointed to GitHub Pages IP'],
      ['is_non_github_pages_ip_present', 'Non-GitHub Pages IP Present'],
      ['is_cname_to_github_user_domain', 'CNAME to GitHub User Domain'],
      ['is_cname_to_pages_dot_github_dot_com', 'CNAME to pages.github.com'],
      ['is_cname_to_fastly', 'CNAME to Fastly'],
      ['is_pages_domain', 'Is Pages Domain'],
      ['is_served_by_pages', 'Served by GitHub Pages'],
      ['responds_to_https', 'HTTPS Response'],
      ['enforces_https', 'Enforces HTTPS'],
      ['is_https_eligible', 'HTTPS Eligible'],
    ];
    for (const [key, label] of boolFields) {
      if (key in data) {
        items.push({ label, content: StatusBadge(data[key] as boolean | null | undefined) });
      }
    }

    // Error or reason fields
    if (data.reason) {
      items.push({
        label: 'Reason',
        content: <span className="text-red-600 text-sm">{data.reason}</span>,
      });
    }
    if (data.https_error) {
      items.push({
        label: 'HTTPS Error',
        content: <span className="text-red-600 text-sm">{data.https_error}</span>,
      });
    }
    if (data.caa_error) {
      items.push({
        label: 'CAA Error',
        content: <span className="text-red-600 text-sm">{data.caa_error}</span>,
      });
    }

    return (
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-3">{title}</h4>
        <dl className="space-y-2">
          {items.map((item, idx) => (
            <div key={idx} className="flex justify-between">
              <dt className="text-gray-600">{item.label}</dt>
              <dd className="ml-4">{item.content}</dd>
            </div>
          ))}
        </dl>
      </div>
    );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-xl mx-auto p-4 bg-gray-50 rounded-lg">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Pages Health Check</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderDomainBlock('Primary Domain', domain)}
        {alt ? renderDomainBlock('Alternate Domain', alt) : null}
      </div>
    </div>
  );
}

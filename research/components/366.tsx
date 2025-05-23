import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Api Overview
     *
     * @title Api Overview
    */
    export interface api_overview {
        verifiable_password_authentication: boolean;
        ssh_key_fingerprints?: {
            SHA256_RSA?: string;
            SHA256_DSA?: string;
            SHA256_ECDSA?: string;
            SHA256_ED25519?: string;
        };
        ssh_keys?: string[];
        hooks?: string[];
        github_enterprise_importer?: string[];
        web?: string[];
        api?: string[];
        git?: string[];
        packages?: string[];
        pages?: string[];
        importer?: string[];
        actions?: string[];
        actions_macos?: string[];
        codespaces?: string[];
        dependabot?: string[];
        copilot?: string[];
        domains?: {
            website?: string[];
            codespaces?: string[];
            copilot?: string[];
            packages?: string[];
            actions?: string[];
            actions_inbound?: {
                full_domains?: string[];
                wildcard_domains?: string[];
            };
            artifact_attestations?: {
                trust_domain?: string;
                services?: string[];
            };
        };
    }
}
export type AutoViewInput = AutoViewInputSubTypes.api_overview;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const fingerprintEntries = value.ssh_key_fingerprints
    ? (Object.entries(value.ssh_key_fingerprints) as [string, string][]).filter(([, fp]) => Boolean(fp))
    : [];

  const categoryProps: {
    key: keyof AutoViewInput;
    label: string;
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  }[] = [
    { key: 'ssh_keys', label: 'SSH Keys', Icon: LucideReact.Key },
    { key: 'hooks', label: 'Hooks', Icon: LucideReact.GitPullRequest },
    { key: 'github_enterprise_importer', label: 'Enterprise Importer', Icon: LucideReact.GitMerge },
    { key: 'web', label: 'Web Endpoints', Icon: LucideReact.Globe },
    { key: 'api', label: 'API Endpoints', Icon: LucideReact.ServerCog },
    { key: 'git', label: 'Git Endpoints', Icon: LucideReact.GitBranch },
    { key: 'packages', label: 'Packages', Icon: LucideReact.Package },
    { key: 'pages', label: 'Pages', Icon: LucideReact.FileText },
    { key: 'importer', label: 'Importer', Icon: LucideReact.DownloadCloud },
    { key: 'actions', label: 'Actions', Icon: LucideReact.Zap },
    { key: 'actions_macos', label: 'Actions (macOS)', Icon: LucideReact.Apple },
    { key: 'codespaces', label: 'Codespaces', Icon: LucideReact.Cpu },
    { key: 'dependabot', label: 'Dependabot', Icon: LucideReact.ShieldCheck },
    { key: 'copilot', label: 'Copilot', Icon: LucideReact.Activity },
  ];

  const domain = value.domains;
  type DomainSection = {
    label: string;
    items?: string[];
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    subitems?: { label: string; items?: string[] }[];
  };
  const domainSections: DomainSection[] = [];

  if (domain) {
    domainSections.push(
      { label: 'Website Domains', items: domain.website, Icon: LucideReact.Globe },
      { label: 'Codespaces Domains', items: domain.codespaces, Icon: LucideReact.Cpu },
      { label: 'Copilot Domains', items: domain.copilot, Icon: LucideReact.Activity },
      { label: 'Packages Domains', items: domain.packages, Icon: LucideReact.Package },
      { label: 'Actions Domains', items: domain.actions, Icon: LucideReact.Zap }
    );
    if (domain.actions_inbound) {
      domainSections.push({
        label: 'Inbound Actions Domains',
        Icon: LucideReact.Send,
        subitems: [
          { label: 'Full Domains', items: domain.actions_inbound.full_domains },
          { label: 'Wildcard Domains', items: domain.actions_inbound.wildcard_domains },
        ],
      });
    }
    if (domain.artifact_attestations) {
      domainSections.push({
        label: 'Artifact Attestations',
        Icon: LucideReact.ShieldCheck,
        subitems: [
          { label: 'Services', items: domain.artifact_attestations.services },
        ],
      });
    }
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-6">
      {/* Password Authentication Status */}
      <div className="flex items-center text-sm font-medium">
        {value.verifiable_password_authentication ? (
          <>
            <LucideReact.CheckCircle width={16} height={16} className="text-green-500 mr-2" />
            <span>Password Authentication Supported</span>
          </>
        ) : (
          <>
            <LucideReact.XCircle width={16} height={16} className="text-red-500 mr-2" />
            <span>Password Authentication Not Supported</span>
          </>
        )}
      </div>

      {/* SSH Key Fingerprints */}
      {fingerprintEntries.length > 0 && (
        <div>
          <h3 className="flex items-center text-gray-700 font-semibold mb-2">
            <LucideReact.Key width={18} height={18} className="mr-2 text-gray-500" />
            SSH Key Fingerprints
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {fingerprintEntries.map(([algo, fp]) => (
              <div key={algo} className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{algo.replace('SHA256_', '')}</span>
                <code className="bg-gray-100 text-xs text-gray-800 px-2 py-1 rounded truncate">
                  {fp}
                </code>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Endpoints Overview */}
      <div>
        <h3 className="text-gray-700 font-semibold mb-2">Endpoints Overview</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryProps.map(({ key, label, Icon }) => {
            const items = value[key] as string[] | undefined;
            if (!items || items.length === 0) return null;
            const preview = items.slice(0, 3);
            return (
              <div key={key} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-1 text-sm font-medium text-gray-700">
                  <Icon width={16} height={16} className="mr-1 text-gray-500" />
                  <span>
                    {label} <span className="text-gray-500">({items.length})</span>
                  </span>
                </div>
                <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                  {preview.map((u, i) => (
                    <li key={i} className="truncate">
                      {u}
                    </li>
                  ))}
                  {items.length > 3 && (
                    <li className="text-gray-500">+{items.length - 3} more</li>
                  )}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Domain Configuration */}
      {domainSections.length > 0 && (
        <div>
          <h3 className="text-gray-700 font-semibold mb-2">Domain Configuration</h3>
          <div className="space-y-4">
            {domainSections.map(({ label, items, Icon, subitems }, idx) => (
              <div key={idx}>
                <div className="flex items-center text-sm font-medium text-gray-700">
                  <Icon width={16} height={16} className="mr-1 text-gray-500" />
                  <span>
                    {label}{' '}
                    {items && <span className="text-gray-500">({items.length})</span>}
                  </span>
                </div>
                {items && items.length > 0 && (
                  <ul className="list-disc list-inside text-xs text-gray-600 ml-5 mt-1 space-y-1">
                    {items.map((d, j) => (
                      <li key={j} className="truncate">
                        {d}
                      </li>
                    ))}
                  </ul>
                )}
                {subitems &&
                  subitems.map(
                    (si, j) =>
                      si.items && (
                        <div key={j} className="ml-5 mt-2">
                          <div className="text-xs font-medium text-gray-600">
                            {si.label}{' '}
                            <span className="text-gray-500">({si.items.length})</span>
                          </div>
                          <ul className="list-disc list-inside text-xs text-gray-500 ml-4 mt-1 space-y-1">
                            {si.items.map((d, k) => (
                              <li key={k} className="truncate">
                                {d}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                  )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

import LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {
  /**
   * Api Overview
   *
   * @title Api Overview
   */
  export type api_overview = {
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
  };
}
export type AutoViewInput = AutoViewInputSubTypes.api_overview;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const authSupported = value.verifiable_password_authentication;
  const fingerprintTypes = value.ssh_key_fingerprints
    ? (
        Object.entries(value.ssh_key_fingerprints) as [
          keyof typeof value.ssh_key_fingerprints,
          string?,
        ][]
      )
        .filter(([, v]) => !!v)
        .map(([k]) => k)
    : [];

  // Define endpoint-based features and their display labels
  const endpointFeatures = [
    { key: "ssh_keys" as const, label: "SSH Keys" },
    { key: "hooks" as const, label: "Webhooks" },
    {
      key: "github_enterprise_importer" as const,
      label: "Enterprise Importer",
    },
    { key: "web" as const, label: "Web Endpoints" },
    { key: "api" as const, label: "API Endpoints" },
    { key: "git" as const, label: "Git Endpoints" },
    { key: "packages" as const, label: "Packages" },
    { key: "pages" as const, label: "Pages" },
    { key: "importer" as const, label: "Importer" },
    { key: "actions" as const, label: "Actions" },
    { key: "actions_macos" as const, label: "Actions (macOS)" },
    { key: "codespaces" as const, label: "Codespaces" },
    { key: "dependabot" as const, label: "Dependabot" },
    { key: "copilot" as const, label: "Copilot" },
  ];

  const domains = value.domains;
  const hasEndpoints = endpointFeatures.some(
    (f) => Array.isArray(value[f.key]) && (value[f.key] as string[]).length > 0,
  );
  const hasDomains =
    !!domains &&
    Object.values(domains).some((v) => {
      if (Array.isArray(v)) return v.length > 0;
      if (typeof v === "object" && v !== null)
        return Object.values(v as any).some((arr) =>
          Array.isArray(arr) ? arr.length > 0 : !!arr,
        );
      return false;
    });
  const hasFeatures =
    authSupported || fingerprintTypes.length > 0 || hasEndpoints || hasDomains;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!hasFeatures) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md text-center text-gray-500">
        <div className="flex flex-col items-center">
          <LucideReact.AlertCircle size={32} className="mb-2" />
          <span>No API features available</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">API Overview</h2>
      <ul className="space-y-3">
        {/* Authentication Support */}
        <li className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-gray-700">
            <LucideReact.Lock size={16} className="text-gray-500" />
            Password Authentication
          </span>
          {authSupported ? (
            <LucideReact.CheckCircle size={16} className="text-green-500" />
          ) : (
            <LucideReact.XCircle size={16} className="text-red-500" />
          )}
        </li>

        {/* SSH Fingerprint Types */}
        {fingerprintTypes.length > 0 && (
          <li className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-gray-700">
              <LucideReact.Fingerprint size={16} className="text-gray-500" />
              SSH Fingerprints
            </span>
            <span className="text-sm text-gray-600">
              {fingerprintTypes.join(", ")}
            </span>
          </li>
        )}

        {/* Endpoint Counts */}
        {endpointFeatures.map((feature) => {
          const list = value[feature.key] as string[] | undefined;
          if (!list || list.length === 0) return null;
          return (
            <li key={feature.key} className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-gray-700">
                <LucideReact.Code size={16} className="text-gray-500" />
                {feature.label}
              </span>
              <span className="text-sm font-medium text-gray-800">
                {list.length}
              </span>
            </li>
          );
        })}

        {/* Domains Section */}
        {domains && hasDomains && (
          <li>
            <div className="flex items-center gap-2 text-gray-700 mb-1">
              <LucideReact.Globe size={16} className="text-gray-500" />
              Domains
            </div>
            <ul className="pl-6 space-y-1">
              {domains.website && domains.website.length > 0 && (
                <li className="flex items-center justify-between text-gray-600 text-sm">
                  <span>Website</span>
                  <span>{domains.website.length}</span>
                </li>
              )}
              {domains.codespaces && domains.codespaces.length > 0 && (
                <li className="flex items-center justify-between text-gray-600 text-sm">
                  <span>Codespaces</span>
                  <span>{domains.codespaces.length}</span>
                </li>
              )}
              {domains.copilot && domains.copilot.length > 0 && (
                <li className="flex items-center justify-between text-gray-600 text-sm">
                  <span>Copilot</span>
                  <span>{domains.copilot.length}</span>
                </li>
              )}
              {domains.packages && domains.packages.length > 0 && (
                <li className="flex items-center justify-between text-gray-600 text-sm">
                  <span>Packages</span>
                  <span>{domains.packages.length}</span>
                </li>
              )}
              {domains.actions && domains.actions.length > 0 && (
                <li className="flex items-center justify-between text-gray-600 text-sm">
                  <span>Actions</span>
                  <span>{domains.actions.length}</span>
                </li>
              )}
              {domains.actions_inbound?.full_domains &&
                domains.actions_inbound.full_domains.length > 0 && (
                  <li className="flex items-center justify-between text-gray-600 text-sm">
                    <span>Inbound Actions (Full)</span>
                    <span>{domains.actions_inbound.full_domains.length}</span>
                  </li>
                )}
              {domains.actions_inbound?.wildcard_domains &&
                domains.actions_inbound.wildcard_domains.length > 0 && (
                  <li className="flex items-center justify-between text-gray-600 text-sm">
                    <span>Inbound Actions (Wildcard)</span>
                    <span>
                      {domains.actions_inbound.wildcard_domains.length}
                    </span>
                  </li>
                )}
              {domains.artifact_attestations?.services &&
                domains.artifact_attestations.services.length > 0 && (
                  <li className="flex items-center justify-between text-gray-600 text-sm">
                    <span>Artifact Services</span>
                    <span>{domains.artifact_attestations.services.length}</span>
                  </li>
                )}
            </ul>
          </li>
        )}
      </ul>
    </div>
  );
}

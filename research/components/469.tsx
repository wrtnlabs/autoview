import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsInteractionLimits {
        export type GetResponse = any | {};
    }
    export type interaction_limit_response = any;
}
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsInteractionLimits.GetResponse;



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derive and format key fields for display
  const raw = value as any;
  const limitRaw = raw.limit || raw.type || null;
  const originRaw = raw.origin || null;
  const expiryRaw = raw.expires_at ?? raw.expiry ?? raw.expiresAt ?? null;

  const capitalize = (s: string) =>
    s
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, c => c.toUpperCase());

  const restrictionLevel = limitRaw ? capitalize(String(limitRaw)) : 'None';
  const origin = originRaw ? capitalize(String(originRaw)) : 'Unknown';
  const expiresAt = expiryRaw
    ? new Date(String(expiryRaw)).toLocaleString('default', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Never';

  // 2. Render the structured, styled view
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md text-gray-800">
      <h2 className="text-xl font-semibold mb-4">Interaction Limits</h2>
      <dl className="space-y-3">
        <div className="flex justify-between">
          <dt className="text-gray-600">Restriction Level</dt>
          <dd className="font-medium truncate">{restrictionLevel}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-600">Origin</dt>
          <dd className="font-medium truncate">{origin}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-600">Expires At</dt>
          <dd className="font-medium truncate">{expiresAt}</dd>
        </div>
      </dl>
    </div>
  );
}

import React from "react";
export namespace AutoViewInputSubTypes {
    export type ALREADY_CREATED_EMAIL = any;
    export type ALREADY_CREATED_PHONE_NUMBER = any;
    export type ResponseForm_lt_DecodedUserToken_gt_ = any;
}
export type AutoViewInput = any | any | any;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Type guards to infer the kind of data we received
  const isEmailType =
    value &&
    typeof value === "object" &&
    "email" in value &&
    typeof (value as any).email === "string";

  const isPhoneType =
    value &&
    typeof value === "object" &&
    ("phoneNumber" in value || "phone" in value) &&
    typeof ((value as any).phoneNumber ?? (value as any).phone) === "string";

  const isTokenResponse =
    value &&
    typeof value === "object" &&
    "username" in value &&
    typeof (value as any).username === "string";

  // 2. Data extraction and transformation
  if (isEmailType) {
    const email = (value as any).email as string;
    const createdAt = (value as any).createdAt;
    const formattedDate =
      typeof createdAt === "string"
        ? new Date(createdAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : null;
    return (
      <div className="p-4 bg-white rounded-lg shadow-md max-w-sm w-full mx-auto">
        <div className="text-gray-500 text-xs uppercase font-semibold mb-1">
          Email Address
        </div>
        <div className="text-gray-900 text-lg font-medium break-all">
          {email}
        </div>
        {formattedDate && (
          <div className="text-gray-400 text-xs mt-2">
            Created on {formattedDate}
          </div>
        )}
      </div>
    );
  }

  if (isPhoneType) {
    const raw = (value as any).phoneNumber ?? (value as any).phone;
    // format as (XXX) XXX-XXXX if US-style, else raw
    const digits = raw.replace(/\D/g, "");
    const formatted =
      digits.length === 10
        ? `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
        : raw;
    return (
      <div className="p-4 bg-white rounded-lg shadow-md max-w-sm w-full mx-auto">
        <div className="text-gray-500 text-xs uppercase font-semibold mb-1">
          Phone Number
        </div>
        <div className="text-gray-900 text-lg font-medium break-all">
          {formatted}
        </div>
      </div>
    );
  }

  if (isTokenResponse) {
    const { username, email, roles, exp, iat } = value as any;
    const roleList = Array.isArray(roles) ? (roles as string[]).join(", ") : "";
    const expDate =
      typeof exp === "number"
        ? new Date(exp * 1000).toLocaleString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        : null;
    return (
      <div className="p-5 bg-white rounded-lg shadow-lg max-w-md w-full mx-auto space-y-3">
        <div className="text-gray-700 text-sm font-semibold">User Profile</div>
        <div className="flex flex-col space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-500 text-xs">Username:</span>
            <span className="text-gray-900 text-sm truncate">{username}</span>
          </div>
          {email && (
            <div className="flex justify-between">
              <span className="text-gray-500 text-xs">Email:</span>
              <span className="text-gray-900 text-sm truncate">{email}</span>
            </div>
          )}
          {roleList && (
            <div className="flex justify-between">
              <span className="text-gray-500 text-xs">Roles:</span>
              <span className="text-gray-900 text-sm truncate">{roleList}</span>
            </div>
          )}
          {expDate && (
            <div className="flex justify-between">
              <span className="text-gray-500 text-xs">Expires:</span>
              <span className="text-gray-900 text-sm">{expDate}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Fallback: display up to first 5 simple fields, else raw JSON
  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, any>);
    const simple = entries.filter(
      ([, v]) =>
        v == null ||
        ["string", "number", "boolean"].includes(typeof v)
    );
    if (simple.length > 0 && simple.length <= 5) {
      return (
        <div className="p-4 bg-white rounded-lg shadow-md max-w-md w-full mx-auto space-y-2">
          {simple.map(([key, v]) => {
            let display = String(v);
            if (
              typeof v === "string" &&
              /^\d{4}-\d{2}-\d{2}T/.test(v)
            ) {
              display = new Date(v).toLocaleString();
            }
            if (typeof v === "number" && key.toLowerCase().includes("price")) {
              display = v.toLocaleString(undefined, {
                style: "currency",
                currency: "USD",
              });
            }
            const label = key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (s) => s.toUpperCase());
            return (
              <div key={key} className="flex justify-between">
                <span className="text-gray-500 text-xs">{label}:</span>
                <span className="text-gray-900 text-sm truncate">
                  {display}
                </span>
              </div>
            );
          })}
        </div>
      );
    }
  }

  // Ultimate fallback: raw JSON block
  const jsonString = JSON.stringify(value, null, 2);
  return (
    <div className="p-4 bg-gray-50 rounded-lg font-mono text-xs overflow-auto max-h-64 w-full">
      <pre>{jsonString}</pre>
    </div>
  );
}

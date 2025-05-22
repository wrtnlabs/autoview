import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace TryPagination_lt_AlarmType {
    export type ReadResponseType_gt_ = {
      result: true;
      code: 1000;
      requestToResponse?: string;
      data: AutoViewInputSubTypes.PaginationResponseType_lt_AlarmType.ReadResponseType_gt_;
    };
  }
  export namespace PaginationResponseType_lt_AlarmType {
    export type ReadResponseType_gt_ = {
      list: AutoViewInputSubTypes.AlarmType.Element[];
      count: number;
      totalResult: number;
      totalPage: number;
      search?: string;
      page: number;
    };
  }
  export namespace AlarmType {
    export type Element = {
      id: number;
      /**
       * 유저의 아이디
       */
      userId: number & tags.Type<"int32">;
      resourceName?: string;
      /**
       * 알람이 가리키는 리소스의 아이디로, 리소스마다 동일한 숫자의 아이디를 가질 수 있기에 유니크한 값이 아니다.
       */
      resourceId?: number & tags.Type<"int32">;
      redirectLink?: number;
    };
  }
}
export type AutoViewInput =
  AutoViewInputSubTypes.TryPagination_lt_AlarmType.ReadResponseType_gt_;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Extract and derive necessary data
  const { data } = value;
  const { list, count, totalResult, totalPage, page, search } = data;

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Alarms</h2>
        <div className="text-sm text-gray-500 mt-1 sm:mt-0">
          Page {page} of {totalPage}
        </div>
      </div>

      {/* Optional search filter */}
      {search && (
        <div className="mb-2 text-sm text-gray-600">
          Filter: <span className="font-medium">"{search}"</span>
        </div>
      )}

      {/* Summary */}
      <div className="mb-4 text-sm text-gray-500">
        Showing {count} of {totalResult} alarms
      </div>

      {/* Alarm list */}
      <ul className="divide-y divide-gray-200">
        {list.map((alarm) => (
          <li key={alarm.id} className="py-3 flex items-start space-x-3">
            <LucideReact.Bell
              className="text-blue-500 flex-shrink-0"
              size={20}
              aria-hidden="true"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {alarm.resourceName ?? "Unnamed Resource"}
              </p>
              <div className="mt-1 flex flex-wrap gap-3 text-xs text-gray-500">
                {alarm.resourceId !== undefined && (
                  <div className="flex items-center">
                    <LucideReact.Hash
                      size={14}
                      className="mr-1 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span>Resource ID: {alarm.resourceId}</span>
                  </div>
                )}
                {alarm.redirectLink !== undefined && (
                  <div className="flex items-center">
                    <LucideReact.Link
                      size={14}
                      className="mr-1 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span>Redirect: {alarm.redirectLink}</span>
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

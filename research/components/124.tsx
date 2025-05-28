import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IShoppingDeliveryPiece {
        /**
         * Creation information of the delivery piece.
        */
        export interface ICreate {
            /**
             * Target order's {@link IShoppingOrderPublish.id}.
             *
             * @title Target order's {@link IShoppingOrderPublish.id}
            */
            publish_id: string;
            /**
             * Target good's {@link IShoppingOrderGood.id}.
             *
             * @title Target good's {@link IShoppingOrderGood.id}
            */
            good_id: string;
            /**
             * Target stock's {@link IShoppingSaleUnitStock.id}.
             *
             * @title Target stock's {@link IShoppingSaleUnitStock.id}
            */
            stock_id: string;
            /**
             * Quantity of the stock.
             *
             * It can be precision value to express split shipping.
             *
             * @title Quantity of the stock
            */
            quantity: number;
        }
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingDeliveryPiece.ICreate[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Group delivery pieces by their target order (publish_id)
  const piecesByOrder = value.reduce<Record<string, AutoViewInputSubTypes.IShoppingDeliveryPiece.ICreate[]>>(
    (acc, piece) => {
      const { publish_id } = piece;
      if (!acc[publish_id]) acc[publish_id] = [];
      acc[publish_id].push(piece);
      return acc;
    },
    {}
  );

  // If no data is provided, show an empty state
  if (value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2 text-sm">No delivery pieces available</span>
      </div>
    );
  }

  // Compose the UI: a card per order with a simple table of pieces
  return (
    <div className="w-full space-y-6 p-4">
      {Object.entries(piecesByOrder).map(([orderId, pieces]) => {
        // Calculate total quantity for this order
        const totalQuantity = pieces.reduce((sum, p) => sum + p.quantity, 0);

        return (
          <div key={orderId} className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Order header */}
            <div className="flex items-center bg-gray-50 px-4 py-3 border-b border-gray-200">
              <LucideReact.Truck size={20} className="text-blue-500" />
              <h2 className="ml-2 text-lg font-semibold text-gray-800 truncate">
                Order {orderId}
              </h2>
            </div>

            {/* Table header */}
            <div className="grid grid-cols-3 items-center gap-4 px-4 py-2 text-sm font-medium text-gray-600 border-b border-gray-200">
              <div>Good ID</div>
              <div>Stock ID</div>
              <div className="text-right">Quantity</div>
            </div>

            {/* Table rows */}
            <div className="divide-y divide-gray-100">
              {pieces.map((piece, idx) => (
                <div
                  key={`${orderId}-${idx}`}
                  className="grid grid-cols-3 items-center gap-4 px-4 py-2 text-sm text-gray-700"
                >
                  <div className="truncate">{piece.good_id}</div>
                  <div className="truncate">{piece.stock_id}</div>
                  <div className="text-right">{piece.quantity}</div>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div className="flex justify-end px-4 py-3 bg-gray-50">
              <span className="text-sm font-medium text-gray-700">
                Total Quantity:
              </span>
              <span className="ml-1 text-sm font-semibold text-gray-900">
                {totalQuantity}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

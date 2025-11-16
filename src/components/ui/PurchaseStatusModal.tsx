import React from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  success?: boolean; // true = success, false = failed
};

// Minimal modal: only shows success or failure message
export default function PurchaseStatusModal({
  open,
  onClose,
  success = true,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      <div
        className="relative z-10 w-full max-w-sm rounded-2xl bg-white px-6 py-8 text-center shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div
          className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${
            success ? "bg-green-50" : "bg-red-50"
          }`}
        >
          {success ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </div>

        {/* Text */}
        <h2 className="mt-4 text-xl font-semibold text-gray-900">
          {success ? "Purchase Successful" : "Purchase Failed"}
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          {success
            ? "Thank you! Your order placed successfully."
            : "Something went wrong while processing your purchase."}
        </p>

        {/* Action button */}
        <button
          onClick={onClose}
          className={`mt-6 w-full cursor-pointer rounded-md px-4 py-2 text-sm font-medium text-white shadow ${
            success
              ? "bg-green-600 hover:bg-green-700"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          OK
        </button>
      </div>
    </div>
  );
}

/*
Usage example:

const [open, setOpen] = useState(false)
const [status, setStatus] = useState(true) // success or failure

<button onClick={() => { setStatus(true); setOpen(true); }}>Simulate Success</button>
<button onClick={() => { setStatus(false); setOpen(true); }}>Simulate Failure</button>

<PurchaseStatusModal
  open={open}
  onClose={() => setOpen(false)}
  success={status}
/>
*/

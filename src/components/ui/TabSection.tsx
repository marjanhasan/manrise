import { FabricAndFit } from "@/types/product";
import React from "react";

interface TabSectionProps {
  title: string;
  description?: string;
  sizeChart: [string[], string[], string[], string[]];
  fabricAndFit: FabricAndFit;
  specifications: string[];
  careTips: string[];
}

export default function TabSection({
  title,
  description,
  sizeChart,
  fabricAndFit,
  specifications,
  careTips,
}: TabSectionProps) {
  const [tab, setTab] = React.useState<"description" | "delivery">(
    "description",
  );

  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* Tabs */}
      <div className="mb-6 flex items-center gap-6 border-b border-neutral-200 dark:border-neutral-800">
        <button
          onClick={() => setTab("description")}
          className={`pb-3 text-sm font-medium tracking-wide uppercase transition ${
            tab === "description"
              ? "border-b-2 border-neutral-900 text-neutral-900 dark:border-white dark:text-white"
              : "text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-white"
          }`}
        >
          DESCRIPTION
        </button>
        <button
          onClick={() => setTab("delivery")}
          className={`pb-3 text-sm font-medium tracking-wide uppercase transition ${
            tab === "delivery"
              ? "border-b-2 border-neutral-900 text-neutral-900 dark:border-white dark:text-white"
              : "text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-white"
          }`}
        >
          DELIVERY OPTIONS
        </button>
      </div>

      {/* ------------------ TAB CONTENT ------------------ */}
      {tab === "description" ? (
        <div className="space-y-6 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          {/* Size chart */}
          <div>
            <h3 className="mb-2 text-base font-semibold">Size Chart:</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-neutral-200 text-xs dark:border-neutral-700">
                <thead className="bg-neutral-50 dark:bg-neutral-800">
                  <tr>
                    {[
                      "Size",
                      "Chest Round",
                      "Length",
                      "Shoulder",
                      "Sleeve",
                    ].map((head) => (
                      <th
                        key={head}
                        className="px-4 py-2 text-left font-medium text-neutral-800 dark:text-neutral-100"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sizeChart.map((row, i) => (
                    <tr
                      key={i}
                      className="border-t border-neutral-200 dark:border-neutral-700"
                    >
                      {row.map((cell, j) => (
                        <td key={j} className="px-4 py-2">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-1 text-xs text-neutral-500">
              Size chart - In inches (Expected Deviation &lt; 2%)
            </p>
          </div>

          {/* Description */}
          <div>
            <h3 className="mb-2 text-base font-semibold">{title}</h3>
            <p className="text-justify">{description}</p>
          </div>

          {/* Fabric & Fit — added from client */}
          <div>
            <h4 className="mb-1 font-semibold">Fabric &amp; Fit</h4>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <span className="font-medium">Fabric Type:</span>{" "}
                {fabricAndFit.fabric}
              </li>
              <li>
                <span className="font-medium">Type:</span> {fabricAndFit.type}
              </li>
              <li>
                <span className="font-medium">Weave:</span> {fabricAndFit.weave}
              </li>
              <li>
                <span className="font-medium">Texture:</span>{" "}
                {fabricAndFit.texture}
              </li>
              <li>
                <span className="font-medium">Breathability:</span>{" "}
                {fabricAndFit.breathability}
              </li>
            </ul>
          </div>

          {/* Specs (kept, trimmed to avoid conflicts) */}
          <div>
            <h4 className="mb-1 font-semibold">Specifications:</h4>
            <ul className="list-disc space-y-1 pl-5">
              {specifications.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
            </ul>
          </div>

          {/* Care — replaced with client’s Care Tips */}
          <div>
            <h4 className="mb-1 font-semibold">Care Tips</h4>
            <ul className="list-disc space-y-1 pl-5">
              {careTips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>

          {/* Brand (kept as-is) */}
          <div>
            <h4 className="mb-1 font-semibold">About the Brand – ManRise</h4>
            <p className="text-justify">
              <strong>ManRise</strong> is a premium Bangladeshi menswear brand
              dedicated to creating timeless pieces with uncompromising quality.
              From everyday essentials to statement styles, our designs combine{" "}
              <em>modern fashion with premium craftsmanship</em>. Every product
              is crafted with attention to detail, ensuring comfort, durability,
              and effortless style for the modern man.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4 text-justify text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          <p>
            <strong>ঢাকা সিটি - হোম ডেলিভারি - ৭০ টাকা</strong>
          </p>
          <p>
            ঢাকা সিটি এর ভেতরে অর্ডার করা হলে আমরা সাধারণত ১-২ দিনের মধ্যে
            ডেলিভারি করি। নির্দিষ্ট এলাকাভেদে সময় ভিন্ন হতে পারে।
          </p>
          <p>
            <strong>
              ঢাকার বাইরে - সারা বাংলাদেশ - হোম ডেলিভারি বা কুরিয়ার অফিস - ১২০
              টাকা
            </strong>
          </p>
          <p>
            ঢাকার বাইরের অর্ডারগুলো আমরা কুরিয়ার সার্ভিসের মাধ্যমে পাঠিয়ে
            থাকি। সাধারণত ২-৫ কর্মদিবসের মধ্যে ডেলিভারি সম্পন্ন হয়। ডেলিভারির
            সময় পণ্য হাতে পেয়ে মূল্য পরিশোধ করতে পারবেন।
          </p>
          <p>
            কুরিয়ার অফিস থেকে পণ্য গ্রহণ করতে চাইলে অর্ডার করার সময় সেই অপশনটি
            নির্বাচন করতে পারবেন।
          </p>
        </div>
      )}
    </div>
  );
}

"use client";
import PurchaseStatusModal from "@/components/ui/PurchaseStatusModal";
import React, { useState } from "react";

export default function CheckoutPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [area, setArea] = useState<"inside" | "outside">("outside");
  const [note, setNote] = useState("");
  const [payment, setPayment] = useState<"cod" | "online">("cod");
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(true); // success or failure

  const product = {
    title: "ELITE Quality Embroidered Panjabi",
    sku: "MP-83",
    price: 2990,
    oldPrice: 3750,
    size: "XL",
    color: "Purple",
    qty: 1,
    img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop",
  };

  const deliveryFee = area === "inside" ? 80 : 130;
  const subTotal = product.price * product.qty;
  const total =
    subTotal + deliveryFee - (appliedCoupon === "SAVE100" ? 100 : 0);

  function applyCoupon() {
    // demo coupon logic
    if (coupon.trim().toUpperCase() === "SAVE100") {
      setAppliedCoupon("SAVE100");
      alert("Coupon applied: Tk.100 off");
    } else {
      setAppliedCoupon(null);
      alert("Coupon not valid (try SAVE100)");
    }
  }

  function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    // simple validation
    if (!name || !phone || !address) {
      alert("Please fill name, phone and address.");
      return;
    }
    // Fake submit
    const payload = {
      name,
      phone,
      address,
      area,
      note,
      payment,
      product,
      appliedCoupon,
    };
    console.log("Placing order", payload);
    alert(
      "Order placed! Check console for payload (demo).\nTotal: Tk." + total,
    );
  }

  return (
    <div className="min-h-screen bg-white p-6 md:p-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-2xl font-semibold">Checkout</h1>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left column: form (span 2 cols on large screen) */}
          <form
            className="rounded-lg border bg-white p-6 shadow-sm lg:col-span-2"
            onSubmit={placeOrder}
          >
            <section className="mb-6">
              <h2 className="mb-4 text-lg font-medium">
                Delivery & Billing Info <span className="text-red-500">*</span>
              </h2>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">
                    Customer Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Customer Name"
                    className="mt-1 w-full rounded border px-3 py-2"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number"
                    className="mt-1 w-full rounded border px-3 py-2"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="text-sm font-medium">
                  Detail Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Detail Address"
                  className="mt-1 h-24 w-full rounded border px-3 py-2"
                />
              </div>

              <div className="mt-4">
                <div className="mb-2 text-sm font-medium">
                  Select delivery area <span className="text-red-500">*</span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setArea("inside")}
                    className={`/* smaller on mobile */ /* smaller padding on mobile */ /* normal size on larger screens */ /* prevents stretching */ flex-shrink-0 rounded-full border px-2 py-1 text-sm transition sm:px-3 sm:py-2 ${area === "inside" ? "border-teal-400 bg-teal-100" : "border-gray-300"} `}
                  >
                    Inside Dhaka
                  </button>

                  <button
                    type="button"
                    onClick={() => setArea("outside")}
                    className={`flex-shrink-0 rounded-full border px-2 py-1 text-sm transition sm:px-3 sm:py-2 ${area === "outside" ? "border-teal-400 bg-teal-100" : "border-gray-300"} `}
                  >
                    Outside Dhaka
                  </button>
                </div>
              </div>

              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Additional information (anything you want to add)"
                className="mt-4 h-20 w-full rounded border px-3 py-2"
              />
            </section>

            <section>
              <h2 className="mb-4 text-lg font-medium">Payment Method</h2>
              <div className="flex flex-col items-start gap-4 md:flex-row">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    checked={payment === "cod"}
                    onChange={() => setPayment("cod")}
                  />
                  <span className="ml-2">Cash On Delivery</span>
                </label>
              </div>
            </section>
          </form>

          {/* Right column: order summary */}
          <aside className="rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-medium">Order Overview</h3>
            <div className="mb-4 flex gap-4">
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded bg-gray-100">
                {/* placeholder image - replace with next/image in real project */}
                <img
                  src={product.img}
                  alt={product.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">
                  {product.title} {product.sku}
                </div>
                <div className="text-xs text-gray-500">
                  Size {product.size} • Color: {product.color}
                </div>
                <div className="mt-2 text-sm font-semibold">
                  Tk. {product.price.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="mb-2 flex justify-between text-sm">
                <span>Sub-total</span>
                <span>Tk. {subTotal.toLocaleString()}</span>
              </div>
              <div className="mb-2 flex justify-between text-sm">
                <span>Delivery</span>
                <span>Tk. {deliveryFee.toLocaleString()}</span>
              </div>

              <div className="my-3">
                <label className="text-sm font-medium">
                  Have a coupon or promo code?
                </label>

                <div className="mt-2 flex flex-wrap gap-2">
                  <input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Enter coupon"
                    className="min-w-0 flex-1 rounded border px-2 py-1 text-sm sm:px-3 sm:py-2 sm:text-base"
                  />

                  <button
                    type="button"
                    onClick={applyCoupon}
                    className="flex-shrink-0 rounded border px-2 py-1 text-sm sm:px-3 sm:py-2 sm:text-base"
                  >
                    Apply
                  </button>
                </div>

                {appliedCoupon && (
                  <div className="mt-2 text-sm text-green-600">
                    Coupon {appliedCoupon} applied
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total</span>
                <span>Tk. {total.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-6 text-xs text-gray-500">
              Payment method:{" "}
              {payment === "cod" ? "Cash on Delivery" : "Online Payment"}
            </div>
            {/* bottom-right button — full-width on small screens, right-aligned on larger */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full cursor-pointer rounded-lg bg-gray-900 px-6 py-2 text-white hover:opacity-90 focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 focus:outline-none"
              >
                Place Order
              </button>
            </div>
            <PurchaseStatusModal
              open={open}
              onClose={() => setOpen(false)}
              success={status}
            />
          </aside>
          {/* <button
            className="cursor-pointer items-center justify-center rounded-full bg-gray-200 text-gray-700 shadow-sm transition hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
            onClick={() => {
              setStatus(true);
              setOpen(true);
            }}
          >
            Simulate Success
          </button>
          <button
            className="cursor-pointer items-center justify-center rounded-full bg-gray-200 text-gray-700 shadow-sm transition hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
            onClick={() => {
              setStatus(false);
              setOpen(true);
            }}
          >
            Simulate Failure
          </button> */}
        </div>
      </div>
    </div>
  );
}

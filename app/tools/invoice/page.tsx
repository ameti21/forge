"use client";

import { useState } from "react";

export default function InvoicePage() {
  const [invoice, setInvoice] = useState({
    clientName: "",
    clientEmail: "",
    items: [{ description: "", quantity: 1, price: 0 }],
    notes: "",
  });
  const [generated, setGenerated] = useState(false);

  const addItem = () => {
    setInvoice((prev) => ({
      ...prev,
      items: [...prev.items, { description: "", quantity: 1, price: 0 }],
    }));
  };

  const updateItem = (index: number, field: string, value: string | number) => {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    }));
  };

  const removeItem = (index: number) => {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const total = invoice.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const handleGenerate = () => {
    setGenerated(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold flex items-center gap-3">
          <span className="text-3xl">📄</span> InvoiceForge
        </h1>
        <p className="mt-2 text-zinc-400">Generate professional invoices in seconds. Fill in the details and export.</p>
      </div>

      {!generated ? (
        <div className="space-y-8">
          {/* Client info */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
            <h2 className="text-lg font-semibold mb-4">Client Information</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Client Name</label>
                <input
                  type="text"
                  value={invoice.clientName}
                  onChange={(e) => setInvoice((p) => ({ ...p, clientName: e.target.value }))}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-forge-500 focus:outline-none"
                  placeholder="Acme Corp"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Client Email</label>
                <input
                  type="email"
                  value={invoice.clientEmail}
                  onChange={(e) => setInvoice((p) => ({ ...p, clientEmail: e.target.value }))}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-forge-500 focus:outline-none"
                  placeholder="client@example.com"
                />
              </div>
            </div>
          </div>

          {/* Line items */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
            <h2 className="text-lg font-semibold mb-4">Line Items</h2>
            <div className="space-y-3">
              {invoice.items.map((item, i) => (
                <div key={i} className="grid grid-cols-12 gap-3 items-end">
                  <div className="col-span-5">
                    {i === 0 && <label className="block text-sm text-zinc-400 mb-1">Description</label>}
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateItem(i, "description", e.target.value)}
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-forge-500 focus:outline-none"
                      placeholder="Web development"
                    />
                  </div>
                  <div className="col-span-2">
                    {i === 0 && <label className="block text-sm text-zinc-400 mb-1">Qty</label>}
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateItem(i, "quantity", parseInt(e.target.value) || 0)}
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white focus:border-forge-500 focus:outline-none"
                    />
                  </div>
                  <div className="col-span-3">
                    {i === 0 && <label className="block text-sm text-zinc-400 mb-1">Unit Price ($)</label>}
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.price}
                      onChange={(e) => updateItem(i, "price", parseFloat(e.target.value) || 0)}
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white focus:border-forge-500 focus:outline-none"
                    />
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                    <span className="text-sm text-zinc-400">${(item.quantity * item.price).toFixed(2)}</span>
                    {invoice.items.length > 1 && (
                      <button onClick={() => removeItem(i)} className="text-red-400 hover:text-red-300 text-sm">✕</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={addItem}
              className="mt-4 rounded-lg border border-dashed border-zinc-600 px-4 py-2 text-sm text-zinc-400 hover:border-zinc-400 hover:text-zinc-300 transition"
            >
              + Add item
            </button>
          </div>

          {/* Notes */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
            <h2 className="text-lg font-semibold mb-4">Notes</h2>
            <textarea
              value={invoice.notes}
              onChange={(e) => setInvoice((p) => ({ ...p, notes: e.target.value }))}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-forge-500 focus:outline-none resize-none"
              rows={3}
              placeholder="Payment terms, thank you note, etc."
            />
          </div>

          {/* Total + Generate */}
          <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
            <div>
              <span className="text-sm text-zinc-400">Total</span>
              <p className="text-3xl font-bold">${total.toFixed(2)}</p>
            </div>
            <button
              onClick={handleGenerate}
              className="rounded-xl bg-gradient-to-r from-forge-500 to-indigo-500 px-8 py-3 font-semibold text-white hover:shadow-lg hover:shadow-forge-500/25 transition"
            >
              Generate Invoice
            </button>
          </div>
        </div>
      ) : (
        /* Invoice Preview */
        <div>
          <div className="mb-6 flex gap-3">
            <button
              onClick={() => setGenerated(false)}
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:text-white transition"
            >
              ← Edit
            </button>
            <button
              onClick={handlePrint}
              className="rounded-lg bg-forge-500 px-4 py-2 text-sm font-medium text-white hover:bg-forge-600 transition"
            >
              Print / Save PDF
            </button>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-white p-10 text-zinc-900 print:border-none print:shadow-none">
            <div className="flex justify-between items-start mb-10">
              <div>
                <h2 className="text-3xl font-bold text-indigo-600">INVOICE</h2>
                <p className="text-sm text-zinc-500 mt-1">#{String(Date.now()).slice(-8)}</p>
                <p className="text-sm text-zinc-500">Date: {new Date().toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">Forge</p>
                <p className="text-sm text-zinc-500">forge.ameti.one</p>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-sm text-zinc-500 mb-1">Bill To</p>
              <p className="font-semibold">{invoice.clientName || "Client Name"}</p>
              <p className="text-sm text-zinc-500">{invoice.clientEmail || "client@email.com"}</p>
            </div>

            <table className="w-full mb-8">
              <thead>
                <tr className="border-b border-zinc-200 text-left text-sm text-zinc-500">
                  <th className="pb-2">Description</th>
                  <th className="pb-2 text-right">Qty</th>
                  <th className="pb-2 text-right">Price</th>
                  <th className="pb-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, i) => (
                  <tr key={i} className="border-b border-zinc-100">
                    <td className="py-3">{item.description || "—"}</td>
                    <td className="py-3 text-right">{item.quantity}</td>
                    <td className="py-3 text-right">${item.price.toFixed(2)}</td>
                    <td className="py-3 text-right font-medium">${(item.quantity * item.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end">
              <div className="w-64">
                <div className="flex justify-between border-t-2 border-zinc-900 pt-3">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-lg">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {invoice.notes && (
              <div className="mt-8 pt-6 border-t border-zinc-200">
                <p className="text-sm text-zinc-500 mb-1">Notes</p>
                <p className="text-sm">{invoice.notes}</p>
              </div>
            )}

            <div className="mt-10 text-center text-xs text-zinc-400">
              Generated by InvoiceForge — forge.ameti.one
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

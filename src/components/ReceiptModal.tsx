import React from 'react';
import { Printer, CheckCircle2, Download, X, Copy, Share2 } from 'lucide-react';
import oceanViewLogo from '../assets/images/oceanview_resort_logo_1785518556173.jpg';

export interface ReceiptData {
  receiptNumber: string;
  timestamp: string;
  cashierName: string;
  paymentMethod: string;
  roomNumber?: string;
  guestName?: string;
  items: {
    name: string;
    qty: number;
    price: number;
  }[];
  subtotal: number;
  tax: number;
  total: number;
}

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  receipt: ReceiptData | null;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ isOpen, onClose, receipt }) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen || !receipt) return null;

  const handlePrint = () => {
    try {
      window.print();
    } catch (err) {
      console.warn('Printing not available or blocked:', err);
    }
  };

  const handleCopy = async () => {
    const text = `
=== OCEANVIEW COUNTRY CLUB & RESORT ===
10 Sweds Free Avenue, Sussex Village, Sierra Leone
Tel: +232-76-862043 | www.oceanviewresort.sl
----------------------------------------
RECEIPT #: ${receipt.receiptNumber}
DATE/TIME: ${receipt.timestamp}
CASHIER: ${receipt.cashierName}
PAYMENT: ${receipt.paymentMethod}${receipt.roomNumber ? ` (Room: ${receipt.roomNumber})` : ''}
${receipt.guestName ? `GUEST: ${receipt.guestName}` : ''}
----------------------------------------
ITEMS PURCHASED:
${receipt.items.map((i) => `${i.qty}x ${i.name.padEnd(25)} $${(i.qty * i.price).toFixed(2)}`).join('\n')}
----------------------------------------
SUBTOTAL:             $${receipt.subtotal.toFixed(2)}
RESORT TAX (10%):     $${receipt.tax.toFixed(2)}
GRAND TOTAL:          $${receipt.total.toFixed(2)}
----------------------------------------
Thank you for choosing OceanView Resort!
Visit again soon.
========================================
    `.trim();

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        throw new Error('Clipboard API unavailable');
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn('Clipboard writeText failed, trying fallback:', err);
      try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        textArea.style.top = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackErr) {
        console.error('Fallback copy failed:', fallbackErr);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-slate-900 rounded-2xl w-full max-w-md shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Action Header bar (Hidden in Print) */}
        <div className="print:hidden bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="font-extrabold text-sm">Transaction Complete</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Buttons (Hidden in Print) */}
        <div className="print:hidden p-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between gap-2 text-xs">
          <button
            onClick={handlePrint}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow transition-all active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl border border-slate-300 shadow-sm transition-all"
          >
            <Copy className="w-3.5 h-3.5 text-slate-500" />
            <span>{copied ? 'Copied!' : 'Copy Text'}</span>
          </button>
        </div>

        {/* Thermal Receipt Printable Canvas */}
        <div className="p-6 font-mono text-xs space-y-4 bg-white text-slate-900 select-text" id="printable-receipt">
          {/* Header */}
          <div className="text-center space-y-1.5 pb-3 border-b-2 border-dashed border-slate-300 flex flex-col items-center">
            <img
              src={oceanViewLogo}
              alt="OceanView Logo"
              className="h-14 w-auto object-contain mx-auto rounded"
              referrerPolicy="no-referrer"
            />
            <h1 className="font-sans font-black text-lg tracking-wider text-slate-900 uppercase">
              OceanView
            </h1>
            <p className="font-sans font-bold text-[10px] uppercase text-orange-600">
              Country Club & Resort
            </p>
            <p className="text-[10px] text-slate-500 leading-tight">
              10 Sweds Free Avenue, Sussex Village
            </p>
            <p className="text-[10px] text-slate-500">
              Sierra Leone | Hotline: +232-76-862043
            </p>
          </div>

          {/* Meta Details */}
          <div className="space-y-1 text-[11px] border-b-2 border-dashed border-slate-300 pb-3 text-slate-700">
            <div className="flex justify-between">
              <span className="text-slate-500">RECEIPT #:</span>
              <span className="font-bold text-slate-900">{receipt.receiptNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">DATE/TIME:</span>
              <span>{receipt.timestamp}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">CASHIER:</span>
              <span>{receipt.cashierName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">METHOD:</span>
              <span className="font-bold">{receipt.paymentMethod}</span>
            </div>
            {receipt.roomNumber && (
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>ROOM FOLIO:</span>
                <span>{receipt.roomNumber}</span>
              </div>
            )}
            {receipt.guestName && (
              <div className="flex justify-between">
                <span className="text-slate-500">GUEST:</span>
                <span className="font-semibold">{receipt.guestName}</span>
              </div>
            )}
          </div>

          {/* Purchased Items Table */}
          <div className="space-y-2 border-b-2 border-dashed border-slate-300 pb-3">
            <div className="flex justify-between font-bold text-[10px] text-slate-500 uppercase border-b border-slate-200 pb-1">
              <span>Item Description</span>
              <span>Amount</span>
            </div>
            <div className="space-y-1.5">
              {receipt.items.map((item, index) => (
                <div key={index} className="flex justify-between text-xs items-start">
                  <div className="pr-2">
                    <div className="font-bold text-slate-900">{item.name}</div>
                    <div className="text-[10px] text-slate-500">
                      {item.qty} x ${item.price.toFixed(2)}
                    </div>
                  </div>
                  <span className="font-bold text-slate-900">${(item.qty * item.price).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Totals Calculation */}
          <div className="space-y-1.5 text-xs pt-1 border-b-2 border-dashed border-slate-300 pb-3">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal:</span>
              <span>${receipt.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Resort Tax (10%):</span>
              <span>${receipt.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm font-black text-slate-900 pt-1 border-t border-slate-200">
              <span>TOTAL PAID:</span>
              <span className="text-emerald-700">${receipt.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Barcode & Footer */}
          <div className="text-center space-y-2 pt-1">
            <div className="inline-block p-2 bg-slate-100 rounded border border-slate-200 font-mono tracking-widest text-[10px] text-slate-700">
              ||| |||| || | ||||| |||| || ||| {receipt.receiptNumber}
            </div>
            <p className="font-sans text-[10px] text-slate-500 italic">
              Thank you for visiting OceanView Country Club & Resort!
            </p>
          </div>

        </div>

        {/* Footer Buttons (Hidden in Print) */}
        <div className="print:hidden p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition-all active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-all"
          >
            Done & Close
          </button>
        </div>

      </div>
    </div>
  );
};

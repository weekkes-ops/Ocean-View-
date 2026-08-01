import React, { useState } from 'react';
import { CreditCard, Search, Plus, Trash2, Printer, CheckCircle2, DollarSign, X } from 'lucide-react';
import { POSProduct, Room } from '../types';

interface POSTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  posCatalog: POSProduct[];
  rooms: Room[];
  onCompleteTransaction: (transaction: any) => void;
}

export const POSTerminalModal: React.FC<POSTerminalModalProps> = ({
  isOpen,
  onClose,
  posCatalog,
  rooms,
  onCompleteTransaction,
}) => {
  const [cart, setCart] = useState<{ item: POSProduct; qty: number }[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Credit Card' | 'Cash' | 'Charge to Room'>('Credit Card');
  const [selectedRoomId, setSelectedRoomId] = useState<string>('');

  if (!isOpen) return null;

  const filteredCatalog = posCatalog.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (item: POSProduct) => {
    setCart((prev) => {
      const existing = prev.find((x) => x.item.id === item.id);
      if (existing) {
        return prev.map((x) => (x.item.id === item.id ? { ...x, qty: x.qty + 1 } : x));
      }
      return [...prev, { item, qty: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((x) => x.item.id !== id));
  };

  const subtotal = cart.reduce((acc, x) => acc + x.item.price * x.qty, 0);
  const tax = subtotal * 0.1; // 10% Resort Tax
  const total = subtotal + tax;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const selectedRoom = rooms.find((r) => r.unitNumber === selectedRoomId);

    const tx = {
      id: `REC-${Date.now().toString().slice(-6)}`,
      receiptNumber: `REC-${Date.now().toString().slice(-6)}`,
      items: cart.map((c) => ({
        id: c.item.id,
        name: c.item.name,
        qty: c.qty,
        price: c.item.price,
      })),
      subtotal,
      tax,
      total,
      paymentMethod: paymentMethod === 'Charge to Room' ? `Room Charge (${selectedRoomId})` : paymentMethod === 'Cash' ? 'Cash (USD)' : 'Credit Card',
      chargeToRoom: paymentMethod === 'Charge to Room' ? selectedRoomId : undefined,
      guestName: selectedRoom ? selectedRoom.currentGuest : undefined,
      roomNumber: selectedRoomId || undefined,
      timestamp: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      cashierName: 'POS Cashier #01',
    };

    onCompleteTransaction(tx);
    setCart([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl h-[85vh] flex flex-col md:flex-row shadow-2xl overflow-hidden">
        
        {/* Left Item Selector */}
        <div className="md:w-3/5 p-5 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col justify-between space-y-4 overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base font-extrabold text-white">Express POS Terminal</h2>
            </div>
            <span className="text-xs px-2.5 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-full font-bold">
              OceanView Cashier
            </span>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search drinks, day passes, jet skis, cigars..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-3 pr-1">
            {filteredCatalog.map((item) => (
              <button
                key={item.id}
                onClick={() => addToCart(item)}
                className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/50 rounded-xl text-left transition-all active:scale-95 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] text-emerald-400 font-bold block mb-1">{item.category}</span>
                  <div className="font-bold text-white text-xs leading-snug line-clamp-2">{item.name}</div>
                </div>
                <div className="mt-3 text-emerald-300 font-extrabold text-sm">${item.price.toFixed(2)}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Cart & Payment Checkout */}
        <div className="md:w-2/5 p-5 bg-slate-950 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-extrabold text-white text-sm">Itemized Ticket</h3>
            <button onClick={onClose} className="text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart List */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                {cart.length === 0 ? (
                  <div className="text-center py-12 text-xs text-slate-500">
                    No items in cart. Click items on left catalog to add.
                  </div>
                ) : (
                  cart.map((x) => (
                    <div key={x.item.id} className="p-2 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                      <div className="pr-2">
                        <div className="font-bold text-white line-clamp-1">{x.item.name}</div>
                        <div className="text-slate-400 text-[10px]">{x.qty} x ${x.item.price}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-emerald-300">${(x.qty * x.item.price).toFixed(2)}</span>
                        <button onClick={() => removeFromCart(x.item.id)} className="text-rose-400 hover:text-rose-300">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-3 text-xs pt-3 border-t border-slate-800">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Payment Tender</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Credit Card">Credit / Debit Card</option>
                    <option value="Cash">Cash (USD)</option>
                    <option value="Charge to Room">Charge to Guest Room Folio</option>
                  </select>
                </div>

                {paymentMethod === 'Charge to Room' && (
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Select Occupied Room</label>
                    <select
                      value={selectedRoomId}
                      onChange={(e) => setSelectedRoomId(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="">Choose Room...</option>
                      {rooms
                        .filter((r) => r.status === 'Occupied')
                        .map((r) => (
                          <option key={r.id} value={r.unitNumber}>
                            {r.unitNumber} - {r.currentGuest}
                          </option>
                        ))}
                    </select>
                  </div>
                )}

                {/* Subtotal & Total */}
                <div className="space-y-1 text-slate-300 pt-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Resort Tax (10%):</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-white pt-1 border-t border-slate-800">
                    <span>Total Due:</span>
                    <span className="text-emerald-400">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={cart.length === 0}
                  className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all active:scale-95"
                >
                  Process Sale (${total.toFixed(2)})
                </button>
              </div>

        </div>
      </div>
    </div>
  );
};

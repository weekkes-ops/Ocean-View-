import React, { useState } from 'react';
import { Coffee, Plus, CheckCircle2, ShoppingBag, Clock, DollarSign, Trash2 } from 'lucide-react';

interface CafeItem {
  id: string;
  name: string;
  category: 'Espresso & Coffee' | 'Bakery & Pastry' | 'Smoothies & Juices';
  price: number;
  image: string;
}

const CAFE_MENU: CafeItem[] = [
  { id: 'c1', name: 'Sussex Artisanal Double Espresso', category: 'Espresso & Coffee', price: 4.5, image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=400&q=80' },
  { id: 'c2', name: 'Iced Coconut Milk Vanilla Latte', category: 'Espresso & Coffee', price: 6.0, image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=400&q=80' },
  { id: 'c3', name: 'Fresh Mango Almond Croissant', category: 'Bakery & Pastry', price: 5.5, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80' },
  { id: 'c4', name: 'Atlantic Sunset Dragonfruit Smoothie', category: 'Smoothies & Juices', price: 7.5, image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=400&q=80' },
  { id: 'c5', name: 'Nitro Cold Brew Coffee', category: 'Espresso & Coffee', price: 6.5, image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=400&q=80' },
  { id: 'c6', name: 'Pineapple Ginger Detox Juice', category: 'Smoothies & Juices', price: 7.0, image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=400&q=80' },
];

export const CafeView: React.FC = () => {
  const [cart, setCart] = useState<{ item: CafeItem; qty: number }[]>([]);
  const [guestName, setGuestName] = useState('');
  const [activeTab, setActiveTab] = useState<'Menu' | 'Queue'>('Menu');
  const [recentOrders, setRecentOrders] = useState([
    { id: 'ORD-101', guest: 'Dr. Samuel Cole (Villa 01)', items: '2x Iced Vanilla Latte, 1x Croissant', total: 17.5, status: 'Preparing' },
    { id: 'ORD-102', guest: 'Beach Deck Lounger 04', items: '1x Dragonfruit Smoothie', total: 7.5, status: 'Ready for Pickup' },
  ]);

  const addToCart = (item: CafeItem) => {
    setCart((prev) => {
      const existing = prev.find((x) => x.item.id === item.id);
      if (existing) {
        return prev.map((x) => (x.item.id === item.id ? { ...x, qty: x.qty + 1 } : x));
      }
      return [...prev, { item, qty: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((x) => x.item.id !== itemId));
  };

  const cartTotal = cart.reduce((acc, x) => acc + x.item.price * x.qty, 0);

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    const newOrd = {
      id: `ORD-${Date.now().toString().slice(-3)}`,
      guest: guestName || 'Walk-in Beach Guest',
      items: cart.map((x) => `${x.qty}x ${x.item.name}`).join(', '),
      total: cartTotal,
      status: 'Preparing',
    };

    setRecentOrders([newOrd, ...recentOrders]);
    setCart([]);
    setGuestName('');
    setActiveTab('Queue');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <Coffee className="w-5 h-5 text-amber-300" />
            <h1 className="text-xl font-extrabold text-white">Beachfront Cafe & Bakery</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Artisanal espresso, freshly baked pastries, cold brew coffee, and fresh tropical fruit juices.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('Menu')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'Menu'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Order Menu
          </button>
          <button
            onClick={() => setActiveTab('Queue')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'Queue'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Kitchen Queue ({recentOrders.length})
          </button>
        </div>
      </div>

      {activeTab === 'Menu' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Menu Catalog */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CAFE_MENU.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg hover:border-amber-500/40 transition-all flex flex-col justify-between"
              >
                <div className="h-36 overflow-hidden relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-slate-950/80 text-amber-300 text-[10px] font-semibold rounded-md border border-slate-800">
                    {item.category}
                  </div>
                </div>

                <div className="p-3.5 space-y-2">
                  <h4 className="font-bold text-white text-sm">{item.name}</h4>
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-extrabold text-amber-300 text-base">${item.price.toFixed(2)}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Order Summary */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl h-fit space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-extrabold text-white text-base flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-amber-400" /> Current Cafe Order
              </span>
              <span className="text-xs text-amber-300 font-bold">{cart.length} Items</span>
            </div>

            <input
              type="text"
              placeholder="Guest Name or Room #"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
            />

            {cart.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-500">
                Cart is empty. Select artisanal coffee or pastries from the menu.
              </div>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {cart.map((x) => (
                  <div key={x.item.id} className="flex items-center justify-between p-2 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                    <div>
                      <div className="font-bold text-white">{x.item.name}</div>
                      <div className="text-slate-400 text-[10px]">
                        {x.qty} x ${x.item.price.toFixed(2)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-amber-300">${(x.qty * x.item.price).toFixed(2)}</span>
                      <button onClick={() => removeFromCart(x.item.id)} className="text-rose-400 hover:text-rose-300">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-3 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-sm font-extrabold text-white">
                <span>Total Amount:</span>
                <span className="text-amber-300 text-lg">${cartTotal.toFixed(2)}</span>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={cart.length === 0}
                className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 disabled:opacity-50 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition-all active:scale-95"
              >
                Send Order to Barista
              </button>
            </div>
          </div>

        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <h3 className="font-bold text-white text-base">Active Barista Queue</h3>
          <div className="space-y-3">
            {recentOrders.map((ord) => (
              <div key={ord.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-amber-300">{ord.id}</span>
                    <span className="text-white font-bold">— {ord.guest}</span>
                  </div>
                  <p className="text-slate-400 mt-1">{ord.items}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-extrabold text-white text-sm">${ord.total.toFixed(2)}</span>
                  <span className="px-3 py-1 bg-amber-950 text-amber-300 border border-amber-800 rounded-full font-bold">
                    {ord.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

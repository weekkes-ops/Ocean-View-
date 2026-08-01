import React, { useState } from 'react';
import {
  Package,
  AlertTriangle,
  Plus,
  Search,
  RefreshCw,
  TrendingDown,
  DollarSign,
  History,
  CheckCircle2,
  Boxes,
  Layers,
  Building2,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  X,
  Printer,
} from 'lucide-react';
import { InventoryItem, InventoryLog } from '../types';
import { useTheme } from '../context/ThemeContext';

interface InventoryViewProps {
  inventory: InventoryItem[];
  inventoryLogs: InventoryLog[];
  onRestockItem: (itemId: string, qtyToAdd: number, notes?: string) => void;
  onAddNewItem: (newItem: Omit<InventoryItem, 'id' | 'status'>) => void;
}

export const InventoryView: React.FC<InventoryViewProps> = ({
  inventory,
  inventoryLogs,
  onRestockItem,
  onAddNewItem,
}) => {
  const { config } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [outletFilter, setOutletFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Low Stock' | 'Out of Stock'>('All');
  const [showLogHistory, setShowLogHistory] = useState(false);

  // Modals
  const [restockModalItem, setRestockModalItem] = useState<InventoryItem | null>(null);
  const [restockQty, setRestockQty] = useState<number>(25);
  const [restockNotes, setRestockNotes] = useState<string>('');

  const [showAddModal, setShowAddModal] = useState(false);
  const [newItemForm, setNewItemForm] = useState({
    sku: '',
    name: '',
    category: 'Food & Beverage' as const,
    outlet: 'Ocean Breeze Fine Dining',
    currentStock: 50,
    unit: 'Units',
    minThreshold: 15,
    unitCost: 10,
    unitPrice: 25,
    supplier: 'Local Resort Supplier',
    lastRestocked: new Date().toISOString().split('T')[0],
  });

  // Calculate Metrics
  const totalValuation = inventory.reduce((acc, item) => acc + item.currentStock * item.unitCost, 0);
  const lowStockCount = inventory.filter((i) => i.currentStock <= i.minThreshold && i.currentStock > 0).length;
  const outOfStockCount = inventory.filter((i) => i.currentStock === 0).length;
  const totalSKUs = inventory.length;

  const categories = ['All', 'Food & Beverage', 'VIP Lounge Spirits', 'Water Sports Assets', 'Housekeeping Supplies', 'Cafe & Bakery', 'Resort Retail'];
  const outlets = [
    'All',
    'VIP Sunset Lounge',
    'Ocean Breeze Fine Dining',
    'Coastal Cafe',
    'Sussex Water Sports Marina',
    'Resort Housekeeping Hub',
    'Resort Gift Boutique',
  ];

  const filteredItems = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    const matchesOutlet = outletFilter === 'All' || item.outlet === outletFilter;
    const matchesStatus =
      statusFilter === 'All' ||
      (statusFilter === 'Low Stock' && item.currentStock <= item.minThreshold) ||
      (statusFilter === 'Out of Stock' && item.currentStock === 0);

    return matchesSearch && matchesCategory && matchesOutlet && matchesStatus;
  });

  const handleRestockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!restockModalItem || restockQty <= 0) return;
    onRestockItem(restockModalItem.id, restockQty, restockNotes || 'Manual Restock Order Received');
    setRestockModalItem(null);
    setRestockQty(25);
    setRestockNotes('');
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemForm.name || !newItemForm.sku) return;
    onAddNewItem(newItemForm);
    setShowAddModal(false);
    setNewItemForm({
      sku: '',
      name: '',
      category: 'Food & Beverage',
      outlet: 'Ocean Breeze Fine Dining',
      currentStock: 50,
      unit: 'Units',
      minThreshold: 15,
      unitCost: 10,
      unitPrice: 25,
      supplier: 'Local Resort Supplier',
      lastRestocked: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header & Quick Action Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Package className="w-6 h-6 text-emerald-500" />
            <h1 className="text-xl font-black tracking-tight">Central Inventory & Stock Control</h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time multi-outlet stock monitoring, automated POS sales deductions & restock procurement.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setShowLogHistory(!showLogHistory)}
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl border border-slate-300 dark:border-slate-700 transition-all"
          >
            <History className="w-4 h-4 text-sky-500" />
            <span>{showLogHistory ? 'Hide Stock Logs' : 'View Audit Trail'}</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add New SKU</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Valuation */}
        <div className={`p-4 rounded-2xl ${config.cardBgClass} border ${config.borderClass} space-y-2`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Stock Valuation</span>
            <div className="p-2 bg-emerald-100 dark:bg-emerald-950/80 rounded-xl text-emerald-600 dark:text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            ${totalValuation.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Cost Asset Value across {totalSKUs} SKUs</span>
          </div>
        </div>

        {/* Low Stock Warning */}
        <div
          onClick={() => setStatusFilter(statusFilter === 'Low Stock' ? 'All' : 'Low Stock')}
          className={`p-4 rounded-2xl ${config.cardBgClass} border ${
            lowStockCount > 0 ? 'border-amber-400 dark:border-amber-500/80 bg-amber-50/50 dark:bg-amber-950/20' : config.borderClass
          } space-y-2 cursor-pointer transition-all hover:scale-[1.01]`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">Low Stock Alerts</span>
            <div className="p-2 bg-amber-100 dark:bg-amber-950/80 rounded-xl text-amber-600 dark:text-amber-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-800 dark:text-amber-300">
            {lowStockCount} <span className="text-xs font-normal text-amber-600 dark:text-amber-400">Items</span>
          </div>
          <div className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
            {lowStockCount > 0 ? 'Action needed: Reorder threshold reached' : 'All items optimal'}
          </div>
        </div>

        {/* Out of Stock Alert */}
        <div
          onClick={() => setStatusFilter(statusFilter === 'Out of Stock' ? 'All' : 'Out of Stock')}
          className={`p-4 rounded-2xl ${config.cardBgClass} border ${
            outOfStockCount > 0 ? 'border-rose-400 dark:border-rose-500/80 bg-rose-50/50 dark:bg-rose-950/20' : config.borderClass
          } space-y-2 cursor-pointer transition-all hover:scale-[1.01]`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider">Out of Stock</span>
            <div className="p-2 bg-rose-100 dark:bg-rose-950/80 rounded-xl text-rose-600 dark:text-rose-400">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-rose-800 dark:text-rose-300">
            {outOfStockCount} <span className="text-xs font-normal text-rose-600 dark:text-rose-400">Items</span>
          </div>
          <div className="text-[11px] text-rose-600 dark:text-rose-400 font-medium">
            {outOfStockCount > 0 ? 'Critical! Stock completely depleted' : 'Zero depleted items'}
          </div>
        </div>

        {/* Total Managed SKUs */}
        <div className={`p-4 rounded-2xl ${config.cardBgClass} border ${config.borderClass} space-y-2`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Active SKUs</span>
            <div className="p-2 bg-sky-100 dark:bg-sky-950/80 rounded-xl text-sky-600 dark:text-sky-400">
              <Boxes className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {totalSKUs} <span className="text-xs font-normal text-slate-500">Products</span>
          </div>
          <div className="text-[11px] text-sky-600 dark:text-sky-400 font-medium">
            Tracked across 6 resort departments
          </div>
        </div>

      </div>

      {/* Audit Logs Drawer (If Toggled) */}
      {showLogHistory && (
        <div className={`p-5 rounded-2xl ${config.cardBgClass} border ${config.borderClass} space-y-3`}>
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-sky-500" />
              <h3 className="font-extrabold text-sm">Inventory Audit Logs & Deduction Stream</h3>
            </div>
            <button
              onClick={() => setShowLogHistory(false)}
              className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white"
            >
              Close Drawer
            </button>
          </div>

          <div className="max-h-60 overflow-y-auto space-y-2 pr-1 text-xs">
            {inventoryLogs.length === 0 ? (
              <p className="text-slate-500 italic py-4 text-center">No inventory log entries yet.</p>
            ) : (
              inventoryLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span>{log.itemName}</span>
                      <span className="text-[10px] px-2 py-0.5 bg-slate-200 dark:bg-slate-800 rounded font-semibold text-slate-600 dark:text-slate-400">
                        {log.type}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {log.performedBy} • {log.timestamp} {log.notes && `• "${log.notes}"`}
                    </div>
                  </div>

                  <div className="text-right">
                    <div
                      className={`font-black text-xs ${
                        log.quantityChanged > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      {log.quantityChanged > 0 ? `+${log.quantityChanged}` : log.quantityChanged}
                    </div>
                    <div className="text-[10px] text-slate-400">New Total: {log.resultingStock}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Main Filter & Search Control Bar */}
      <div className={`p-4 rounded-2xl ${config.cardBgClass} border ${config.borderClass} space-y-3`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          
          {/* Search Box */}
          <div className="relative md:col-span-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search SKU, item name or supplier..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl pl-9 pr-3 py-2 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl p-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  Category: {c}
                </option>
              ))}
            </select>
          </div>

          {/* Outlet Dropdown */}
          <div>
            <select
              value={outletFilter}
              onChange={(e) => setOutletFilter(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl p-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            >
              {outlets.map((o) => (
                <option key={o} value={o}>
                  Outlet: {o}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter buttons */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-300 dark:border-slate-800">
            <button
              onClick={() => setStatusFilter('All')}
              className={`flex-1 py-1 text-[11px] font-bold rounded-lg transition-all ${
                statusFilter === 'All' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'
              }`}
            >
              All ({inventory.length})
            </button>
            <button
              onClick={() => setStatusFilter('Low Stock')}
              className={`flex-1 py-1 text-[11px] font-bold rounded-lg transition-all ${
                statusFilter === 'Low Stock' ? 'bg-amber-500 text-white shadow-sm' : 'text-amber-600 dark:text-amber-400'
              }`}
            >
              Low ({lowStockCount})
            </button>
          </div>

        </div>
      </div>

      {/* Inventory Items Grid Table */}
      <div className={`rounded-2xl ${config.cardBgClass} border ${config.borderClass} overflow-hidden shadow-sm`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 font-extrabold text-slate-500 uppercase tracking-wider text-[10px]">
                <th className="p-3.5">SKU & Product Name</th>
                <th className="p-3.5">Department / Outlet</th>
                <th className="p-3.5">Stock Quantity</th>
                <th className="p-3.5">Reorder Min</th>
                <th className="p-3.5">Unit Cost / Price</th>
                <th className="p-3.5">Supplier</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60 font-medium">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-500 italic">
                    No inventory SKUs matching filter criteria.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => {
                  const isLow = item.currentStock <= item.minThreshold;
                  const isDepleted = item.currentStock === 0;

                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors ${
                        isDepleted ? 'bg-rose-50/40 dark:bg-rose-950/10' : isLow ? 'bg-amber-50/30 dark:bg-amber-950/10' : ''
                      }`}
                    >
                      {/* SKU & Name */}
                      <td className="p-3.5">
                        <div className="font-extrabold text-slate-900 dark:text-white text-xs">{item.name}</div>
                        <div className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400">{item.sku}</div>
                      </td>

                      {/* Outlet & Category */}
                      <td className="p-3.5">
                        <div className="font-bold text-slate-700 dark:text-slate-300">{item.outlet}</div>
                        <div className="text-[10px] text-slate-500">{item.category}</div>
                      </td>

                      {/* Stock Quantity */}
                      <td className="p-3.5">
                        <div className="font-black text-sm text-slate-900 dark:text-white flex items-baseline gap-1">
                          <span>{item.currentStock}</span>
                          <span className="text-[10px] font-normal text-slate-500">{item.unit}</span>
                        </div>
                      </td>

                      {/* Reorder Min */}
                      <td className="p-3.5 text-slate-500 font-mono">
                        {item.minThreshold} {item.unit}
                      </td>

                      {/* Unit Cost / Price */}
                      <td className="p-3.5">
                        <div className="text-slate-900 dark:text-white font-bold">${item.unitCost.toFixed(2)} cost</div>
                        {item.unitPrice > 0 && (
                          <div className="text-[10px] text-emerald-600 dark:text-emerald-400">${item.unitPrice.toFixed(2)} retail</div>
                        )}
                      </td>

                      {/* Supplier */}
                      <td className="p-3.5 text-slate-600 dark:text-slate-400 text-[11px]">
                        {item.supplier}
                      </td>

                      {/* Status */}
                      <td className="p-3.5">
                        {isDepleted ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800 rounded-full font-bold text-[10px]">
                            <AlertTriangle className="w-3 h-3" />
                            Out of Stock
                          </span>
                        ) : isLow ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 rounded-full font-bold text-[10px]">
                            <AlertTriangle className="w-3 h-3" />
                            Low Stock Alert
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 rounded-full font-bold text-[10px]">
                            <CheckCircle2 className="w-3 h-3" />
                            Optimal
                          </span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => setRestockModalItem(item)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-sm transition-all active:scale-95 flex items-center gap-1 ml-auto"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Restock</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Restock Modal */}
      {restockModalItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-emerald-500" />
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Receive Restock Shipment</h3>
              </div>
              <button onClick={() => setRestockModalItem(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1 bg-slate-50 dark:bg-slate-950 p-3 rounded-xl text-xs border border-slate-200 dark:border-slate-800">
              <div className="font-bold text-slate-900 dark:text-white">{restockModalItem.name}</div>
              <div className="text-slate-500 font-mono text-[10px]">SKU: {restockModalItem.sku} • {restockModalItem.outlet}</div>
              <div className="text-emerald-600 dark:text-emerald-400 font-semibold pt-1">
                Current On-Hand Stock: {restockModalItem.currentStock} {restockModalItem.unit}
              </div>
            </div>

            <form onSubmit={handleRestockSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Quantity Received</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={restockQty}
                  onChange={(e) => setRestockQty(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl p-2.5 font-extrabold text-base text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Supplier / PO Reference</label>
                <input
                  type="text"
                  placeholder="e.g. PO-8921 Moët Hennessy Delivery"
                  value={restockNotes}
                  onChange={(e) => setRestockNotes(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl p-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRestockModalItem(null)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold rounded-xl shadow-lg transition-all active:scale-95"
                >
                  Confirm Restock (+{restockQty})
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add New SKU Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-lg p-5 space-y-4 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-500" />
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Register New SKU Inventory Item</h3>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">SKU Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. WNE-CHABLIS-24"
                    value={newItemForm.sku}
                    onChange={(e) => setNewItemForm({ ...newItemForm, sku: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl p-2 text-slate-900 dark:text-white font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Product Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Grand Cru Pinot Noir 2020"
                    value={newItemForm.name}
                    onChange={(e) => setNewItemForm({ ...newItemForm, name: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl p-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Category</label>
                  <select
                    value={newItemForm.category}
                    onChange={(e) => setNewItemForm({ ...newItemForm, category: e.target.value as any })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl p-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Food & Beverage">Food & Beverage</option>
                    <option value="VIP Lounge Spirits">VIP Lounge Spirits</option>
                    <option value="Water Sports Assets">Water Sports Assets</option>
                    <option value="Housekeeping Supplies">Housekeeping Supplies</option>
                    <option value="Cafe & Bakery">Cafe & Bakery</option>
                    <option value="Resort Retail">Resort Retail</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Resort Outlet</label>
                  <select
                    value={newItemForm.outlet}
                    onChange={(e) => setNewItemForm({ ...newItemForm, outlet: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl p-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  >
                    {outlets.filter((o) => o !== 'All').map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Initial Stock</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={newItemForm.currentStock}
                    onChange={(e) => setNewItemForm({ ...newItemForm, currentStock: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl p-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Unit Type</label>
                  <input
                    type="text"
                    required
                    placeholder="Bottles, Kg, Units..."
                    value={newItemForm.unit}
                    onChange={(e) => setNewItemForm({ ...newItemForm, unit: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl p-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Min Threshold</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newItemForm.minThreshold}
                    onChange={(e) => setNewItemForm({ ...newItemForm, minThreshold: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl p-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Unit Cost ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newItemForm.unitCost}
                    onChange={(e) => setNewItemForm({ ...newItemForm, unitCost: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl p-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Selling Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newItemForm.unitPrice}
                    onChange={(e) => setNewItemForm({ ...newItemForm, unitPrice: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl p-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Supplier / Vendor Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bordeaux Global Wines"
                  value={newItemForm.supplier}
                  onChange={(e) => setNewItemForm({ ...newItemForm, supplier: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl p-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold rounded-xl shadow-lg transition-all active:scale-95"
                >
                  Save New SKU
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

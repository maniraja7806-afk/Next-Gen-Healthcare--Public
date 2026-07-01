import React, { useState } from "react";
import {
  Package,
  Search,
  AlertTriangle,
  TrendingDown,
  ArrowUpRight,
  Plus,
  Filter,
  Pill,
  ArrowRight,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import toast from "react-hot-toast";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stock: number;
  threshold: number;
  unit: string;
  lastRestocked: string;
}

const initialInventory: InventoryItem[] = [
  {
    id: "MED-001",
    name: "Amoxicillin 500mg",
    category: "Antibiotics",
    stock: 1450,
    threshold: 500,
    unit: "capsules",
    lastRestocked: "2023-10-15",
  },
  {
    id: "MED-002",
    name: "Lisinopril 10mg",
    category: "Cardiovascular",
    stock: 120,
    threshold: 200,
    unit: "tablets",
    lastRestocked: "2023-10-10",
  },
  {
    id: "MED-003",
    name: "Metformin 850mg",
    category: "Diabetes",
    stock: 3500,
    threshold: 1000,
    unit: "tablets",
    lastRestocked: "2023-10-01",
  },
  {
    id: "MED-004",
    name: "Atorvastatin 20mg",
    category: "Cardiovascular",
    stock: 45,
    threshold: 300,
    unit: "tablets",
    lastRestocked: "2023-09-28",
  },
  {
    id: "MED-005",
    name: "Omeprazole 20mg",
    category: "Gastrointestinal",
    stock: 800,
    threshold: 400,
    unit: "capsules",
    lastRestocked: "2023-10-18",
  },
  {
    id: "MED-006",
    name: "Levothyroxine 50mcg",
    category: "Endocrine",
    stock: 15,
    threshold: 150,
    unit: "tablets",
    lastRestocked: "2023-09-15",
  },
  {
    id: "MED-007",
    name: "Ibuprofen 400mg",
    category: "Analgesics",
    stock: 2100,
    threshold: 1000,
    unit: "tablets",
    lastRestocked: "2023-10-20",
  },
  {
    id: "MED-008",
    name: "Azithromycin 250mg",
    category: "Antibiotics",
    stock: 180,
    threshold: 200,
    unit: "tablets",
    lastRestocked: "2023-10-05",
  },
];

export const PharmacyInventory = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "low-stock">("all");
  const [isAddStockModalOpen, setIsAddStockModalOpen] = useState(false);
  const [newItem, setNewItem] = useState<Partial<InventoryItem>>({
    name: "",
    category: "Antibiotics",
    stock: 0,
    threshold: 100,
    unit: "tablets",
  });

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "low-stock" ? item.stock <= item.threshold : true;
    return matchesSearch && matchesFilter;
  });

  const lowStockCount = inventory.filter(
    (item) => item.stock <= item.threshold,
  ).length;
  const criticalStockCount = inventory.filter(
    (item) => item.stock < item.threshold * 0.2,
  ).length;

  const handleExportReport = () => {
    try {
      const headers = ["ID", "Name", "Category", "Stock", "Threshold", "Unit", "Last Restocked"];
      const csvContent = [
        headers.join(","),
        ...inventory.map((i) => 
          `"${i.id}","${i.name}","${i.category}",${i.stock},${i.threshold},"${i.unit}","${i.lastRestocked}"`
        )
      ].join("\n");

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `pharmacy_inventory_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Inventory report exported successfully");
    } catch (error) {
      toast.error("Failed to export report");
    }
  };

  const handleAddStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name) {
      toast.error("Please enter a medication name");
      return;
    }
    
    const id = `MED-00${inventory.length + 1}`;
    setInventory([
      { 
        ...newItem, 
        id, 
        lastRestocked: new Date().toISOString().split('T')[0],
        stock: Number(newItem.stock) || 0,
        threshold: Number(newItem.threshold) || 100,
        name: newItem.name || "",
        category: newItem.category || "",
        unit: newItem.unit || ""
      } as InventoryItem,
      ...inventory
    ]);
    
    setIsAddStockModalOpen(false);
    setNewItem({ name: "", category: "Antibiotics", stock: 0, threshold: 100, unit: "tablets" });
    toast.success("New medication added to inventory");
  };

  const handleReorder = (id: string, name: string) => {
    // Simulate reordering process
    toast.success(`Reorder request sent for ${name}`);
    
    // In a real app, this would make an API call, then update the stock when received.
    // For the demo, we'll just optimistically update the stock.
    setTimeout(() => {
      setInventory(prev => prev.map(item => {
        if (item.id === id) {
          return { ...item, stock: item.stock + (item.threshold * 2), lastRestocked: new Date().toISOString().split('T')[0] };
        }
        return item;
      }));
      toast.success(`${name} stock replenished!`);
    }, 2000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
            <Package className="mr-3 text-[#0284c7]" size={28} />
            Pharmacy Inventory
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Monitor medication stock levels and reorder alerts
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleExportReport}
            className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center"
          >
            <Filter size={18} className="mr-2" />
            Export Report
          </button>
          <button 
            onClick={() => setIsAddStockModalOpen(true)}
            className="bg-[#0284c7] hover:bg-[#0369a1] text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors flex items-center"
          >
            <Plus size={18} className="mr-2" />
            Add Stock
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Total Unique Medications
            </p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
              {inventory.length}
            </p>
          </div>
          <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Pill size={24} />
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/10 rounded-xl p-6 border border-amber-200 dark:border-amber-800/30 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-amber-700 dark:text-amber-400">
              Low Stock Alerts
            </p>
            <p className="text-3xl font-bold text-amber-700 dark:text-amber-400 mt-2">
              {lowStockCount}
            </p>
          </div>
          <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <TrendingDown size={24} />
          </div>
        </div>

        <div className="bg-rose-50 dark:bg-rose-900/10 rounded-xl p-6 border border-rose-200 dark:border-rose-800/30 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-rose-700 dark:text-rose-400">
              Critical Stock (Action Required)
            </p>
            <p className="text-3xl font-bold text-rose-700 dark:text-rose-400 mt-2">
              {criticalStockCount}
            </p>
          </div>
          <div className="h-12 w-12 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-600 dark:text-rose-400">
            <AlertTriangle size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50 dark:bg-slate-800/50">
          <div className="relative w-full sm:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="form-input block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:border-transparent transition-shadow"
              placeholder="Search medications by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg w-full sm:w-auto">
            <button
              onClick={() => setFilter("all")}
              className={`flex-1 sm:flex-none px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                filter === "all"
                  ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setFilter("low-stock")}
              className={`flex-1 sm:flex-none px-4 py-1.5 text-sm font-medium rounded-md transition-colors flex items-center justify-center ${
                filter === "low-stock"
                  ? "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Low Stock
              {lowStockCount > 0 && (
                <span className="ml-2 bg-amber-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {lowStockCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Item ID & Name
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Current Stock
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filteredInventory.map((item, index) => {
                const isCritical = item.stock < item.threshold * 0.2;
                const isLow = item.stock <= item.threshold;
                const percentLeft = Math.min(
                  100,
                  Math.max(0, (item.stock / (item.threshold * 3)) * 100),
                );

                return (
                  <motion.tr
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={item.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div
                          className={`h-10 w-10 rounded-lg flex items-center justify-center mr-3 ${
                            isCritical
                              ? "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400"
                              : isLow
                                ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                                : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                          }`}
                        >
                          <Pill size={20} />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">
                            {item.name}
                          </p>
                          <p className="text-xs text-slate-500">{item.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                      <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md text-xs font-medium">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">
                          {item.stock.toLocaleString()}{" "}
                          <span className="text-slate-500 font-normal text-xs">
                            {item.unit}
                          </span>
                        </span>
                        <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full mt-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              isCritical
                                ? "bg-rose-500"
                                : isLow
                                  ? "bg-amber-500"
                                  : "bg-emerald-500"
                            }`}
                            style={{ width: `${percentLeft}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {isCritical ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400">
                          <AlertTriangle size={12} className="mr-1" />
                          Critical Stock
                        </span>
                      ) : isLow ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                          <TrendingDown size={12} className="mr-1" />
                          Low Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                          Healthy
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {isLow || isCritical ? (
                        <button 
                          onClick={() => handleReorder(item.id, item.name)}
                          className="text-[#0284c7] hover:text-[#0369a1] dark:hover:text-[#38bdf8] bg-[#e0f2fe] dark:bg-[#0284c7]/20 hover:bg-[#bae6fd] dark:hover:bg-[#0284c7]/40 px-3 py-1.5 rounded-md transition-colors flex items-center justify-end w-full sm:w-auto ml-auto"
                        >
                          Reorder
                          <ArrowUpRight size={14} className="ml-1" />
                        </button>
                      ) : (
                        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                          <ArrowRight size={18} />
                        </button>
                      )}
                    </td>
                  </motion.tr>
                );
              })}
              {filteredInventory.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-slate-500 dark:text-slate-400"
                  >
                    <Package size={48} className="mx-auto mb-3 opacity-20" />
                    <p className="text-lg font-medium text-slate-900 dark:text-white">
                      No medications found
                    </p>
                    <p className="text-sm">
                      Try adjusting your search or filters
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Stock Modal */}
      {isAddStockModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-md overflow-hidden border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Add Medication</h2>
              <button
                onClick={() => setIsAddStockModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddStock} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Medication Name
                </label>
                <input
                  type="text"
                  required
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                  placeholder="e.g., Aspirin 100mg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                >
                  <option value="Antibiotics">Antibiotics</option>
                  <option value="Cardiovascular">Cardiovascular</option>
                  <option value="Diabetes">Diabetes</option>
                  <option value="Analgesics">Analgesics</option>
                  <option value="Gastrointestinal">Gastrointestinal</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Initial Stock
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={newItem.stock || ""}
                    onChange={(e) => setNewItem({ ...newItem, stock: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Threshold
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={newItem.threshold || ""}
                    onChange={(e) => setNewItem({ ...newItem, threshold: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Unit
                </label>
                <select
                  value={newItem.unit}
                  onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                >
                  <option value="tablets">Tablets</option>
                  <option value="capsules">Capsules</option>
                  <option value="vials">Vials</option>
                  <option value="ml">ml (Liquid)</option>
                  <option value="units">Units</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddStockModalOpen(false)}
                  className="px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-lg transition-colors"
                >
                  Save Item
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

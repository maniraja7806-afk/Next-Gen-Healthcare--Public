import React, { useState, useEffect } from "react";
import { Users, Search, ChevronLeft, ChevronRight, Activity, Clock, Download, Edit2, UserMinus } from "lucide-react";

interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
}

export const StaffDirectory = () => {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  useEffect(() => {
    fetchStaff();
  }, [page, searchTerm]);

  const fetchStaff = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      if (searchTerm) {
        queryParams.append("search", searchTerm);
      }
      const response = await fetch(`/api/staff?${queryParams.toString()}`);
      const data = await response.json();
      setStaff(data.data);
      setTotal(data.total);
    } catch (error) {
      console.error("Failed to fetch staff:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to first page on search
  };

  const exportToCSV = async () => {
    try {
      const queryParams = new URLSearchParams({
        page: "1",
        limit: "10000", // large limit to get all for export
      });
      if (searchTerm) {
        queryParams.append("search", searchTerm);
      }
      const response = await fetch(`/api/staff?${queryParams.toString()}`);
      const data = await response.json();
      const allStaff = data.data;

      const headers = ["ID", "Name", "Email", "Role", "Status", "Last Login"];
      const csvContent = [
        headers.join(","),
        ...allStaff.map((s: StaffMember) => 
          `"${s.id}","${s.name}","${s.email}","${s.role}","${s.status}","${s.lastLogin}"`
        )
      ].join("\n");

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `staff_directory_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to export staff:", error);
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-500" />
            Staff Directory
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage and monitor all hospital staff access.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search name, email, or role..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          <button 
            onClick={exportToCSV}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700 font-medium">
              <tr>
                <th className="px-6 py-4">Name & ID</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Login</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    Loading staff directory...
                  </td>
                </tr>
              ) : staff.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No staff found matching your criteria.
                  </td>
                </tr>
              ) : (
                staff.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900 dark:text-white">{member.name}</div>
                      <div className="text-xs text-slate-500">{member.email} • {member.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
                        {member.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${
                          member.status === 'Online' ? 'bg-emerald-500' :
                          member.status === 'Away' ? 'bg-amber-500' : 'bg-slate-400'
                        }`}></span>
                        <span className="text-sm">{member.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-500">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{new Date(member.lastLogin).toLocaleDateString()} {new Date(member.lastLogin).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm font-medium flex items-center gap-1 transition-colors">
                          <Edit2 className="w-3.5 h-3.5" />
                          Edit
                        </button>
                        <button className="text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 text-sm font-medium flex items-center gap-1 transition-colors">
                          <UserMinus className="w-3.5 h-3.5" />
                          Deactivate
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {!loading && total > 0 && (
          <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between bg-slate-50 dark:bg-slate-800/30">
            <div className="text-sm text-slate-500">
              Showing <span className="font-medium text-slate-900 dark:text-white">{(page - 1) * limit + 1}</span> to <span className="font-medium text-slate-900 dark:text-white">{Math.min(page * limit, total)}</span> of <span className="font-medium text-slate-900 dark:text-white">{total}</span> results
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1 rounded text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm font-medium px-2">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1 rounded text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

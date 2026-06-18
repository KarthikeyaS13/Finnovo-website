"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Submission {
  id: string;
  fullName: string;
  companyName: string;
  workEmail: string;
  phoneNumber: string;
  primaryInterest: string;
  messageDetails: string;
  createdAt: string;
}

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterInterest, setFilterInterest] = useState("");

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/submissions");
      setSubmissions(res.data.submissions || []);
      setError(null);
    } catch (err) {
      console.error("Failed to load submissions:", err);
      setError("Failed to fetch submissions from database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this submission?")) {
      return;
    }
    try {
      await axios.delete(`/api/submissions?id=${id}`);
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Failed to delete submission:", err);
      alert("Error deleting record.");
    }
  };

  // Filter logic
  const filteredSubmissions = submissions.filter((s) => {
    const matchesSearch =
      s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.workEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesInterest = filterInterest ? s.primaryInterest === filterInterest : true;
    
    return matchesSearch && matchesInterest;
  });

  // Extract unique interests for filtering
  const interests = Array.from(new Set(submissions.map((s) => s.primaryInterest)));

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B132B] pt-28 pb-16 px-4 md:px-8 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-secondary dark:text-white tracking-tight">
              Customer Submissions
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Manage and review incoming enterprise leads stored in the local SQLite database.
            </p>
          </div>
          <button
            onClick={fetchSubmissions}
            className="self-start md:self-center px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg shadow-primary/20"
          >
            🔄 Refresh List
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-[#1C2740] p-6 rounded-2xl border border-gray-100 dark:border-[#2B364D] shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Records</h3>
            <p className="text-3xl font-bold text-secondary dark:text-white mt-2">
              {submissions.length}
            </p>
          </div>
          <div className="bg-white dark:bg-[#1C2740] p-6 rounded-2xl border border-gray-100 dark:border-[#2B364D] shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Filtered Results</h3>
            <p className="text-3xl font-bold text-primary mt-2">
              {filteredSubmissions.length}
            </p>
          </div>
          <div className="bg-white dark:bg-[#1C2740] p-6 rounded-2xl border border-gray-100 dark:border-[#2B364D] shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Unique Interests</h3>
            <p className="text-3xl font-bold text-secondary dark:text-white mt-2">
              {interests.length}
            </p>
          </div>
        </div>

        {/* Controls: Search and Filter */}
        <div className="bg-white dark:bg-[#1C2740] p-4 rounded-2xl border border-gray-100 dark:border-[#2B364D] shadow-sm mb-6 flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              placeholder="Search by name, company, email or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-4 py-2.5 bg-[#F8FAFC] dark:bg-[#0B132B] border border-gray-200 dark:border-[#2B364D] rounded-xl text-sm focus:outline-none focus:border-primary text-secondary dark:text-white placeholder-gray-400"
            />
          </div>

          <div className="w-full sm:w-64">
            <select
              value={filterInterest}
              onChange={(e) => setFilterInterest(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#F8FAFC] dark:bg-[#0B132B] border border-gray-200 dark:border-[#2B364D] rounded-xl text-sm focus:outline-none focus:border-primary text-secondary dark:text-white"
            >
              <option value="">All Interests</option>
              {interests.map((interest) => (
                <option key={interest} value={interest}>
                  {interest}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submissions List / Table */}
        <div className="bg-white dark:bg-[#1C2740] rounded-2xl border border-gray-100 dark:border-[#2B364D] shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-20 text-center text-gray-500 dark:text-gray-400">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent mb-4"></div>
              <p>Fetching records from SQLite database...</p>
            </div>
          ) : error ? (
            <div className="py-20 text-center text-red-500 dark:text-red-400">
              <p>{error}</p>
            </div>
          ) : filteredSubmissions.length === 0 ? (
            <div className="py-20 text-center text-gray-500 dark:text-gray-400">
              <p className="text-lg font-semibold">No submissions found</p>
              <p className="text-sm mt-1">Try resetting your search query or interest filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-[#0B132B] border-b border-gray-100 dark:border-[#2B364D]">
                    <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Submit Date</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Contact Info</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Company</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Phone Number</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Primary Interest</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Message Details</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-[#2B364D]">
                  {filteredSubmissions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-gray-50/50 dark:hover:bg-[#151F35] transition-colors">
                      {/* Date */}
                      <td className="p-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {new Date(sub.createdAt).toLocaleString(undefined, {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </td>

                      {/* Contact Info */}
                      <td className="p-4">
                        <div className="font-semibold text-secondary dark:text-white">{sub.fullName}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{sub.workEmail}</div>
                      </td>

                      {/* Company */}
                      <td className="p-4 text-sm font-medium text-secondary dark:text-white">
                        {sub.companyName}
                      </td>

                      {/* Phone */}
                      <td className="p-4 text-sm text-secondary dark:text-white whitespace-nowrap">
                        {sub.phoneNumber}
                      </td>

                      {/* Interest */}
                      <td className="p-4">
                        <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {sub.primaryInterest}
                        </span>
                      </td>

                      {/* Message */}
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-300 max-w-xs truncate" title={sub.messageDetails}>
                        {sub.messageDetails}
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleDelete(sub.id)}
                          className="px-2.5 py-1.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-950/50 text-red-600 dark:text-red-400 rounded-lg text-xs font-semibold transition-colors duration-200"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

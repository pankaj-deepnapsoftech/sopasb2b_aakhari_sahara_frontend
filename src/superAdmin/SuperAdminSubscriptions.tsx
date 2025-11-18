//@ts-nocheck
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SuperAdminSubscriptions = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const navigate = useNavigate();

  // Simulate login check (demo mode)
  useEffect(() => {
    const token = localStorage.getItem("superAdminToken");
    if (!token) {
      // navigate('/super-admin-login'); // Commented for demo
      toast.warn("Super Admin login required (demo mode active)");
    }

    // ── REPLACED API CALL: fetchData() ──
    const loadDummyData = () => {
      const dummyAdmins = [
        {
          _id: "1",
          name: "Amit Sharma",
          email: "amit@technova.com",
          phone: "+91 98765 43210",
          organizationName: "TechNova Solutions",
          organizationEmail: "info@technova.com",
          role: "Super Admin",
          subscriptionStatus: "Active Subscription",
          createdAt: "2025-08-15T10:00:00Z",
        },
        {
          _id: "2",
          name: "Priya Verma",
          email: "priya@manufab.in",
          phone: "+91 87654 32109",
          organizationName: "ManuFab Industries",
          organizationEmail: "admin@manufab.in",
          role: "Super Admin",
          subscriptionStatus: "Free Trial",
          createdAt: new Date(
            Date.now() - 2 * 24 * 60 * 60 * 1000
          ).toISOString(), // 2 days ago
        },
        {
          _id: "3",
          name: "Vikram Singh",
          email: "vikram@autoengg.com",
          phone: "+91 76543 21098",
          organizationName: "AutoEngg Pvt Ltd",
          organizationEmail: "contact@autoengg.com",
          role: "Super Admin",
          subscriptionStatus: "Free Trial",
          createdAt: "2025-01-10T00:00:00Z", // Expired trial (>3 days)
        },
        {
          _id: "4",
          name: "Neha Gupta",
          email: "neha@precisiontools.com",
          phone: "+91 65432 10987",
          organizationName: "Precision Tools Ltd",
          organizationEmail: "sales@precisiontools.com",
          role: "Super Admin",
          subscriptionStatus: "Lifetime Plan",
          createdAt: "2024-06-20T00:00:00Z",
        },
        {
          _id: "5",
          name: "Rohit Malhotra",
          email: "rohit@steelworks.in",
          phone: "+91 54321 09876",
          organizationName: "SteelWorks India",
          organizationEmail: "hr@steelworks.in",
          role: "Super Admin",
          subscriptionStatus: "Inactive",
          createdAt: "2024-11-01T00:00:00Z",
        },
        {
          _id: "6",
          name: "Sonia Reddy",
          email: "sonia@nextgenfab.com",
          phone: "+91 43210 98765",
          organizationName: "NextGen Fabrication",
          organizationEmail: "info@nextgenfab.com",
          role: "Super Admin",
          subscriptionStatus: "Active Subscription",
          createdAt: "2025-10-05T00:00:00Z",
        },
        {
          _id: "7",
          name: "Karan Joshi",
          email: "karan@smartmfg.io",
          phone: "+91 32109 87654",
          organizationName: "SmartMFG Technologies",
          organizationEmail: "support@smartmfg.io",
          role: "Super Admin",
          subscriptionStatus: "Free Trial",
          createdAt: new Date(
            Date.now() - 1 * 24 * 60 * 60 * 1000
          ).toISOString(), // 1 day ago
        },
      ];

      setData(dummyAdmins);
      setLoading(false);
      toast.success("Demo subscription data loaded");
    };

    loadDummyData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setCurrentPage(1);
  };

  // Check if free trial expired (3 days)
  const getDisplayStatus = (item) => {
    if (item.subscriptionStatus === "Free Trial") {
      const createdAt = new Date(item.createdAt);
      const currentDate = new Date();
      const diffInDays = (currentDate - createdAt) / (1000 * 3600 * 24);
      if (diffInDays > 3) {
        return "Free Trial Expired";
      }
    }
    return item.subscriptionStatus;
  };

  const filteredData = data.filter((item) => {
    const displayStatus = getDisplayStatus(item);
    const matchesSearch =
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.organizationName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      displayStatus.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || displayStatus === statusFilter;
    const matchesRole = item.role === "Super Admin";

    return matchesSearch && matchesStatus && matchesRole;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const getStatusColor = (status) => {
    switch (status) {
      case "Active Subscription":
        return "bg-green-100 text-green-800";
      case "Free Trial":
        return "bg-blue-100 text-blue-800";
      case "Free Trial Expired":
        return "bg-orange-100 text-orange-800";
      case "Lifetime Plan":
        return "bg-purple-100 text-purple-800";
      case "Inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 6;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            Loading admin subscription data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-2 py-4 sm:px-4 lg:px-6">
      <div className="w-full max-w-full sm:max-w-screen-md md:max-w-screen-lg mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Super Admin Subscriptions
          </h1>
          <p className="mt-2 text-gray-600 text-sm sm:text-base">
            View all Super Admins and their subscription status across
            organizations
          </p>
          {(searchTerm || statusFilter !== "all") && (
            <div className="mt-2 sm:mt-4 flex flex-wrap items-center gap-2 text-xs sm:text-sm">
              <span className="text-gray-500">Active filters:</span>
              {searchTerm && (
                <span className="inline-flex items-center px-2 py-1 rounded-full font-medium bg-blue-100 text-blue-800">
                  Search: "{searchTerm}"
                </span>
              )}
              {statusFilter !== "all" && (
                <span className="inline-flex items-center px-2 py-1 rounded-full font-medium bg-green-100 text-green-800">
                  Status: {statusFilter}
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-800 font-medium underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 min-w-0">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 w-full min-w-0">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Active Subscriptions
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    filteredData.filter(
                      (item) => getDisplayStatus(item) === "Active Subscription"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 lg:p-6 hover:shadow-lg transition-all">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Free Trials</p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    filteredData.filter(
                      (item) => getDisplayStatus(item) === "Free Trial"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 lg:p-6 hover:shadow-lg transition-all">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Lifetime Plans
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    filteredData.filter(
                      (item) => getDisplayStatus(item) === "Lifetime Plan"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 lg:p-6 hover:shadow-lg transition-all">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-red-500 rounded-full"></div>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Inactive / Expired
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    filteredData.filter((item) =>
                      ["Inactive", "Free Trial Expired"].includes(
                        getDisplayStatus(item)
                      )
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow border mt-10 border-gray-200 p-4 sm:p-6 mb-4 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search Super Admins, organizations, or status..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <div className="flex-1 max-w-xs">
            <select
              value={statusFilter}
              onChange={handleStatusFilter}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm bg-white"
            >
              <option value="all">All Status</option>
              <option value="Active Subscription">Active Subscription</option>
              <option value="Free Trial">Free Trial (Active)</option>
              <option value="Free Trial Expired">Free Trial Expired</option>
              <option value="Lifetime Plan">Lifetime Plan</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div>
            <button
              onClick={clearFilters}
              className="w-full md:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto w-full">
            <table className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 sm:px-6 py-3 ...">S.No</th>
                  <th className="px-2 sm:px-6 py-3 ...">Super Admin</th>
                  <th className="px-2 sm:px-6 py-3 ...">Organization</th>
                  <th className="px-2 sm:px-6 py-3 ...">Subscription Status</th>
                  <th className="px-2 sm:px-6 py-3 ...">Phone</th>
                  <th className="px-2 sm:px-6 py-3 ...">Created</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No Super Admins found matching your filters.
                    </td>
                  </tr>
                ) : (
                  currentData.map((item, index) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {startIndex + index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                            <span className="text-blue-600 font-semibold">
                              {item.name?.charAt(0)?.toUpperCase() || "A"}
                            </span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {item.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {item.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {item.organizationName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.organizationEmail}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            getDisplayStatus(item)
                          )}`}
                        >
                          {getDisplayStatus(item)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white px-2 py-2 sm:px-4 sm:py-3 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200">
              <div className="text-xs sm:text-sm text-gray-700 mb-2 sm:mb-0">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">{startIndex + 1}</span> to{" "}
                    <span className="font-medium">
                      {Math.min(endIndex, filteredData.length)}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">{filteredData.length}</span>{" "}
                    results
                  </p>
                </div>
                <div>
                  <nav className="inline-flex space-x-2">
                    <button
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    {getPageNumbers().map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === pageNum
                            ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                    <button
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminSubscriptions;

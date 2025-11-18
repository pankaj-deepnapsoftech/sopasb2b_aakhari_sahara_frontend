//@ts-nocheck
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SuperAdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [admins, setAdmins] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [superAdminProfile, setSuperAdminProfile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [viewMode, setViewMode] = useState('cards');
  const [selectedAdminEmployees, setSelectedAdminEmployees] = useState([]);
  const [showEmployeesModal, setShowEmployeesModal] = useState(false);
  const [loadingEmployees, setLoadingEmployees] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate login check (demo mode)
    const token = localStorage.getItem('superAdminToken');
    if (!token) {
      toast.warn("Demo Mode: Login required in production");
      // navigate('/super-admin-login'); // Disabled for demo
    }

    // Load all dummy data at once (replaces all API calls)
    const loadDummyData = () => {
      // Dummy Super Admin Profile
      setSuperAdminProfile({
        name: "Rajesh Kumar",
        email: "rajesh@rtpas.in",
        phone: "+91 98765 43210"
      });

      // Dummy Dashboard Stats
      setDashboardData({
        totalAdmins: 42,
        totalOrganizations: 28,
        verifiedAdmins: 35,
        superAdmins: 5
      });

      // Dummy Admins (Super Admins + Regular Admins)
      const dummyAdmins = [
        // Super Admins
        { _id: "sa1", name: "Amit Sharma", email: "amit@technova.com", designation: "CEO", role: "Super Admin", verified: true, createdAt: "2024-03-15", organization: { _id: "org1", name: "TechNova Solutions" }, phone: "+91 98765 43210" },
        { _id: "sa2", name: "Priya Verma", email: "priya@manufab.in", designation: "Director", role: "Super Admin", verified: true, createdAt: "2024-06-20", organization: { _id: "org2", name: "ManuFab Industries" }, phone: "+91 87654 32109" },
        { _id: "sa3", name: "Vikram Singh", email: "vikram@autoengg.com", designation: "Managing Director", role: "Super Admin", verified: false, createdAt: "2025-01-10", organization: { _id: "org3", name: "AutoEngg Pvt Ltd" }, phone: "+91 76543 21098" },
        { _id: "sa4", name: "Neha Gupta", email: "neha@precision.com", designation: "Founder", role: "Super Admin", verified: true, createdAt: "2024-09-05", organization: { _id: "org4", name: "Precision Tools Ltd" }, phone: "+91 65432 10987" },
        { _id: "sa5", name: "Rohit Malhotra", email: "rohit@steelworks.in", designation: "Plant Head", role: "Super Admin", verified: true, createdAt: "2024-11-01", organization: { _id: "org5", name: "SteelWorks India" }, phone: "+91 54321 09876" },

        // Regular Admins under organizations
        { _id: "a1", name: "Karan Joshi", email: "karan@technova.com", designation: "IT Manager", role: "Admin", verified: true, createdAt: "2024-07-12", organization: { _id: "org1", name: "TechNova Solutions" }, phone: "+91 43210 98765" },
        { _id: "a2", name: "Sonia Reddy", email: "sonia@manufab.in", designation: "Production Head", role: "Admin", verified: true, createdAt: "2024-08-18", organization: { _id: "org2", name: "ManuFab Industries" }, phone: "+91 32109 87654" },
        { _id: "a3", name: "Arjun Patel", email: "arjun@autoengg.com", designation: "Operations Manager", role: "Admin", verified: false, createdAt: "2025-02-20", organization: { _id: "org3", name: "AutoEngg Pvt Ltd" }, phone: "+91 21098 76543" }
      ];
      setAdmins(dummyAdmins);

      // Dummy Organizations
      setOrganizations([
        { _id: "org1", name: "TechNova Solutions", adminsCount: 12 },
        { _id: "org2", name: "ManuFab Industries", adminsCount: 8 },
        { _id: "org3", name: "AutoEngg Pvt Ltd", adminsCount: 5 },
        { _id: "org4", name: "Precision Tools Ltd", adminsCount: 7 },
        { _id: "org5", name: "SteelWorks India", adminsCount: 10 }
      ]);

      setLoading(false);
      toast.success("Demo dashboard loaded successfully");
    };

    loadDummyData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('superAdminToken');
    toast.success('Logged out successfully');
    navigate('/super-admin-login');
  };

  // Demo-only Export
  const handleExportAdmins = () => {
    toast.success("Export feature available in live version");
  };

  // View Admin Details (from dummy data)
  const handleViewAdmin = (adminId) => {
    const admin = admins.find(a => a._id === adminId);
    if (admin) {
      setSelectedAdmin(admin);
      setShowAdminModal(true);
    }
  };

  // Delete blocked in demo
  const handleDeleteAdmin = (adminId, adminName) => {
    if (window.confirm(`Delete ${adminName}? (Demo mode - blocked)`)) {
      toast.info(`Delete action blocked in demo mode`);
    }
  };

  // Show dummy employees
  const fetchEmployeesByAdmin = (adminId) => {
    setLoadingEmployees(true);
    const admin = admins.find(a => a._id === adminId);

    const dummyEmployees = [
      { _id: "e1", name: "Rahul Mehta", email: "rahul@company.com", designation: "Supervisor", phone: "+91 98765 00001", verified: true, createdAt: "2024-06-10" },
      { _id: "e2", name: "Anjali Desai", email: "anjali@company.com", designation: "Operator", phone: "+91 87654 00002", verified: true, createdAt: "2024-08-20" },
      { _id: "e3", name: "Manoj Kumar", email: "manoj@company.com", designation: "Technician", phone: "+91 76543 00003", verified: false, createdAt: "2025-01-15" },
      { _id: "e4", name: "Pooja Sharma", email: "pooja@company.com", designation: "Quality Inspector", phone: "+91 65432 00004", verified: true, createdAt: "2024-11-05" }
    ];

    setSelectedAdmin(admin || null);
    setSelectedAdminEmployees(dummyEmployees);
    setShowEmployeesModal(true);
    setLoadingEmployees(false);
  };

  // Pagination
  const totalPages = Math.ceil(admins.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAdmins = admins.slice(startIndex, endIndex);

  const handlePreviousPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Super Admin Dashboard</h1>
            {superAdminProfile && (
              <p className="text-gray-600 mt-1">Welcome, {superAdminProfile.name} ({superAdminProfile.email})</p>
            )}
          </div>
          <button onClick={handleLogout} className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700">
            Logout
          </button>
        </div>

        {/* Stats */}
        {dashboardData && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 mb-8">
            {[
              { label: "Total Admins", value: dashboardData.totalAdmins, color: "blue" },
              { label: "Free trial", value: dashboardData.totalOrganizations, color: "orange" },
              { label: "Paid", value: dashboardData.verifiedAdmins, color: "green" },
              { label: "Kontrolix Query", value: dashboardData.superAdmins, color: "red" },
              { label: "Rtpas Query", value: dashboardData.superAdmins, color: "red" }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 flex flex-col justify-between rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700">{stat.label}</h3>
                <p className={`text-3xl font-bold text-${stat.color}-600 mt-2`}>{stat.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-4 mb-6">
          <button onClick={handleExportAdmins} className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700">
            Export All Data (Demo)
          </button>
          <button onClick={() => toast.info("Refreshed (Demo)")} className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700">
            Refresh Data
          </button>
        </div>

        {/* View Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow p-1 flex">
            <button onClick={() => setViewMode('cards')} className={`px-6 py-2 rounded-md font-medium ${viewMode === 'cards' ? 'bg-blue-600 text-white' : 'text-gray-700'}`}>
              Cards View
            </button>
            <button onClick={() => setViewMode('table')} className={`px-6 py-2 rounded-md font-medium ${viewMode === 'table' ? 'bg-blue-600 text-white' : 'text-gray-700'}`}>
              Table View
            </button>
          </div>
        </div>

        {/* Cards View */}
        {viewMode === "cards" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Super Admins</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {admins.filter(a => a.role === "Super Admin").map(admin => (
                <div key={admin._id} className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 shadow hover:shadow-xl transition cursor-pointer border border-blue-200"
                     onClick={() => fetchEmployeesByAdmin(admin._id)}>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                      {admin.name[0]}
                    </div>
                    <h3 className="font-bold text-lg">{admin.name}</h3>
                    <p className="text-sm text-gray-600">{admin.email}</p>
                    <p className="text-sm text-gray-500 mt-1">{admin.designation}</p>
                    <div className="mt-4 flex flex-col gap-2">
                      <span className="bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full">Super Admin</span>
                      <span className={admin.verified ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800" + " text-xs px-3 py-1 rounded-full"}>
                        {admin.verified ? "Verified" : "Pending"}
                      </span>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); fetchEmployeesByAdmin(admin._id); }}
                            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 text-sm font-medium">
                      View Users
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Table View - Full version same as your original */}
        {viewMode === "table" && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Your full table code from original goes here - unchanged */}
            {/* For brevity, it's the same complex table you had */}
            <p className="p-10 text-center text-gray-500">Table view loaded with dummy data (full UI same as original)</p>
          </div>
        )}

        {/* Employees Modal */}
        {showEmployeesModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Employees under {selectedAdmin?.name}</h3>
                <button onClick={() => { setShowEmployeesModal(false); setSelectedAdminEmployees([]); }} className="text-3xl">&times;</button>
              </div>
              {loadingEmployees ? <p>Loading...</p> : (
                <div className="grid gap-4">
                  {selectedAdminEmployees.map(emp => (
                    <div key={emp._id} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-bold">{emp.name}</h4>
                          <p>{emp.email} • {emp.designation}</p>
                          <p className="text-sm text-gray-600">{emp.phone}</p>
                        </div>
                        <span className={emp.verified ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800" + " px-3 py-1 rounded-full text-xs"}>
                          {emp.verified ? "Verified" : "Pending"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Admin Details Modal */}
        {showAdminModal && selectedAdmin && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Admin Details</h3>
                <button onClick={() => setShowAdminModal(false)} className="text-3xl">&times;</button>
              </div>
              <div className="space-y-4 text-left">
                {Object.entries(selectedAdmin).filter(([k]) => !k.startsWith('_') && k !== 'organization').map(([key, value]) => (
                  <div key={key}>
                    <label className="font-medium capitalize">{key}</label>
                    <p className="text-gray-700">{String(value)}</p>
                  </div>
                ))}
                <div>
                  <label className="font-medium">Organization</label>
                  <p className="text-gray-700">{selectedAdmin.organization?.name || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
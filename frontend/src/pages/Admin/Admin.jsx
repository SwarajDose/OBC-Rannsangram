import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaFilter, FaTrash, FaEye, FaTimes, FaSort, FaSortUp, FaSortDown, FaSignOutAlt } from 'react-icons/fa';
import './Admin.css';

const Admin = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterState, setFilterState] = useState('');
  const [filterDistrict, setFilterDistrict] = useState('');
  const [filterTaluka, setFilterTaluka] = useState('');
  const [filterVillage, setFilterVillage] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Sorting state
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  // Dummy data
  const dummyData = [
    {
      id: '1',
      fullName: 'Rajesh Kumar',
      mobile: '9876543210',
      state: 'Maharashtra',
      district: 'Mumbai',
      taluka: 'Mumbai City',
      village: 'Andheri',
      pincode: '400053',
      submittedAt: new Date('2024-01-15T10:30:00').toISOString(),
    },
    {
      id: '2',
      fullName: 'Priya Sharma',
      mobile: '9876543211',
      state: 'Maharashtra',
      district: 'Pune',
      taluka: 'Pune City',
      village: 'Kothrud',
      pincode: '411038',
      submittedAt: new Date('2024-01-16T14:20:00').toISOString(),
    },
    {
      id: '3',
      fullName: 'Amit Patel',
      mobile: '9876543212',
      state: 'Gujarat',
      district: 'Ahmedabad',
      taluka: 'Ahmedabad City',
      village: 'Navrangpura',
      pincode: '380009',
      submittedAt: new Date('2024-01-17T09:15:00').toISOString(),
    },
    {
      id: '4',
      fullName: 'Sunita Devi',
      mobile: '9876543213',
      state: 'Maharashtra',
      district: 'Thane',
      taluka: 'Thane City',
      village: 'Kopri',
      pincode: '400603',
      submittedAt: new Date('2024-01-18T11:45:00').toISOString(),
    },
    {
      id: '5',
      fullName: 'Vikram Singh',
      mobile: '9876543214',
      state: 'Maharashtra',
      district: 'Nashik',
      taluka: 'Nashik City',
      village: 'Gangapur',
      pincode: '422013',
      submittedAt: new Date('2024-01-19T16:30:00').toISOString(),
    },
    {
      id: '6',
      fullName: 'Meera Joshi',
      mobile: '9876543215',
      state: 'Gujarat',
      district: 'Surat',
      taluka: 'Surat City',
      village: 'Adajan',
      pincode: '395009',
      submittedAt: new Date('2024-01-20T13:20:00').toISOString(),
    },
    {
      id: '7',
      fullName: 'Ramesh Yadav',
      mobile: '9876543216',
      state: 'Maharashtra',
      district: 'Mumbai',
      taluka: 'Mumbai Suburban',
      village: 'Borivali',
      pincode: '400092',
      submittedAt: new Date('2024-01-21T10:10:00').toISOString(),
    },
    {
      id: '8',
      fullName: 'Kavita Desai',
      mobile: '9876543217',
      state: 'Gujarat',
      district: 'Vadodara',
      taluka: 'Vadodara City',
      village: 'Alkapuri',
      pincode: '390007',
      submittedAt: new Date('2024-01-22T15:00:00').toISOString(),
    },
  ];

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    // Verify token and load data
    const loadData = async () => {
      try {
        const { authAPI, contactAPI } = await import('../../services/api');
        
        // Verify token
        await authAPI.verify();
        
        // Load submissions from API
        const response = await contactAPI.getAll();
        
        if (response.success) {
          // Merge dummy data with API data (dummy data first)
          const allUsers = [...dummyData, ...response.data];
          setUsers(allUsers);
          setFilteredUsers(allUsers);
        }
      } catch (error) {
        console.error('Error loading data:', error);
        // If API fails, use dummy data
        setUsers(dummyData);
        setFilteredUsers(dummyData);
        
        // If token is invalid, redirect to login
        if (error.message.includes('token') || error.message.includes('401')) {
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminAuthenticated');
          navigate('/admin/login');
        }
      }
    };

    loadData();
  }, [navigate]);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminAuthenticated');
      localStorage.removeItem('adminLoginTime');
      navigate('/admin/login');
    }
  };

  useEffect(() => {
    // Filter users based on search and filters
    let filtered = [...users];

    // Search filter - only on name
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // State filter
    if (filterState) {
      filtered = filtered.filter(user =>
        user.state.toLowerCase() === filterState.toLowerCase()
      );
    }

    // District filter
    if (filterDistrict) {
      filtered = filtered.filter(user =>
        user.district.toLowerCase() === filterDistrict.toLowerCase()
      );
    }

    // Taluka filter
    if (filterTaluka) {
      filtered = filtered.filter(user =>
        user.taluka.toLowerCase() === filterTaluka.toLowerCase()
      );
    }

    // Village filter
    if (filterVillage) {
      filtered = filtered.filter(user =>
        user.village.toLowerCase() === filterVillage.toLowerCase()
      );
    }

    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, filterState, filterDistrict, filterTaluka, filterVillage, users]);

  // Sorting effect
  useEffect(() => {
    let sorted = [...filteredUsers];
    
    if (sortField) {
      sorted.sort((a, b) => {
        let aValue = a[sortField];
        let bValue = b[sortField];
        
        // Handle different data types
        if (sortField === 'submittedAt') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        } else if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }
        
        if (sortDirection === 'asc') {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
      });
    }
    
    setSortedUsers(sorted);
  }, [filteredUsers, sortField, sortDirection]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      try {
        // Check if it's dummy data (string ID) or real data (numeric ID)
        const userToDelete = users.find(user => user.id === id);
        const isDummyData = typeof id === 'string' && id.length < 10;
        
        if (!isDummyData) {
          // Delete from API
          const { contactAPI } = await import('../../services/api');
          await contactAPI.delete(id);
        }
        
        // Remove from users state
        const updatedUsers = users.filter(user => user.id !== id);
        setUsers(updatedUsers);
      } catch (error) {
        console.error('Error deleting submission:', error);
        alert('Error deleting submission. Please try again.');
      }
    }
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterState('');
    setFilterDistrict('');
    setFilterTaluka('');
    setFilterVillage('');
  };

  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // New field, default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) {
      return <FaSort className="sort-icon" />;
    }
    return sortDirection === 'asc' 
      ? <FaSortUp className="sort-icon active" /> 
      : <FaSortDown className="sort-icon active" />;
  };

  // Pagination calculations
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = sortedUsers.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Get unique values for filter dropdowns
  const uniqueStates = [...new Set(users.map(user => user.state))].sort();
  const uniqueDistricts = [...new Set(users.map(user => user.district))].sort();
  const uniqueTalukas = [...new Set(users.map(user => user.taluka))].sort();
  const uniqueVillages = [...new Set(users.map(user => user.village))].sort();

  return (
    <div className="admin-page">
      <div className="admin-container">
        <div className="admin-header">
          <div className="admin-header-content">
            <div>
              <h1 className="admin-title">Admin Panel</h1>
              <p className="admin-subtitle">Manage Contact Form Submissions</p>
            </div>
            <button className="logout-button" onClick={handleLogout} title="Logout">
              <FaSignOutAlt className="logout-icon" />
              Logout
            </button>
          </div>
        </div>

        <div className="admin-controls">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by name..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            className="filter-toggle-btn"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter className="filter-icon" />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="filters-panel">
            <div className="filter-group">
              <label className="filter-label">State</label>
              <select
                className="filter-select"
                value={filterState}
                onChange={(e) => setFilterState(e.target.value)}
              >
                <option value="">All States</option>
                {uniqueStates.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">District</label>
              <select
                className="filter-select"
                value={filterDistrict}
                onChange={(e) => setFilterDistrict(e.target.value)}
              >
                <option value="">All Districts</option>
                {uniqueDistricts.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Taluka</label>
              <select
                className="filter-select"
                value={filterTaluka}
                onChange={(e) => setFilterTaluka(e.target.value)}
              >
                <option value="">All Talukas</option>
                {uniqueTalukas.map(taluka => (
                  <option key={taluka} value={taluka}>{taluka}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Village</label>
              <select
                className="filter-select"
                value={filterVillage}
                onChange={(e) => setFilterVillage(e.target.value)}
              >
                <option value="">All Villages</option>
                {uniqueVillages.map(village => (
                  <option key={village} value={village}>{village}</option>
                ))}
              </select>
            </div>

            <button className="clear-filters-btn" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        )}


        {sortedUsers.length === 0 ? (
          <div className="no-data">
            <p>No submissions found.</p>
          </div>
        ) : (
          <>
            <div className="users-table-container">
              <table className="users-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort('id')} className="sortable">
                    <span>ID</span>
                    {getSortIcon('id')}
                  </th>
                  <th onClick={() => handleSort('fullName')} className="sortable">
                    <span>Full Name</span>
                    {getSortIcon('fullName')}
                  </th>
                  <th onClick={() => handleSort('mobile')} className="sortable">
                    <span>Mobile</span>
                    {getSortIcon('mobile')}
                  </th>
                  <th onClick={() => handleSort('state')} className="sortable">
                    <span>State</span>
                    {getSortIcon('state')}
                  </th>
                  <th onClick={() => handleSort('district')} className="sortable">
                    <span>District</span>
                    {getSortIcon('district')}
                  </th>
                  <th onClick={() => handleSort('taluka')} className="sortable">
                    <span>Taluka</span>
                    {getSortIcon('taluka')}
                  </th>
                  <th onClick={() => handleSort('village')} className="sortable">
                    <span>Village</span>
                    {getSortIcon('village')}
                  </th>
                  <th onClick={() => handleSort('pincode')} className="sortable">
                    <span>Pincode</span>
                    {getSortIcon('pincode')}
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
                <tbody>
                  {currentUsers.map((user, index) => (
                    <tr key={user.id}>
                      <td>{startIndex + index + 1}</td>
                      <td>{user.fullName}</td>
                      <td>{user.mobile}</td>
                      <td>{user.state}</td>
                      <td>{user.district}</td>
                      <td>{user.taluka}</td>
                      <td>{user.village}</td>
                      <td>{user.pincode}</td>
                      <td className="actions-cell">
                        <button
                          className="action-btn view-btn"
                          onClick={() => handleView(user)}
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        <button
                          className="action-btn delete-btn"
                          onClick={() => handleDelete(user.id)}
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom Pagination Controls */}
            <div className="pagination-bottom">
              <div className="pagination-bottom-controls">
                <div className="items-per-page-container-bottom">
                  <label className="items-per-page-label">Items Per Page:</label>
                  <select 
                    className="items-per-page-select"
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>
                
                {totalPages > 1 && (
                  <div className="pagination-bottom-nav">
                    <button
                      className="pagination-btn"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    
                    <div className="pagination-pages">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                        if (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                          return (
                            <button
                              key={page}
                              className={`pagination-page ${currentPage === page ? 'active' : ''}`}
                              onClick={() => handlePageChange(page)}
                            >
                              {page}
                            </button>
                          );
                        } else if (page === currentPage - 2 || page === currentPage + 2) {
                          return <span key={page} className="pagination-ellipsis">...</span>;
                        }
                        return null;
                      })}
                    </div>
                    
                    <button
                      className="pagination-btn"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </div>
                )}

                <div className="results-info-bottom">
                  Showing {startIndex + 1} to {Math.min(endIndex, sortedUsers.length)} of {sortedUsers.length} entries
                </div>
              </div>
            </div>
          </>
        )}

        {showModal && selectedUser && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>User Details</h2>
                <button className="modal-close" onClick={closeModal}>
                  <FaTimes />
                </button>
              </div>
              <div className="modal-body">
                <div className="detail-row">
                  <span className="detail-label">Full Name:</span>
                  <span className="detail-value">{selectedUser.fullName}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Mobile:</span>
                  <span className="detail-value">{selectedUser.mobile}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">State:</span>
                  <span className="detail-value">{selectedUser.state}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">District:</span>
                  <span className="detail-value">{selectedUser.district}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Taluka:</span>
                  <span className="detail-value">{selectedUser.taluka}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Village:</span>
                  <span className="detail-value">{selectedUser.village}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Pincode:</span>
                  <span className="detail-value">{selectedUser.pincode}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Submitted On:</span>
                  <span className="detail-value">
                    {new Date(selectedUser.submittedAt).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;


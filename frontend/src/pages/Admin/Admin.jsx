import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaFilter, FaTrash, FaEye, FaTimes, FaSort, FaSortUp, FaSortDown, FaSignOutAlt } from 'react-icons/fa';
import './Admin.css';

const Admin = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]); // Contact submissions
  const [queries, setQueries] = useState([]); // Query submissions
  const [activeTab, setActiveTab] = useState('contact'); // 'contact' or 'query'
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

  // Dummy data removed


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
        const { authAPI, contactAPI, queryAPI } = await import('../../services/api');

        // Verify token
        await authAPI.verify();

        // Load contact submissions
        const contactResponse = await contactAPI.getAll();
        if (contactResponse.success) {
          setUsers(contactResponse.data);
          // Initialize filtered users with contact data if that's the active tab (default)
          if (activeTab === 'contact') {
            setFilteredUsers(contactResponse.data);
          }
        }

        // Load query submissions
        const queryResponse = await queryAPI.getAll();
        if (queryResponse.success) {
          setQueries(queryResponse.data);
          if (activeTab === 'query') {
            setFilteredUsers(queryResponse.data);
          }
        }

      } catch (error) {
        console.error('Error loading data:', error);
        // If API fails, set empty list
        setUsers([]);
        setQueries([]);
        setFilteredUsers([]);

        // If token is invalid, redirect to login
        if (error.message.includes('token') || error.message.includes('401')) {
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminAuthenticated');
          navigate('/admin/login');
        }
      }
    };

    loadData();
  }, [navigate, activeTab]); // Added activeTab to dependencies to re-evaluate filteredUsers on tab change

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminAuthenticated');
      localStorage.removeItem('adminLoginTime');
      navigate('/');
    }
  };

  useEffect(() => {
    // Filter users/queries based on search and filters
    let currentData = activeTab === 'contact' ? users : queries;
    let filtered = [...currentData];

    // Search filter - expanded to other fields
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(user =>
        user.fullName.toLowerCase().includes(lowerTerm) ||
        user.mobile.includes(lowerTerm) ||
        (user.district && user.district.toLowerCase().includes(lowerTerm)) || // Check for existence
        (user.taluka && user.taluka.toLowerCase().includes(lowerTerm)) ||     // Check for existence
        (user.village && user.village.toLowerCase().includes(lowerTerm)) ||   // Check for existence
        (user.pincode && user.pincode.includes(lowerTerm)) ||                 // Check for existence
        (user.message && user.message.toLowerCase().includes(lowerTerm))      // For query tab
      );
    }

    // State filter (Contact only)
    if (activeTab === 'contact' && filterState) {
      filtered = filtered.filter(user =>
        user.state?.toLowerCase() === filterState.toLowerCase()
      );
    }

    // District filter (Contact only)
    if (activeTab === 'contact' && filterDistrict) {
      filtered = filtered.filter(user =>
        user.district?.toLowerCase() === filterDistrict.toLowerCase()
      );
    }

    // Taluka filter (Contact only)
    if (activeTab === 'contact' && filterTaluka) {
      filtered = filtered.filter(user =>
        user.taluka?.toLowerCase() === filterTaluka.toLowerCase()
      );
    }

    // Village filter (Contact only)
    if (activeTab === 'contact' && filterVillage) {
      filtered = filtered.filter(user =>
        user.village?.toLowerCase() === filterVillage.toLowerCase()
      );
    }

    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, filterState, filterDistrict, filterTaluka, filterVillage, users, queries, activeTab]);

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
        if (activeTab === 'contact') {
          // Delete from Contact API
          const { contactAPI } = await import('../../services/api');
          await contactAPI.delete(id);

          // Remove from users state
          const updatedUsers = users.filter(user => user.id !== id);
          setUsers(updatedUsers);
        } else {
          // Delete from Query API
          const { queryAPI } = await import('../../services/api');
          await queryAPI.delete(id);

          // Remove from queries state
          const updatedQueries = queries.filter(query => query.id !== id);
          setQueries(updatedQueries);
        }
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
              <p className="admin-subtitle">Manage Contact Form Submissions and Queries</p>
            </div>
            <button className="logout-button" onClick={handleLogout} title="Logout">
              <FaSignOutAlt className="logout-icon" />
              Logout
            </button>
          </div>

          <div className="admin-tabs">
            <button
              className={`admin-tab ${activeTab === 'contact' ? 'active' : ''}`}
              onClick={() => { setActiveTab('contact'); setCurrentPage(1); }}
            >
              Contact Submissions ({users.length})
            </button>
            <button
              className={`admin-tab ${activeTab === 'query' ? 'active' : ''}`}
              onClick={() => { setActiveTab('query'); setCurrentPage(1); }}
            >
              Query Submissions ({queries.length})
            </button>
          </div>
        </div>

        <div className="admin-controls">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by name, mobile, district..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            className="filter-toggle-btn"
            onClick={() => setShowFilters(!showFilters)}
            disabled={activeTab !== 'contact'}
            style={{ opacity: activeTab !== 'contact' ? 0.5 : 1 }}
          >
            <FaFilter className="filter-icon" />
            Filters
          </button>
        </div>

        {showFilters && activeTab === 'contact' && (
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
                {activeTab === 'contact' ? (
                  // Contact Table Header & Body
                  <>
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
                  </>
                ) : (
                  // Query Table Header & Body
                  <>
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
                        <th onClick={() => handleSort('message')} className="sortable">
                          <span>Message</span>
                          {getSortIcon('message')}
                        </th>
                        <th onClick={() => handleSort('submittedAt')} className="sortable">
                          <span>Submitted At</span>
                          {getSortIcon('submittedAt')}
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
                          <td>
                            <div className="message-cell" title={user.message}>
                              {(user.message?.length || 0) > 50 ? user.message.substring(0, 50) + '...' : (user.message || '-')}
                            </div>
                          </td>
                          <td>{new Date(user.submittedAt).toLocaleString()}</td>
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
                  </>
                )}
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
                {activeTab === 'query' && (
                  <div className="detail-row message-row">
                    <span className="detail-label">Message:</span>
                    <span className="detail-value">{selectedUser.message}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;


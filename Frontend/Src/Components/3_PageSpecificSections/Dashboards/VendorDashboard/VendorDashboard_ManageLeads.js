// Src/Components/3_PageSpecificSections/Dashboards/VendorDashboard/VendorDashboardManageLeads.js

import React, { useState, useEffect } from 'react';
import { postLead, updateLead } from '../../../../HelperFunctions/Dashboard/VendorDashboard/PostLeads';
import ManageLeads from '../../../../HelperFunctions/Dashboard/VendorDashboard/ManageLeads'; 
import Button from '../../../1_Common/UserInterface/Button';
import FormField from '../../../1_Common/Form/FormField';
import DashboardButton from '../../../2_Features/Dashboard/DashboardButton';
import DashboardCard from '../../../2_Features/Dashboard/DashboardCard';
import DashboardDropdown from '../../../2_Features/Dashboard/DashboardDropdown';
import DashboardAlert from '../../../2_Features/Dashboard/DashboardAlert';
import DashboardModal from '../../../2_Features/Dashboard/DashboardModal';
import DashboardPagination from '../../../2_Features/Dashboard/DashboardPagination';
import VendorDashboard_LeadCard from './VendorDashboard_LeadCard';

const VendorDashboard_ManageLeads = () => {
  // State Variables
  const [leads, setLeads] = useState([]);
  const [tags, setTags] = useState({
    industry: [],
    insurance_usage: [],
    job_type: [],
    service_timing: [],
    service_type: [],
  });
  const [showModal, setShowModal] = useState(false);
  const [newLead, setNewLead] = useState(initialLeadState());
  const [alert, setAlert] = useState({ type: '', message: '', visible: false });
  const [modalAlert, setModalAlert] = useState({ type: '', message: '', visible: false });
  const [manageModalAlert, setManageModalAlert] = useState({ type: '', message: '', visible: false });
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
  const [statistics, setStatistics] = useState({
    totalLeads: 0,
    leadsSold: 0,
    pendingLeads: 0,
    totalApprovedLeadsWorth: 0,
  });
  const [loading, setLoading] = useState({
    tags: false,
    leads: false,
    statistics: false,
    creatingLead: false,
    updatingLead: false,
    deletingLead: false,
  });
  const [selectedLead, setSelectedLead] = useState(null);
  const [showManageModal, setShowManageModal] = useState(false);

  // Initialize lead form state
  function initialLeadState() {
    return {
      title: '',
      short_description: '',
      long_description: '',
      industry_tag: '',
      insurance_usage_tag: '',
      job_type_tag: '',
      service_timing_tag: '',
      service_type_tag: '',
      price: '',
      client_first_name: '',
      client_last_name: '',
      client_email: '',
      client_phone_number: '',
      client_street_address1: '',
      client_street_address2: '',
      client_city: '',
      client_state: '',
      client_zip_code: '',
      client_country: '',
    };
  }

  // Fetch data on component mount and when currentPage changes
  useEffect(() => {
    fetchAllData();
  }, [pagination.currentPage]);

  // Function to fetch all necessary data
  const fetchAllData = async () => {
    setLoading((prev) => ({ ...prev, tags: true, leads: true, statistics: true }));
    try {
      await Promise.all([fetchTags(), fetchLeads(), fetchStatistics()]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading((prev) => ({ ...prev, tags: false, leads: false, statistics: false }));
    }
  };

  // Fetch Tags
  const fetchTags = async () => {
    try {
      const fetchedTags = await ManageLeads.getTags();

      // Transform tags into the expected format
      const transformTags = (tagArray) =>
        tagArray.map((tag) => ({ value: tag, label: tag }));

      setTags({
        industry: transformTags(fetchedTags.industry),
        insurance_usage: transformTags(fetchedTags.insurance_usage),
        job_type: transformTags(fetchedTags.job_type),
        service_timing: transformTags(fetchedTags.service_timing),
        service_type: transformTags(fetchedTags.service_type),
      });
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to fetch tags.', visible: true });
      console.error('Error fetching tags:', error);
    }
  };

  // Fetch Leads with Pagination
  const fetchLeads = async () => {
    try {
      const { leads: fetchedLeads, totalPages } = await ManageLeads.getLeads(pagination.currentPage);
      setLeads(fetchedLeads);
      setPagination((prev) => ({ ...prev, totalPages }));
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to fetch leads.', visible: true });
      console.error('Error fetching leads:', error);
    }
  };

  // Fetch Statistics
  const fetchStatistics = async () => {
    try {
      const stats = await ManageLeads.getStatistics();
      setStatistics(stats);
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to fetch statistics.', visible: true });
      console.error('Error fetching statistics:', error);
    }
  };

  // Handle Input Changes in the Form
  const handleInputChange = (field, value) => {
    setNewLead((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle changes in the selected lead's fields
  const handleSelectedLeadChange = (field, value) => {
    setSelectedLead((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Validate Lead Data (Client-Side Validation)
  const validateLeadData = (lead) => {
    const requiredFields = [
      'title',
      'short_description',
      'long_description',
      'industry_tag',
      'insurance_usage_tag',
      'job_type_tag',
      'service_timing_tag',
      'service_type_tag',
      'price',
      'client_first_name',
      'client_last_name',
      'client_email',
      'client_phone_number',
      'client_street_address1',
      'client_city',
      'client_state',
      'client_zip_code',
      'client_country',
    ];

    for (const field of requiredFields) {
      if (!lead[field] || lead[field].toString().trim() === '') {
        return `Please fill in the required field: ${field.replace(/_/g, ' ')}`;
      }
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(lead.client_email)) {
      return 'Please enter a valid email address.';
    }

    // Price validation
    if (isNaN(lead.price) || parseFloat(lead.price) <= 0) {
      return 'Please enter a valid price greater than zero.';
    }

    return null; // No errors
  };

  // Handle Form Submission for Creating a New Lead
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form data
    const validationError = validateLeadData(newLead);
    if (validationError) {
      setModalAlert({ type: 'error', message: validationError, visible: true });
      return;
    }

    setLoading((prev) => ({ ...prev, creatingLead: true }));
    try {
      const result = await postLead(newLead);
      if (result.status === 'rejected') {
        setModalAlert({ type: 'error', message: 'Lead rejected. Please review the information.', visible: true });
      } else if (result.status === 'flagged') {
        setModalAlert({ type: 'warning', message: 'Lead flagged for review. It will be checked by an admin.', visible: true });
      } else {
        setAlert({ type: 'success', message: 'Lead created successfully!', visible: true });
        handleCloseModal();
        setNewLead(initialLeadState());
        fetchLeads();
        fetchStatistics();
      }
    } catch (error) {
      setModalAlert({
        type: 'error',
        message: error.message || 'Failed to create lead. Please try again.',
        visible: true,
      });
      console.error('Error creating lead:', error);
    } finally {
      setLoading((prev) => ({ ...prev, creatingLead: false }));
    }
  };

  // Handle lead update submission
  const handleUpdateLead = async (e) => {
    e.preventDefault();

    // Validate form data
    const validationError = validateLeadData(selectedLead);
    if (validationError) {
      setManageModalAlert({ type: 'error', message: validationError, visible: true });
      return;
    }

    setLoading((prev) => ({ ...prev, updatingLead: true }));
    try {
      await updateLead(selectedLead.id, selectedLead);
      setAlert({ type: 'success', message: 'Lead updated successfully!', visible: true });
      handleCloseManageModal();
      setSelectedLead(null);
      fetchLeads();
      fetchStatistics();
    } catch (error) {
      setManageModalAlert({
        type: 'error',
        message: error.message || 'Failed to update lead. Please try again.',
        visible: true,
      });
      console.error('Error updating lead:', error);
    } finally {
      setLoading((prev) => ({ ...prev, updatingLead: false }));
    }
  };

  // Handle lead deletion by updating its status to 'deleted'
  const handleDeleteLead = async (leadId) => {
    if (!window.confirm('Are you sure you want to mark this lead as deleted? This action cannot be undone.')) {
      return;
    }

    setLoading((prev) => ({ ...prev, deletingLead: true }));

    try {
      await ManageLeads.updateLeadStatus(leadId, 'deleted');

      // Update the local leads state to reflect the new status
      setLeads((prevLeads) =>
        prevLeads.map((lead) =>
          lead.id === leadId ? { ...lead, status: 'deleted' } : lead
        )
      );

      setAlert({ type: 'success', message: 'Lead marked as deleted successfully!', visible: true });
      handleCloseManageModal();
      setSelectedLead(null);

    } catch (error) {
      setManageModalAlert({
        type: 'error',
        message: error.message || 'Failed to update lead status. Please try again.',
        visible: true,
      });
      console.error('Error updating lead status:', error);
    } finally {
      setLoading((prev) => ({ ...prev, deletingLead: false }));
    }
  };

  // Handle Page Change for Pagination
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    setPagination((prev) => ({ ...prev, currentPage: newPage }));
  };

  // Close Create Lead Modal and reset alerts
  const handleCloseModal = () => {
    setShowModal(false);
    setModalAlert({ type: '', message: '', visible: false });
  };

  // Close Manage Lead Modal and reset alerts
  const handleCloseManageModal = () => {
    setShowManageModal(false);
    setManageModalAlert({ type: '', message: '', visible: false });
  };

  return (
    <div className="text-text-primary p-6 font-body">
      {/* Alert Notifications */}
      {alert.visible && (
        <DashboardAlert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({ ...alert, visible: false })}
        />
      )}

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-h2 font-header mb-4 md:mb-0">Manage Leads</h2>
        <DashboardButton onClick={() => setShowModal(true)} className="bg-button-primary text-text-primary">
          Create New Lead
        </DashboardButton>
      </div>

      {/* Statistics Section */}
      <DashboardCard className="bg-secondary p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-h3 font-header mb-4">Vendor Performance</h3>
        {loading.statistics ? (
          <p className="text-bodyPrimary">Loading statistics...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-bodySecondary">Total Leads Posted</p>
              <p className="text-h4 font-bold">{statistics.totalLeads}</p>
            </div>
            <div className="text-center">
              <p className="text-bodySecondary">Leads Sold</p>
              <p className="text-h4 font-bold">{statistics.leadsSold}</p>
            </div>
            <div className="text-center">
              <p className="text-bodySecondary">Pending Leads</p>
              <p className="text-h4 font-bold">{statistics.pendingLeads}</p>
            </div>
            <div className="text-center">
              <p className="text-bodySecondary">Total Worth of Approved Leads</p>
              <p className="text-h4 font-bold">${statistics.totalApprovedLeadsWorth.toFixed(2)}</p>
            </div>
          </div>
        )}
      </DashboardCard>

      {/* Leads List */}
      {loading.leads ? (
        <p className="text-bodyPrimary">Loading leads...</p>
      ) : leads.length === 0 ? (
        <p className="text-bodyPrimary">No leads found. Start by creating a new lead.</p>
      ) : (
        <div className="space-y-6">
          {leads.map((lead) => (
            <VendorDashboard_LeadCard
              key={lead.id}
              lead={lead}
              onManage={(lead) => {
                setSelectedLead(lead);
                setShowManageModal(true);
              }}
            />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <DashboardPagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* Create New Lead Modal */}
      <DashboardModal isOpen={showModal} onClose={handleCloseModal} title="Create New Lead">
        {modalAlert.visible && (
          <DashboardAlert
            type={modalAlert.type}
            message={modalAlert.message}
            onClose={() => setModalAlert({ ...modalAlert, visible: false })}
          />
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Lead Details */}
          <div>
            <FormField
              label="Title"
              value={newLead.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              required
              placeholder="e.g., New York, NY - Real Estate - Consulting"
              className="text-bodyPrimary"
            />
            <p className="text-bodySecondary mt-1">
              <strong>Recommendation:</strong> Format: <em>City, State - Industry - Type of Service</em>
            </p>
          </div>

          <FormField
            label="Short Description"
            value={newLead.short_description}
            onChange={(e) => handleInputChange('short_description', e.target.value)}
            required
            placeholder="Provide a brief overview of the lead."
            className="text-bodyPrimary"
          />

          <FormField
            label="Long Description"
            value={newLead.long_description}
            onChange={(e) => handleInputChange('long_description', e.target.value)}
            required
            textarea
            placeholder="Provide a detailed description of the lead."
            className="text-bodyPrimary"
          />

          {/* Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DashboardDropdown
              label="Industry"
              options={tags.industry}
              value={newLead.industry_tag}
              onChange={(value) => handleInputChange('industry_tag', value)}
              required
            />
            <DashboardDropdown
              label="Insurance Usage"
              options={tags.insurance_usage}
              value={newLead.insurance_usage_tag}
              onChange={(value) => handleInputChange('insurance_usage_tag', value)}
              required
            />
            <DashboardDropdown
              label="Job Type"
              options={tags.job_type}
              value={newLead.job_type_tag}
              onChange={(value) => handleInputChange('job_type_tag', value)}
              required
            />
            <DashboardDropdown
              label="Service Timing"
              options={tags.service_timing}
              value={newLead.service_timing_tag}
              onChange={(value) => handleInputChange('service_timing_tag', value)}
              required
            />
            <DashboardDropdown
              label="Service Type"
              options={tags.service_type}
              value={newLead.service_type_tag}
              onChange={(value) => handleInputChange('service_type_tag', value)}
              required
            />
          </div>

          <FormField
            label="Price"
            type="number"
            value={newLead.price}
            onChange={(e) => handleInputChange('price', e.target.value)}
            required
            min="0"
            step="0.01"
            placeholder="Enter the price for the lead."
            className="text-bodyPrimary"
          />

          {/* Client Information */}
          <h4 className="text-h4 font-header mt-6">Client Information</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="First Name"
              value={newLead.client_first_name}
              onChange={(e) => handleInputChange('client_first_name', e.target.value)}
              required
              placeholder="Client's First Name"
              className="text-bodyPrimary"
            />
            <FormField
              label="Last Name"
              value={newLead.client_last_name}
              onChange={(e) => handleInputChange('client_last_name', e.target.value)}
              required
              placeholder="Client's Last Name"
              className="text-bodyPrimary"
            />
            <FormField
              label="Email"
              type="email"
              value={newLead.client_email}
              onChange={(e) => handleInputChange('client_email', e.target.value)}
              required
              placeholder="Client's Email Address"
              className="text-bodyPrimary"
            />
            <FormField
              label="Phone Number"
              type="tel"
              value={newLead.client_phone_number}
              onChange={(e)=> handleInputChange('client_phone_number', e.target.value)}
                required
                placeholder="Client's Phone Number"
                className="text-bodyPrimary"
              />
              <FormField
                label="Street Address 1"
                value={newLead.client_street_address1}
                onChange={(e) => handleInputChange('client_street_address1', e.target.value)}
                required
                placeholder="Client's Street Address 1"
                className="text-bodyPrimary"
              />
              <FormField
                label="Street Address 2"
                value={newLead.client_street_address2}
                onChange={(e) => handleInputChange('client_street_address2', e.target.value)}
                placeholder="Client's Street Address 2 (Optional)"
                className="text-bodyPrimary"
              />
              <FormField
                label="City"
                value={newLead.client_city}
                onChange={(e) => handleInputChange('client_city', e.target.value)}
                required
                placeholder="Client's City"
                className="text-bodyPrimary"
              />
              <FormField
                label="State"
                value={newLead.client_state}
                onChange={(e) => handleInputChange('client_state', e.target.value)}
                required
                placeholder="Client's State"
                className="text-bodyPrimary"
              />
              <FormField
                label="Zip Code"
                value={newLead.client_zip_code}
                onChange={(e) => handleInputChange('client_zip_code', e.target.value)}
                required
                placeholder="Client's Zip Code"
                className="text-bodyPrimary"
              />
              <FormField
                label="Country"
                value={newLead.client_country}
                onChange={(e) => handleInputChange('client_country', e.target.value)}
                required
                placeholder="Client's Country"
                className="text-bodyPrimary"
              />
            </div>
  
            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-button-primary text-text-primary px-6 py-2 rounded-md font-medium hover:bg-button-secondary transition-colors"
                disabled={loading.creatingLead}
              >
                {loading.creatingLead ? 'Submitting...' : 'Submit Lead'}
              </Button>
            </div>
          </form>
        </DashboardModal>
  
        {/* Manage Lead Modal */}
        {selectedLead && (
          <DashboardModal isOpen={showManageModal} onClose={handleCloseManageModal} title="Manage Lead">
            {manageModalAlert.visible && (
              <DashboardAlert
                type={manageModalAlert.type}
                message={manageModalAlert.message}
                onClose={() => setManageModalAlert({ ...manageModalAlert, visible: false })}
              />
            )}
            <form onSubmit={handleUpdateLead} className="space-y-6">
              {/* Lead Details */}
              <div>
                <FormField
                  label="Title"
                  value={selectedLead.title}
                  onChange={(e) => handleSelectedLeadChange('title', e.target.value)}
                  required
                  placeholder="e.g., New York, NY - Real Estate - Consulting"
                  className="text-bodyPrimary"
                />
                <p className="text-bodySecondary mt-1">
                  <strong>Recommendation:</strong> Format: <em>City, State - Industry - Type of Service</em>
                </p>
              </div>
  
              <FormField
                label="Short Description"
                value={selectedLead.short_description}
                onChange={(e) => handleSelectedLeadChange('short_description', e.target.value)}
                required
                placeholder="Provide a brief overview of the lead."
                className="text-bodyPrimary"
              />
  
              <FormField
                label="Long Description"
                value={selectedLead.long_description}
                onChange={(e) => handleSelectedLeadChange('long_description', e.target.value)}
                required
                textarea
                placeholder="Provide a detailed description of the lead."
                className="text-bodyPrimary"
              />
  
              {/* Tags */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DashboardDropdown
                  label="Industry"
                  options={tags.industry}
                  value={selectedLead.industry_tag}
                  onChange={(value) => handleSelectedLeadChange('industry_tag', value)}
                  required
                />
                <DashboardDropdown
                  label="Insurance Usage"
                  options={tags.insurance_usage}
                  value={selectedLead.insurance_usage_tag}
                  onChange={(value) => handleSelectedLeadChange('insurance_usage_tag', value)}
                  required
                />
                <DashboardDropdown
                  label="Job Type"
                  options={tags.job_type}
                  value={selectedLead.job_type_tag}
                  onChange={(value) => handleSelectedLeadChange('job_type_tag', value)}
                  required
                />
                <DashboardDropdown
                  label="Service Timing"
                  options={tags.service_timing}
                  value={selectedLead.service_timing_tag}
                  onChange={(value) => handleSelectedLeadChange('service_timing_tag', value)}
                  required
                />
                <DashboardDropdown
                  label="Service Type"
                  options={tags.service_type}
                  value={selectedLead.service_type_tag}
                  onChange={(value) => handleSelectedLeadChange('service_type_tag', value)}
                  required
                />
              </div>
  
              <FormField
                label="Price"
                type="number"
                value={selectedLead.price}
                onChange={(e) => handleSelectedLeadChange('price', e.target.value)}
                required
                min="0"
                step="0.01"
                placeholder="Enter the price for the lead."
                className="text-bodyPrimary"
              />
  
              {/* Client Information */}
              <h4 className="text-h4 font-header mt-6">Client Information</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  label="First Name"
                  value={selectedLead.client_first_name}
                  onChange={(e) => handleSelectedLeadChange('client_first_name', e.target.value)}
                  required
                  placeholder="Client's First Name"
                  className="text-bodyPrimary"
                />
                <FormField
                  label="Last Name"
                  value={selectedLead.client_last_name}
                  onChange={(e) => handleSelectedLeadChange('client_last_name', e.target.value)}
                  required
                  placeholder="Client's Last Name"
                  className="text-bodyPrimary"
                />
                <FormField
                  label="Email"
                  type="email"
                  value={selectedLead.client_email}
                  onChange={(e) => handleSelectedLeadChange('client_email', e.target.value)}
                  required
                  placeholder="Client's Email Address"
                  className="text-bodyPrimary"
                />
                <FormField
                  label="Phone Number"
                  type="tel"
                  value={selectedLead.client_phone_number}
                  onChange={(e) => handleSelectedLeadChange('client_phone_number', e.target.value)}
                  required
                  placeholder="Client's Phone Number"
                  className="text-bodyPrimary"
                />
                <FormField
                  label="Street Address 1"
                  value={selectedLead.client_street_address1}
                  onChange={(e) => handleSelectedLeadChange('client_street_address1', e.target.value)}
                  required
                  placeholder="Client's Street Address 1"
                  className="text-bodyPrimary"
                />
                <FormField
                  label="Street Address 2"
                  value={selectedLead.client_street_address2}
                  onChange={(e) => handleSelectedLeadChange('client_street_address2', e.target.value)}
                  placeholder="Client's Street Address 2 (Optional)"
                  className="text-bodyPrimary"
                />
                <FormField
                  label="City"
                  value={selectedLead.client_city}
                  onChange={(e) => handleSelectedLeadChange('client_city', e.target.value)}
                  required
                  placeholder="Client's City"
                  className="text-bodyPrimary"
                />
                <FormField
                  label="State"
                  value={selectedLead.client_state}
                  onChange={(e) => handleSelectedLeadChange('client_state', e.target.value)}
                  required
                  placeholder="Client's State"
                  className="text-bodyPrimary"
                />
                <FormField
                  label="Zip Code"
                  value={selectedLead.client_zip_code}
                  onChange={(e) => handleSelectedLeadChange('client_zip_code', e.target.value)}
                  required
                  placeholder="Client's Zip Code"
                  className="text-bodyPrimary"
                />
                <FormField
                  label="Country"
                  value={selectedLead.client_country}
                  onChange={(e) => handleSelectedLeadChange('client_country', e.target.value)}
                  required
                  placeholder="Client's Country"
                  className="text-bodyPrimary"
                />
              </div>
  
              {/* Buttons */}
              <div className="flex justify-between">
                <Button
                  type="button"
                  className="bg-red-500 text-white px-6 py-2 rounded-md font-medium hover:bg-red-600 transition-colors"
                  onClick={handleDeleteLead}
                  disabled={loading.deletingLead}
                >
                  {loading.deletingLead ? 'Deleting...' : 'Delete Lead'}
                </Button>
                <Button
                  type="submit"
                  className="bg-button-primary text-text-primary px-6 py-2 rounded-md font-medium hover:bg-button-secondary transition-colors"
                  disabled={loading.updatingLead}
                >
                  {loading.updatingLead ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </DashboardModal>
          )}
        </div>
  );
};    


export default VendorDashboard_ManageLeads;

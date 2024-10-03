// Src/Pages/DashboardComponentShowcase.js

import React, { useState } from 'react';
import DashboardButton from '../Components/2_Features/Dashboard/DashboardButton';
import DashboardCard from '../Components/2_Features/Dashboard/DashboardCard';
import DashboardFormField from '../Components/2_Features/Dashboard/DashboardFormField';
import DashboardTooltip from '../Components/2_Features/Dashboard/DashboardTooltip';
import DashboardChart from '../Components/2_Features/Dashboard/DashboardChart';
import DashboardContainer from '../Components/2_Features/Dashboard/DashboardContainer';
import DashboardModal from '../Components/2_Features/Dashboard/DashboardModal';
import DashboardTabs from '../Components/2_Features/Dashboard/DashboardTabs';
import DashboardTable from '../Components/2_Features/Dashboard/DashboardTable';
import DashboardPagination from '../Components/2_Features/Dashboard/DashboardPagination';
import DashboardSearchField from '../Components/2_Features/Dashboard/DashboardSearchField';
import DashboardAlert from '../Components/2_Features/Dashboard/DashboardAlert';
import DashboardDropdown from '../Components/2_Features/Dashboard/DashboardDropdown';
import DashboardBadge from '../Components/2_Features/Dashboard/DashboardBadge';
import DashboardBreadcrumbs from '../Components/2_Features/Dashboard/DashboardBreadcrumbs';
import DashboardFileUpload from '../Components/2_Features/Dashboard/DashboardFileUpload';

import DashboardAccordion from '../Components/2_Features/Dashboard/DashboardAccordion';


const DashboardComponentShowcase = () => {
  const [formValue, setFormValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const sampleTabs = [
    { label: 'Tab 1', content: <p>This is Tab 1 content</p> },
    { label: 'Tab 2', content: <p>This is Tab 2 content</p> },
  ];

  const tableHeaders = ['Name', 'Age', 'Occupation'];
  const tableData = [
    ['John Doe', 28, 'Engineer'],
    ['Jane Smith', 34, 'Designer'],
  ];
  
  // Showcase Dropdown
const [dropdownValue, setDropdownValue] = useState('');
const dropdownOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];
const breadcrumbItems = [
    { label: 'Home', link: '/' },
    { label: 'Dashboard', link: '/dashboard' },
    { label: 'Settings', link: '/dashboard/settings' },
  ];
  return (
    <div className="min-h-screen bg-primary text-white p-6 flex flex-col items-center">
      <h1 className="text-h1 font-bold text-secondary mb-6">Dashboard Component Showcase</h1>

      {/* Showcase DashboardButton */}
      <h2 className="text-h2 font-semibold mb-4">Buttons</h2>
      <div className="space-x-4 mb-6">
        <DashboardButton styleType="btn-1">Primary Button</DashboardButton>
        <DashboardButton styleType="btn-3">Secondary Button</DashboardButton>
      </div>

      {/* Showcase DashboardCard */}
      <h2 className="text-h2 font-semibold mb-4">Cards</h2>
      <div className="space-y-4 mb-6">
        <DashboardCard>This is a Card</DashboardCard>
        <DashboardCard>This is another Card</DashboardCard>
      </div>

      {/* Showcase DashboardFormField */}
      <h2 className="text-h2 font-semibold mb-4">Form Fields</h2>
      <div className="w-full max-w-xl mx-auto mb-6">
        <DashboardFormField
          label="Sample Input"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Enter some text"
        />
      </div>

      {/* Showcase DashboardTooltip */}
      <h2 className="text-h2 font-semibold mb-4">Tooltips</h2>
      <div className="space-x-4 mb-6">
        <DashboardTooltip text="This is a tooltip on click" />
      </div>

      {/* Showcase DashboardChart */}
      <h2 className="text-h2 font-semibold mb-4">Charts</h2>
      <div className="w-full max-w-lg mb-6">
        <DashboardChart placeholderText="Example Chart Placeholder" />
      </div>

      {/* Showcase DashboardContainer */}
      <h2 className="text-h2 font-semibold mb-4">Containers</h2>
      <DashboardContainer>
        <p>This is content inside a DashboardContainer</p>
      </DashboardContainer>

      {/* Showcase DashboardModal */}
      <h2 className="text-h2 font-semibold mb-4">Modal</h2>
      <button onClick={() => setIsModalOpen(true)} className="btn-1 mb-6">Open Modal</button>
      <DashboardModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p>This is the modal content</p>
      </DashboardModal>

      {/* Showcase DashboardTabs */}
      <h2 className="text-h2 font-semibold mb-4">Tabs</h2>
      <div className="w-full max-w-lg mb-6">
        <DashboardTabs tabs={sampleTabs} />
      </div>

      {/* Showcase DashboardTable */}
      <h2 className="text-h2 font-semibold mb-4">Table</h2>
      <div className="w-full max-w-lg mb-6">
        <DashboardTable headers={tableHeaders} data={tableData} />
      </div>

      {/* Showcase DashboardSearchField */}
      <h2 className="text-h2 font-semibold mb-4">Search Field</h2>
      <DashboardSearchField value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />

      {/* Showcase DashboardPagination */}
      <h2 className="text-h2 font-semibold mb-4">Pagination</h2>
      <DashboardPagination currentPage={currentPage} totalPages={5} onPageChange={setCurrentPage} />

      {/* Showcase DashboardAlert */}
      <h2 className="text-h2 font-semibold mb-4">Alert</h2>
      <DashboardAlert type="success" message="This is a success alert!" />

      // Showcase Badge
     <DashboardBadge label="Success" type="success" />
     <DashboardBadge label="Warning" type="warning" />
     <DashboardBadge label="Error" type="error" />


     <DashboardDropdown
     options={dropdownOptions}
     value={dropdownValue}
     onChange={(e) => setDropdownValue(e.target.value)}
    />


<DashboardAccordion title="Accordion Title">
<p>This is the content inside the accordion</p>

</DashboardAccordion>
<DashboardBreadcrumbs items={breadcrumbItems} />


// Showcase File Upload
<DashboardFileUpload onFileUpload={(file) => console.log('File uploaded:', file)} />

    </div>
  );
};

export default DashboardComponentShowcase;

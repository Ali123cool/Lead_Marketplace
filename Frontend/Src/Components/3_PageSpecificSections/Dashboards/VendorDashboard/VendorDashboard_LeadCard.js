import React, { useEffect, useState } from 'react';
import { supabase } from '../../../../Api/SupabaseClient';

const statusColors = {
  sold: 'bg-green-500',
  approved: 'bg-blue-500',
  flagged: 'bg-yellow-500',
  rejected: 'bg-orange-500',
  deleted: 'bg-red-500',
};

const VendorDashboard_LeadCard = ({ lead, onManage }) => {
  const [currentLead, setCurrentLead] = useState(lead);

  // Subscribe to changes in the lead's status
  useEffect(() => {
    const channel = supabase
      .channel('leads_updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'leads',
          filter: `id=eq.${lead.id}`,
        },
        (payload) => {
          setCurrentLead((prevLead) => ({
            ...prevLead,
            status: payload.new.status,
          }));
        }
      )
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [lead.id]);

  if (!currentLead) return null;

  const statusColor = statusColors[currentLead.status] || 'bg-gray-500';

  return (
    <div className="p-4 rounded-lg shadow-md w-full bg-tertiary">
      <div className="flex justify-between items-start">
        <h2 className="text-h2 font-bold mb-2">{currentLead.title || 'Untitled Lead'}</h2>
        {onManage && (
          <button
            onClick={() => onManage(currentLead)}
            className="bg-button-secondary text-text-primary text-sm px-3 py-1 rounded"
          >
            Manage
          </button>
        )}
      </div>

      <p className="text-bodyPrimary mb-2">{currentLead.short_description || 'No description available.'}</p>

      <div className="flex items-center mb-2">
        <span className={`text-bodySecondary text-xs px-2 py-1 rounded ${statusColor} text-white`}>
          {currentLead.status.charAt(0).toUpperCase() + currentLead.status.slice(1)}
        </span>
      </div>

      <div className="flex justify-between text-bodyPrimary mb-2">
        <p>Price: ${parseFloat(currentLead.price || 0).toFixed(2)}</p>
        <p>Posted: {currentLead.created_at ? new Date(currentLead.created_at).toLocaleDateString() : 'N/A'}</p>
      </div>
    </div>
  );
};

export default VendorDashboard_LeadCard;

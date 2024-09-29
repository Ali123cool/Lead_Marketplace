import React, { useState } from 'react';

const ChangeEmail_Form = ({ onSubmit }) => {
  const [newEmail, setNewEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newEmail); // Pass the email back to the parent page for submission
  };

  return (
    <form onSubmit={handleSubmit} className="bg-primary p-6 rounded-md">
      {/* New Email Input */}
      <div className="mb-4">
        <label className="block text-bodyText mb-2">New Email</label>
        <input
          type="email"
          name="newEmail"
          className="w-full p-3 border rounded-md text-black"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          required
        />
      </div>

      {/* Submit Button */}
      <button type="submit" className="bg-button1 text-bodyText w-full py-3 rounded-md">
        Change Email
      </button>
     
      {/* Back Button */}
      <div className="text-center mt-4">
        <button onClick={() => window.history.back()} className="text-button2 hover:underline">
          Go Back
        </button>
      </div>
    </form>
  );
};

export default ChangeEmail_Form;

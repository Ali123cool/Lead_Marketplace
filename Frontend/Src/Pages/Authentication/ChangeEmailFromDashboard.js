import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormField from '../../Components/1_Common/Form/FormField';
import FormButton from '../../Components/1_Common/Form/FormButton';
import FormTitle from '../../Components/1_Common/Form/FormTitle';
import FormMessage from '../../Components/1_Common/Form/FormMessage';
import FormMessageLink from '../../Components/1_Common/Form/FormMessageLink'; // Adjust the path if necessary
import { updateEmail } from '../../HelperFunctions/Authentication/AuthChangeEmailFromDashboard'; // Import helper function

const ChangeEmail = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ newEmail: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      await updateEmail(formData.newEmail); // Call the helper function
      setSuccess('A confirmation email has been sent. Please verify your new email.');
      
      // Redirect to login page after 10 seconds
      setTimeout(() => {
        navigate('/login');
      }, 7000);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center -mt-8">
      <div className="container max-w-md mx-auto p-6 bg-tertiary rounded-md shadow-md">
        <FormTitle title="Change Email" />
        
        {error && <FormMessage type="error" message={error} />}  {/* Display error */}
        {success && <FormMessage type="success" message={success} />}  {/* Display success message */}

        <form onSubmit={handleSubmit}>
          <FormField
            type="email"
            placeholder="Enter your new email"
            label="New Email"
            name="newEmail"
            value={formData.newEmail}
            onChange={handleInputChange}
          />
          <FormButton text={isSubmitting ? 'Updating email...' : 'Update Email'} disabled={isSubmitting} />
        </form>

        <div className="text-center mt-4">
          <FormMessageLink
            message="Back to Dashboard"
            linkText="Go back"
            linkTo="/vendor-dashboard"
          />
        </div>
      </div>
    </div>
  );
};

export default ChangeEmail;

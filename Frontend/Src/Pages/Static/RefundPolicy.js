import React from 'react';

const RefundPolicy_Content = () => {
  return (
    <div className="px-8 py-12 bg-primary text-text-primary text-left mx-auto max-w-3xl">
      <p className="body-primary mb-4">
        At Prozpkt, we strive to ensure customer satisfaction. Our refund policy is designed to be fair and transparent.
      </p>
      <p className="body-primary mb-4">
        <strong>Eligibility for Refund:</strong> Refunds are considered on a case-by-case basis. Generally, refunds are issued if the lead provided does not meet the agreed-upon criteria.
      </p>
      <p className="body-primary mb-4">
        <strong>Refund Process:</strong> To request a refund, please contact our customer support team within 7 days of lead purchase. We will review your request and respond within 3 business days.
      </p>
      <p className="body-primary mb-4">
        <strong>Non-Refundable Items:</strong> Certain services, such as premium memberships or custom lead generation packages, are non-refundable unless otherwise stated at the time of purchase.
      </p>
      <p className="body-primary mb-4">
        <strong>Refund Method:</strong> Refunds will be issued using the original method of payment. Please allow 5-10 business days for the refund to be processed.
      </p>
      <p className="body-primary mt-8">
        We appreciate your business and are committed to your satisfaction. If you have any questions about our refund policy, please don't hesitate to contact us.
      </p>
    </div>
  );
};

const RefundPolicy = () => {
  return (
    <div className="pt-4"> 
      <h1 className="h1 text-center py-8">
        Refund Policy
      </h1>
      <RefundPolicy_Content />
    </div>
  );
};

export default RefundPolicy;
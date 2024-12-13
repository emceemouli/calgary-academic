import React, { useEffect } from 'react';

const Advertisement = ({ slot }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <ins 
      className="adsbygoogle"
      style={{ 
        display: 'block',
        textAlign: 'center',
        minHeight: '280px',  // Minimum height for ads
        maxWidth: '100%',    // Responsive width
        overflow: 'hidden'   // Prevent layout shifts
      }}
      data-ad-client="pub-7638771792216412"
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};
export default Advertisement;
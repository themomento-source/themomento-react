// components/LinkPreview.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LinkPreview = ({ url }) => {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const { data } = await axios.get('/api/metadata', { params: { url } });
        setPreview(data);
        setError(false);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPreview();
  }, [url]);

  if (error) return <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>;
  if (loading) return <div className="link-preview-loading">Loading preview...</div>;

  return (
    <div className="link-preview">
      <a href={url} target="_blank" rel="noopener noreferrer" className="link-preview-content">
        {preview.image && (
          <div className="link-preview-image">
            <img src={preview.image} alt={preview.title} />
          </div>
        )}
        <div className="link-preview-text">
          <div className="link-preview-domain">{preview.domain}</div>
          <h3 className="link-preview-title">{preview.title}</h3>
          {preview.description && (
            <p className="link-preview-description">{preview.description}</p>
          )}
        </div>
      </a>
    </div>
  );
};

export default LinkPreview;
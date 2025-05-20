// DynamicPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAllPages } from './api/sanity';

function DynamicPage() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      const pages = await fetchAllPages();
      const matched = pages.find(p => p.slug.current === slug);
      setPage(matched);
    };

    fetchPage();
  }, [slug]);

  if (!page) return <div>Page Not Found</div>;

  return (
    <div>
      <h1>{page.title}</h1>
      {/* Render your content block here */}
    </div>
  );
}

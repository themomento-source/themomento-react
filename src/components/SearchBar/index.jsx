import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaUser, FaImage, FaRegNewspaper } from 'react-icons/fa';
import { fetchDataFromApi } from '../../utils/api';

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ users: [], photos: [], blogs: [] });
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 500);
  const searchRef = useRef(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedQuery.length < 2) {
        setResults({ users: [], photos: [], blogs: [] });
        setIsOpen(false);
        return;
      }

      setLoading(true);
      try {
        // Use the new combined search endpoint with a cache-busting parameter
        const cacheBuster = `&_=${new Date().getTime()}`;
        const searchRes = await fetchDataFromApi(`/api/search/all?q=${debouncedQuery}${cacheBuster}`);
        
        setResults({
          users: searchRes.data?.users || [],
          photos: searchRes.data?.photos || [],
          blogs: searchRes.data?.blogs || [],
        });
        setIsOpen(true);
      } catch (error) {
        console.error("Search failed:", error);
        setResults({ users: [], photos: [], blogs: [] });
        setIsOpen(true);
      }
      setLoading(false);
    };

    fetchResults();
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleResultClick = () => {
    setIsOpen(false);
    setQuery('');
  };

  const handleInputFocus = () => {
    if (query.length >= 2) {
      setIsOpen(true);
    }
  };

  const hasResults = results.users.length > 0 || results.photos.length > 0 || results.blogs.length > 0;

  return (
    <div className="relative w-full max-w-md mx-auto" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleInputFocus}
          placeholder="Search for photos, users, or articles..."
          className="w-full px-4 py-2 text-gray-900 bg-gray-100 border-2 border-gray-200 rounded-full focus:outline-none focus:bg-white  transition-all"
        />
        <div className="absolute top-0 right-0 mt-3 mr-4">
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
          ) : (
            <FaSearch className="text-gray-500" />
          )}
        </div>
      </div>

      {isOpen && (
        <div className="absolute mt-2 w-full bg-white  shadow-xl z-20 max-h-96 overflow-y-auto">
          {loading && !hasResults && (
            <div className="p-4 text-center text-gray-500">Searching...</div>
          )}
          
          {!loading && !hasResults && debouncedQuery.length >= 2 && (
            <div className="p-4 text-center text-gray-500">
              <p>No results found for "{debouncedQuery}"</p>
              <p className="text-sm text-gray-400 mt-1">Try different keywords</p>
            </div>
          )}
          
          {hasResults && (
            <ul className="divide-y divide-gray-100">
              {results.photos.length > 0 && (
                <li className="p-2">
                  <h3 className="px-2 text-xs font-bold text-gray-500 uppercase">Photos</h3>
                  {results.photos.slice(0, 5).map(photo => (
                    <Link key={photo._id} to={`/photodetails/${photo._id}`} onClick={handleResultClick} className="flex items-center p-2 rounded-md hover:bg-gray-100">
                      <img src={photo.images?.[0]?.url} alt={photo.title} className="w-10 h-10 object-cover rounded-md mr-3" />
                      <div className="flex-1 min-w-0">
                        <span className="font-semibold text-gray-800 block truncate">{photo.title}</span>
                        <span className="text-sm text-gray-500 block truncate">{photo.user?.name}</span>
                      </div>
                    </Link>
                  ))}
                </li>
              )}
              
              {results.users.length > 0 && (
                <li className="p-2">
                  <h3 className="px-2 text-xs font-bold text-gray-500 uppercase">Users</h3>
                  {results.users.slice(0, 5).map(user => (
                    <Link key={user._id} to={`/user/${user.uniqueId}`} onClick={handleResultClick} className="flex items-center p-2 rounded-md hover:bg-gray-100">
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 object-cover rounded-full mr-3" />
                      <div className="flex-1 min-w-0">
                        <span className="font-semibold text-gray-800 block truncate">{user.name}</span>
                        {/* <span className="text-sm text-gray-500 block truncate">Location: {user.location}</span> */}
                      </div>
                    </Link>
                  ))}
                </li>
              )}
              
              {results.blogs.length > 0 && (
                <li className="p-2">
                  <h3 className="px-2 text-xs font-bold text-gray-500 uppercase">Articles</h3>
                  {results.blogs.slice(0, 5).map(blog => (
                    <Link key={blog._id} to={`/blog/${blog._id}`} onClick={handleResultClick} className="flex items-center p-2 rounded-md hover:bg-gray-100">
                      <div className="w-10 h-10 bg-gray-200 flex items-center justify-center rounded-md mr-3">
                        {blog.featuredImage ? (
                          <img src={blog.featuredImage} alt={blog.title} className="w-full h-full object-cover rounded-md" />
                        ) : (
                          <FaRegNewspaper className="text-gray-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-semibold text-gray-800 block truncate">{blog.title}</span>
                        <span className="text-sm text-gray-500 block truncate">{blog.author?.name}</span>
                      </div>
                    </Link>
                  ))}
                </li>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShortUrl('');

   try {
      const response = await axios.post('https://url-shortner-backend.onrender.com/api/shorten', {
        longUrl,
      });


      setShortUrl(response.data.shortUrl);
    } catch (err) {
      setError('Failed to shorten URL. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="bg-gray-950 p-10 rounded-2xl shadow-2xl w-full max-w-md text-center">
        <h1 className="text-4xl font-bold mb-6">🔗 URL Shortener</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="url"
            required
            placeholder="Enter a long URL..."
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            className="w-full px-4 py-2 mb-4 text-black rounded-xl outline-none"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition py-2 rounded-xl font-semibold"
          >
            Shorten URL
          </button>
        </form>

        {error && <p className="text-red-400 mt-4">{error}</p>}

        {shortUrl && (
          <div className="mt-6">
            <p className="mb-2 text-sm">Your shortened URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 underline break-words"
            >
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

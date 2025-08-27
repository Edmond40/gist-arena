import React from 'react';

const AuthorInfo = ({ article }) => {
  const initials = (article.author || 'U')
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('');
  const bio = article.authorBio || 'Experienced journalist with deep knowledge of current affairs and local developments.';
  const avatar = article.authorAvatar;
  const socials = article.socials || {};

  return (
    <div className="md:w-[80%] mx-auto mt-8 p-6 bg-gray-100 shadow-md rounded-lg">
      <div className="flex items-start gap-4">
        {avatar ? (
          <img src={avatar} alt={article.author} className="w-16 h-16 rounded-full object-cover" />
        ) : (
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
            {initials}
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{article.author}</h3>
          <p className="text-gray-600 text-sm mb-3">
            {bio}
          </p>
          {(socials.twitter || socials.facebook || socials.instagram || socials.linkedin || socials.website) && (
            <div className="flex flex-wrap gap-3 mb-3 text-sm">
              {socials.twitter && (
                <a href={socials.twitter} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">Twitter</a>
              )}
              {socials.facebook && (
                <a href={socials.facebook} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">Facebook</a>
              )}
              {socials.instagram && (
                <a href={socials.instagram} target="_blank" rel="noreferrer" className="text-pink-600 hover:underline">Instagram</a>
              )}
              {socials.linkedin && (
                <a href={socials.linkedin} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">LinkedIn</a>
              )}
              {socials.website && (
                <a href={socials.website} target="_blank" rel="noreferrer" className="text-gray-700 hover:underline">Website</a>
              )}
            </div>
          )}
          <div className="flex gap-2">
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View Profile</button>
            <span className="text-gray-400">•</span>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">More Articles</button>
            <span className="text-gray-400">•</span>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Follow</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorInfo;

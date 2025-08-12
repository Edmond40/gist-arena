import React from 'react';

const AuthorInfo = ({ article }) => {
  const getAuthorBio = (author) => {
    const bios = {
      'By Daleli Doe': 'Senior Political Correspondent with over 10 years of experience covering Ghanaian politics and governance.',
      'By Aboki Frimps': 'Technology and Innovation reporter specializing in Ghana\'s digital transformation and startup ecosystem.',
      'By Akiti Sandy': 'Economic analyst and business journalist with expertise in African markets and development economics.',
      'By Eddy Kay': 'Sports journalist covering Ghanaian football and international competitions with deep insights into the local sports scene.',
      'By Daily Bread': 'International affairs correspondent focusing on Ghana\'s role in global diplomacy and regional cooperation.',
      'By Ama K.': 'Financial markets reporter with specialization in banking, investment, and economic policy analysis.',
      'By Kofi A.': 'Business and entrepreneurship journalist covering Ghana\'s startup ecosystem and corporate developments.',
      'By Efua D.': 'International relations expert reporting on Ghana\'s foreign policy and diplomatic initiatives.',
      'By Nana A.': 'Health and science correspondent with focus on public health initiatives and medical research in Ghana.',
      'By Yaw B.': 'Technology reporter covering innovation, digital transformation, and emerging tech trends in Ghana.',
      'By Akosua M.': 'Entertainment and culture journalist specializing in Ghanaian arts, music, and creative industries.',
      'By K. Boateng': 'Sports analyst and former athlete providing expert commentary on Ghanaian sports and athletics.',
      'By E. Quartey': 'Science and research correspondent covering academic developments and scientific breakthroughs.',
      'By J. Mensah': 'Political analyst and governance expert with deep understanding of Ghana\'s democratic processes.',
      'By L. Tetteh': 'Business and trade journalist specializing in Ghana\'s commercial sector and economic development.'
    };
    return bios[author] || 'Experienced journalist with deep knowledge of current affairs and local developments.';
  };

  return (
    <div className="md:w-[80%] mx-auto mt-8 p-6 bg-gray-100 shadow-md rounded-lg">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
          {article.author.split(' ').map(name => name[0]).join('')}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{article.author}</h3>
          <p className="text-gray-600 text-sm mb-3">
            {getAuthorBio(article.author)}
          </p>
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

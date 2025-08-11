import React from 'react';

const ArticleContent = ({ article, fontSize }) => {
  const generateFullContent = (article) => {
    const category = (article.category || '').toLowerCase();
    
    switch (category) {
      case 'politics':
        return (
          <div className="prose prose-lg max-w-none">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Background and Context</h3>
            <p className="mb-4 text-gray-700 leading-relaxed">
              The political landscape in Ghana continues to evolve as lawmakers address critical issues affecting the nation's democratic processes. This development comes at a crucial time when the country is preparing for upcoming electoral cycles.
            </p>
            
            <blockquote className="border-l-4 border-yellow-400 pl-4 italic text-gray-600 mb-4">
              "This represents a significant step forward in strengthening our democratic institutions and ensuring transparency in our electoral processes."
            </blockquote>
            
            <h3 className="text-xl font-bold mb-4 text-gray-800">Key Developments</h3>
            <p className="mb-4 text-gray-700 leading-relaxed">
              The proposed reforms include enhanced voter verification systems, improved ballot security measures, and streamlined registration processes. These changes aim to address concerns raised by various stakeholders in previous elections.
            </p>
            
            <h3 className="text-xl font-bold mb-4 text-gray-800">Public Response</h3>
            <p className="mb-4 text-gray-700 leading-relaxed">
              Civil society organizations have welcomed the initiative, emphasizing the importance of inclusive dialogue in the reform process. Opposition parties have also expressed cautious optimism while calling for broader consultation.
            </p>
            
            <h3 className="text-xl font-bold mb-4 text-gray-800">Next Steps</h3>
            <p className="mb-4 text-gray-700 leading-relaxed">
              The parliamentary committee is expected to hold public hearings across all regions to gather input from citizens, political parties, and electoral experts. A final report is anticipated within the next three months.
            </p>
          </div>
        );
        
      case 'economy':
        return (
          <div className="prose prose-lg max-w-none">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Economic Impact</h3>
            <p className="mb-4 text-gray-700 leading-relaxed">
              Ghana's economic indicators show promising signs of recovery and growth. The latest data reveals positive trends across multiple sectors, signaling potential opportunities for investors and businesses.
            </p>
            
            <blockquote className="border-l-4 border-yellow-400 pl-4 italic text-gray-600 mb-4">
              "The current economic trajectory demonstrates Ghana's resilience and potential for sustainable growth in the region."
            </blockquote>
            
            <h3 className="text-xl font-bold mb-4 text-gray-800">Sector Analysis</h3>
            <p className="mb-4 text-gray-700 leading-relaxed">
              Key sectors including agriculture, manufacturing, and services have shown remarkable performance. The government's strategic initiatives and policy reforms have contributed significantly to these positive outcomes.
            </p>
            
            <h3 className="text-xl font-bold mb-4 text-gray-800">Market Response</h3>
            <p className="mb-4 text-gray-700 leading-relaxed">
              Financial markets have responded positively to the economic indicators, with increased investor confidence and foreign direct investment flows. Analysts predict continued growth in the medium term.
            </p>
            
            <h3 className="text-xl font-bold mb-4 text-gray-800">Future Outlook</h3>
            <p className="mb-4 text-gray-700 leading-relaxed">
              Economic experts project sustained growth based on current policies and international market conditions. However, they emphasize the need for continued fiscal discipline and structural reforms.
            </p>
          </div>
        );
        
      case 'technology':
        return (
          <div className="prose prose-lg max-w-none">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Innovation Milestone</h3>
            <p className="mb-4 text-gray-700 leading-relaxed">
              Ghana's technology sector continues to make significant strides, positioning the country as a regional hub for innovation and digital transformation. This latest development represents a major breakthrough in the nation's technological advancement.
            </p>
            
            <blockquote className="border-l-4 border-yellow-400 pl-4 italic text-gray-600 mb-4">
              "This achievement places Ghana at the forefront of technological innovation in Africa and demonstrates our capability to compete globally."
            </blockquote>
            
            <h3 className="text-xl font-bold mb-4 text-gray-800">Technical Specifications</h3>
            <p className="mb-4 text-gray-700 leading-relaxed">
              The project involved collaboration between local universities, research institutions, and international partners. Advanced technologies and cutting-edge methodologies were employed to ensure success.
            </p>
            
            <h3 className="text-xl font-bold mb-4 text-gray-800">Economic Implications</h3>
            <p className="mb-4 text-gray-700 leading-relaxed">
              The technological breakthrough is expected to create new job opportunities, attract foreign investment, and enhance Ghana's position in the global technology market. Local startups and established companies stand to benefit significantly.
            </p>
            
            <h3 className="text-xl font-bold mb-4 text-gray-800">Future Applications</h3>
            <p className="mb-4 text-gray-700 leading-relaxed">
              Experts anticipate widespread applications across various sectors including healthcare, education, agriculture, and financial services. The technology has the potential to revolutionize how these industries operate.
            </p>
          </div>
        );
        
      default:
        return (
          <div className="prose prose-lg max-w-none">
            <h3 className="text-xl font-bold mb-4 text-gray-800">In-Depth Analysis</h3>
            <p className="mb-4 text-gray-700 leading-relaxed">
              This development represents a significant milestone in Ghana's ongoing progress across various sectors. The implications extend beyond immediate outcomes, affecting long-term strategic objectives and national development goals.
            </p>
            
            <blockquote className="border-l-4 border-yellow-400 pl-4 italic text-gray-600 mb-4">
              "This achievement demonstrates Ghana's commitment to excellence and innovation across all sectors of development."
            </blockquote>
            
            <h3 className="text-xl font-bold mb-4 text-gray-800">Strategic Importance</h3>
            <p className="mb-4 text-gray-700 leading-relaxed">
              The initiative aligns with broader national development strategies and international best practices. Stakeholders across various sectors have expressed support for the continued implementation of similar projects.
            </p>
            
            <h3 className="text-xl font-bold mb-4 text-gray-800">Community Impact</h3>
            <p className="mb-4 text-gray-700 leading-relaxed">
              Local communities are expected to benefit from improved services, enhanced opportunities, and better access to resources. The project emphasizes inclusive development and sustainable practices.
            </p>
            
            <h3 className="text-xl font-bold mb-4 text-gray-800">Looking Forward</h3>
            <p className="mb-4 text-gray-700 leading-relaxed">
              As Ghana continues to make progress in various sectors, this development serves as a model for future initiatives. The success demonstrates the potential for similar projects across the region.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="md:w-[75%] mx-auto" style={{ fontSize: `${fontSize}px` }}>
      {generateFullContent(article)}
    </div>
  );
};

export default ArticleContent;

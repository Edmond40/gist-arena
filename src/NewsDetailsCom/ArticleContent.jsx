import React from 'react';

const ArticleContent = ({ article, fontSize }) => {
  return (
    <div className="md:w-[85%] mx-auto prose prose-lg max-w-none" style={{ fontSize: `${fontSize}px` }}>
      {article?.content
        ? <div dangerouslySetInnerHTML={{ __html: article.content }} />
        : <p className="text-gray-700 leading-relaxed">{article?.summary || ''}</p>
      }
    </div>
  );
};

export default ArticleContent;

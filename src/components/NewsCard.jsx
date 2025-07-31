import React from 'react';
import { Link } from 'react-router-dom';
// import './NewsCard.css';

function NewsCard({ article }) {
  return (
    <div className="news-card">
      <div className="news-card-image">
        <img src={article.image} alt={article.title} />
      </div>
      <div className="news-card-content">
        <h3><Link to={`/news/${article.id}`}>{article.title}</Link></h3>
        <p>{article.summary}</p>
        <div className="news-card-meta">
          <span>{article.category}</span>
          <span>{article.date}</span>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {ReadingProgressBar,SocialShareButtons,FontSizeControls,ArticleHeader,ArticleActions,AuthorInfo,CommentSection,EmailModal,AdZones,RelatedArticles,ArticleContent,BackToTop} from '../NewsDetailsCom';
import { PanelLeftClose } from 'lucide-react';
import { PostsAPI, BookmarksAPI, LikesAPI } from '../lib/api';

function generateDescription(article) {
  const base = article.summary || '';
  const category = (article.category || '').toLowerCase();
  const title = article.title || 'This story';
  switch (category) {
    case 'politics':
      return `${base} The development underscores the policy direction and governance priorities shaping national discourse in Ghana.`;
    case 'economy':
      return `${base} Analysts say the trend reflects broader macroeconomic conditions and potential implications for jobs and growth.`;
    case 'business':
      return `${base} Industry stakeholders expect new partnerships, funding opportunities, and market expansion in the coming months.`;
    case 'world':
      return `${base} Observers note Ghana's evolving role on the international stage and the impact on regional cooperation.`;
    case 'health':
      return `${base} Health officials emphasize access, equity, and long‑term outcomes for communities across the country.`;
    case 'technology':
      return `${base} Innovators highlight the importance of digital infrastructure, talent development, and regulatory support.`;
    case 'science':
      return `${base} Researchers point to evidence‑based approaches and the need for sustained investment in local R&D.`;
    case 'entertainment':
      return `${base} Creatives and fans alike celebrate the milestone as a boost to Ghana's cultural influence.`;
    case 'sports':
      return `${base} Coaches and players credit preparation and teamwork, with eyes set on the next challenge.`;
    default:
      return `${title}. ${base}`.trim();
  }
}

function mapPostToArticle(post) {
  if (!post) return null;
  const dt = post.publishedAt || post.createdAt;
  const d = dt ? new Date(dt) : null;
  const day = d ? d.toLocaleDateString(undefined, { weekday: 'long' }) : '';
  const date = d ? d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : '';
  const time = d ? d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }) : '';
  const minutesRead = post.minutesRead || Math.max(1, Math.round((post.content?.split(/\s+/).length || 200) / 200));
  return {
    id: post.id,
    title: post.title,
    summary: post.summary || '',
    category: post.category?.name || '',
    date,
    time,
    day,
    image: post.heroImageUrl || '',
    author: post.author?.name || 'Staff Writer',
    authorBio: post.author?.bio || '',
    authorAvatar: post.author?.avatarUrl || '',
    socials: {
      twitter: post.author?.twitter || '',
      facebook: post.author?.facebook || '',
      instagram: post.author?.instagram || '',
      linkedin: post.author?.linkedin || '',
      website: post.author?.website || '',
    },
    content: post.content || '',
    minutesRead,
    shareCount: post.shareCount || 0,
    updatedAt: post.updatedAt || dt,
  };
}

function NewsDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [relatedFilter, setRelatedFilter] = useState('all');
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [fontSize, setFontSize] = useState(16);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailData, setEmailData] = useState({ to: '', from: '', message: '' });
  const [viewCount, setViewCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);
  const [mostPopular, setMostPopular] = useState([]);
  const description = article?.description || generateDescription(article || {});

  // Wrap setter to sync bookmark state to backend
  const handleSetBookmarked = (updater) => {
    setIsBookmarked((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      const pid = article?.id || Number(id);
      if (pid) {
        if (next) {
          BookmarksAPI.add(pid).catch(() => {});
        } else {
          BookmarksAPI.remove(pid).catch(() => {});
        }
      }
      return next;
    });
  };

  // Sync like state and count with backend
  const handleSetLiked = (updater) => {
    setIsLiked((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      const pid = article?.id || Number(id);
      (async () => {
        try {
          if (!pid) return;
          if (next) {
            await LikesAPI.like(pid);
          } else {
            await LikesAPI.unlike(pid);
          }
          const res = await LikesAPI.count(pid);
          if (typeof res?.count === 'number') setLikeCount(res.count);
        } catch {
          // ignore like errors
        }
      })();
      return next;
    });
  };

  // Load article from backend
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setLoadError('');
      try {
        const post = await PostsAPI.get(Number(id));
        if (!cancelled && post) {
          setArticle(mapPostToArticle(post));
          if (typeof post.viewCount === 'number') setViewCount(post.viewCount);
          if (typeof post.shareCount === 'number') setShareCount(post.shareCount);
          setLoading(false);
          return;
        }
      } catch {
        // if not found on backend
        if (!cancelled) {
          setLoadError('Article not found');
          setLoading(false);
        }
      }
    })();
    return () => { cancelled = true; };
  }, [id]);

  // Load initial like count
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const pid = Number(id);
        if (!pid) return;
        const res = await LikesAPI.count(pid);
        if (!cancelled && typeof res?.count === 'number') setLikeCount(res.count);
      } catch {
        // ignore
      }
    })();
    return () => { cancelled = true; };
  }, [id]);

  // Load related articles based on category once main article is loaded
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!article?.category) {
        setRelatedArticles([]);
        return;
      }
      try {
        const posts = await PostsAPI.list({ published: true, sortBy: 'publishedAt', order: 'desc' });
        if (cancelled) return;
        const items = (posts || [])
          .filter(p => (p.id !== article.id) && ((p.category?.name || '') === article.category))
          .slice(0, 6)
          .map(p => ({
            id: p.id,
            title: p.title,
            summary: p.summary || '',
            category: p.category?.name || '',
            date: p.publishedAt || p.createdAt,
            image: p.heroImageUrl || '',
            author: p.author?.name || 'Staff Writer',
            content: p.content || '',
          }));
        setRelatedArticles(items);
      } catch {
        setRelatedArticles([]);
      }
    })();
    return () => { cancelled = true; };
  }, [article?.id, article?.category]);

  // Load most popular articles (by viewCount)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const posts = await PostsAPI.list({ published: true, sortBy: 'viewCount', order: 'desc' });
        if (cancelled) return;
        const items = (posts || [])
          .slice(0, 5)
          .map(p => ({
            id: p.id,
            title: p.title,
            summary: p.summary || '',
            category: p.category?.name || '',
            date: p.publishedAt || p.createdAt,
            image: p.heroImageUrl || '',
            author: p.author?.name || 'Staff Writer',
            content: p.content || '',
            viewCount: p.viewCount || 0,
          }));
        setMostPopular(items);
      } catch {
        setMostPopular([]);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Load initial bookmark state for this post (if authenticated)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        if (!id) return;
        const list = await BookmarksAPI.list();
        if (cancelled) return;
        const pid = Number(id);
        const exists = Array.isArray(list) && list.some((b) => (b.postId === pid) || (b.post?.id === pid));
        setIsBookmarked(!!exists);
      } catch {
        // ignore if unauthenticated or API fails
      }
    })();
    return () => { cancelled = true; };
  }, [id]);
  
  // Increment views only after real engagement (visible tab, 20% scroll, ~8s dwell), at most once per 24h per post
  React.useEffect(() => {
    if (!id) return;
    let cancelled = false;
    let timer = null;
    const key = `viewed_post_${id}`; // stores timestamp of last counted view

    const trySchedule = () => {
      if (cancelled) return;
      const lastTs = Number(localStorage.getItem(key) || '0');
      if (lastTs && (Date.now() - lastTs) < 24 * 60 * 60 * 1000) return; // already counted in last 24h
      if (document.visibilityState !== 'visible') return; // tab must be visible
      if (readingProgress < 20) return; // require deeper engagement
      if (timer) return; // already scheduled
      timer = setTimeout(async () => {
        try {
          const res = await PostsAPI.incrementViews(Number(id));
          if (!cancelled && res?.viewCount !== undefined) setViewCount(res.viewCount);
          localStorage.setItem(key, String(Date.now()));
        } catch {
          // ignore failures
        }
      }, 8000);
    };

    // Attempt immediately in case conditions already met
    trySchedule();

    // Visibility changes can satisfy conditions later
    const onVisibility = () => trySchedule();
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [id, readingProgress]);

  // Reading progress effect
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(scrollPercent, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Font size handlers
  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 2, 24));
  };
  
  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 2, 12));
  };
  
  const resetFontSize = () => {
    setFontSize(16);
  };

  // Print functionality
  const handlePrint = () => {
    const printContent = `
      <html>
        <head>
          <title>${article.title} - Gist Arena</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; }
            .header { text-align: center; border-bottom: 2px solid #f59e0b; padding-bottom: 20px; margin-bottom: 30px; }
            .title { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
            .meta { color: #666; font-size: 14px; margin-bottom: 20px; }
            .summary { font-style: italic; color: #444; margin-bottom: 30px; }
            .content { font-size: 16px; }
            .author { margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">${article.title}</div>
            <div class="meta">
              By ${article.author} | ${article.date} | ${article.category}
            </div>
            <div class="summary">${article.summary}</div>
          </div>
          <div class="content">
            ${article.summary}<br><br>
            ${description}<br><br>
            ${article.content || ''}
          </div>
          <div class="author">
            <strong>Author:</strong> ${article.author}<br>
            <strong>Source:</strong> Gist Arena<br>
            <strong>Published:</strong> ${article.date}
          </div>
        </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };
  
  // Email to friend functionality
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const subject = `Check out this article: ${article.title}`;
    const body = `Hi,\n\nI thought you might be interested in this article:\n\n${article.title}\n\n${article.summary}\n\nRead more at: ${window.location.href}\n\nBest regards,\n${emailData.from}`;
    
    window.open(`mailto:${emailData.to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    setShowEmailModal(false);
    setEmailData({ to: '', from: '', message: '' });
  };

  if (loading) return <div>Loading article...</div>;
  if (loadError) return <div className="text-red-600">{loadError}</div>;
  if (!article) return <div className=""><h2>Article Not Found</h2></div>;

  return (
    <div className={`flex md:flex-row gap-4 flex-col justify-between `} id='NewsDetails'>
      {/* Reading Progress Bar */}
      <ReadingProgressBar progress={readingProgress} />

      <div className='w-full'>

        <Link to="/news-list" className='flex items-center gap-1 hover:translate-x-2 cursor-pointer duration-300 w-18'>
          <PanelLeftClose size={25} className='text-yellow-500'/>
          <p className='libertinus-serif-semibold'>Back</p>
        </Link>

        {/* Social Share Buttons */}
        <SocialShareButtons 
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          article={article}
          copied={copied}
          setCopied={setCopied}
          onShared={async () => {
            // Optimistically increment
            setShareCount((n) => n + 1);
            // Best-effort refresh from backend
            try {
              const latest = await PostsAPI.get(Number(id));
              if (typeof latest?.shareCount === 'number') setShareCount(latest.shareCount);
            } catch { /* ignore */ }
          }}
        />

        {/* Font Size Controls */}
        <FontSizeControls 
          increaseFontSize={increaseFontSize}
          decreaseFontSize={decreaseFontSize}
          resetFontSize={resetFontSize}
        />

        <div className={`flex flex-col gap-4`} data-aos="fade-up">
          {/* Article Header */}
          <ArticleHeader 
            article={article}
            description={description}
          />
          
          {/* Article Actions */}
          <ArticleActions 
            isLiked={isLiked}
            setIsLiked={handleSetLiked}
            likeCount={likeCount}
            setLikeCount={setLikeCount}
            isBookmarked={isBookmarked}
            setIsBookmarked={handleSetBookmarked}
            handlePrint={handlePrint}
            setShowEmailModal={setShowEmailModal}
            viewCount={viewCount}
            article={article}
            shareCount={shareCount}
          />
          
          {/* Article Content */}
          <ArticleContent 
            article={article}
            fontSize={fontSize}
          />
          
          {/* Ad Zones */}
          <AdZones />
          
          {/* Author Information */}
          <AuthorInfo article={article} />
          
          {/* Comment Section */}
          <CommentSection postId={article.id} />
        </div>

        {/* Back to Top */}
        <BackToTop />
      </div>
      
      {/* Related Articles + Most Popular */}
      <RelatedArticles 
        newsDetails={relatedArticles}
        mostPopular={mostPopular}
        article={article}
        relatedFilter={relatedFilter}
        setRelatedFilter={setRelatedFilter}
      />
      
      {/* Email Modal */}
      <EmailModal 
        showEmailModal={showEmailModal}
        setShowEmailModal={setShowEmailModal}
        emailData={emailData}
        setEmailData={setEmailData}
        handleEmailSubmit={handleEmailSubmit}
        article={article}
      />
    </div>
  );
}

export default NewsDetail;

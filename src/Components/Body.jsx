'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useSelected } from '@/context/SelectedContext'

const Body = () => {
  const { selected } = useSelected()

  const [news, setNews] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const observerRef = useRef(null)

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const formattedYesterday = yesterday.toISOString().split("T")[0]

  const fetchNews = async (pageNumber) => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);

      const response = await fetch(`/api/news?q=${selected || 'india'}&page=${pageNumber}&from=${formattedYesterday}`)

      const data = await response.json();

      // Check if the API returned an error (like Rate Limited)
      if (data && data.status === "error") {
        console.error("API Error:", data.message, data);
        setHasMore(false);
        return;
      }

      // Ensure `articles` is an array before iterating/spreading it
      if (!Array.isArray(data?.articles)) {
        console.error("Unexpected articles format from API:", data);
        setHasMore(false);
        return;
      }

      setNews(prev => (pageNumber === 1 ? data.articles : [...prev, ...data.articles]));

      if (data.articles.length < 10) setHasMore(false);

    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };


  // 1. Single Effect to handle category changes
  useEffect(() => {
    // Clear everything immediately
    setNews([]);
    setHasMore(true);

    if (page === 1) {
      fetchNews(1); // Manually trigger for page 1
    } else {
      setPage(1); // This will trigger the page-based useEffect below
    }
  }, [selected]);

  // 2. Fetch data when page changes
  useEffect(() => {
    if (page > 1) {
      fetchNews(page);
    }
  }, [page]);

  // Intersection Observer
  useEffect(() => {
    if (!observerRef.current || !hasMore) return
    console.log('coming in this')
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage(prev => prev + 1)
        }
      },
      {
        threshold: 0,
        rootMargin: "200px"
      }

    )

    observer.observe(observerRef.current)
    return () => observer.disconnect()
  }, [loading, hasMore])

  return (
    <>
      <div className='d-flex flex-wrap w-100 container justify-content-between'>
        {news.map((item, i) => (
          <div className="card bg-dark text-white my-3" style={{ width: '22rem' }} key={i}>
            <img
              src={item.urlToImage || 'https://media.istockphoto.com/id/1409309637/vector/breaking-news-label-banner-isolated-vector-design.jpg'}
              className="card-img-top"
              style={{ height: '200px', objectFit: 'cover' }}
              alt="news"
            />

            <div className="card-body">
              <small className="text-muted">{item.publishedAt}</small>
              <h5 className="card-title">{item.title}</h5>
              <p className="card-text">{item.description}</p>
            </div>

            <div className="card-body">
              <a href={item.url} target="_blank" className="btn btn-outline-primary w-100">
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Observer Trigger */}
      {hasMore && <div ref={observerRef} style={{ height: 500 }} />}
      {!hasMore && (
        <p className="text-center text-danger">
          No more news available 🚫
        </p>
      )}

      {loading && <p className="text-center my-3">Loading more news...</p>}
    </>
  )
}

export default Body

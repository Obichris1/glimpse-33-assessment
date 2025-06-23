'use client';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { fetchFeed } from '../lib/api/feed';
import FeedItem from './FeedItem';
import FeedLoader from './FeedLoader';
import LoadingSpinner from './LoadingSpinner';
import { Alert, Box } from '@mui/material';

export default function FeedList() {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const searchParams = useSearchParams();
  
  const searchQuery = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['feed', searchQuery, category],
    queryFn: ({ pageParam }) => fetchFeed({ 
      pageParam, 
      query: searchQuery,
      category 
    }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {status === 'loading' ? (
        <>
          <FeedLoader />
          <FeedLoader />
          <FeedLoader />
        </>
      ) : status === 'error' ? (
        <Alert severity="error" sx={{ mb: 3 }}>
          Error loading feed: {error.message}
        </Alert>
      ) : (
        <>
          {data?.pages.map((page, i) => (
            <Box key={i} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {page.items.map((item) => (
                <FeedItem key={item.id} item={item} sx={{ mb: 3 }} />
              ))}
            </Box>
          ))}
        </>
      )}
      
      {(isFetchingNextPage || isFetching) && <LoadingSpinner />}
      <div ref={ref} style={{ height: '20px' }} />
    </Box>
  );
}
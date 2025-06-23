export const fetchFeed = async ({ pageParam = 1, query = '', category = '' }) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let url = `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=10`;
  
  // Add search query filter
  if (query) {
    url += `&q=${encodeURIComponent(query)}`;
  }
  
  // Add category filter (we'll mock this since JSONPlaceholder doesn't have categories)
  const mockCategories = {
    'technology': [1, 2, 3],
    'business': [4, 5, 6],
    'health': [7, 8, 9]
  };
  
  if (category && mockCategories[category]) {
    url += `&id=${mockCategories[category].join('&id=')}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
 
  
  const totalCount = response.headers.get('x-total-count');
  const items = await response.json();
  (items);
  (response);
  
  
  const transformedItems = items.map((item) => ({
    id: item.id.toString(),
    title: item.title,
    description: item.body.substring(0, 100) + '...',
    author: `User ${item.userId}`,
    date: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    thumbnail: `https://picsum.photos/200/150?random=${item.id}`,
    category: ['technology', 'business', 'health'][item.userId % 3] // Mock category
  }));

  (transformedItems);
  
  return {
    items: transformedItems,
    nextPage: totalCount && pageParam * 10 < parseInt(totalCount) ? pageParam + 1 : null,
  };
};
// lib/api/feed.js

// ... your existing fetchFeed function ...

/**
 * Fetches a single feed item by ID
 * @param {string} id - The ID of the post to fetch
 * @returns {Promise<Object>} - The transformed feed item
 */
export const fetchFeedItem = async (id) => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }
    
    const item = await response.json();
    
    // Transform the data to match your feed item structure
    return {
      id: item.id.toString(),
      title: item.title,
      description: item.body,
      author: `User ${item.userId}`,
      date: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
      thumbnail: `https://picsum.photos/800/600?random=${item.id}`,
      content: item.body.repeat(2), // Just repeating to simulate longer content
      category: ['technology', 'business', 'health'][item.userId % 3]
    };
  } catch (error) {
    console.error('Error fetching feed item:', error);
    throw error;
  }
};
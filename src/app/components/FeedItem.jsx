'use client';
import { useRouter } from 'next/navigation';

const FeedItem = ({ item }) => {
  const router = useRouter();

  const handleClick = () => {
    // Store the item in sessionStorage temporarily
    sessionStorage.setItem(`feedItem-${item.id}`, JSON.stringify(item));
    router.push(`/feed/${item.id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-48 w-full object-cover md:w-48"
            src={item.thumbnail}
            alt={item.title}
            loading="lazy"
          />
        </div>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h2>
          <p className="text-gray-600 mb-4">{item.description}</p>
          <div className="flex justify-between text-sm text-gray-500">
            <span>By {item.author}</span>
            <span>
              {new Date(item.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedItem;
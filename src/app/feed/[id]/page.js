"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchFeedItem } from "@/app/lib/api/feed";
import FeedDetail from "@/app/components/FeedDetail";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import AuthGuard from "@/app/components/Auth/AuthGuard";

export default function FeedDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadItem = async () => {
      try {
        const storedItem = sessionStorage.getItem(`feedItem-${id}`);

        if (storedItem) {
          const parsedItem = JSON.parse(storedItem);
          if (isMounted) {
            setItem(parsedItem);
            setLoading(false);
          }

          return;
        }

        // 2. Fallback to API
        const data = await fetchFeedItem(id);

        if (!isMounted) return;

        if (!data) {
          setError("Item not found");
          router.push(`/error?error=${error}`)
          return;
        }

        setItem(data);
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          router.push(`/error?error=${error}`)
          console.error("Fetch error:", err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadItem();

    return () => {
      isMounted = false; // Cleanup on unmount
      // Cleanup sessionStorage only when we're sure we're done with it
      sessionStorage.removeItem(`feedItem-${id}`);
    };
  }, [id]);

  if (loading) {
    return (
      <AuthGuard>
        <LoadingSpinner />
      </AuthGuard>
    );
  }

  if (error) {
    return (
      <AuthGuard>
        <div className="p-8 text-center">
          {error.includes("not found") ? (
            <>
              <h2>Item Not Found</h2>
              <button
                onClick={() => router.push("/")}
                className="mt-4 px-4 py-2 bg-black text-white rounded"
              >
                Back to Feed
              </button>
            </>
          ) : (
            <>
              <h2>Error Loading Item</h2>
              <p>{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-black text-white rounded"
              >
                Try Again
              </button>
            </>
          )}
        </div>
      </AuthGuard>
    );
  }

  if (!item) {
    // This should theoretically never be reached due to error state
    return (
      <AuthGuard>
        <div className="p-8 text-center">Loading failed</div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <FeedDetail item={item} />
    </AuthGuard>
  );
}

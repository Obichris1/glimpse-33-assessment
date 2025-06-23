import { Container, Typography } from "@mui/material";
import FeedList from "./components/FeedList";
import SearchFilterBar from "./components/SearchFilterBar";
import Navbar from "./components/Navbar";
import AuthGuard from "./components/Auth/AuthGuard";

export const metadata = {
  title: "Glimpse Feed",
  description: "A dynamic content feed explorer",
};

export default function FeedPage() {
  return (
    <AuthGuard>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 4 }}
        >
          Feeds
        </Typography>

        <SearchFilterBar />
        <FeedList />
      </Container>
    </AuthGuard>
  );
}

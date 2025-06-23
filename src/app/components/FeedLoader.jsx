"use client";
import { Skeleton, Box } from "@mui/material";

const FeedLoader = () => {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 1,
        overflow: "hidden",
        mb: 3,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={200}
          sx={{
            bgcolor: "grey.200",
            flexShrink: 0,
            width: { xs: "100%", md: 240 },
          }}
        />
        <Box sx={{ p: 3, flexGrow: 1 }}>
          <Skeleton
            variant="text"
            width="60%"
            height={40}
            sx={{ bgcolor: "grey.200" }}
          />
          <Box sx={{ mt: 2 }}>
            <Skeleton
              variant="text"
              width="100%"
              height={20}
              sx={{ bgcolor: "grey.200" }}
            />
            <Skeleton
              variant="text"
              width="90%"
              height={20}
              sx={{ bgcolor: "grey.200" }}
            />
            <Skeleton
              variant="text"
              width="80%"
              height={20}
              sx={{ bgcolor: "grey.200" }}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Skeleton
              variant="text"
              width={100}
              height={20}
              sx={{ bgcolor: "grey.200" }}
            />
            <Skeleton
              variant="text"
              width={80}
              height={20}
              sx={{ bgcolor: "grey.200" }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FeedLoader;

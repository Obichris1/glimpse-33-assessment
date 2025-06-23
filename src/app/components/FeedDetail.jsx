'use client';
import { useRouter } from 'next/navigation';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardMedia, 
  CardContent, 
  Chip,
  Divider,
  Skeleton
} from '@mui/material';
import { format } from 'date-fns';

export default function FeedDetail({ item }) {
  const router = useRouter();

  if (!item) {
    return (
      <Box sx={{ p: 3 }}>
        <Skeleton variant="rectangular" width="100%" height={400} sx={{ mb: 2 }} />
        <Skeleton variant="text" width="60%" height={40} sx={{ mb: 2 }} />
        <Skeleton variant="text" width="100%" height={24} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="100%" height={24} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="80%" height={24} />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: { xs: 2, md: 3 } }}>
      <Button 
        variant="outlined" 
        onClick={() => router.back()}
        sx={{ mb: 3, backgroundColor : "black", color : 'white', paddingY:1}}
        startIcon={<ArrowBackIcon />}
      >
        Back to Feed
      </Button>

      <Card sx={{ mb: 3 }}>
        <CardMedia
          component="img"
          height="400"
          image={item.thumbnail}
          alt={item.title}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="h1">
            {item.title}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
            <Chip label={item.author} size="small" />
            <Chip 
              label={format(new Date(item.date), 'MMM d, yyyy')} 
              size="small" 
              variant="outlined" 
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography 
            variant="body1" 
            paragraph 
            sx={{ 
              whiteSpace: 'pre-line',
              lineHeight: 1.6,
              fontSize: '1.1rem'
            }}
          >
            {item.content}
          </Typography>
        </CardContent>
      </Card>

    </Box>
  );
}

// You'll need to import the ArrowBack icon
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
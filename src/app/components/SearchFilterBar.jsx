'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { 
  TextField, 
  InputAdornment, 
  MenuItem, 
  Select, 
  FormControl, 
  InputLabel,
  Box
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'technology', label: 'Technology' },
  { value: 'business', label: 'Business' },
  { value: 'health', label: 'Health' }
];

export default function SearchFilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');

  // Update URL when filters change (with debounce for search)
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams();
      if (searchQuery) params.set('q', searchQuery);
      if (category) params.set('category', category);
      
      router.push(`${pathname}?${params.toString()}`);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, category, pathname, router]);

  return (
    <Box sx={{ 
      display: 'flex', 
      gap: 2, 
      mb: 3,
      flexDirection: { xs: 'column', sm: 'row' }
    }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search posts..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id="category-filter-label">Category</InputLabel>
        <Select
          labelId="category-filter-label"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          label="Category"
        >
          {categories.map((cat) => (
            <MenuItem key={cat.value} value={cat.value}>
              {cat.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Product } from '@shared/schema';
import { useAuth } from './use-auth';
import { useToast } from './use-toast';

export function useWishlist() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch wishlist
  const { data: wishlist = [], isLoading, error } = useQuery<Product[]>({
    queryKey: ['wishlist', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const res = await fetch('/api/wishlist');
      if (!res.ok) {
        throw new Error('Failed to fetch wishlist');
      }
      return res.json();
    },
    enabled: !!user,
  });

  // Add to wishlist
  const addToWishlist = useMutation({
    mutationFn: async (productId: string) => {
      const res = await fetch('/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });
      if (!res.ok) {
        throw new Error('Failed to add to wishlist');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist', user?.id] });
      toast({ title: 'Added to Wishlist', description: 'Product saved to your wishlist.' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Could not add to wishlist', variant: 'destructive' });
    },
  });

  // Remove from wishlist
  const removeFromWishlist = useMutation({
    mutationFn: async (productId: string) => {
      const res = await fetch(`/api/wishlist/${productId}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Failed to remove from wishlist');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist', user?.id] });
      toast({ title: 'Removed from Wishlist', description: 'Product removed from your wishlist.' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Could not remove from wishlist', variant: 'destructive' });
    },
  });

  return {
    wishlist,
    isLoading,
    addToWishlist,
    removeFromWishlist,
    isWishlisted: (productId: string) => wishlist.some((p) => p.id === productId),
  };
}

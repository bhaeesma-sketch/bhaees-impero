import { Header } from '@/components/layout/header';
import { ProductCard } from '@/components/product/product-card';
import { useWishlist } from '@/hooks/use-wishlist';
import { useAuth } from '@/hooks/use-auth';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function WishlistPage() {
  const { wishlist, isLoading } = useWishlist();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-serif mb-4">Your Wishlist</h1>
          <p className="text-muted-foreground mb-8">Please log in to view your wishlist.</p>
          <Link href="/auth">
            <Button>Log In</Button>
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-serif mb-8 text-center md:text-left text-gradient-gold">Your Wishlist</h1>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-[4/5] bg-gray-100 animate-pulse rounded-xl" />
            ))}
          </div>
        ) : wishlist.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground mb-6">Your wishlist is empty.</p>
            <Link href="/catalog">
              <Button size="lg" className="bg-gradient-gold text-white hover:opacity-90">
                Browse Collection
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {wishlist.map((product: any) => (
              <ProductCard
                key={product.id}
                {...product}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

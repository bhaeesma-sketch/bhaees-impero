import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Pencil, Trash2, Package, LogOut, Home, Loader2, Eye, Users, BarChart3, Clock, Globe } from "lucide-react";
import { Link } from "wouter";
import { PRODUCTS as STATIC_PRODUCTS } from "@/lib/products";
import { format } from "date-fns";

type Purity = "18K" | "21K" | "22K" | "24K" | "Silver";
type ProductType = "bullion" | "jewelry";
type ProductCategory = "coins" | "bars" | "silver" | "jewelry";
type Availability = "In Stock" | "Out of Stock" | "Made to Order";

interface Product {
  id: string;
  name: string;
  image: string;
  images: string[] | null;
  purity: Purity;
  baseWeight: number;
  displayWeight: string | null;
  customWeights: number[] | null;
  makingCharge: number;
  type: ProductType;
  category: ProductCategory;
  description: string;
  manufacturer: string;
  availability: Availability;
  productCode: string;
}

interface ProductFormData {
  name: string;
  image: string;
  images: string[];
  purity: Purity;
  baseWeight: number;
  displayWeight: string;
  customWeights: number[];
  makingCharge: number;
  type: ProductType;
  category: ProductCategory;
  description: string;
  manufacturer: string;
  availability: Availability;
  productCode: string;
}

const emptyProduct: ProductFormData = {
  name: "",
  image: "",
  images: [],
  purity: "24K",
  baseWeight: 1,
  displayWeight: "",
  customWeights: [],
  makingCharge: 0,
  type: "bullion",
  category: "coins",
  description: "",
  manufacturer: "Impero Di Gold",
  availability: "In Stock",
  productCode: "",
};

export default function AdminPage() {
  const { user, logout, isLoading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState(emptyProduct);
  const [isSaving, setIsSaving] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [logs, setLogs] = useState<any[]>([]);
  const [stats, setStats] = useState<{ totalViews: number, uniqueVisitors: number }>({ totalViews: 0, uniqueVisitors: 0 });
  const [isLogsLoading, setIsLogsLoading] = useState(true);

  useEffect(() => {
    if (user?.isAdmin) {
      fetchLogs();
      fetchStats();
    }
  }, [user]);

  const fetchLogs = async () => {
    try {
      const res = await fetch("/api/analytics/logs");
      const data = await res.json();
      setLogs(data);
    } catch (error) {
      console.error("Failed to load logs");
    } finally {
      setIsLogsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/analytics/stats");
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error("Failed to load stats");
    }
  };

  useEffect(() => {
    if (!authLoading && (!user || !user.isAdmin)) {
      setLocation("/auth");
    }
  }, [user, authLoading, setLocation]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      toast({ title: "Error", description: "Failed to load products", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSeedProducts = async () => {
    setIsSeeding(true);
    try {
      const productsToSeed = STATIC_PRODUCTS.map(p => ({
        name: p.name,
        image: p.image,
        images: p.images || [p.image],
        purity: p.purity,
        baseWeight: p.baseWeight,
        displayWeight: p.displayWeight || null,
        customWeights: p.customWeights || [p.baseWeight],
        makingCharge: p.makingCharge,
        type: p.type,
        category: p.category,
        description: p.description,
        manufacturer: p.manufacturer,
        availability: p.availability,
        productCode: p.productCode,
      }));

      const res = await fetch("/api/admin/seed-products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products: productsToSeed }),
      });

      if (!res.ok) throw new Error("Failed to seed");

      const data = await res.json();
      toast({ title: "Success", description: data.message });
      fetchProducts();
    } catch (error) {
      toast({ title: "Error", description: "Failed to seed products", variant: "destructive" });
    } finally {
      setIsSeeding(false);
    }
  };

  const openAddDialog = () => {
    setEditingProduct(null);
    setFormData(emptyProduct);
    setIsDialogOpen(true);
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      image: product.image,
      images: product.images || [],
      purity: product.purity,
      baseWeight: product.baseWeight,
      displayWeight: product.displayWeight || "",
      customWeights: product.customWeights || [],
      makingCharge: product.makingCharge,
      type: product.type,
      category: product.category,
      description: product.description,
      manufacturer: product.manufacturer,
      availability: product.availability,
      productCode: product.productCode,
    });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = {
        ...formData,
        images: formData.images.length > 0 ? formData.images : [formData.image],
        displayWeight: formData.displayWeight || null,
        customWeights: formData.customWeights.length > 0 ? formData.customWeights : [formData.baseWeight],
      };

      let res;
      if (editingProduct) {
        res = await fetch(`/api/admin/products/${editingProduct.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      toast({ title: "Success", description: editingProduct ? "Product updated" : "Product created" });
      setIsDialogOpen(false);
      fetchProducts();
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to save product", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");

      toast({ title: "Deleted", description: "Product removed from catalog" });
      fetchProducts();
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete product", variant: "destructive" });
    }
  };

  if (authLoading || (!user?.isAdmin)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-serif text-2xl font-bold text-gray-900">IDi Admin Panel</h1>
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
              {user.username}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <Home className="w-4 h-4" /> View Site
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={() => logout()} className="gap-2">
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="catalog" className="space-y-6">
          <TabsList className="bg-white border border-gray-200 p-1">
            <TabsTrigger value="catalog" className="gap-2">
              <Package className="w-4 h-4" /> Catalog Management
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <BarChart3 className="w-4 h-4" /> User Analytics & Logs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="catalog">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Product Catalog</h2>
                <p className="text-sm text-gray-500">{products.length} products</p>
              </div>
              <div className="flex gap-3">
                {products.length === 0 && (
                  <Button
                    variant="outline"
                    onClick={handleSeedProducts}
                    disabled={isSeeding}
                    className="gap-2"
                  >
                    {isSeeding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Package className="w-4 h-4" />}
                    Import Catalog
                  </Button>
                )}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={openAddDialog} className="gap-2 bg-primary hover:bg-primary/90">
                      <Plus className="w-4 h-4" /> Add Product
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="font-serif text-xl">
                        {editingProduct ? "Edit Product" : "Add New Product"}
                      </DialogTitle>
                      <DialogDescription>
                        Fill in the product details below.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Product Name</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="IDi 1 Gram Gold Coin"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="productCode">Product Code</Label>
                          <Input
                            id="productCode"
                            value={formData.productCode}
                            onChange={(e) => setFormData({ ...formData, productCode: e.target.value })}
                            placeholder="IDi-GC-1G-22K"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="image">Image URL</Label>
                        <Input
                          id="image"
                          value={formData.image}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          placeholder="https://example.com/image.png"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Type</Label>
                          <Select value={formData.type} onValueChange={(v: "bullion" | "jewelry") => setFormData({ ...formData, type: v })}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="bullion">Bullion</SelectItem>
                              <SelectItem value="jewelry">Jewelry</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Category</Label>
                          <Select value={formData.category} onValueChange={(v: ProductCategory) => setFormData({ ...formData, category: v })}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="coins">Coins</SelectItem>
                              <SelectItem value="bars">Bars</SelectItem>
                              <SelectItem value="silver">Silver</SelectItem>
                              <SelectItem value="jewelry">Jewelry</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Purity</Label>
                          <Select value={formData.purity} onValueChange={(v: "18K" | "21K" | "22K" | "24K") => setFormData({ ...formData, purity: v })}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="18K">18K</SelectItem>
                              <SelectItem value="21K">21K</SelectItem>
                              <SelectItem value="22K">22K</SelectItem>
                              <SelectItem value="24K">24K</SelectItem>
                              <SelectItem value="Silver">Silver</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="baseWeight">Base Weight (g)</Label>
                          <Input
                            id="baseWeight"
                            type="number"
                            value={formData.baseWeight}
                            onChange={(e) => setFormData({ ...formData, baseWeight: parseFloat(e.target.value) || 0 })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="makingCharge">Making Charge</Label>
                          <Input
                            id="makingCharge"
                            type="number"
                            value={formData.makingCharge}
                            onChange={(e) => setFormData({ ...formData, makingCharge: parseInt(e.target.value) || 0 })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Availability</Label>
                          <Select value={formData.availability} onValueChange={(v: "In Stock" | "Out of Stock" | "Made to Order") => setFormData({ ...formData, availability: v })}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="In Stock">In Stock</SelectItem>
                              <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                              <SelectItem value="Made to Order">Made to Order</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="displayWeight">Display Weight (Optional)</Label>
                        <Input
                          id="displayWeight"
                          value={formData.displayWeight}
                          onChange={(e) => setFormData({ ...formData, displayWeight: e.target.value })}
                          placeholder="10 Tola"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="manufacturer">Manufacturer</Label>
                        <Input
                          id="manufacturer"
                          value={formData.manufacturer}
                          onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          rows={4}
                        />
                      </div>
                    </div>

                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                      <Button onClick={handleSave} disabled={isSaving} className="bg-primary hover:bg-primary/90">
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                        {editingProduct ? "Update" : "Create"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : products.length === 0 ? (
              <Card className="text-center py-20">
                <CardContent>
                  <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No products yet</h3>
                  <p className="text-gray-500 mb-6">Get started by importing your existing catalog or adding a new product.</p>
                  <Button onClick={handleSeedProducts} disabled={isSeeding} className="gap-2">
                    {isSeeding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Package className="w-4 h-4" />}
                    Import Existing Catalog
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {products.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    <div className="flex items-center">
                      <div className="w-24 h-24 bg-gray-100 flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                      <CardContent className="flex-1 py-4 flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">{product.name}</h3>
                          <p className="text-sm text-gray-500">
                            {product.productCode} • {product.purity} • {product.type}
                          </p>
                          <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full ${product.availability === "In Stock"
                            ? "bg-green-100 text-green-700"
                            : product.availability === "Made to Order"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-red-100 text-red-700"
                            }`}>
                            {product.availability}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => openEditDialog(product)}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(product.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalViews}</div>
                  <p className="text-xs text-muted-foreground">+0% from last week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.uniqueVisitors}</div>
                  <p className="text-xs text-muted-foreground">Based on unique IP addresses</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Security & Activity Logs</CardTitle>
                <CardDescription>Real-time updates of user presence and clicks on the site.</CardDescription>
              </CardHeader>
              <CardContent>
                {isLogsLoading ? (
                  <div className="flex items-center justify-center py-10">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  </div>
                ) : logs.length === 0 ? (
                  <div className="text-center py-10 text-gray-500 italic">No logs recorded yet.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                          <th className="px-4 py-3">Event</th>
                          <th className="px-4 py-3">Details</th>
                          <th className="px-4 py-3">User</th>
                          <th className="px-4 py-3">IP Address</th>
                          <th className="px-4 py-3">Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {logs.map((log) => (
                          <tr key={log.id} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded text-[10px] font-bold ${log.eventType === 'PAGE_VIEW' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                                }`}>
                                {log.eventType}
                              </span>
                            </td>
                            <td className="px-4 py-3 truncate max-w-[200px]">
                              {JSON.stringify(log.details)}
                            </td>
                            <td className="px-4 py-3">{log.userId || 'Guest'}</td>
                            <td className="px-4 py-3 font-mono text-xs">{log.ipAddress}</td>
                            <td className="px-4 py-3 text-gray-500">
                              {format(new Date(log.timestamp), "MMM d, HH:mm:ss")}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

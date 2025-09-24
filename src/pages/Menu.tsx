import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { CartButton } from "@/components/cart/CartButton";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";
import { Plus } from "lucide-react";
import coffeeLatteImg from "@/assets/coffee-latte.jpg";
import pastriesImg from "@/assets/pastries.jpg";
import coldDrinksImg from "@/assets/cold-drinks.jpg";

const Menu = () => {
  const { addToCart, loading } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  
  const menuCategories = [
    {
      title: "Hot Drinks",
      description: "Warm your soul with our expertly crafted hot beverages",
      image: coffeeLatteImg,
      items: [
        { name: "Classic Espresso", price: 3.50, description: "Rich, bold shot of pure coffee perfection" },
        { name: "Cappuccino", price: 4.75, description: "Espresso with steamed milk and foam art" },
        { name: "Caramel Macchiato", price: 5.25, description: "Vanilla syrup, steamed milk, espresso, and caramel" },
        { name: "House Blend Drip Coffee", price: 2.95, description: "Our signature medium roast blend" },
        { name: "Mocha Latte", price: 5.50, description: "Chocolate and espresso with steamed milk" },
        { name: "Chai Tea Latte", price: 4.95, description: "Spiced chai blend with steamed milk" },
      ]
    },
    {
      title: "Cold Drinks",
      description: "Refreshing cold beverages for any time of day",
      image: coldDrinksImg,
      items: [
        { name: "Iced Coffee", price: 3.75, description: "Smooth cold brew over ice" },
        { name: "Frappuccino", price: 5.95, description: "Blended coffee drink with whipped cream" },
        { name: "Cold Brew", price: 4.25, description: "Slow-steeped for 12 hours, naturally sweet" },
        { name: "Iced Vanilla Latte", price: 5.25, description: "Espresso, milk, and vanilla over ice" },
        { name: "Fruit Smoothie", price: 6.50, description: "Fresh fruit blended with yogurt" },
        { name: "Iced Tea", price: 2.95, description: "Fresh brewed tea served over ice" },
      ]
    },
    {
      title: "Pastries & Baked Goods",
      description: "Fresh-baked daily in our kitchen",
      image: pastriesImg,
      items: [
        { name: "Croissant", price: 3.25, description: "Buttery, flaky French pastry", popular: true },
        { name: "Blueberry Muffin", price: 3.75, description: "Fresh blueberries in tender muffin" },
        { name: "Chocolate Chip Cookie", price: 2.50, description: "Warm, gooey chocolate chip goodness" },
        { name: "Danish Pastry", price: 4.25, description: "Sweet pastry with seasonal fruit" },
        { name: "Bagel with Cream Cheese", price: 4.50, description: "Fresh bagel with artisan cream cheese" },
        { name: "Scone", price: 3.95, description: "Traditional British pastry with jam" },
      ]
    },
    {
      title: "Snacks & Light Bites",
      description: "Perfect accompaniments to your favorite drink",
      image: pastriesImg,
      items: [
        { name: "Avocado Toast", price: 7.95, description: "Smashed avocado on artisan bread", popular: true },
        { name: "Grilled Panini", price: 8.50, description: "Fresh ingredients pressed to perfection" },
        { name: "Greek Yogurt Parfait", price: 6.25, description: "Yogurt layered with granola and berries" },
        { name: "Quinoa Salad", price: 9.95, description: "Fresh vegetables with quinoa and dressing" },
        { name: "Hummus & Veggie Wrap", price: 7.75, description: "Fresh vegetables with creamy hummus" },
        { name: "Soup of the Day", price: 5.95, description: "Ask your barista about today's selection" },
      ]
    }
  ];

  const handleAddToCart = async (item: any, category: string) => {
    await addToCart({
      name: item.name,
      price: item.price,
      description: item.description,
      category: category
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Header */}
        <section className="bg-gradient-hero text-cream py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <div className="flex-1">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Menu</h1>
                <p className="text-xl text-cream/90 max-w-2xl">
                  Discover our carefully curated selection of premium coffee, fresh pastries, and delicious light bites
                </p>
              </div>
              <div className="ml-4">
                <CartButton onClick={() => setCartOpen(true)} />
              </div>
            </div>
          </div>
        </section>

        {/* Menu Categories */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {menuCategories.map((category, categoryIndex) => (
                <div key={category.title}>
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-primary mb-4">{category.title}</h2>
                    <p className="text-lg text-muted-foreground">{category.description}</p>
                  </div>
                  
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {category.items.map((item, index) => (
                       <Card key={index} className="hover:shadow-medium transition-all duration-300 group">
                         <CardHeader>
                           <div className="flex justify-between items-start">
                             <div className="flex-1">
                               <CardTitle className="text-lg group-hover:text-primary transition-colors">
                                 {item.name}
                                 {item.popular && (
                                   <Badge variant="secondary" className="ml-2 bg-gold text-accent-foreground">
                                     Popular
                                   </Badge>
                                 )}
                               </CardTitle>
                               <CardDescription className="mt-2">{item.description}</CardDescription>
                               <div className="flex items-center justify-between mt-4">
                                 <span className="text-lg font-bold text-primary">${item.price.toFixed(2)}</span>
                                 <Button
                                   size="sm"
                                   onClick={() => handleAddToCart(item, category.title)}
                                   disabled={loading}
                                   className="ml-3"
                                 >
                                   <Plus className="h-4 w-4 mr-1" />
                                   Add to Cart
                                 </Button>
                               </div>
                             </div>
                           </div>
                         </CardHeader>
                       </Card>
                     ))}
                   </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  );
};

export default Menu;
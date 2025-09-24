import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Coffee, Heart, Star, Clock, Award, Users } from "lucide-react";
import heroImg from "@/assets/hero-coffee.jpg";
import coffeeLatteImg from "@/assets/coffee-latte.jpg";
import pastriesImg from "@/assets/pastries.jpg";
import coldDrinksImg from "@/assets/cold-drinks.jpg";

const Home = () => {
  const features = [
    {
      icon: Coffee,
      title: "Premium Coffee",
      description: "Ethically sourced beans roasted to perfection"
    },
    {
      icon: Heart,
      title: "Made with Love",
      description: "Every cup crafted with passion and care"
    },
    {
      icon: Clock,
      title: "Fresh Daily",
      description: "Pastries baked fresh every morning"
    },
    {
      icon: Users,
      title: "Community Hub",
      description: "A warm gathering place for coffee lovers"
    }
  ];

  const popularItems = [
    {
      name: "Signature Latte",
      description: "Our house blend with perfectly steamed milk",
      price: "$4.75",
      image: coffeeLatteImg,
      popular: true
    },
    {
      name: "Fresh Croissants",
      description: "Buttery, flaky pastries baked daily",
      price: "$3.25",
      image: pastriesImg,
      popular: true
    },
    {
      name: "Cold Brew",
      description: "Smooth, naturally sweet cold coffee",
      price: "$4.25",
      image: coldDrinksImg,
      popular: false
    }
  ];

  const testimonials = [
    {
      text: "BrewHaven has become my second home. The coffee is exceptional and the atmosphere is perfect for getting work done.",
      author: "Sarah Johnson",
      rating: 5
    },
    {
      text: "Best coffee in the city! The baristas know their craft and the pastries are always fresh.",
      author: "Mike Chen",
      rating: 5
    },
    {
      text: "A true community gem. Great coffee, friendly staff, and a cozy atmosphere that keeps me coming back.",
      author: "Emily Rodriguez",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={heroImg} 
              alt="Cozy coffee shop interior with beautiful latte art" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-coffee-dark/50"></div>
          </div>
          
          <div className="relative text-center text-cream max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Welcome to <span className="text-gold">BrewHaven</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-cream/90 max-w-2xl mx-auto">
              Your neighborhood coffee sanctuary where exceptional coffee meets warm hospitality. 
              Every cup tells a story of quality, community, and care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" size="lg">
                <Link to="/menu">Explore Our Menu</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-cream text-cream hover:bg-cream hover:text-coffee-dark">
                <Link to="/contact">Book a Table</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-primary mb-4">Why Choose BrewHaven?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We're passionate about creating the perfect coffee experience for our community
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center shadow-soft hover:shadow-medium transition-all duration-300 group">
                  <CardContent className="pt-8">
                    <feature.icon className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-lg font-semibold text-primary mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Items */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-primary mb-4">Customer Favorites</h2>
              <p className="text-lg text-muted-foreground">
                Discover our most loved items that keep customers coming back
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {popularItems.map((item, index) => (
                <Card key={index} className="overflow-hidden shadow-medium hover:shadow-strong transition-all duration-300 group">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {item.popular && (
                      <Badge className="absolute top-4 left-4 bg-gold text-accent-foreground">
                        Popular
                      </Badge>
                    )}
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="group-hover:text-primary transition-colors">{item.name}</CardTitle>
                        <CardDescription className="mt-2">{item.description}</CardDescription>
                      </div>
                      <span className="text-lg font-bold text-primary">{item.price}</span>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button asChild variant="default" size="lg">
                <Link to="/menu">View Full Menu</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gradient-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-primary mb-4">What Our Customers Say</h2>
              <p className="text-lg text-muted-foreground">
                Real reviews from our coffee community
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="shadow-soft hover:shadow-medium transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-gold fill-current" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                    <p className="font-semibold text-primary">- {testimonial.author}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-hero text-cream">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-6">Ready to Experience BrewHaven?</h2>
            <p className="text-xl mb-8 text-cream/90">
              Join our coffee community and discover your new favorite spot. 
              We're open early and staying late to serve you the perfect cup.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" size="lg">
                <Link to="/contact">Book Your Table</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-cream text-cream hover:bg-cream hover:text-coffee-dark">
                <Link to="/about">Learn Our Story</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
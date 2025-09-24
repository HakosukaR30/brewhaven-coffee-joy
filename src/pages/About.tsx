import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Heart, Award, Coffee, Users } from "lucide-react";
import heroImg from "@/assets/hero-coffee.jpg";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Passion",
      description: "Every cup is crafted with love and dedication to the art of coffee making."
    },
    {
      icon: Award,
      title: "Quality",
      description: "We source only the finest beans and use premium ingredients in everything we make."
    },
    {
      icon: Coffee,
      title: "Craftsmanship",
      description: "Our skilled baristas are trained in the traditional methods of coffee preparation."
    },
    {
      icon: Users,
      title: "Community",
      description: "We're more than a coffee shop - we're a gathering place for our neighborhood."
    }
  ];

  const stats = [
    { number: "5+", label: "Years Serving" },
    { number: "50K+", label: "Cups Served" },
    { number: "100+", label: "Regular Customers" },
    { number: "15", label: "Coffee Varieties" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={heroImg} 
              alt="Coffee shop interior" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-coffee-dark/60"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-cream mb-6">About BrewHaven</h1>
            <p className="text-xl text-cream/90 max-w-3xl mx-auto">
              Where passion meets perfection in every cup. Discover the story behind your favorite neighborhood coffee haven.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    BrewHaven was born from a simple dream: to create a warm, welcoming space where coffee lovers could gather, connect, and enjoy the perfect cup. Founded in 2019 by coffee enthusiasts Maria and James Rodriguez, our journey began with a passion for exceptional coffee and genuine hospitality.
                  </p>
                  <p>
                    What started as a small neighborhood coffee shop has grown into a beloved community hub. We take pride in sourcing our beans directly from sustainable farms around the world, ensuring that every cup tells a story of quality, ethics, and care.
                  </p>
                  <p>
                    Today, BrewHaven continues to be guided by our founding principles: exceptional quality, genuine service, and creating connections one cup at a time. We're not just serving coffee; we're brewing community.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <Card key={index} className="text-center p-6 shadow-soft">
                    <CardContent className="pt-6">
                      <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">Our Values</h2>
              <p className="text-lg text-muted-foreground">
                The principles that guide everything we do at BrewHaven
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-medium transition-all duration-300">
                  <CardContent className="pt-6">
                    <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-primary mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Location & Hours */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">Visit Us</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">Location</h3>
                    <p className="text-muted-foreground">
                      123 Coffee Street<br />
                      Bean City, BC 12345<br />
                      Phone: (555) 123-BREW
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">Hours</h3>
                    <div className="space-y-1 text-muted-foreground">
                      <p>Monday - Friday: 6:00 AM - 8:00 PM</p>
                      <p>Saturday - Sunday: 7:00 AM - 9:00 PM</p>
                    </div>
                  </div>
                  <div>
                    <Badge variant="secondary" className="bg-gold text-accent-foreground">
                      Free WiFi Available
                    </Badge>
                  </div>
                </div>
              </div>
              <Card className="shadow-medium">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-primary mb-4">Why Choose BrewHaven?</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Locally roasted, ethically sourced coffee beans</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Fresh pastries baked daily on-site</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Cozy atmosphere perfect for work or relaxation</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Friendly staff who know your name and order</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Community events and coffee cupping sessions</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
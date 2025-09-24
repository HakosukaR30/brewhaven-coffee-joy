import { Coffee, MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-coffee-dark text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Coffee className="h-8 w-8 text-gold" />
              <span className="text-2xl font-bold text-gold">BrewHaven</span>
            </div>
            <p className="text-cream/80 mb-4">
              Your neighborhood coffee haven, serving premium coffee and fresh pastries 
              in a warm, welcoming atmosphere. Come experience the perfect blend of 
              quality and comfort.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-cream/80 hover:text-gold transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-cream/80 hover:text-gold transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-cream/80 hover:text-gold transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-cream/80">
                <MapPin className="h-4 w-4" />
                <span>123 Coffee Street, Bean City, BC 12345</span>
              </div>
              <div className="flex items-center space-x-2 text-cream/80">
                <Phone className="h-4 w-4" />
                <span>(555) 123-BREW</span>
              </div>
              <div className="flex items-center space-x-2 text-cream/80">
                <Mail className="h-4 w-4" />
                <span>hello@brewhaven.com</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-lg font-semibold text-gold mb-4">Hours</h3>
            <div className="space-y-2 text-cream/80">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Mon - Fri: 6:00 AM - 8:00 PM</span>
              </div>
              <div className="ml-6">
                <span>Sat - Sun: 7:00 AM - 9:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-cream/20 mt-8 pt-8 text-center text-cream/60">
          <p>&copy; 2024 BrewHaven. All rights reserved. | Made with ❤️ and ☕</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
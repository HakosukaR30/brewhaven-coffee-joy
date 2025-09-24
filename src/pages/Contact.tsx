import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, Calendar } from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().optional(),
  subject: z.string().trim().min(1, "Subject is required").max(200, "Subject must be less than 200 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

const reservationSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(1, "Phone number is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  guests: z.string().min(1, "Number of guests is required"),
  specialRequests: z.string().trim().max(500, "Special requests must be less than 500 characters").optional(),
});

const Contact = () => {
  const { toast } = useToast();
  
  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  
  // Reservation form state
  const [reservationForm, setReservationForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    specialRequests: "",
  });

  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});
  const [reservationErrors, setReservationErrors] = useState<Record<string, string>>({});

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactErrors({});
    
    try {
      contactSchema.parse(contactForm);
      // Form is valid
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you soon!",
      });
      
      // Reset form
      setContactForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMap: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            errorMap[err.path[0] as string] = err.message;
          }
        });
        setContactErrors(errorMap);
      }
    }
  };

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReservationErrors({});
    
    try {
      reservationSchema.parse(reservationForm);
      // Form is valid
      toast({
        title: "Reservation Request Sent!",
        description: "We'll confirm your reservation within 24 hours.",
      });
      
      // Reset form
      setReservationForm({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: "",
        specialRequests: "",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMap: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            errorMap[err.path[0] as string] = err.message;
          }
        });
        setReservationErrors(errorMap);
      }
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["123 Coffee Street", "Bean City, BC 12345"]
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["(555) 123-BREW", "(555) 123-2739"]
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["hello@brewhaven.com", "events@brewhaven.com"]
    },
    {
      icon: Clock,
      title: "Hours",
      details: ["Mon-Fri: 6AM-8PM", "Sat-Sun: 7AM-9PM"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Header */}
        <section className="bg-gradient-hero text-cream py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-cream/90 max-w-2xl mx-auto">
              Get in touch with us for inquiries, feedback, or to make a reservation
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactInfo.map((info, index) => (
                <Card key={index} className="text-center shadow-soft hover:shadow-medium transition-all duration-300">
                  <CardContent className="pt-6">
                    <info.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-primary mb-2">{info.title}</h3>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-muted-foreground text-sm">{detail}</p>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Mail className="h-5 w-5" />
                    <span>Send us a Message</span>
                  </CardTitle>
                  <CardDescription>
                    Have a question or feedback? We'd love to hear from you.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="contact-name">Name *</Label>
                        <Input
                          id="contact-name"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                          className={contactErrors.name ? "border-destructive" : ""}
                        />
                        {contactErrors.name && (
                          <p className="text-sm text-destructive mt-1">{contactErrors.name}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="contact-email">Email *</Label>
                        <Input
                          id="contact-email"
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                          className={contactErrors.email ? "border-destructive" : ""}
                        />
                        {contactErrors.email && (
                          <p className="text-sm text-destructive mt-1">{contactErrors.email}</p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="contact-phone">Phone</Label>
                        <Input
                          id="contact-phone"
                          type="tel"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="contact-subject">Subject *</Label>
                        <Input
                          id="contact-subject"
                          value={contactForm.subject}
                          onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                          className={contactErrors.subject ? "border-destructive" : ""}
                        />
                        {contactErrors.subject && (
                          <p className="text-sm text-destructive mt-1">{contactErrors.subject}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="contact-message">Message *</Label>
                      <Textarea
                        id="contact-message"
                        rows={4}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                        className={contactErrors.message ? "border-destructive" : ""}
                      />
                      {contactErrors.message && (
                        <p className="text-sm text-destructive mt-1">{contactErrors.message}</p>
                      )}
                    </div>
                    <Button type="submit" className="w-full">Send Message</Button>
                  </form>
                </CardContent>
              </Card>

              {/* Reservation Form */}
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Make a Reservation</span>
                  </CardTitle>
                  <CardDescription>
                    Reserve a table for your next visit to BrewHaven.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleReservationSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="res-name">Name *</Label>
                        <Input
                          id="res-name"
                          value={reservationForm.name}
                          onChange={(e) => setReservationForm({...reservationForm, name: e.target.value})}
                          className={reservationErrors.name ? "border-destructive" : ""}
                        />
                        {reservationErrors.name && (
                          <p className="text-sm text-destructive mt-1">{reservationErrors.name}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="res-email">Email *</Label>
                        <Input
                          id="res-email"
                          type="email"
                          value={reservationForm.email}
                          onChange={(e) => setReservationForm({...reservationForm, email: e.target.value})}
                          className={reservationErrors.email ? "border-destructive" : ""}
                        />
                        {reservationErrors.email && (
                          <p className="text-sm text-destructive mt-1">{reservationErrors.email}</p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="res-phone">Phone *</Label>
                        <Input
                          id="res-phone"
                          type="tel"
                          value={reservationForm.phone}
                          onChange={(e) => setReservationForm({...reservationForm, phone: e.target.value})}
                          className={reservationErrors.phone ? "border-destructive" : ""}
                        />
                        {reservationErrors.phone && (
                          <p className="text-sm text-destructive mt-1">{reservationErrors.phone}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="res-guests">Number of Guests *</Label>
                        <Input
                          id="res-guests"
                          type="number"
                          min="1"
                          max="10"
                          value={reservationForm.guests}
                          onChange={(e) => setReservationForm({...reservationForm, guests: e.target.value})}
                          className={reservationErrors.guests ? "border-destructive" : ""}
                        />
                        {reservationErrors.guests && (
                          <p className="text-sm text-destructive mt-1">{reservationErrors.guests}</p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="res-date">Date *</Label>
                        <Input
                          id="res-date"
                          type="date"
                          value={reservationForm.date}
                          onChange={(e) => setReservationForm({...reservationForm, date: e.target.value})}
                          className={reservationErrors.date ? "border-destructive" : ""}
                        />
                        {reservationErrors.date && (
                          <p className="text-sm text-destructive mt-1">{reservationErrors.date}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="res-time">Time *</Label>
                        <Input
                          id="res-time"
                          type="time"
                          value={reservationForm.time}
                          onChange={(e) => setReservationForm({...reservationForm, time: e.target.value})}
                          className={reservationErrors.time ? "border-destructive" : ""}
                        />
                        {reservationErrors.time && (
                          <p className="text-sm text-destructive mt-1">{reservationErrors.time}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="res-requests">Special Requests</Label>
                      <Textarea
                        id="res-requests"
                        rows={3}
                        placeholder="Any special requests or dietary restrictions?"
                        value={reservationForm.specialRequests}
                        onChange={(e) => setReservationForm({...reservationForm, specialRequests: e.target.value})}
                        className={reservationErrors.specialRequests ? "border-destructive" : ""}
                      />
                      {reservationErrors.specialRequests && (
                        <p className="text-sm text-destructive mt-1">{reservationErrors.specialRequests}</p>
                      )}
                    </div>
                    <Button type="submit" variant="coffee" className="w-full">
                      Request Reservation
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Map Placeholder */}
            <div className="mt-16">
              <Card className="shadow-medium">
                <CardContent className="p-0">
                  <div className="h-64 bg-gradient-card rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-primary mb-2">Find Us Here</h3>
                      <p className="text-muted-foreground">123 Coffee Street, Bean City, BC 12345</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Interactive map coming soon
                      </p>
                    </div>
                  </div>
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

export default Contact;
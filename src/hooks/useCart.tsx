import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { User } from '@supabase/supabase-js';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'id' | 'quantity'>) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  totalPrice: number;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [sessionId, setSessionId] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Generate session ID for anonymous users
  useEffect(() => {
    let storedSessionId = localStorage.getItem('cart_session_id');
    if (!storedSessionId) {
      storedSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('cart_session_id', storedSessionId);
    }
    setSessionId(storedSessionId);
  }, []);

  // Track user authentication
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Load cart items
  useEffect(() => {
    if (sessionId) {
      loadCartItems();
    }
  }, [user, sessionId]);

  const loadCartItems = async () => {
    if (!sessionId) return;
    
    setLoading(true);
    try {
      const query = user 
        ? supabase.from('cart_items').select('*').eq('user_id', user.id)
        : supabase.from('cart_items').select('*').eq('session_id', sessionId);
        
      const { data, error } = await query;

      if (error) throw error;

      const cartItems: CartItem[] = data?.map(item => ({
        id: item.id,
        name: item.item_name,
        price: parseFloat(item.item_price.toString()),
        description: item.item_description || '',
        category: item.item_category || '',
        quantity: item.quantity
      })) || [];

      setItems(cartItems);
    } catch (error) {
      console.error('Error loading cart:', error);
      toast({
        title: "Error",
        description: "Failed to load cart items",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (item: Omit<CartItem, 'id' | 'quantity'>) => {
    setLoading(true);
    try {
      // Check if item already exists
      const existingItem = items.find(cartItem => 
        cartItem.name === item.name && cartItem.category === item.category
      );

      if (existingItem) {
        await updateQuantity(existingItem.id, existingItem.quantity + 1);
      } else {
        const { data, error } = await supabase
          .from('cart_items')
          .insert({
            user_id: user?.id || null,
            session_id: user ? null : sessionId,
            item_name: item.name,
            item_price: item.price,
            item_description: item.description,
            item_category: item.category,
            quantity: 1
          })
          .select()
          .single();

        if (error) throw error;

        const newItem: CartItem = {
          id: data.id,
          name: data.item_name,
          price: parseFloat(data.item_price.toString()),
          description: data.item_description || '',
          category: data.item_category || '',
          quantity: data.quantity
        };

        setItems(prev => [...prev, newItem]);
        toast({
          title: "Added to cart",
          description: `${item.name} added to your cart`,
        });
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (id: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setItems(prev => prev.filter(item => item.id !== id));
      toast({
        title: "Removed from cart",
        description: "Item removed from your cart",
      });
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast({
        title: "Error",
        description: "Failed to remove item from cart",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(id);
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', id);

      if (error) throw error;

      setItems(prev => prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast({
        title: "Error",
        description: "Failed to update item quantity",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    setLoading(true);
    try {
      const query = user 
        ? supabase.from('cart_items').delete().eq('user_id', user.id)
        : supabase.from('cart_items').delete().eq('session_id', sessionId);
        
      const { error } = await query;

      if (error) throw error;

      setItems([]);
      toast({
        title: "Cart cleared",
        description: "All items removed from your cart",
      });
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast({
        title: "Error",
        description: "Failed to clear cart",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      loading
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
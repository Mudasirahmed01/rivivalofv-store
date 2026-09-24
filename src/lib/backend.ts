// Backend Service Layer - Simulates real backend using localStorage
// This can be easily replaced with real Supabase/Firebase integration

import { Product, CartItem, Review } from '../types';

// Database simulation using localStorage
class BackendService {
  // ==================== PRODUCTS ====================
  
  static getProducts(): Product[] {
    const products = localStorage.getItem('db_products');
    if (products) {
      return JSON.parse(products);
    }
    // Return default products from data file
    return [];
  }

  static saveProducts(products: Product[]): void {
    localStorage.setItem('db_products', JSON.stringify(products));
  }

  static addProduct(product: Product): void {
    const products = this.getProducts();
    products.push(product);
    this.saveProducts(products);
  }

  static updateProduct(id: string, updates: Partial<Product>): void {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updates };
      this.saveProducts(products);
    }
  }

  static deleteProduct(id: string): void {
    const products = this.getProducts().filter(p => p.id !== id);
    this.saveProducts(products);
  }

  // ==================== USERS ====================
  
  static getUsers(): any[] {
    const users = localStorage.getItem('db_users');
    return users ? JSON.parse(users) : [];
  }

  static saveUsers(users: any[]): void {
    localStorage.setItem('db_users', JSON.stringify(users));
  }

  static registerUser(userData: {
    email: string;
    password: string;
    name: string;
    phone?: string;
  }): { success: boolean; message: string; user?: any } {
    const users = this.getUsers();
    
    // Check if user already exists
    if (users.find(u => u.email === userData.email)) {
      return { success: false, message: 'User already exists with this email' };
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString(),
      role: 'customer',
    };

    users.push(newUser);
    this.saveUsers(users);

    // Set current session
    localStorage.setItem('current_user', JSON.stringify(newUser));

    return { success: true, message: 'Registration successful', user: newUser };
  }

  static loginUser(email: string, password: string): { success: boolean; message: string; user?: any } {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return { success: false, message: 'Invalid email or password' };
    }

    localStorage.setItem('current_user', JSON.stringify(user));
    return { success: true, message: 'Login successful', user };
  }

  static logoutUser(): void {
    localStorage.removeItem('current_user');
  }

  static getCurrentUser(): any | null {
    const user = localStorage.getItem('current_user');
    return user ? JSON.parse(user) : null;
  }

  static updateUserProfile(updates: Partial<any>): void {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return;

    const users = this.getUsers();
    const index = users.findIndex(u => u.id === currentUser.id);
    
    if (index !== -1) {
      users[index] = { ...users[index], ...updates };
      this.saveUsers(users);
      localStorage.setItem('current_user', JSON.stringify(users[index]));
    }
  }

  // ==================== ORDERS ====================
  
  static getOrders(): any[] {
    const orders = localStorage.getItem('db_orders');
    return orders ? JSON.parse(orders) : [];
  }

  static saveOrders(orders: any[]): void {
    localStorage.setItem('db_orders', JSON.stringify(orders));
  }

  static createOrder(orderData: {
    items: CartItem[];
    total: number;
    shippingAddress: any;
    paymentMethod: string;
    couponCode?: string;
    discount?: number;
  }): { success: boolean; message: string; order?: any } {
    const currentUser = this.getCurrentUser();
    const subtotal = orderData.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    
    const newOrder = {
      id: 'ORD-' + Date.now(),
      userId: currentUser?.id || 'guest',
      userEmail: currentUser?.email || 'guest@example.com',
      items: orderData.items,
      subtotal: subtotal,
      discount: orderData.discount || 0,
      shipping: subtotal >= 50000 ? 0 : 250,
      tax: Math.round((orderData.total - (orderData.discount || 0)) * 0.08 * 100) / 100,
      total: orderData.total,
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod,
      couponCode: orderData.couponCode,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const orders = this.getOrders();
    orders.push(newOrder);
    this.saveOrders(orders);

    return { success: true, message: 'Order placed successfully', order: newOrder };
  }

  static getUserOrders(userId?: string): any[] {
    const currentUser = this.getCurrentUser();
    const targetUserId = userId || currentUser?.id;
    
    if (!targetUserId) return [];
    
    return this.getOrders().filter(o => o.userId === targetUserId);
  }

  static getOrderById(orderId: string): any | null {
    return this.getOrders().find(o => o.id === orderId) || null;
  }

  static updateOrderStatus(orderId: string, status: string): void {
    const orders = this.getOrders();
    const index = orders.findIndex(o => o.id === orderId);
    
    if (index !== -1) {
      orders[index].status = status;
      orders[index].updatedAt = new Date().toISOString();
      this.saveOrders(orders);
    }
  }

  // ==================== REVIEWS ====================
  
  static getReviews(): Review[] {
    const reviews = localStorage.getItem('db_reviews');
    return reviews ? JSON.parse(reviews) : [];
  }

  static saveReviews(reviews: Review[]): void {
    localStorage.setItem('db_reviews', JSON.stringify(reviews));
  }

  static addReview(review: Omit<Review, 'id' | 'date' | 'helpful'>): Review {
    const reviews = this.getReviews();
    
    const newReview: Review = {
      ...review,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
    };

    reviews.push(newReview);
    this.saveReviews(reviews);

    return newReview;
  }

  static getProductReviews(productId: string): Review[] {
    return this.getReviews().filter(r => r.productId === productId);
  }

  static markReviewHelpful(reviewId: string): void {
    const reviews = this.getReviews();
    const index = reviews.findIndex(r => r.id === reviewId);
    
    if (index !== -1) {
      reviews[index].helpful += 1;
      this.saveReviews(reviews);
    }
  }

  // ==================== ANALYTICS ====================
  
  static trackEvent(eventName: string, data?: any): void {
    const events = JSON.parse(localStorage.getItem('db_analytics') || '[]');
    events.push({
      event: eventName,
      data,
      timestamp: new Date().toISOString(),
      userId: this.getCurrentUser()?.id,
    });
    localStorage.setItem('db_analytics', JSON.stringify(events));
  }

  static getAnalytics(): any[] {
    return JSON.parse(localStorage.getItem('db_analytics') || '[]');
  }

  // ==================== INVENTORY ====================
  
  static updateStock(productId: string, variantId: string, quantity: number): void {
    const products = this.getProducts();
    const product = products.find(p => p.id === productId);
    
    if (product) {
      const variant = product.variants.find(v => v.sku === variantId);
      if (variant) {
        variant.stockCount = quantity;
        this.saveProducts(products);
      }
    }
  }

  static checkStock(productId: string, variantId: string): number {
    const products = this.getProducts();
    const product = products.find(p => p.id === productId);
    
    if (product) {
      const variant = product.variants.find(v => v.sku === variantId);
      return variant?.stockCount || 0;
    }
    
    return 0;
  }

  // ==================== WISHLIST ====================
  
  static getUserWishlist(userId?: string): Product[] {
    const currentUser = this.getCurrentUser();
    const targetUserId = userId || currentUser?.id;
    
    if (!targetUserId) return [];
    
    const wishlist = localStorage.getItem(`wishlist_${targetUserId}`);
    return wishlist ? JSON.parse(wishlist) : [];
  }

  static addToWishlist(productId: string): void {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return;

    const wishlist = this.getUserWishlist();
    const products = JSON.parse(localStorage.getItem('db_products') || '[]');
    const product = products.find((p: Product) => p.id === productId);
    
    if (product && !wishlist.find((p: Product) => p.id === productId)) {
      wishlist.push(product);
      localStorage.setItem(`wishlist_${currentUser.id}`, JSON.stringify(wishlist));
    }
  }

  static removeFromWishlist(productId: string): void {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return;

    const wishlist = this.getUserWishlist().filter((p: Product) => p.id !== productId);
    localStorage.setItem(`wishlist_${currentUser.id}`, JSON.stringify(wishlist));
  }

  // ==================== COUPONS ====================
  
  static validateCoupon(code: string): { valid: boolean; discount?: number; message: string } {
    const coupons = [
      { code: 'WELCOME10', discount: 10, type: 'percentage', minPurchase: 5000, maxDiscount: 1000 },
      { code: 'SAVE500', discount: 500, type: 'fixed', minPurchase: 3000 },
      { code: 'FLAT20', discount: 20, type: 'percentage', minPurchase: 10000, maxDiscount: 2000 },
    ];

    const coupon = coupons.find(c => c.code === code);
    
    if (!coupon) {
      return { valid: false, message: 'Invalid coupon code' };
    }

    return { 
      valid: true, 
      discount: coupon.discount, 
      message: 'Coupon applied successfully' 
    };
  }

  // ==================== DATABASE RESET ====================
  
  static resetDatabase(): void {
    const keys = [
      'db_products',
      'db_users',
      'db_orders',
      'db_reviews',
      'db_analytics',
      'current_user',
    ];
    
    keys.forEach(key => localStorage.removeItem(key));
  }
}

export default BackendService;

# Redux Toolkit Migration Guide

This project has been successfully migrated from React Context API to Redux Toolkit for state management across all three components.

## 🎯 **What Was Changed**

### 1. **Backend (ECommerce-Backend)**

- ✅ Added user registration and login endpoints
- ✅ Added cart and order management routes
- ✅ Added category management routes
- ✅ Products are now publicly accessible

### 2. **Admin Panel (ECommerce-Admin-Panel)**

- ✅ Replaced Context API with Redux Toolkit
- ✅ Created comprehensive Redux store with slices:
  - `authSlice` - Authentication state
  - `productSlice` - Product management
  - `categorySlice` - Category management
  - `orderSlice` - Order management
  - `uiSlice` - UI state (sidebar, modals, etc.)
- ✅ Maintains demo mode fallback for offline development

### 3. **Website (ECommerce)**

- ✅ Replaced Context API with Redux Toolkit
- ✅ Created comprehensive Redux store with slices:
  - `authSlice` - User authentication
  - `productSlice` - Product browsing
  - `categorySlice` - Category filtering
  - `cartSlice` - Shopping cart management
  - `orderSlice` - Order management
  - `uiSlice` - UI state (theme, search, etc.)

## 🚀 **How to Use Redux**

### **Basic Redux Usage in Components**

```jsx
import React from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { login, logout } from "../store/slices/authSlice";

const MyComponent = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);

  const handleLogin = () => {
    dispatch(login({ email: "user@example.com", password: "password" }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};
```

### **Available Redux Slices**

#### **Auth Slice**

- `login(credentials)` - User/Admin login
- `register(userData)` - User registration
- `logout()` - Logout user
- `getProfile()` - Get user profile
- `updateProfile(data)` - Update user profile
- `changePassword(data)` - Change password

#### **Product Slice**

- `fetchProducts(params)` - Get all products
- `fetchProductById(id)` - Get single product
- `createProduct(data)` - Create new product (Admin)
- `updateProduct({id, data})` - Update product (Admin)
- `deleteProduct(id)` - Delete product (Admin)
- `searchProducts(query)` - Search products

#### **Cart Slice (Website Only)**

- `addItem({productId, quantity, product})` - Add to cart
- `updateQuantity({productId, quantity})` - Update quantity
- `removeItem(productId)` - Remove from cart
- `clearCart()` - Clear all items

#### **Category Slice**

- `fetchCategories()` - Get all categories
- `createCategory(data)` - Create category (Admin)
- `updateCategory({id, data})` - Update category (Admin)
- `deleteCategory(id)` - Delete category (Admin)

#### **Order Slice**

- `createOrder(data)` - Create new order
- `fetchMyOrders()` - Get user orders
- `fetchOrders()` - Get all orders (Admin)
- `updateOrderStatus({id, status})` - Update order status (Admin)

#### **UI Slice**

- `toggleSidebar()` - Toggle sidebar
- `setTheme(theme)` - Set theme (light/dark)
- `openModal({modalName})` - Open modal
- `closeModal({modalName})` - Close modal
- `setSearchQuery(query)` - Set search query

## 🔧 **Project Structure**

```
src/
├── store/
│   ├── index.js          # Main store configuration
│   ├── hooks.js          # Redux hooks (useAppSelector, useAppDispatch)
│   └── slices/           # Redux slices
│       ├── authSlice.js
│       ├── productSlice.js
│       ├── categorySlice.js
│       ├── cartSlice.js
│       ├── orderSlice.js
│       └── uiSlice.js
```

## 📱 **Example Components**

Both projects include `ReduxExample.js` components that demonstrate:

- How to dispatch actions
- How to select state from the store
- How to handle async operations
- How to manage loading states

## 🌐 **API Integration**

All Redux slices are integrated with the backend API:

- **Admin Panel**: Uses `/api/auth/admin/login` for admin authentication
- **Website**: Uses `/api/auth/login` and `/api/auth/register` for user authentication
- **Both**: Share the same backend endpoints for products, categories, cart, and orders

## 🎨 **Benefits of Redux Toolkit**

1. **Centralized State Management** - All state in one place
2. **DevTools Integration** - Better debugging and state inspection
3. **Performance Optimization** - Automatic memoization and re-render optimization
4. **Middleware Support** - Easy to add logging, analytics, etc.
5. **TypeScript Support** - Better type safety and IntelliSense
6. **Predictable State Updates** - Clear action → reducer → state flow

## 🚦 **Getting Started**

1. **Install Dependencies**: Already done during migration
2. **Import Hooks**: Use `useAppSelector` and `useAppDispatch` instead of `useContext`
3. **Dispatch Actions**: Call `dispatch(actionName(payload))` to update state
4. **Select State**: Use `useAppSelector(state => state.sliceName.property)` to read state

## 🔄 **Migration Complete**

✅ **Context API removed** from all projects
✅ **Redux Toolkit installed** and configured
✅ **All slices created** with proper async thunks
✅ **Components updated** to use Redux
✅ **API integration** maintained
✅ **Demo mode fallback** preserved for development

Your ecommerce system now uses modern, scalable state management with Redux Toolkit!

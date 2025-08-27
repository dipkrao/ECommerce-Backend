# Dynamic Banner Feature

This document describes the implementation of the dynamic banner feature that allows administrators to manage homepage banners through the admin panel.

## Overview

The dynamic banner feature consists of:
- **Backend API**: Banner management endpoints with image upload
- **Admin Panel**: Banner management interface with CRUD operations
- **Website**: Dynamic banner slider component that displays active banners

## Features

### Backend Features
- ✅ Banner CRUD operations
- ✅ Image upload with validation
- ✅ Active/inactive status management
- ✅ Date-based scheduling (start/end dates)
- ✅ Order management for banner positioning
- ✅ Automatic image cleanup on deletion
- ✅ Public endpoint for active banners

### Admin Panel Features
- ✅ Banner management interface
- ✅ Image upload with preview
- ✅ Drag-and-drop reordering
- ✅ Status toggle (active/inactive)
- ✅ Date scheduling
- ✅ Link and button text customization
- ✅ Responsive design

### Website Features
- ✅ Dynamic banner slider
- ✅ Auto-advance functionality
- ✅ Manual navigation (arrows and dots)
- ✅ Responsive design
- ✅ Loading states
- ✅ Fallback handling

## File Structure

```
ECommerce-Backend/
├── models/
│   └── Banner.js                 # Banner data model
├── controllers/
│   └── bannerController.js       # Banner business logic
├── routes/
│   └── banners.js               # Banner API routes
├── uploads/
│   └── banners/                 # Banner image storage
└── scripts/
    └── testBanner.js            # Banner API testing

ECommerce-Admin-Panel/
├── src/
│   ├── pages/
│   │   └── Banners.js           # Banner management page
│   └── components/
│       └── Sidebar.js           # Updated with banner nav

ECommerce/
├── src/
│   ├── components/
│   │   ├── BannerSlider.js      # Dynamic banner component
│   │   └── BannerSlider.css     # Banner styles
│   └── utils/
│       └── api.js               # Updated with banner API
```

## API Endpoints

### Public Endpoints
- `GET /api/banners/active` - Get active banners for website

### Protected Endpoints (Admin Only)
- `GET /api/banners` - Get all banners
- `GET /api/banners/:id` - Get single banner
- `POST /api/banners` - Create new banner
- `PUT /api/banners/:id` - Update banner
- `DELETE /api/banners/:id` - Delete banner
- `PATCH /api/banners/:id/toggle` - Toggle banner status
- `POST /api/banners/reorder` - Reorder banners

## Banner Model Schema

```javascript
{
  title: String,           // Banner title (required)
  description: String,     // Banner description (required)
  image: String,          // Image path (required)
  link: String,           // Optional link URL
  buttonText: String,     // Button text (default: "Shop Now")
  isActive: Boolean,      // Active status (default: true)
  order: Number,          // Display order (default: 0)
  startDate: Date,        // Start date for scheduling
  endDate: Date,          // End date for scheduling
  createdAt: Date,        // Auto-generated
  updatedAt: Date         // Auto-generated
}
```

## Setup Instructions

### 1. Backend Setup
```bash
cd ECommerce-Backend
npm install
npm run dev
```

### 2. Admin Panel Setup
```bash
cd ECommerce-Admin-Panel
npm install
npm start
```

### 3. Website Setup
```bash
cd ECommerce
npm install
npm start
```

### 4. Create Admin User (if not exists)
```bash
cd ECommerce-Backend
npm run create-admin
```

## Usage Guide

### Creating a Banner (Admin Panel)

1. **Login to Admin Panel**
   - Navigate to the admin panel
   - Login with admin credentials

2. **Access Banner Management**
   - Click on "Banners" in the sidebar
   - Click "Add Banner" button

3. **Fill Banner Details**
   - **Title**: Enter banner title (e.g., "Summer Sale")
   - **Description**: Enter banner description
   - **Button Text**: Customize button text (optional)
   - **Link**: Add destination URL (optional)
   - **Image**: Upload banner image (required)
   - **Start Date**: Set when banner should start showing
   - **End Date**: Set when banner should stop showing
   - **Order**: Set display order (lower numbers show first)
   - **Active**: Toggle banner visibility

4. **Save Banner**
   - Click "Create Banner" to save

### Managing Banners

- **Edit**: Click edit icon to modify banner
- **Delete**: Click delete icon to remove banner
- **Toggle Status**: Click eye icon to activate/deactivate
- **Reorder**: Drag and drop banners to change order

### Viewing Banners (Website)

- Banners automatically appear on the homepage
- Multiple banners create a carousel with auto-advance
- Users can navigate with arrows or dots
- Only active banners within date range are displayed

## Configuration

### Image Upload Settings
- **Max File Size**: 5MB
- **Allowed Formats**: JPEG, JPG, PNG, GIF, WebP
- **Storage Location**: `uploads/banners/`

### Banner Display Settings
- **Auto-advance Interval**: 5 seconds
- **Height**: 500px (desktop), 400px (tablet), 350px (mobile)
- **Max Width**: 1200px

## Testing

### Test Banner API
```bash
cd ECommerce-Backend
npm run test-banner
```

### Manual Testing
1. Create banners through admin panel
2. Verify banners appear on website
3. Test banner navigation and auto-advance
4. Test responsive design on different screen sizes

## Troubleshooting

### Common Issues

1. **Banners not appearing on website**
   - Check if banners are marked as active
   - Verify start/end dates are correct
   - Check browser console for API errors

2. **Image upload fails**
   - Verify file size is under 5MB
   - Check file format is supported
   - Ensure uploads/banners directory exists

3. **Admin panel not loading banners**
   - Check authentication token
   - Verify API endpoint is accessible
   - Check browser console for errors

### Debug Steps

1. **Check API Status**
   ```bash
   curl http://localhost:5000/api/banners/active
   ```

2. **Check File Permissions**
   ```bash
   ls -la uploads/banners/
   ```

3. **Check Server Logs**
   ```bash
   npm run dev
   # Watch console output for errors
   ```

## Future Enhancements

- [ ] Banner analytics and performance tracking
- [ ] A/B testing for different banner versions
- [ ] Banner targeting based on user segments
- [ ] Banner templates and themes
- [ ] Bulk banner operations
- [ ] Banner performance metrics dashboard

## Support

For issues or questions about the banner feature:
1. Check this documentation
2. Review the troubleshooting section
3. Check server logs for error details
4. Verify all three applications are running correctly

# Bayleaf Builders Real Estate Website

A modern, responsive real estate website for Bayleaf Builders, featuring a green/nature-inspired design, listings management, admin controls, and a demo messaging system—all using HTML, CSS, and JavaScript (with localStorage for demo persistence).

---

## 🌿 Features

- **Modern UI:** Green/nature-inspired palette, gradients, rounded corners, and responsive design.
- **Listings Management:**
  - View, search, and filter property listings in a beautiful grid.
  - Admins can add, edit, and delete listings (with up to 8 images per listing).
  - Listing statuses: Available, Sold, Reserved, Under Contract.
- **Admin Controls:**
  - Login/logout with UI state changes.
  - Admin-only controls for editing, deleting, and changing listing status.
  - Floating "+" button for adding listings (admin only).
  - Messages button (envelope icon) in the header for admin to view customer messages.
- **Contact Form:**
  - Users can send messages to admin (validated for name, email, and message).
  - Messages are stored in localStorage and viewable by admin in a modal.
- **Service Modals:**
  - "Learn More" buttons open beautiful, detailed modals for each service.
- **Other Sections:**
  - Hero, About, Become a Property Owner, Services, Testimonials, Contact, and Footer.
- **Persistence:**
  - All data (listings, statuses, messages) is stored in localStorage for demo purposes.

---

## 🚀 Demo Admin Login
- **Username:** `admin`
- **Password:** `admin`

> _Note: This is a demo. All admin features and messages are stored in your browser's localStorage and are not shared between users._


---

## 📦 Project Structure
```
client/
  ├── index.html
  ├── styles.css
  ├── app.js
  └── ... (images, icons, etc.)
```

---

## ⚠️ LocalStorage Notice
- All data is stored in your browser only (localStorage).
- Data is not shared between users or devices.
- For production, a backend/database is recommended.

---

## 🔒 Security Notes
- Login fields are cleared on logout for security.
- Admin features are for demo only; do not use for real data without a backend.

---

## 🏗️ Future Improvements
- Backend integration (Node.js, Express, MongoDB, etc.) for real data and multi-user support.
- Real authentication and secure message delivery.
- Image upload to cloud storage.

---

## 📄 License
MIT 
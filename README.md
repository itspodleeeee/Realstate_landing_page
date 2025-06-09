# Bayleaf Builders Real Estate Website

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

A modern, responsive real estate website for Bayleaf Builders, featuring a green/nature-inspired design, listings management, admin controls, and a demo messaging system—all using HTML, CSS, and JavaScript (with localStorage for demo persistence).

## 🚀 Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bayleaf-builders.git
cd bayleaf-builders
```

2. Open `index.html` in your browser or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve
```

3. Access the website at `http://localhost:8000`

## 🌿 Features

### Core Features
- **Modern UI:** Green/nature-inspired palette, gradients, rounded corners, and responsive design
- **Listings Management:**
  - View, search, and filter property listings in a beautiful grid
  - Admins can add, edit, and delete listings (with up to 8 images per listing)
  - Listing statuses: Available, Sold, Reserved, Under Contract
- **Admin Controls:**
  - Login/logout with UI state changes
  - Admin-only controls for editing, deleting, and changing listing status
  - Floating "+" button for adding listings (admin only)
  - Messages button (envelope icon) in the header for admin to view customer messages

### User Features
- **Contact Form:**
  - Users can send messages to admin (validated for name, email, and message)
  - Messages are stored in localStorage and viewable by admin in a modal
- **Service Modals:**
  - "Learn More" buttons open beautiful, detailed modals for each service
- **Other Sections:**
  - Hero, About, Become a Property Owner, Services, Testimonials, Contact, and Footer

## 🛠️ Technologies Used

- **Frontend:**
  - HTML5
  - CSS3 (with modern features like Flexbox and Grid)
  - Vanilla JavaScript (ES6+)
  - LocalStorage API for data persistence
- **Development:**
  - Git for version control
  - Modern browser developer tools

## 📦 Project Structure
```
client/
├── index.html          # Main HTML file
├── styles/
│   ├── main.css       # Main stylesheet
│   ├── components/    # Component-specific styles
│   └── utilities/     # Utility classes
├── js/
│   ├── app.js         # Main application logic
│   ├── admin.js       # Admin functionality
│   ├── listings.js    # Listings management
│   └── utils/         # Utility functions
└── assets/
    ├── images/        # Image assets
    └── icons/         # Icon assets
```

## 🔐 Demo Admin Access
- **Username:** `admin`
- **Password:** `admin`

> **Note:** This is a demo. All admin features and messages are stored in your browser's localStorage and are not shared between users.

## ⚠️ LocalStorage Notice
- All data is stored in your browser only (localStorage)
- Data is not shared between users or devices
- For production, a backend/database is recommended

## 🔒 Security Notes
- Login fields are cleared on logout for security
- Admin features are for demo only; do not use for real data without a backend
- No sensitive data is stored in the demo version

## 🏗️ Future Improvements
- [ ] Backend integration (Node.js, Express, MongoDB)
- [ ] Real authentication and secure message delivery
- [ ] Image upload to cloud storage
- [ ] Real-time notifications
- [ ] Advanced search and filtering
- [ ] Property comparison feature
- [ ] Virtual tour integration
- [ ] Mobile app development

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors
- itspodleeeee

## 🙏 Acknowledgments
- Thanks to all contributors
- Inspired by modern real estate websites
- Built with ❤️ for Bayleaf Builders 
# Two Good Co - React Migration

A modern React.js rebuild of the Two Good Co website, migrated from a static HTML/CSS/JS site to a dynamic React application with enhanced features.

## 🚀 Live Features

- **React + Vite** - Lightning-fast development and build
- **Context API** - Global cart state management
- **GSAP Animations** - Smooth, professional animations
- **React Router** - Single Page Application navigation
- **Responsive Design** - Works on all devices

---

## 📁 Project Structure

```
Two Good Co/
├── public/                    # Static assets (images, videos)
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        # Navigation component
│   │   └── Footer.jsx        # Footer component
│   ├── context/
│   │   └── CartContext.jsx   # Cart state management (Context API)
│   ├── pages/
│   │   ├── Home.jsx          # Main landing page
│   │   ├── Cart.jsx          # Shopping cart page
│   │   └── Signup.jsx        # Registration form
│   ├── App.jsx               # Main app with routing
│   ├── main.jsx              # Entry point with providers
│   └── index.css             # Global styles
├── legacy_source/            # Original HTML/CSS/JS files (backup)
└── package.json
```

---

## 🔄 Migration Changes

### From Static HTML to React Components

| Original File | React Component | Description |
|---------------|-----------------|-------------|
| `index.html` | `Home.jsx` | Main landing page with video, products, about section |
| `signup.html` | `Signup.jsx` | Registration form with validation |
| `cart.html` | `Cart.jsx` | **NEW** - Dynamic shopping cart |
| Navbar section | `Navbar.jsx` | Extracted and made reusable |
| Footer section | `Footer.jsx` | Extracted and made reusable |

### From Vanilla JS to React Hooks

| Original (`script.js`) | React Implementation |
|------------------------|----------------------|
| DOM manipulation for products | `products.map()` with JSX |
| Event listeners | `useEffect` + `useRef` |
| Form validation | `useState` + controlled inputs |
| GSAP animations | `useEffect` with GSAP context |

---

## ✨ New Features Added

### 1. Shopping Cart with Context API

```jsx
// CartContext.jsx - Global state for cart
const CartContext = createContext();

// Features:
- addToCart(product)
- removeFromCart(productName)
- updateQuantity(productName, quantity)
- clearCart()
- cartCount (total items)
- cartTotal (total price)
- localStorage persistence
```

**Usage:**
```jsx
import { useCart } from '../context/CartContext';

const { addToCart, cartItems, cartTotal } = useCart();
```

### 2. Enhanced GSAP Animations

| Animation | Location | Description |
|-----------|----------|-------------|
| Split Text | Hero "CHANGE THE COURSE" | Characters animate in with stagger effect |
| Scroll Reveal | About section | Text and images fade in on scroll |
| Product Cards | Product section | Staggered reveal animation |
| String Animation | Decorative SVG | Elastic mouse-follow effect |

### 3. React Router Navigation

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/cart" element={<Cart />} />
</Routes>
```

### 4. Smooth Scrolling

- Native CSS `scroll-behavior: smooth`
- Anchor links work across pages
- Scroll-to-section when navigating from other pages

---

## 🎨 Styling Approach

The original `style.css` was preserved and enhanced:

1. **Fonts**: Using **Jost** (Google Font) as a Futura alternative with fallback
2. **Original styles**: All legacy CSS maintained for visual consistency
3. **New additions**:
   - `.line` class for split text animation
   - `.cart-page` styles for cart functionality
   - Smooth scroll behavior

---

## 🛠️ Installation & Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "react": "^19.x",
    "react-dom": "^19.x",
    "react-router-dom": "^7.x",
    "gsap": "^3.x"
  }
}
```

---

## 🔧 Key Technical Decisions

### Why Context API over Redux?
- Simpler setup for cart functionality
- No need for complex middleware
- Built into React, no extra dependencies

### Why Jost Font?
- Free, open-source alternative to Futura
- Loaded from Google Fonts CDN
- Fallback chain: `'Jost', futura, sans-serif`

### Why GSAP over CSS Animations?
- Already used in original project
- Better control over complex animations
- ScrollTrigger plugin for scroll-based animations

---

## 📸 Screenshots

The application maintains the original Two Good Co design while adding:
- Interactive cart functionality
- Smooth page transitions
- Enhanced animations on page load and scroll

---

## 🗂️ Legacy Source

The original HTML/CSS/JS files are preserved in the `legacy_source/` directory for reference:
- `index.html` - Original homepage
- `signup.html` - Original signup form
- `cart.html` - Original cart placeholder
- `style.css` - Original styles
- `demo.css` - Demo footer styles
- `script.js` - Original JavaScript

---

## 👨‍💻 Author

Migrated as a learning project to understand React fundamentals including:
- Component architecture
- State management with Context API
- React Router for SPA navigation
- Integrating animation libraries (GSAP) with React

---

## 📄 License

This project is for educational purposes.

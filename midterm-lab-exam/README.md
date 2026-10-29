# Web Technologies (CSC336) - Lab Mid Term Exam
**Instructor:** Muhammad Usman Akram  
**Student Name:** Ahtsham Elahi  
**Registration Number:** FA24-BCS-011  
**Degree Program:** BS Computer Science  

---

## 1. Student Personal Numbers & Derived Values
- **Roll Number (Last 2 digits):** `N = 11`
- **Breakpoint (BP):** `BP = 600 + N = 600 + 11 = 611px`
- **Accent Hue (H):** `H = (N × 7) mod 360 = (11 × 7) mod 360 = 77°`
- **Accent Color:** `hsl(77, 70%, 45%)`
- **Mega-Menu Columns (K):** `K = (N mod 3) + 3 = (11 mod 3) + 3 = 5 columns`
- **Max Quantity per Product (Task 3):** `(N mod 4) + 2 = (11 mod 4) + 2 = 5 items`
- **Delivery Date Range (Task 2):** 
  - `min = 2026-10-29` (Exam date)
  - `max = 2026-11-09` (Exam date + 11 days)

---

## 2. Files Changed & Created

| File | Status | Description |
|---|---|---|
| `index.html` | Modified | Added pure CSS hamburger toggle, "Shop by Category" mega-menu with 5 columns & mobile accordion, cart badge, mini-cart container, and converted card buttons to Add to Cart. |
| `style.css` | Modified | Implemented BP (611px) media queries, CSS Grid 5-column mega-menu panel, `:focus-within` & `:hover` opening states, `<details>`/`<summary>` accordion styles, accent color `hsl(77, 70%, 45%)`, and mini-cart dropdown styling. |
| `checkout.html` | Created | Task 2 checkout page featuring pure HTML5 validation, dual fieldsets ("Contact" and "Delivery"), phone regex pattern, date constraints, and responsive CSS Grid layout based on BP = 611px. |
| `script.js` | Created | Task 3 pure JavaScript implementation for cart management: badge count update, `reduce()` total calculation, dynamic mini-cart rendering, removal handling, and 5-item limit enforcement with button disabling. |
| `README.md` | Created | Exam documentation with personal variables, implementation details, and rationale. |

---

## 3. Task Implementation Details & Rationale

### Task 1: Mega-Menu in Existing Navbar (HTML & CSS only)
- **What was changed:** Added a "Shop by Category" item inside `<nav class="navbar">` in `index.html` featuring both a 5-column desktop panel and a `<details>`/`<summary>` mobile accordion.
- **Why and How:**
  - For viewports from **BP (611px) and wider**, the panel opens via `.mega-dropdown:hover .mega-menu-panel` and keyboard navigation via `.mega-dropdown:focus-within .mega-menu-panel`. It uses CSS Grid (`repeat(5, 1fr)`) with K=5 categories and at least 4 links per column. Absolute positioning with high `z-index` ensures it overlays content without shifting the layout.
  - For viewports **below BP (611px)**, the navbar collapses into a pure CSS hamburger menu (`#nav-toggle:checked ~ .navbar`), where the 5 categories render as independent `<details>` and `<summary>` accordions (closed by default).
  - Absolutely zero JavaScript was used, strictly complying with the exam rules.

### Task 2: Checkout Form with HTML5 Validation Only (`checkout.html`)
- **What was changed:** Created `checkout.html` containing two semantic `<fieldset>`s with `<legend>`s ("Contact" and "Delivery"), linked directly from the cart icon.
- **Why and How:**
  - Form validation utilizes native HTML5 attributes: `required`, `pattern="03[0-9]{2}-[0-9]{7}"` for Pakistani mobile numbers, and `min="2026-10-29"` / `max="2026-11-09"` for the delivery date constraint.
  - Error indicators and red borders only trigger after user interaction using the modern `:user-invalid` and `:not(:placeholder-shown):invalid` pseudo-classes to avoid showing errors on initial page load.
  - Layout is controlled by CSS Grid: at **BP (611px) and wider**, the two fieldsets sit side by side and labels align to the left of their inputs (`grid-template-columns: 115px 1fr`). Below BP, it stacks into a single column with labels above inputs. The submit button spans 100% width at all breakpoints.

### Task 3: JavaScript Cart Badge, Mini-Cart & Product Limits (`script.js`)
- **What was changed:** Created `script.js` and linked it before `</body>` in `index.html`.
- **Why and How:**
  - Clicking "Add to Cart" reads the product's name and price dynamically from the card DOM, pushes it into an in-memory `cart` array, and updates the navbar badge count.
  - Clicking the cart icon toggles a floating mini-cart dropdown. The total cart price is calculated using `Array.prototype.reduce((sum, item) => sum + item.price, 0)`.
  - Each item has a "Remove" button that removes that single item from the array, recalculates the subtotal, updates the badge, and re-renders the list immediately.
  - Enforced the personal limit of **5 units per product** (`(11 mod 4) + 2 = 5`). When a product reaches this limit in the cart, its card button disables and text changes to `"Limit reached"`. Removing an item immediately re-enables the button.

---

## 4. AI Tools Used
- Google Antigravity Assistant (Gemini / Claude) for code structuring and assistance.

# IronForm Gym Website (Beginner-Friendly Version)

This is the exact same gym website — programs, shop with cart, diet/nutrition
guide, 30/60/90-day plans, trainers, membership signup — but written in a
simpler style that's easier to read if you're newer to React.

## How this version is different from a "production" version

| Topic | This version | A more advanced version might use |
|---|---|---|
| Sharing cart data between pages | Plain props, state kept in `App.jsx` | React Context, or a state library like Zustand/Redux |
| Finding an item in an array | `for` loops, or `.find()` / `.filter()` with simple checks | Same, but possibly memoized with `useMemo` |
| CSS | One plain `.css` file per component, regular class names | CSS Modules, Tailwind, or styled-components |
| Styling values | A handful of CSS variables for colors only | A full design-token system |

None of those "advanced" tools are wrong — they just add a learning curve.
This version sticks to: `useState`, props, `.map()`, basic `if` statements,
and `react-router-dom`'s core pieces (`Routes`, `Route`, `Link`, `useParams`).

## Run it locally

```bash
npm install
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`).

## How the project is organized

```
src/
├── data/                        Plain JSON files — think of these as a tiny database
│   ├── programs.json
│   ├── products.json
│   ├── diet.json
│   ├── transformationPlans.json
│   ├── trainers.json
│   └── testimonials.json
│
├── components/                  Small, reusable pieces used by multiple pages
│   ├── Navbar.jsx / .css
│   ├── Footer.jsx / .css
│   ├── Hero.jsx / .css
│   ├── ProgramCard.jsx / .css
│   ├── ProductCard.jsx / .css
│   ├── CartSidebar.jsx / .css
│   ├── DietPrincipleCard.jsx / .css
│   ├── MealCard.jsx / .css
│   ├── FoodListSection.jsx / .css
│   ├── SafetyNote.jsx / .css
│   ├── TransformationTimeline.jsx / .css
│   ├── TrainerCard.jsx / .css
│   └── TestimonialCard.jsx / .css
│
├── pages/                        One file per page/URL
│   ├── Home.jsx / .css           "/"
│   ├── Programs.jsx / .css       "/programs"
│   ├── ProgramDetail.jsx / .css  "/programs/:id"
│   ├── Diet.jsx / .css           "/diet"
│   ├── Plans.jsx / .css          "/plans"
│   ├── Shop.jsx / .css           "/shop"
│   ├── Trainers.jsx / .css       "/trainers"
│   ├── About.jsx / .css          "/about"
│   ├── Join.jsx / .css           "/join"
│   ├── Contact.jsx / .css        "/contact"
│   ├── Cart.jsx / .css           "/cart"      — full-page cart review with quantity controls
│   ├── Checkout.jsx / .css       "/checkout"  — payment form, then an order-received screen
│   └── NotFound.jsx / .css       any URL that doesn't match
│
├── App.jsx     The "main" component. Holds the cart state and defines all routes.
├── main.jsx    The starting point — mounts <App /> into the HTML page.
└── index.css   Shared colors, fonts, and a few reusable classes (.btn, .container, .tag).
```

## The big ideas this project uses

### 1. Components are just functions that return JSX
Every file in `components/` and `pages/` is a normal JavaScript function. It
takes some props in, and returns some JSX (HTML-looking code) out.

```jsx
function TrainerCard({ trainer }) {
  return <div>{trainer.name}</div>;
}
```

### 2. `useState` remembers things between renders
Whenever you need a piece of information that can change while the user is
interacting with the page (is this menu open? what did the user type?), you
store it with `useState`.

```jsx
const [menuIsOpen, setMenuIsOpen] = useState(false);
```

### 3. Props pass data from parent to child
A parent component (like a page) can hand data down to a child component
(like a card) by writing it as an attribute:

```jsx
<ProgramCard program={someProgramObject} />
```

Inside `ProgramCard`, that same data shows up as `props.program` (or, since
we destructure it, just `program`).

### 4. "Lifting state up" — how the cart works
The Navbar (cart count + sidebar), the Shop page (add/adjust quantity),
the Cart page (review everything), and the Checkout page (place the
order) all need to know about the cart. So the cart's state lives in
`App.jsx`, the closest shared parent of all of them, and gets passed
down to each as props:

```
App.jsx (owns cartItems state)
 ├── Navbar (gets cartCount, onCartClick)
 ├── Shop (gets cartItems, onAddToCart, onIncrease, onDecrease)
 ├── Cart page (gets cartItems, onIncrease, onDecrease, onRemove)
 ├── Checkout page (gets cartItems, onOrderPlaced)
 └── CartSidebar (gets cartItems, onIncrease, onDecrease, onRemove)
```

When any of those calls a function like `onIncrease(productId)`, it's
really calling a function defined in `App.jsx`, which updates the
state there — and because every other component above also reads
that same state, they all instantly show the updated quantity/count.

**Adding one more or removing one:** once a product has at least 1 in
the cart, its "Add to cart" button turns into a `- 1 +` stepper, both
on the product card in the Shop page AND in the cart sidebar/cart
page. Clicking `+` or `-` calls `onIncrease`/`onDecrease`, which live
in `App.jsx`. If you press `-` down to 0, the item is removed
automatically.

**The Cart page (`/cart`)** is a full page (not just the slide-out
sidebar) that lists every item with its own quantity stepper, a
running subtotal per row, and an order summary box with a "Go to
checkout" button.

**The Checkout page (`/checkout`)** shows a shipping + payment form.
Submitting it (without actually charging any real card — this is a
demo) flips the page into an "Order received" confirmation showing an
order number and the total charged, and empties the cart. We save the
total into its own piece of state (`orderTotal`) the moment the order
is placed, specifically because the cart becomes empty right
afterward — if we recalculated the total from the now-empty cart, the
confirmation screen would incorrectly show $0.00.

### 5. React Router decides which page to show
```jsx
<Routes>
  <Route path="/diet" element={<Diet />} />
  <Route path="/programs/:id" element={<ProgramDetail />} />
</Routes>
```
The `:id` part is a placeholder. If the URL is `/programs/strength-foundations`,
then inside `ProgramDetail.jsx`, `useParams()` gives you `{ id: "strength-foundations" }`,
which you use to find the right program out of `programs.json`.

### 6. Clicking something usually does one of three things here
- **Changes the URL** (a `<Link>`) → React Router swaps which page is shown
- **Updates state** (`setSomething(...)` inside an `onClick`) → the component
  re-renders with the new value (e.g. expanding a diet principle card)
- **Calls a function passed down as a prop** → which usually does one of the
  above, just one level higher up (e.g. "Add to cart" updates state that
  lives in `App.jsx`, not in the card itself)

## Editing the content

You don't need to touch any component code to change what's on the site —
just edit the JSON files in `src/data/`:

- Add a program → add an object to `programs.json`. A new card and detail
  page appear automatically.
- Add a product → add an object to `products.json`.
- Change diet advice → edit `diet.json`.
- Change the 30/60/90-day plan → edit `transformationPlans.json`.

## A note on checkout

The `/checkout` page (`src/pages/Checkout.jsx`) is a working demo, not a
real payment integration. Everything for this page — the Delivery
Details form, the subtotal/delivery-fee/tax math, the UPI vs Cash on
Delivery picker, and the "place order" logic — lives in that single
file, on purpose, so it's easy to read top to bottom without jumping
between files.

Submitting the form does NOT contact a card network, a bank, a UPI
app, or any external service — it just generates a fake order number
locally with `Date.now()` and shows an "Order received" confirmation
screen. To process real payments, you'd connect the form's submit
handler to a real payment provider's API (for example Stripe or
Razorpay for cards/UPI) and only show the confirmation screen after
that provider confirms the charge succeeded.

The delivery fee in this demo becomes free automatically once the
subtotal reaches $75 — that's just an `if` check inside the component,
not anything from the data files.

## Where to go next (optional)

If this version starts to feel limiting, the natural next steps are:
1. Replace the prop-passing for the cart with **React Context**, so you
   don't have to pass `onAddToCart` down through every page.
2. Replace the JSON files with calls to a real backend/API.
3. Add form validation libraries instead of relying on basic HTML
   `required` attributes.
4. Connect the Checkout page to a real payment provider instead of the
   demo "place order" button.
5. Save the cart to `localStorage` so it survives a page refresh
   (right now, refreshing the page empties the cart, since it only
   lives in React state).

But none of that is necessary to understand or run this project as-is.
#   I r o n f o r m  
 
# Cartly 🛒

A simple bilingual (Hebrew / English) shopping list web app for the supermarket, greengrocer, butcher and fish shop.

**Live app:** https://guri-ai-70.github.io/cartly

## Features
- Departments: Grocery, Greengrocery, Meat & Fish, Drinks, Spices
- Autofill from ~360 common Israeli products – type a few letters and pick
- Units: pcs, kg, grams, pack – or no quantity at all
- Tick items as bought; clear bought items in one tap
- General note for the buyer
- Send the list on WhatsApp, grouped by department
- Day / night mode and 5 accent colors
- Saved on the phone, works offline
- Built-in "How to use" guide (? button)

## Install on your phone
- **Android (Chrome):** open the link → ⋮ → **Add to Home screen**
- **iPhone (Safari):** open the link → Share → **Add to Home Screen**

## Files
| File | What it is |
|---|---|
| `index.html` | The app |
| `items.js` | Autofill product list – one line per product: department, unit, Hebrew, English |
| `manifest.webmanifest` | App name and icon for the home screen |
| `sw.js` | Offline support – raise the version number after any change |
| `icon-*.png` | App icons |

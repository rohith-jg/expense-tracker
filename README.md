# Expense Tracker

A simple, no-backend expense tracker. Log daily spending, categorize it, and see totals — all in the browser using `localStorage`.

## Features

- Add expenses with date, description, category, and amount
- Filter the expense list by category
- See total spent overall and a breakdown by category
- Delete expenses
- Data persists locally in your browser (no server or database)

## Usage

You can open [index.html](index.html) directly in a browser, or serve the folder locally for a more reliable preview.

```
python3 -m http.server 8080
```

Then open http://localhost:8080 in your browser.

## Tech

Plain HTML, CSS, and JavaScript. Data is stored in `localStorage`, so it stays on your machine/browser and isn't shared between devices.

# CryptoTracker - Real-Time Cryptocurrency Price Tracker

A modern web application for tracking live cryptocurrency prices using Binance WebSocket API.

![CryptoTracker Preview](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ui-zQAaOGvYHtEzFXYS7NAlEtwjVou0QR.png)

## Features

- **Real-time Price Updates**: Live cryptocurrency price tracking via WebSocket connection
- **Responsive Design**: Built with Bootstrap for optimal viewing on all devices
- **Interactive Interface**: 
  - Card view for quick price overview
  - Detailed table view with pagination
  - Buy/Sell action buttons
  - Price change indicators with color coding

## Technical Stack

- **Frontend Framework**: React with Next.js
- **Styling**: Bootstrap 5 and custom CSS
- **Icons**: React Icons (Font Awesome)
- **Data Source**: Binance WebSocket API
- **State Management**: React Hooks (useState, useEffect)

## Components

1. **Navbar**: Navigation component with branding
2. **CryptoCard**: Individual cryptocurrency card displaying:
   - Symbol (e.g., ETHBTC, LTCBTC)
   - Current Price
   - 24h Price Change
   - 24h Volume
   - Buy/Sell Actions

3. **CryptoTable**: Comprehensive list view with:
   - Symbol
   - Price ($)
   - Change ($)
   - Volume
   - Pagination Controls

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install

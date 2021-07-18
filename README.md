# polymer-web
web client for digio sign sdk.

# Usage
Install dependencies

    npm install

Start Server

    npm start

Build for production and serve
    
    npm run build 
    npm run serve
    
This project is using prpl pattern for fast loading
https://web.dev/apply-instant-loading-with-prpl/

Push (or preload) the most important resources.
Render the initial route as soon as possible.
Pre-cache remaining assets.
Lazy load other routes and non-critical assets.    
# API Setup Instructions

To use the Free Astrology API, you need to:

1. Sign up for an API key at [https://freeastrologyapi.com/](https://freeastrologyapi.com/)
2. Create a file named `.env.local` in the root of your project
3. Add your API key to the `.env.local` file:

```
NEXT_PUBLIC_ASTROLOGY_API_KEY=your_actual_api_key_here
```

4. Restart your Next.js development server

## How It Works

This application uses a server-side API route to handle requests to the Free Astrology API. This approach:

1. Keeps your API key secure on the server
2. Avoids CORS (Cross-Origin Resource Sharing) issues
3. Provides better error handling

The server-side API route is located at `src/app/api/astrology/route.ts`.

## Troubleshooting

If you're still seeing errors after setting up your API key:

1. Make sure the `.env.local` file is in the root directory of your project
2. Check that you've copied the API key correctly
3. Verify that you've restarted the Next.js development server
4. Check the browser console for more detailed error messages
5. If you see "Failed to fetch" errors, make sure your Next.js server is running

## API Documentation

For more information about the Free Astrology API, visit:
[https://freeastrologyapi.com/api-reference/planets](https://freeastrologyapi.com/api-reference/planets) 
# Tithi Astrology

A full-stack application for calculating astrological planetary positions using a custom calculation engine.

![Tithi Astrology](https://via.placeholder.com/800x400?text=Tithi+Astrology)

## 🌟 Features

- Calculate planetary positions based on birth details (date, time, location)
- Display planetary positions in a user-friendly format
- Show aspects between planets
- Calculate house cusps using the Placidus system
- Responsive design for all devices
- Modern UI with Tailwind CSS

## 🚀 Tech Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React Hooks

### Backend
- Express.js
- TypeScript
- Custom astrology calculation engine

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/shyamcodes247/Tithi---Astrology.git
cd Tithi---Astrology
```

2. Install all dependencies:
```bash
npm run install:all
```

3. Set up environment variables:

   - For the frontend, create a `.env.local` file in the `front-end` directory:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001/api/astrology/planets
   ```

   - For the backend, create a `.env` file in the `back-end` directory:
   ```
   PORT=3001
   ```

## 🚀 Running the Application

To start both the frontend and backend servers:

```bash
npm run dev
```

This will start:
- Frontend on http://localhost:3000
- Backend on http://localhost:3001

### Running Servers Separately

- To run only the frontend:
```bash
npm run frontend
```

- To run only the backend:
```bash
npm run backend
```

## 📚 Project Structure

```
tithi-astrology/
├── front-end/                # Next.js frontend application
│   ├── public/               # Static assets
│   ├── src/                  # Source code
│   │   ├── app/              # Next.js app router
│   │   ├── components/       # React components
│   │   ├── services/         # API services
│   │   └── types/            # TypeScript types
│   ├── .env.local            # Frontend environment variables
│   └── package.json          # Frontend dependencies
├── back-end/                 # Express.js backend server
│   ├── src/                  # Source code
│   │   ├── routes/           # API routes
│   │   ├── services/         # Business logic
│   │   ├── types/            # TypeScript types
│   │   └── utils/            # Utility functions
│   ├── .env                  # Backend environment variables
│   └── package.json          # Backend dependencies
└── package.json              # Root package.json
```

## 🔧 Customization

### Adding New Features

1. **Adding a new planet**: Update the `PLANETS` array in `back-end/src/services/advancedAstrologyCalculations.ts`
2. **Modifying calculations**: Edit the `calculatePlanetPosition` function in the same file
3. **Adding UI components**: Create new components in `front-end/src/components/`

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact


Project Link: [https://github.com/shyamcodes247/Tithi---Astrology](https://github.com/shyamcodes247/Tithi---Astrology)

---

**Note**: Before pushing to GitHub, replace the following placeholders with your actual information:
- `YOUR_USERNAME` with your GitHub username
- `YOUR_NAME` with your name
- `YOUR_TWITTER` with your Twitter handle
- `YOUR_EMAIL@EXAMPLE.COM` with your email address 
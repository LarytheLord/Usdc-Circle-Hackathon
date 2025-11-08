# AI-Powered Predictive DeFi Yield Optimizer

An innovative Next.js application that combines AI, Web3, and voice technology to automatically optimize DeFi yields on the Arc blockchain with USDC. This project was created for the "AI Agents on Arc with USDC" hackathon.

## 🚀 Demo Video
[![Demo Video](https://img.youtube.com/vi/VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID)

## ✨ Features

- **AI-Powered Predictions**: Machine learning models analyze market conditions to predict optimal yield farming strategies
- **Voice Control**: Natural language processing allows users to control the application with voice commands
- **Real-time Portfolio Tracking**: Monitor your USDC investments and yield farming strategies
- **Automated Strategy Execution**: Execute recommended strategies with a single click
- **Risk Management**: AI assesses and manages risk levels based on market conditions
- **Account Management**: User profiles with preference settings and agent state management

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 with App Router, TypeScript
- **Styling**: Tailwind CSS with custom gradients and animations
- **Blockchain**: Arc blockchain with USDC integration
- **AI/ML**: Cloudflare Workers AI for prediction models
- **Voice**: Web Speech API for voice commands (100% free)
- **Data Visualization**: Chart.js for portfolio analytics
- **APIs**: Next.js API routes for backend services

## 🏗️ Architecture

The application follows a modern Next.js architecture with:

- **App Router**: Utilizing the latest Next.js routing system
- **API Routes**: Server-side endpoints for AI processing, blockchain interactions, and voice commands
- **Client Components**: Interactive UI elements for user engagement
- **Server Components**: Secure processing of sensitive operations

## 📊 Screenshots

![Dashboard View](screenshots/dashboard.png)
*Main dashboard showing portfolio allocation and strategy recommendations*

![Voice Control](screenshots/voice-control.png)
*Voice command interface with real-time feedback*

![Strategy Execution](screenshots/strategy-execution.png)
*AI recommendations with one-click execution*

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/ai-yield-optimizer.git
cd ai-yield-optimizer
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Update `.env.local` with your configuration:
```env
# Arc Blockchain Configuration
NEXT_PUBLIC_ARC_RPC_URL=your_arc_rpc_url

# Cloudflare Workers AI (for AI processing - free tier)
CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
CLOUDFLARE_API_TOKEN=your_cloudflare_api_token

# ElevenLabs API (if you have a hackathon coupon)
ELEVENLABS_API_KEY=your_elevenlabs_api_key

# Supabase Database (for production)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# AI/ML API (if using hackathon credits)
AI_ML_API_KEY=your_ai_ml_api_key
```

### Running Locally

1. Start the development server:
```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
ai-yield-optimizer/
├── .env.local.example          # Example environment variables
├── .env.local                  # Private environment variables (git-ignored)
├── .gitignore                  # Git ignore rules
├── README.md                   # Project documentation
├── DEPLOYMENT_CHECKLIST.md     # Deployment preparation checklist
├── package.json                # Project dependencies and scripts
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── tsconfig.json               # TypeScript configuration
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Main page component
│   │   ├── globals.css         # Global styles
│   │   └── api/                # API routes
│   │       ├── account/
│   │       ├── ai/
│   │       ├── blockchain/
│   │       ├── voice/
│   │       └── wallet/
│   ├── components/             # Reusable UI components
│   ├── lib/                    # Utility functions
│   └── types/                  # TypeScript definitions
└── public/                     # Static assets
```

## 🌐 API Endpoints

- `POST /api/ai/predict` - Generate market predictions
- `POST /api/ai/recommend` - Generate strategy recommendations
- `GET/POST /api/blockchain/portfolio` - Manage portfolio data
- `POST /api/voice/process` - Process voice commands
- `GET/POST /api/account` - Account management
- `GET/POST /api/wallet` - Wallet operations

## 🤖 AI Agent Capabilities

### Voice Commands Supported
- "Show my portfolio" - Retrieve portfolio information
- "What are your recommendations?" - Generate AI strategy recommendations
- "How am I doing today?" - Get current portfolio status
- "Execute balanced yield optimization" - Run a specific strategy
- "Transfer 100 USDC to stablecoin farming" - Initiate transaction

### AI Decision Making
- Analyzes market conditions in real-time
- Evaluates risk vs reward for different strategies
- Monitors portfolio performance and rebalances automatically
- Predicts market trends and adjusts strategy accordingly

## 🔐 Security Features

- Environment variables properly secured
- `.gitignore` prevents sensitive files from being committed
- Encrypted API communications
- Secure wallet integration
- Transaction validation and confirmation
- Risk assessment before strategy execution

## 📈 Future Enhancements

- Integration with ElevenLabs for voice responses
- Advanced ML models for more accurate predictions
- Multi-chain support beyond Arc
- Advanced risk management algorithms
- Mobile app version with React Native
- Governance token for community-driven decisions
- Advanced analytics dashboard

## 🏆 Hackathon Submission

This project was created for the "AI Agents on Arc with USDC" hackathon. It demonstrates:

- Integration with Arc blockchain and USDC
- AI-powered decision making
- Voice interface for Web3 interactions
- Automated DeFi strategy optimization
- Modern Next.js architecture with API routes
- Outstanding UI/UX design with glass-morphism effects

## 🚀 Deployment

### For Vercel (Recommended)
1. Push code to GitHub/GitLab/Bitbucket
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### For Other Platforms
1. Build the application: `npm run build`
2. Start production server: `npm start`
3. Configure environment variables in hosting platform
4. Set up domain and SSL

## 🤝 Contributing

We welcome contributions to this project! Feel free to fork, submit pull requests, or open issues.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

- **Developer**: [Your Name]
- **GitHub**: [Your GitHub Profile]

---

Made with ❤️ for the AI Agents on Arc with USDC Hackathon
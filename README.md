# 🚀 AI-Powered Trip Planner

An intelligent travel planning application that leverages advanced AI prompting techniques to create personalized, detailed trip itineraries.

## 🌟 **Project Overview**

The AI Trip Planner is a comprehensive travel planning solution that demonstrates various AI prompting methodologies, from basic zero-shot prompting to advanced structured output and function calling. It provides users with detailed, personalized trip plans based on their destination, duration, and interests.

## 🎯 **Key Features**

### **AI Prompting Techniques**
- **Zero-shot Prompting** - Basic trip planning without examples
- **One-shot Prompting** - Single example format for consistent output
- **Multi-shot Prompting** - Multiple examples for different trip types
- **Chain of Thought** - Step-by-step reasoning process
- **Dynamic Prompting** - Context-aware adaptation
- **System-User Prompts** - RTFC framework implementation
- **Structured Output** - JSON format for machine-readable data

### **Advanced AI Controls**
- **Temperature Control** - Adjust AI creativity (0.0 - 1.0)
- **Top-K Sampling** - Control response variety (10 - 100)
- **Top-P Sampling** - Manage response coherence (0.1 - 1.0)
- **Max Tokens** - Control response length (200 - 2000)
- **Prompting Method Selection** - Choose from 7 different approaches

### **Interactive Features**
- **AI Function Calling** - Execute specific AI tasks
- **Smart Recommendations** - Context-aware suggestions
- **Dynamic Itineraries** - Adapt based on user preferences
- **Structured Display** - Beautiful, organized trip presentation

## 🏗️ **Technical Architecture**

### **Frontend (React + Tailwind CSS)**
```
frontend/src/components/
├── TripForm.jsx          # Main form with AI settings
├── TripResults.jsx       # Results display (text + structured)
├── AISettings.jsx        # AI parameter controls
├── StructuredTripDisplay.jsx  # JSON data visualization
├── AIFunctionCaller.jsx  # Interactive AI functions
└── Header.jsx            # Application header
```

### **Backend (Node.js + Express + Google Gemini)**
```
backend/src/
├── prompting/            # AI prompting modules
│   ├── zero-shot.js     # Zero-shot implementation
│   ├── one-shot.js      # One-shot implementation
│   ├── multi-shot.js    # Multi-shot implementation
│   ├── chain-of-thought.js  # Chain of thought
│   ├── dynamic.js       # Dynamic prompting
│   ├── system-user.js   # System-user prompts
│   └── structured-output.js  # JSON output
├── similarity/           # Vector similarity functions
├── embeddings/           # Text embedding generation
├── evaluation/           # Testing framework
└── utils/               # Helper functions
```

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- Google AI API key

### **Installation**

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd trip-planner
   ```

2. **Install dependencies**
   ```bash
   # Frontend
   cd frontend
   npm install
   
   # Backend
   cd ../backend
   npm install
   ```

3. **Environment setup**
   ```bash
   # Backend .env file
   GOOGLE_API_KEY=your_google_ai_api_key_here
   PORT=5000
   ```

4. **Start the application**
   ```bash
   # Backend
   cd backend
   npm start
   
   # Frontend (new terminal)
   cd frontend
   npm start
   ```

## 🎨 **Usage Guide**

### **Basic Trip Planning**
1. Enter your destination
2. Select start and end dates
3. Choose your interests
4. Click "Generate Trip Plan"

### **Advanced AI Controls**
1. Expand "AI Generation Settings"
2. Adjust creativity level (Temperature)
3. Set response variety (Top-K)
4. Choose prompting method
5. Generate plan with custom settings

### **AI Function Calling**
1. Generate a trip plan first
2. Click "Show AI Functions"
3. Select a function (weather, budget, etc.)
4. Configure parameters
5. Execute the function

## 🔧 **AI Prompting Implementation**

### **Zero-shot Prompting**
```javascript
const prompt = `Plan a ${days}-day trip to ${destination} for someone interested in ${interestsText}. 
Provide a comprehensive daily itinerary with activities, restaurants, and tips.`;
```

### **One-shot Prompting**
```javascript
const prompt = `Here's an example of a 3-day Paris trip plan:
[Detailed example with structure]

Now create a ${days}-day trip plan for ${destination} following the EXACT same format.`;
```

### **Chain of Thought**
```javascript
const prompt = `Let me think through this step by step:
1. First, understand what makes ${destination} special
2. Consider optimal activity timing
3. Think about cultural context
4. Organize into practical schedule

Now provide the complete plan based on this reasoning.`;
```

### **Structured Output**
```javascript
const prompt = `Respond with ONLY valid JSON in this exact format:
{
  "tripPlan": {
    "destination": "${destination}",
    "days": [...]
  }
}`;
```

## 📊 **Data Flow**

```
User Input → TripForm → AI Settings → Backend API → AI Model → Response Processing → Frontend Display
    ↓
Destination, Dates, Interests + Temperature, Top-K, Top-P, Prompting Method
    ↓
Google Gemini AI with configured parameters
    ↓
Structured or text response
    ↓
Beautiful UI display with interactive features
```

## 🧪 **Testing & Evaluation**

### **Run Tests**
```bash
cd backend
npm test
```

### **Test Different Prompting Methods**
```bash
# Test zero-shot
curl -X POST http://localhost:5000/generate-plan \
  -H "Content-Type: application/json" \
  -d '{"destination":"Tokyo","days":3,"interests":["food","culture"],"aiSettings":{"promptingMethod":"zero-shot"}}'

# Test structured output
curl -X POST http://localhost:5000/generate-plan \
  -H "Content-Type: application/json" \
  -d '{"destination":"Paris","days":2,"interests":["art"],"aiSettings":{"promptingMethod":"structured-output"}}'
```

## 🌐 **API Endpoints**

### **POST /generate-plan**
Generate a trip plan using specified AI prompting method.

**Request Body:**
```json
{
  "destination": "Tokyo",
  "days": 3,
  "interests": ["food", "culture"],
  "aiSettings": {
    "temperature": 0.7,
    "topK": 40,
    "topP": 0.8,
    "maxTokens": 1000,
    "promptingMethod": "one-shot"
  }
}
```

**Response:**
```json
{
  "type": "one-shot",
  "plan": "Generated trip plan content...",
  "prompt": "Used prompt...",
  "metadata": {...}
}
```

### **GET /health**
Check server status and AI model information.

## 🔮 **Future Enhancements**

### **Phase 1: Core AI Features** ✅
- [x] Multiple prompting methods
- [x] AI parameter controls
- [x] Structured output support

### **Phase 2: Advanced Features** 🔄
- [ ] Vector embeddings
- [ ] Similarity search
- [ ] Vector database integration
- [ ] Evaluation framework

### **Phase 3: Production Features** 📋
- [ ] User authentication
- [ ] Trip history
- [ ] Social sharing
- [ ] Mobile app
- [ ] Multi-language support

## 🤝 **Contributing**

### **Pull Request Process**
1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Implement your changes
3. Add tests and documentation
4. Submit a pull request with detailed description

### **Code Style**
- Use ES6+ features
- Follow React best practices
- Maintain consistent formatting
- Add comprehensive comments

## 📚 **Learning Resources**

### **AI Prompting Concepts**
- [OpenAI Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering)
- [Google AI Best Practices](https://ai.google.dev/docs/prompt_best_practices)
- [Anthropic Claude Prompting](https://docs.anthropic.com/claude/docs/prompting-best-practices)

### **Vector Similarity**
- [Cosine Similarity](https://en.wikipedia.org/wiki/Cosine_similarity)
- [Euclidean Distance](https://en.wikipedia.org/wiki/Euclidean_distance)
- [Dot Product](https://en.wikipedia.org/wiki/Dot_product)

### **Embeddings**
- [Text Embeddings Guide](https://platform.openai.com/docs/guides/embeddings)
- [Vector Databases](https://www.pinecone.io/learn/vector-database/)

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- Google Gemini AI for providing the AI capabilities
- React and Tailwind CSS communities for excellent tooling
- Open source contributors who inspired this project

## 📞 **Support**

For questions, issues, or contributions:
- Create an issue on GitHub
- Submit a pull request
- Contact the development team

---

**Built with ❤️ using modern AI technologies and best practices**

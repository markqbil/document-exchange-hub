# Document Exchange Hub - React Application

## B2B Document Exchange Platform

This is a comprehensive B2B document exchange platform that enables secure document transmission between trading partners with intelligent mapping capabilities.

## 🚀 Getting Started with Visual Studio

### Prerequisites
- Visual Studio 2022 (or Visual Studio Code)
- Node.js (v14 or higher)
- npm or yarn package manager

### Option 1: Import into Visual Studio 2022

1. **Open Visual Studio 2022**
2. Click on **"Clone a repository"** or **"Open a local folder"**
3. Navigate to the `document-exchange-hub-project` folder
4. Visual Studio will detect the React project
5. Open the **Terminal** in Visual Studio (View → Terminal)
6. Run the following commands:
   ```bash
   npm install
   npm start
   ```

### Option 2: Import into Visual Studio Code

1. **Open Visual Studio Code**
2. Click **File → Open Folder**
3. Select the `document-exchange-hub-project` folder
4. Open the integrated terminal (Ctrl+`)
5. Run:
   ```bash
   npm install
   npm start
   ```

### Option 3: Create a New Visual Studio React Project

If you prefer to create a fresh Visual Studio project:

1. **Create a new project** in Visual Studio
2. Choose **"Standalone JavaScript React Project"** template
3. Name it "DocumentExchangeHub"
4. Once created, replace the contents of the `src` folder with the files from this project
5. Update `package.json` with the dependencies from this project
6. Run `npm install` to install all dependencies

## 📁 Project Structure

```
document-exchange-hub-project/
├── src/
│   ├── components/
│   │   ├── Navigation.js
│   │   ├── Dashboard.js
│   │   ├── HubInbox.js
│   │   ├── SendDocument.js
│   │   ├── TradingPartners.js
│   │   ├── MappingTables.js
│   │   ├── ConnectionModal.js
│   │   ├── SendViaHubModal.js
│   │   └── ProcessDocumentModal.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── public/
│   └── index.html
├── package.json
├── tailwind.config.js
└── README.md
```

## 🛠️ Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm run build`
Builds the app for production to the `build` folder

### `npm test`
Launches the test runner

## 🎨 Features

### For All Users:
- **Dashboard** - Overview of document exchange metrics
- **Hub Inbox** - Receive and process documents from trading partners
- **Send Documents** - Send documents via Hub or email
- **Intelligent Mapping** - AI-powered product code mapping

### For Admins Only:
- **Trading Partners** - Manage connections with other companies
- **Mapping Tables** - Configure and manage product mappings
- **Connection Requests** - Approve/decline partnership requests

## 🔧 Technology Stack

- **React 18** - UI framework
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **JavaScript ES6+** - Programming language

## 📝 Development Notes

### Adding API Integration

When ready to connect to your backend API, update the following:

1. Replace mock data in `App.js` with API calls
2. Add axios or fetch for HTTP requests:
   ```bash
   npm install axios
   ```
3. Create a `services/` folder for API functions
4. Add authentication/authorization logic

### Environment Variables

Create a `.env` file in the root directory:
```
REACT_APP_API_URL=https://your-api-endpoint.com
REACT_APP_HUB_VERSION=1.0.0
```

## 🔒 Security Considerations

- Admin-only features are UI-protected (add backend validation)
- Connection requests require registration verification
- Document transmission uses secure Hub connections
- User-specific notifications ensure privacy

## 📦 Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

This project is proprietary software for B2B document exchange.

## 💡 Tips for Visual Studio Users

1. **IntelliSense**: Visual Studio provides excellent IntelliSense for React. Install the "JavaScript and TypeScript" workload if not already installed.

2. **Debugging**: You can debug React apps directly in Visual Studio:
   - Set breakpoints in your code
   - Press F5 to start debugging
   - Choose "Chrome" as the debug target

3. **Extensions**: Recommended Visual Studio extensions:
   - React code snippets
   - Prettier - Code formatter
   - ESLint

4. **Hot Reload**: The development server supports hot module replacement - your changes will appear instantly without losing application state.

## 🚨 Troubleshooting

### Common Issues:

1. **npm install fails**: Delete `node_modules` and `package-lock.json`, then try again
2. **Port 3000 in use**: Change the port in package.json: `"start": "set PORT=3001 && react-scripts start"`
3. **Tailwind styles not working**: Ensure Tailwind is properly configured in `tailwind.config.js`

## 📞 Support

For questions about the Document Exchange Hub implementation, please refer to the Business Requirements Document or contact your development team.

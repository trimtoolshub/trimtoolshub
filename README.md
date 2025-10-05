# TrimToolsHub - Your Digital Toolbox

A comprehensive collection of free online tools for developers, designers, and content creators. Built with React, Vite, and modern web technologies.

## 🚀 Features

- **100+ Free Tools** - AI, Developer, Design, SEO, and more
- **Modern UI/UX** - Clean, responsive design with dark/light themes
- **AI-Powered Tools** - Text generation, image creation, code assistance
- **SEO Optimized** - Meta tags, sitemap, structured data
- **Ad Integration** - Google AdSense with cookie consent
- **Mobile-First** - Responsive design for all devices
- **Fast Performance** - Code splitting and lazy loading

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, React Router DOM
- **Styling**: CSS Variables, Font Awesome Icons
- **SEO**: React Helmet Async, JSON-LD Schema
- **Analytics**: Google Analytics 4
- **Monetization**: Google AdSense
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/trimtoolshub.git
   cd trimtoolshub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your values:
   ```env
   VITE_SITE_URL=https://yourdomain.com
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   VITE_ADSENSE_CLIENT=ca-pub-xxxxxxxxxx
   VITE_ENABLE_ADS=true
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   - Push your code to GitHub
   - Import project in Vercel dashboard
   - Add environment variables in Vercel settings

2. **Environment Variables**
   ```
   VITE_SITE_URL=https://yourdomain.vercel.app
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   VITE_ADSENSE_CLIENT=ca-pub-xxxxxxxxxx
   VITE_ENABLE_ADS=true
   ```

3. **Deploy**
   - Vercel will automatically deploy on every push to main branch
   - Custom domain can be configured in Vercel dashboard

### Manual Build

```bash
npm run build
# Deploy the 'dist' folder to your hosting provider
```

## 📁 Project Structure

```
trimtoolshub/
├── public/
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Search.jsx
│   │   ├── AdSlot.jsx
│   │   ├── ThemeToggle.jsx
│   │   ├── CookieConsent.jsx
│   │   ├── AdBlockDetector.jsx
│   │   └── FontAwesomeIcon.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── AllTools.jsx
│   │   ├── ToolPage.jsx
│   │   ├── Docs.jsx
│   │   └── NotFound.jsx
│   ├── tools/
│   │   ├── registryData.js
│   │   ├── registryComponents.jsx
│   │   └── [tool-name]/
│   │       └── [ToolName].jsx
│   ├── lib/
│   │   └── seo.jsx
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx
│   └── main.jsx
├── scripts/
│   └── generate-sitemap.mjs
├── .env.example
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 Tool Categories

- **AI Tools** - Text generation, image creation, code assistance
- **File & Document Tools** - PDF manipulation, format conversion
- **Developer Utilities** - UUID generation, JWT decoder, hash tools
- **Data Security & Encoding** - Base64, HTML entities, encryption
- **Content & Writing Tools** - Grammar checker, plagiarism detection
- **Design & Color Tools** - Gradient generator, contrast checker
- **Math & Science Tools** - Unit converter, matrix calculator
- **Web & SEO Tools** - Meta tag generator, schema markup
- **YouTube Tools** - Analytics, tag generation, statistics
- **Website Management** - SEO analysis, performance monitoring

## 🔧 Development

### Adding New Tools

1. **Create tool component** in `src/tools/[tool-name]/[ToolName].jsx`
2. **Add tool metadata** to `src/tools/registryData.js`
3. **Register component** in `src/tools/registryComponents.jsx`
4. **Test locally** with `npm run dev`

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SITE_URL` | Your website URL | Yes |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics ID | No |
| `VITE_ADSENSE_CLIENT` | AdSense client ID | No |
| `VITE_ENABLE_ADS` | Enable/disable ads | No |

## 📊 SEO Features

- **Meta Tags** - Dynamic title, description, keywords
- **Open Graph** - Social media sharing optimization
- **Twitter Cards** - Enhanced Twitter sharing
- **JSON-LD Schema** - Structured data for search engines
- **Sitemap** - Auto-generated XML sitemap
- **Robots.txt** - Search engine crawling instructions

## 🎨 Customization

### Themes
- Light/Dark mode toggle
- CSS variables for easy color customization
- Responsive design for all screen sizes

### Ads Integration
- Google AdSense ready
- Cookie consent compliance
- AdBlock detection
- Multiple ad placements

## 📈 Analytics

- Google Analytics 4 integration
- Page view tracking
- Route change monitoring
- Performance metrics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-tool`)
3. Commit your changes (`git commit -m 'Add amazing tool'`)
4. Push to the branch (`git push origin feature/amazing-tool`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Font Awesome](https://fontawesome.com/) - Icons
- [Hugging Face](https://huggingface.co/) - AI models

## 📞 Support

- **Website**: [trimtoolshub.com](https://trimtoolshub.com)
- **Email**: contact@trimkore.com
- **Issues**: [GitHub Issues](https://github.com/yourusername/trimtoolshub/issues)

---

Made with ❤️ by [TrimKore Digital](https://trimkore.com)

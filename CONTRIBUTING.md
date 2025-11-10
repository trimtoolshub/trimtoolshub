# Contributing to TrimToolsHub

Thank you for your interest in contributing to TrimToolsHub! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### 1. Fork the Repository
- Click the "Fork" button on the GitHub repository page
- Clone your fork locally:
  ```bash
  git clone https://github.com/yourusername/trimtoolshub.git
  cd trimtoolshub
  ```

### 2. Set Up Development Environment
```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

### 3. Create a Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 4. Make Your Changes
- Follow the coding standards
- Add tests if applicable
- Update documentation as needed

### 5. Test Your Changes
```bash
# Run the build
npm run build

# Test locally
npm run dev
```

### 6. Commit and Push
```bash
git add .
git commit -m "Add: brief description of your changes"
git push origin feature/your-feature-name
```

### 7. Create a Pull Request
- Go to your fork on GitHub
- Click "New Pull Request"
- Fill out the PR template
- Submit for review

## 🛠️ Development Guidelines

### Code Style
- Use consistent indentation (2 spaces)
- Follow React best practices
- Use meaningful variable and function names
- Add comments for complex logic

### File Structure
```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── tools/         # Tool-specific components
├── lib/           # Utility functions
└── styles/        # Global styles
```

### Adding New Tools

1. **Create Tool Component**
   ```bash
   mkdir src/tools/your-tool-name
   touch src/tools/your-tool-name/YourToolName.jsx
   ```

2. **Add Tool Metadata**
   Update `src/tools/registryData.js`:
   ```javascript
   {
     id: 'your-tool-name',
     slug: 'your-tool-name',
     name: 'Your Tool Name',
     shortDescription: 'Brief description of what the tool does',
     keywords: ['keyword1', 'keyword2', 'keyword3'],
     category: 'category-id',
     featured: false
   }
   ```

3. **Register Component**
   Update `src/tools/registryComponents.jsx`:
   ```javascript
   'your-tool-name': lazy(() => import('./your-tool-name/YourToolName.jsx')),
   ```

4. **Tool Component Template**
   ```jsx
   import { useState } from 'react'
   import SEOHead from '../../lib/seo.jsx'
   import AdSlot from '../../components/AdSlot'

   const YourToolName = () => {
     const [input, setInput] = useState('')
     const [output, setOutput] = useState('')

     const processInput = () => {
       // Your tool logic here
       setOutput('Processed result')
     }

     return (
       <>
         <SEOHead
           title="Your Tool Name | Free Online Tool – TrimToolsHub"
           description="Brief description of your tool and its benefits."
           keywords={['your', 'tool', 'keywords']}
         />
         <div className="tool-container">
           <h1>Your Tool Name</h1>
           <p>Description of what your tool does.</p>
           
           <AdSlot slotId="tool-top" style={{ margin: '1rem 0' }} />
           
           <div className="card">
             {/* Your tool UI here */}
           </div>
           
           <AdSlot slotId="tool-bottom" style={{ margin: '2rem 0 1rem 0' }} />
         </div>
       </>
     )
   }

   export default YourToolName
   ```

### SEO Requirements

Each tool must include:
- **Title**: `"[Tool Name] | Free Online Tool – TrimToolsHub"`
- **Meta Description**: 150-160 characters with pain point
- **H1**: Tool name with keyword
- **Schema.org SoftwareApplication** markup
- **AdSlot** components for monetization

### Testing Checklist

Before submitting a PR, ensure:
- [ ] Tool works correctly
- [ ] Responsive design works on mobile
- [ ] SEO meta tags are properly set
- [ ] Ad slots are included
- [ ] No console errors
- [ ] Build completes successfully
- [ ] Code follows project conventions

## 🐛 Reporting Issues

### Bug Reports
When reporting bugs, include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS information
- Screenshots if applicable

### Feature Requests
For new features:
- Clear description of the feature
- Use case and benefits
- Potential implementation approach
- Priority level

## 📝 Pull Request Guidelines

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested locally
- [ ] Build passes
- [ ] No console errors

## Checklist
- [ ] Code follows project conventions
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] SEO requirements met
```

### Review Process
1. Automated checks must pass
2. Code review by maintainers
3. Testing on staging environment
4. Approval and merge

## 🏷️ Commit Convention

Use conventional commits:
```
feat: add new AI text generator tool
fix: resolve mobile responsive issue
docs: update README with new tools
style: improve button hover effects
refactor: optimize tool loading performance
test: add unit tests for utility functions
```

## 🎯 Areas for Contribution

### High Priority
- New AI-powered tools
- Performance optimizations
- Mobile UX improvements
- SEO enhancements

### Medium Priority
- Additional tool categories
- Advanced features for existing tools
- Documentation improvements
- Testing coverage

### Low Priority
- UI/UX refinements
- Code refactoring
- Additional language support
- Accessibility improvements

## 📞 Getting Help

- **Discord**: Join our community server
- **GitHub Discussions**: Ask questions and share ideas
- **Email**: contact@trimkore.com
- **Documentation**: Check the docs folder

## 🏆 Recognition

Contributors will be:
- Listed in the project README
- Mentioned in release notes
- Given credit in the website footer
- Invited to the core team for significant contributions

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to TrimToolsHub! 🚀

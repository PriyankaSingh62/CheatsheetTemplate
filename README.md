# CheatSheet Template

A modern, responsive cheatsheet template built with pure HTML, CSS, and JavaScript. Perfect for creating quick reference guides for programming languages, frameworks, tools, and more.

## Features

- 🎨 **Modern Design**: Clean, professional interface with smooth animations
- 🌙 **Dark Mode**: Toggle between light and dark themes
- 📱 **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- 🔍 **Search**: Real-time search functionality to find specific content
- 📋 **Copy to Clipboard**: One-click copy for all code snippets
- 🖨️ **Print Ready**: Optimized for printing with custom print styles
- 📊 **Layout Options**: Switch between grid and list layouts
- ⌨️ **Keyboard Shortcuts**: Quick access to common functions
- ⚡ **Fast Loading**: No external dependencies, pure vanilla code

## Quick Start

1. Open `index.html` in your web browser
2. Start adding your content to the existing sections
3. Customize the styling in `styles.css`
4. Add custom functionality in `script.js`

## Usage

### Adding New Sections

Add new sections to your cheatsheet by following this pattern:

```html
<section class="cheatsheet-section" data-category="your-category">
    <h2 class="section-title">Your Section Title</h2>
    <div class="items-grid">
        <div class="cheatsheet-item">
            <h3 class="item-title">Item Title</h3>
            <pre class="code-block"><code>Your code here</code></pre>
            <button class="copy-btn" onclick="copyCode(this)">Copy</button>
        </div>
    </div>
</section>
```

### Keyboard Shortcuts

- `Ctrl/Cmd + K`: Focus search input
- `Escape`: Clear search
- `Ctrl/Cmd + P`: Print cheatsheet

### Customization

#### Colors
Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #64748b;
    --background-color: #ffffff;
    --surface-color: #f8fafc;
    /* ... more variables */
}
```

#### Content
Simply edit the HTML content in `index.html` to add your own cheatsheet items.

#### Functionality
Extend the JavaScript in `script.js` to add new features.

## File Structure

```
cheatsheet-template/
├── index.html      # Main HTML structure
├── styles.css      # All styling and themes
├── script.js       # Interactive functionality
└── README.md       # This file
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This template is free to use for personal and commercial projects.

## Tips for Creating Great Cheatsheets

1. **Keep it concise**: Focus on the most important information
2. **Use clear titles**: Make items easy to scan and find
3. **Group related items**: Organize content into logical sections
4. **Test search**: Ensure your content is searchable with relevant keywords
5. **Consider your audience**: Tailor complexity to your target users

## Customization Ideas

- Add syntax highlighting for specific languages
- Include interactive examples
- Add collapsible sections
- Include external links
- Add version information
- Create category filters
- Add export functionality (PDF, JSON, etc.)

Enjoy creating your perfect cheatsheet! 🚀# CheatsheetTemplate

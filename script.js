// DOM Elements
const searchInput = document.getElementById('searchInput');
const clearSearch = document.getElementById('clearSearch');
const toggleTheme = document.getElementById('toggleTheme');
const toggleLayout = document.getElementById('toggleLayout');
const printBtn = document.getElementById('printBtn');
const toast = document.getElementById('toast');
const cheatsheetContainer = document.querySelector('.cheatsheet-container');

// State Management
let currentTheme = localStorage.getItem('theme') || 'light';
let currentLayout = localStorage.getItem('layout') || 'grid';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeLayout();
    setupEventListeners();
    setupSearch();
});

// Theme Management
function initializeTheme() {
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        toggleTheme.textContent = '☀️ Light Mode';
    }
}

function toggleThemeHandler() {
    if (currentTheme === 'light') {
        currentTheme = 'dark';
        document.documentElement.setAttribute('data-theme', 'dark');
        toggleTheme.textContent = '☀️ Light Mode';
        localStorage.setItem('theme', 'dark');
    } else {
        currentTheme = 'light';
        document.documentElement.removeAttribute('data-theme');
        toggleTheme.textContent = '🌙 Dark Mode';
        localStorage.setItem('theme', 'light');
    }
}

// Layout Management
function initializeLayout() {
    if (currentLayout === 'list') {
        cheatsheetContainer.classList.add('list-layout');
        toggleLayout.textContent = '🏗️ Grid Layout';
    }
}

function toggleLayoutHandler() {
    if (currentLayout === 'grid') {
        currentLayout = 'list';
        cheatsheetContainer.classList.add('list-layout');
        toggleLayout.textContent = '🏗️ Grid Layout';
        localStorage.setItem('layout', 'list');
    } else {
        currentLayout = 'grid';
        cheatsheetContainer.classList.remove('list-layout');
        toggleLayout.textContent = '📋 Toggle Layout';
        localStorage.setItem('layout', 'grid');
    }
}

// Event Listeners
function setupEventListeners() {
    toggleTheme.addEventListener('click', toggleThemeHandler);
    toggleLayout.addEventListener('click', toggleLayoutHandler);
    printBtn.addEventListener('click', printCheatsheet);
    clearSearch.addEventListener('click', clearSearchHandler);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
        
        // Escape to clear search
        if (e.key === 'Escape') {
            clearSearchHandler();
        }
        
        // Ctrl/Cmd + P to print
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
            e.preventDefault();
            printCheatsheet();
        }
    });
}

// Search Functionality
function setupSearch() {
    searchInput.addEventListener('input', debounce(searchHandler, 300));
}

function searchHandler() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        showAllItems();
        clearSearch.classList.add('hidden');
        return;
    }
    
    clearSearch.classList.remove('hidden');
    filterItems(searchTerm);
}

function filterItems(searchTerm) {
    const sections = document.querySelectorAll('.cheatsheet-section');
    let hasVisibleSections = false;
    
    sections.forEach(section => {
        const items = section.querySelectorAll('.cheatsheet-item');
        let hasVisibleItems = false;
        
        items.forEach(item => {
            const title = item.querySelector('.item-title').textContent.toLowerCase();
            const code = item.querySelector('.code-block code').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || code.includes(searchTerm)) {
                item.classList.remove('hidden');
                hasVisibleItems = true;
            } else {
                item.classList.add('hidden');
            }
        });
        
        if (hasVisibleItems) {
            section.classList.remove('hidden');
            hasVisibleSections = true;
        } else {
            section.classList.add('hidden');
        }
    });
    
    if (!hasVisibleSections) {
        showNoResultsMessage();
    }
}

function showAllItems() {
    const sections = document.querySelectorAll('.cheatsheet-section');
    const items = document.querySelectorAll('.cheatsheet-item');
    
    sections.forEach(section => section.classList.remove('hidden'));
    items.forEach(item => item.classList.remove('hidden'));
    
    // Remove no results message if it exists
    const noResults = document.querySelector('.no-results');
    if (noResults) {
        noResults.remove();
    }
}

function showNoResultsMessage() {
    const existingMessage = document.querySelector('.no-results');
    if (existingMessage) return;
    
    const message = document.createElement('div');
    message.className = 'no-results';
    message.innerHTML = `
        <div style="text-align: center; padding: 3rem; color: var(--text-secondary);">
            <h3 style="font-size: 1.5rem; margin-bottom: 1rem;">🔍 No results found</h3>
            <p>Try adjusting your search terms or clearing the search.</p>
        </div>
    `;
    
    cheatsheetContainer.appendChild(message);
}

function clearSearchHandler() {
    searchInput.value = '';
    searchHandler();
    searchInput.focus();
}

// Copy Functionality
function copyCode(button) {
    const codeBlock = button.parentElement.querySelector('.code-block code');
    const code = codeBlock.textContent;
    
    navigator.clipboard.writeText(code).then(() => {
        // Visual feedback
        button.textContent = 'Copied!';
        button.classList.add('copied');
        
        showToast('Code copied to clipboard!');
        
        setTimeout(() => {
            button.textContent = 'Copy';
            button.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy code:', err);
        showToast('Failed to copy code', 'error');
    });
}

// Toast Notifications
function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.className = 'toast show';
    
    if (type === 'error') {
        toast.style.backgroundColor = '#ef4444';
    } else {
        toast.style.backgroundColor = 'var(--primary-color)';
    }
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Print Functionality
function printCheatsheet() {
    window.print();
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Enhanced Copy Button Positioning
document.addEventListener('DOMContentLoaded', function() {
    // Position copy buttons better
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.opacity = '1';
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('copied')) {
                this.style.opacity = '0.8';
            }
        });
    });
});

// Add smooth scrolling for better UX
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add intersection observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all cheatsheet items
    const items = document.querySelectorAll('.cheatsheet-item');
    items.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
});

// Add syntax highlighting enhancement
document.addEventListener('DOMContentLoaded', function() {
    const codeBlocks = document.querySelectorAll('.code-block code');
    
    codeBlocks.forEach(block => {
        let content = block.innerHTML;
        
        // Simple syntax highlighting
        content = content
            .replace(/\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|async|await)\b/g, '<span class="keyword">$1</span>')
            .replace(/(['"`])([^'"`]*)\1/g, '<span class="string">$1$2$1</span>')
            .replace(/\/\/.*$/gm, '<span class="comment">$&</span>')
            .replace(/\b\d+\b/g, '<span class="number">$&</span>');
        
        block.innerHTML = content;
    });
});

// Export functions for global access
window.copyCode = copyCode;
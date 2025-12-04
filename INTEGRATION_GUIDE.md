# AI Assistant Integration Guide

This guide shows you how to integrate the AI Assistant component into your Advyon application.

## 📦 Components Overview

### 1. **AIAssistant**
The main AI panel that slides in from the right side with AI tools, insights, and chat functionality.

### 2. **AIAssistantToggle**
A button component to toggle the AI panel, available in two styles:
- `navbar` - For use in navigation bars
- `floating` - Floating action button (bottom-right)

### 3. **AIAssistantProvider**
Context provider to manage AI state globally across your app.

---

## 🚀 Quick Start

### Step 1: Wrap Your App with Provider

Update your `App.jsx` or main entry point:

```jsx
import React from 'react';
import { AIAssistantProvider } from './components';
import YourRoutes from './routes';

function App() {
  return (
    <AIAssistantProvider>
      <YourRoutes />
    </AIAssistantProvider>
  );
}

export default App;
```

### Step 2: Add AI Assistant to Your Layout

There are two main approaches:

#### **Option A: Global Layout (Recommended)**

Add to your main layout component (e.g., `DashboardLayout.jsx`):

```jsx
import React from 'react';
import { AIAssistant, AIAssistantToggle, useAIAssistant } from './components';

const DashboardLayout = ({ children }) => {
  const { isOpen, closeAI } = useAIAssistant();

  return (
    <div className="min-h-screen">
      {/* Your navbar, sidebar, etc. */}
      <main>{children}</main>
      
      {/* AI Assistant Panel - appears on all pages */}
      <AIAssistant 
        isOpen={isOpen} 
        onClose={closeAI}
      />
    </div>
  );
};

export default DashboardLayout;
```

#### **Option B: Per-Page Basis**

Add to individual pages where needed:

```jsx
import React from 'react';
import { AIAssistant, useAIAssistant } from './components';

const CasePage = () => {
  const { isOpen, closeAI } = useAIAssistant();

  return (
    <div>
      {/* Your page content */}
      
      <AIAssistant 
        isOpen={isOpen} 
        onClose={closeAI}
        caseData={{
          caseName: "State v. Smith",
          caseNumber: "CR-2024-892"
        }}
      />
    </div>
  );
};
```

### Step 3: Add Toggle Button

#### In Navbar:

```jsx
import { AIAssistantToggle, useAIAssistant } from './components';

const Navbar = () => {
  const { isOpen, toggleAI } = useAIAssistant();

  return (
    <nav className="flex items-center gap-4">
      {/* Other nav items */}
      
      <AIAssistantToggle 
        onClick={toggleAI}
        isActive={isOpen}
        position="navbar"
      />
    </nav>
  );
};
```

#### As Floating Button:

```jsx
import { AIAssistantToggle, useAIAssistant } from './components';

const SomePage = () => {
  const { isOpen, toggleAI } = useAIAssistant();

  return (
    <div>
      {/* Page content */}
      
      <AIAssistantToggle 
        onClick={toggleAI}
        isActive={isOpen}
        position="floating"
      />
    </div>
  );
};
```

---

## 🎯 Usage Examples

### Example 1: Opening AI with Case Context

```jsx
import { useAIAssistant } from './components';

const CaseDetailsPage = () => {
  const { openAI } = useAIAssistant();

  const handleAnalyzeCase = () => {
    openAI({
      caseName: "State v. Johnson",
      caseNumber: "CR-2024-123",
      caseType: "Criminal Defense"
    });
  };

  return (
    <button onClick={handleAnalyzeCase}>
      Analyze Case with AI
    </button>
  );
};
```

### Example 2: Programmatically Control AI

```jsx
import { useAIAssistant } from './components';

const DocumentViewer = () => {
  const { openAI, closeAI, updateCaseData } = useAIAssistant();

  const handleDocumentUpload = (doc) => {
    // Open AI and update context
    updateCaseData({ 
      currentDocument: doc.name 
    });
    openAI();
  };

  return (
    <div>
      {/* Your document viewer */}
    </div>
  );
};
```

### Example 3: Conditional Rendering

```jsx
const SecurePage = () => {
  const { isOpen, closeAI, openAI } = useAIAssistant();
  const user = useAuth(); // Your auth hook

  // Only show AI for premium users
  if (!user.hasPremium) return null;

  return (
    <AIAssistant 
      isOpen={isOpen} 
      onClose={closeAI}
    />
  );
};
```

---

## 🎨 Customization

### Custom Styling

The AI Assistant uses Tailwind CSS classes. You can customize by:

1. **Modifying Colors**: Update the color classes in `AIAssistant.jsx`
2. **Changing Width**: Modify the `w-80` class
3. **Animation Speed**: Adjust `duration-300` classes

### Adding Custom AI Tools

Edit the "Quick Actions Grid" section in `AIAssistant.jsx`:

```jsx
<button className="flex flex-col items-center justify-center p-3 bg-[#1C4645] hover:bg-[#235755] rounded-lg transition border border-[#2A5C5A] hover:border-teal-500/30 group">
  <YourIcon size={18} className="mb-2 text-teal-400 group-hover:scale-110 transition-transform"/>
  <span className="text-xs text-gray-200">Your Tool</span>
</button>
```

---

## 🔧 API Reference

### `useAIAssistant()` Hook

Returns an object with:

| Property | Type | Description |
|----------|------|-------------|
| `isOpen` | `boolean` | Whether AI panel is open |
| `caseData` | `object` | Current case context data |
| `openAI(data)` | `function` | Open AI panel with optional data |
| `closeAI()` | `function` | Close AI panel |
| `toggleAI()` | `function` | Toggle AI panel open/closed |
| `updateCaseData(data)` | `function` | Update case context |

### `AIAssistant` Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | `false` | Controls visibility |
| `onClose` | `function` | - | Called when panel closes |
| `caseData` | `object` | `{}` | Case context to display |

### `AIAssistantToggle` Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onClick` | `function` | - | Click handler |
| `isActive` | `boolean` | `false` | Whether AI is open |
| `position` | `'navbar' \| 'floating'` | `'navbar'` | Button style |

---

## 📝 Notes

- The AI panel is **fixed position** and overlays content
- A **backdrop** appears when open to focus attention
- **ESC key** support can be added via `useEffect` hook
- The component is **fully responsive** and works on mobile
- All icons use **lucide-react** library

---

## 🐛 Troubleshooting

**AI panel not showing?**
- Ensure `AIAssistantProvider` wraps your app
- Check that `isOpen` is `true` in state
- Verify z-index isn't being overridden

**Toggle button not working?**
- Confirm `useAIAssistant()` is used within provider
- Check console for errors

**Styling issues?**
- Ensure Tailwind CSS is configured
- Check that custom colors are defined in `tailwind.config.js`

---

## 💡 Best Practices

1. **Single Instance**: Only render one `<AIAssistant>` component in your app (in layout)
2. **Context Over Props**: Use the context hook instead of prop drilling
3. **Case Data**: Always provide relevant case context when opening AI
4. **Cleanup**: Close AI panel on route changes if needed
5. **Performance**: The panel uses CSS transforms for smooth animations

---

## 🎉 You're All Set!

The AI Assistant is now ready to use throughout your Advyon application. Users can click the toggle button from any page to access AI-powered legal assistance.

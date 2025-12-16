# Advyon Color Theme

The Advyon application uses a sophisticated "Deep Teal" color palette, designed to convey professionalism, trust, and modern elegance.

## 🎨 Color Palette

| Color Name | Hex Code | HSL | RGB | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Deepest Teal** | `#051C1B` | `176 70% 6%` | `5, 28, 27` | Main Background, Cards, Popovers |
| **Dark Teal** | `#153433` | `178 42% 14%` | `21, 52, 51` | Secondary Backgrounds, Muted Elements |
| **Advyon Teal** | `#1C4645` | `178 43% 19%` | `28, 70, 69` | Primary Brand Color, Buttons, Headers |
| **Accent Teal** | `#3A7573` | `176 34% 34%` | `58, 117, 115` | Borders, Inputs, Interactive States |
| **Soft Teal** | `#B0C4C3` | `176 13% 73%` | `176, 196, 195` | Muted Text, Subtitles |
| **White** | `#FFFFFF` | `0 0% 100%` | `255, 255, 255` | Primary Text, High Contrast Elements |

## 📋 Usage Guidelines

### Backgrounds
- **Main Background**: Use `bg-background` (Deepest Teal `#051C1B`) for the primary application background
- **Cards & Containers**: Use `bg-card` (Deepest Teal `#051C1B`) for content containers and cards
- **Secondary Sections**: Use `bg-muted` (Dark Teal `#153433`) for subtle separation and secondary backgrounds

### Typography
- **Primary Text**: Use `text-foreground` (White `#FFFFFF`) for headings, body text, and high-priority content
- **Secondary Text**: Use `text-muted-foreground` (Soft Teal `#B0C4C3`) for captions, descriptions, and less prominent text

### Interactive Elements

#### Buttons
- **Primary Buttons**: 
  - Background: `bg-primary` (Advyon Teal `#1C4645`)
  - Text: `text-primary-foreground` (White)
  - Hover: Lighten slightly or use `hover:bg-primary/90`
  
#### Inputs & Forms
- **Borders**: Use `border-input` (Accent Teal `#3A7573`)
- **Focus States**: Apply `ring-ring` with the Accent Teal color
- **Background**: Use Dark Teal or Deepest Teal for input backgrounds

### Borders & Dividers
- **Default Borders**: Use `border-border` (Accent Teal `#3A7573`) for subtle contrast
- **Emphasis**: Use lighter teal shades for hover or active states

## 🎯 Component-Specific Guidelines

### Navbar
- Background: Advyon Teal `#1C4645`
- Border: Accent Teal `#3A7573` with 30% opacity
- Text: White with Soft Teal for secondary elements

### Sidebar
- Background: Advyon Teal `#1C4645`
- Border: Accent Teal `#3A7573` with 30% opacity
- Active state: Accent Teal `#3A7573` with 30% background
- Hover: Accent Teal `#3A7573` with 20% background

### AI Assistant
- Background: Dark Teal `#153433` with 95% opacity and backdrop blur
- Border: Accent Teal `#3A7573`
- Cards/Sections: Advyon Teal `#1C4645`
- Accents: Use themed colors (red, amber, emerald) with teal undertones

### Dashboard
- Main Background: Deepest Teal `#051C1B`
- Content Cards: Advyon Teal `#1C4645` or Dark Teal `#153433`
- Borders: Accent Teal `#3A7573`

## 🌈 Accent Colors

While the primary palette is teal-based, accent colors are used sparingly for status indicators and special elements:

- **Success/Positive**: Emerald with teal undertones
- **Warning/Attention**: Amber with teal undertones  
- **Error/Negative**: Red with teal undertones
- **Info**: Blue with teal undertones

These should maintain the overall teal aesthetic while providing clear visual feedback.

## 💡 Best Practices

1. **Consistency**: Always use the defined CSS variables rather than hard-coded hex values
2. **Contrast**: Ensure sufficient contrast between text and backgrounds (WCAG AA minimum)
3. **Hierarchy**: Use color to establish visual hierarchy, not just size and weight
4. **Accessibility**: Test color combinations for color-blind users
5. **Theming**: All colors are theme-aware and work in both light and dark contexts

## 🔧 Implementation

Colors are defined as CSS custom properties in `index.css`:

```css
:root {
  --background: 176 70% 6%;        /* Deepest Teal */
  --foreground: 0 0% 100%;         /* White */
  --card: 176 70% 6%;              /* Deepest Teal */
  --card-foreground: 0 0% 100%;    /* White */
  --muted: 178 42% 14%;            /* Dark Teal */
  --muted-foreground: 176 13% 73%; /* Soft Teal */
  --primary: 178 43% 19%;          /* Advyon Teal */
  --primary-foreground: 0 0% 100%; /* White */
  --border: 176 34% 34%;           /* Accent Teal */
  --input: 176 34% 34%;            /* Accent Teal */
  --ring: 176 34% 34%;             /* Accent Teal */
}
```

Use Tailwind classes like `bg-background`, `text-foreground`, `border-border`, etc. for consistent theming.

---

**Version**: 1.0  
**Last Updated**: December 2024  
**Owner**: Advyon Design Team

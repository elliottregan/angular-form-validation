[![Netlify Status](https://api.netlify.com/api/v1/badges/e7598042-decf-4303-93eb-58c2a4b7b751/deploy-status)](https://app.netlify.com/projects/angular-form-validation-demo/deploys)

# Angular Advanced Form Validation

A sophisticated Angular 20 application demonstrating advanced reactive form validation patterns using a weekly schedule form with strict TypeScript typing and semantic CSS custom properties.

## Features

- **Typed Reactive Forms**: Full TypeScript integration with Angular's typed forms
- **Custom Validation**: Multi-level validation system (field, group, and cross-field)
- **Control Value Accessor Components**: Reusable form components with semantic styling
- **Conditional Form Controls**: Dynamic enabling/disabling based on user input
- **Comprehensive Error Handling**: Contextual error messages with consistent styling
- **Semantic CSS System**: Theme-aware custom properties with automatic dark mode support

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Format code
npm run format
```

Visit `http://localhost:4200` to see the application.

## CSS Custom Properties System

This project uses a sophisticated CSS custom properties system for consistent, maintainable, and accessible styling. The system is built around semantic naming conventions and automatic theme switching.

### Core Architecture

The CSS system is organized into several layers:

#### 1. Theme-Independent Foundation

```css
:root {
  /* Hue-based color system */
  --accent-hue: 240;   /* Primary brand color hue */
  --error-hue: 25;     /* Error state hue */
  --success-hue: 145;  /* Success state hue */
  
  /* Spacing scale */
  --spacing-xs: 0.25rem;   /* 4px */
  --spacing-sm: 0.5rem;    /* 8px */
  --spacing-md: 1rem;      /* 16px */
  --spacing-lg: 1.5rem;    /* 24px */
  --spacing-xl: 2rem;      /* 32px */
  /* ... additional spacing values */
}
```

#### 2. Primitive Color Scales

Colors are defined using the [OKLCH color space](https://oklch.com/) for better perceptual uniformity:

```css
/* Light theme example */
--color-error-50: oklch(98% 0.02 var(--error-hue));    /* Very light backgrounds */
--color-error-100: oklch(95% 0.05 var(--error-hue));   /* Light backgrounds */
--color-error-300: oklch(80% 0.12 var(--error-hue));   /* Borders */
--color-error-500: oklch(65% 0.18 var(--error-hue));   /* Primary color */
--color-error-700: oklch(45% 0.15 var(--error-hue));   /* Text */
```

#### 3. Semantic Color Properties

Semantic properties provide meaning-based color assignments:

```css
/* Borders */
--border-color: oklch(65% 0.15 var(--accent-hue));
--border-color-subtle: oklch(92% 0.15 var(--accent-hue));
--border-color-error: var(--color-error-300);
--border-color-focus: oklch(65% 0.15 var(--accent-hue));

/* Text colors */
--text-color: oklch(50% 0.01 240);
--text-color-success: var(--color-success-700);
--text-color-error: var(--color-error-700);
--text-color-muted: oklch(65% 0.005 240);

/* Background colors */
--bg-color: oklch(100% 0 0);
--bg-color-success: var(--color-success-100);
--bg-color-error: var(--color-error-100);
--bg-color-primary: oklch(65% 0.15 var(--accent-hue));
```

#### 4. Surface System

For elevated components, cards, and layered interfaces:

```css
--surface-color: var(--color-surface-100);           /* Base surface */
--surface-elevated-color: var(--color-surface-50);   /* Elevated elements */
--surface-depressed-color: var(--color-surface-200); /* Recessed areas */
--surface-overlay-color: var(--color-surface-100);   /* Modal overlays */
--surface-border-color: var(--color-surface-300);    /* Surface borders */
--surface-shadow: 0 0.0625rem 0.1875rem 0 rgba(0, 0, 0, 0.1);
```

### Usage Patterns

#### Basic Component Styling

```css
.my-component {
  background-color: var(--surface-color);
  border: 1px solid var(--border-color);
  color: var(--text-color);
  padding: var(--spacing-md);
}
```

#### Error States

```css
.form-input {
  border-color: var(--border-color);
  
  &.error {
    border-color: var(--border-color-error);
    background-color: var(--bg-color-error);
    color: var(--text-color-error);
  }
}
```

#### Focus States

```css
.interactive-element:focus {
  outline: none;
  box-shadow: 0 0 0 var(--spacing-2) var(--shadow-color-focus);
}
```

### Automatic Dark Mode

The system automatically adapts to dark mode using `prefers-color-scheme`:

```css
@media (prefers-color-scheme: dark) {
  :root {
    /* All color values are redefined for dark theme */
    --bg-color: oklch(20% 0.01 240);
    --text-color: oklch(85% 0.005 240);
    /* ... etc */
  }
}
```

### Customization

#### Changing Brand Colors

Update the hue values to rebrand the entire application:

```css
:root {
  --accent-hue: 290;   /* Purple brand */
  --error-hue: 15;     /* Orange-red errors */
  --success-hue: 120;  /* Pure green success */
}
```

#### Adding New Semantic Properties

Follow the established naming pattern:

```css
:root {
  /* Add new primitive colors */
  --color-warning-300: oklch(80% 0.12 var(--warning-hue));
  --color-warning-700: oklch(45% 0.15 var(--warning-hue));
  
  /* Add semantic properties */
  --border-color-warning: var(--color-warning-300);
  --text-color-warning: var(--color-warning-700);
  --bg-color-warning: var(--color-warning-100);
}
```

### Benefits

1. **Consistency**: Semantic naming ensures consistent color usage across components
2. **Maintainability**: Changes to the color system propagate automatically
3. **Accessibility**: OKLCH provides better perceptual uniformity and contrast ratios
4. **Theme Support**: Automatic dark mode with no component-level changes required
5. **Flexibility**: Easy rebranding by changing hue values
6. **Performance**: CSS custom properties are more performant than Sass variables

## Architecture Overview

### Form Structure

- **Typed Reactive Forms**: Uses Angular's typed forms with strict TypeScript interfaces
- **Custom Validation**: Multi-level validation system (field-level, group-level, cross-field)
- **Control Value Accessor**: Reusable form components that integrate seamlessly with Angular forms
- **Conditional Controls**: Dynamic form control management using custom directives

### Key Components

- `ScheduleFormComponent` - Main form container
- `TimeInputComponent` - Custom time input with validation styling
- `CheckboxInputComponent` - Custom checkbox with semantic styling
- `ErrorMessageComponent` - Reusable error display with consistent formatting

### Validation System

Custom validators handle complex scenarios:
- `requiredWhenEnabled` - Conditional required validation
- `sameOpenCloseValidator` - Prevents identical open/close times
- `closeAfterOpenValidator` - Ensures logical time ordering

## License

MIT License - see LICENSE file for details.

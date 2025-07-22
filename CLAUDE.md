# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm start` or `ng serve`
- **Build production**: `npm run build` or `ng build`
- **Format code**: `npm run format` (applies Prettier formatting)
- **Check formatting**: `npm run format:check` (validates Prettier formatting)

## Architecture Overview

This is an Angular 20 standalone components application demonstrating advanced reactive form validation patterns for a weekly schedule form.

### Core Form Architecture

The application uses a sophisticated form structure with strict TypeScript typing:

- **Main Form**: `ScheduleForm` interface defines the complete form structure
- **Days Collection**: `DaysForm` type uses `Record<DayOfWeek, FormGroup<DayForm>>` for strict typing of day names
- **Individual Days**: `DayForm` interface defines each day's controls (enabled checkbox, open/close time inputs)
- **Value Types**: Separate interfaces for form values vs. form controls

### Key Architectural Patterns

#### 1. Typed Reactive Forms

- Uses modern Angular typed forms with `FormGroup<T>` and `FormControl<T>`
- `DayOfWeek` union type derived from `DAYS_OF_WEEK` constant ensures type safety
- Form models in `src/models/schedule-form.model.ts` provide complete type definitions

#### 2. Custom Form Components with CVA

- `TimeInputComponent` and `CheckboxInputComponent` implement `ControlValueAccessor`
- Components auto-generate unique IDs and handle their own validation styling
- Follow semantic color property patterns using CSS custom properties

#### 3. Conditional Form Control Management

- `EnableWhenDirective` manages conditional enabling/disabling of form controls
- Directive injects `NgControl` to automatically find and manage the host form control
- Applied directly to components with CVA: `<app-time-input [enableWhen]="checkboxControl" formControlName="field">`

#### 4. Multi-Level Validation System

- **Field-level**: Standard Angular validators (`Validators.required`)
- **Group-level**: Custom validators that operate on entire day groups
- **Cross-field**: `sameOpenCloseValidator`, `closeAfterOpenValidator`, `requiredWhenEnabled`
- Custom validators return `{ errorKey: { message: string } }` for consistent error handling

#### 5. Error Display Architecture

- `ErrorMessageComponent` accepts any `AbstractControl` and displays validation errors
- Handles both built-in validators and custom validators with message objects
- Only shows errors when controls are `touched` and `invalid`

### Component Organization

Components are organized in individual directories under `src/components/`:

- `schedule-form/` - Main form component
- `time-input/` - Reusable time input with CVA
- `checkbox-input/` - Reusable checkbox input with CVA
- `error-message/` - Reusable error display component
- `debug-section/` - Development debugging components
- `debug-table/` - Displays form state in table format
- `form-stats/` - Shows form validation statistics
- `error-banner/` - Form-level error summary

### Validation Logic

Custom validators in `src/validators/schedule-validators.ts`:

- `requiredWhenEnabled`: Validates that time fields are required only when day is enabled and both fields are touched
- `sameOpenCloseValidator`: Prevents open and close times from being identical
- `closeAfterOpenValidator`: Ensures close time is after open time using Date comparison

### Styling System

Uses semantic CSS custom properties for consistent theming:

- Base semantic colors defined in debug-table as reference pattern
- Error states use `--border-color-error`, `--text-color-error`, etc.
- Components override properties for state-specific styling

### Form State Management

- Form controls for time inputs start `disabled: true` since days start unchecked
- `EnableWhenDirective` handles the conditional enabling based on checkbox state
- Group validators run on value changes but not on touched state changes (Angular limitation)

## Important Development Notes

- Always use the established semantic color property patterns when adding new styles
- Custom validators must return `{ errorKey: { message: string } }` format for error display consistency
- When creating new form components, implement `ControlValueAccessor` and use the auto-ID generation pattern
- The `EnableWhenDirective` should be used for any conditional form control enabling/disabling
- Form typing relies on the `DAYS_OF_WEEK` constant - changes there will propagate through the type system

# Project Rules

1. **Forms and Validation:** Always use `react-hook-form` with `zod` resolvers for forms. Never use fully uncontrolled inputs or basic React state (`useState`) for complex form validation.
2. **Styling Constraints:** Use Tailwind CSS exclusively for styling. Do not use inline styles (`style={{}}`) or standard CSS/SCSS modules unless explicitly bypassing a Tailwind limitation.
3. **Accessibility (a11y):** All form inputs must have associated labels (using `htmlFor`). Inputs with validation errors must use `aria-invalid="true"` and `aria-describedby` pointing to the error message ID so screen readers can announce the error.

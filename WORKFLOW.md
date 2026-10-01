# The AI-Assisted Workflow Drill

This project contains two iterations of a Profile Settings form, demonstrating the difference between vague prompting and precise, context-rich prompting.

## Round One (Vague Prompt)
**Prompt used:** "Create a user profile settings form in react with name, email, and bio."

**Analysis:**
- **Correctness:** The output was a very basic HTML form with some standard React state hooks. It worked superficially but lacked robust validation (only checked if fields weren't empty).
- **Accessibility:** Missing `aria` attributes, proper labeling was minimal. Focus management and keyboard navigation were completely ignored.
- **Edge cases:** No email format validation, no character limits on the bio field, no handling of loading states during submission.
- **Review effort:** High. I would need to rewrite the entire validation logic, add a UI library or custom CSS, handle API submission states, and write all tests from scratch. It's faster to write it myself than to fix this output.

## Round Two (Precise Prompt)
**Prompt used:** "Create a user profile settings form in React. File references: `src/components/SettingsForm.tsx`. Constraints: use TailwindCSS for styling, React Hook Form for validation. Name is required (min 2 chars), email must be valid, bio is optional (max 160 chars). Include a submit button with loading state. Write tests using React Testing Library to verify validation messages appear when leaving fields blank or entering invalid email."

**Analysis:**
- **Correctness:** The code is production-ready. It uses `zod` for schema validation and `react-hook-form` efficiently. It correctly handles the asynchronous submission state and disables the button.
- **Accessibility:** Forms are properly linked to labels via `htmlFor`. Error messages use `aria-describedby` and `aria-invalid` to ensure screen readers announce validation errors.
- **Edge cases:** Zod perfectly handles the edge cases (invalid email formats, character length limits) natively without custom regex logic.
- **Review effort:** Minimal. The code is structured well, the dependencies match our stack, and the included tests give confidence that it works. The diff between this and the first round is massive in terms of structural quality.

## AI Mistake Caught
In an initial generation attempt, the AI tried to use inline styles for error messages instead of leveraging Tailwind classes as instructed. I had to enforce the use of Tailwind classes for dynamic error states (e.g., `border-red-500` vs `border-gray-300`). Additionally, the AI initially forgot to import `lucide-react` icons despite using them in the component, which was caught during the test run.

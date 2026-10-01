import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import SettingsForm from './SettingsForm';

describe('SettingsForm', () => {
  it('renders all form fields', () => {
    render(<SettingsForm />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/bio/i)).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty form', async () => {
    render(<SettingsForm />);
    
    fireEvent.click(screen.getByRole('button', { name: /save settings/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
    });
  });

  it('shows validation error for invalid email', async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);
    
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'invalid-email');
    
    fireEvent.click(screen.getByRole('button', { name: /save settings/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
      expect(screen.queryByText(/name must be at least 2 characters/i)).not.toBeInTheDocument();
    });
  });

  it('submits form successfully with valid data', async () => {
    const user = userEvent.setup();
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    
    render(<SettingsForm />);
    
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/bio/i), 'Software Developer');
    
    fireEvent.click(screen.getByRole('button', { name: /save settings/i }));
    
    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('Settings saved successfully!');
    });
    
    alertMock.mockRestore();
  });
});

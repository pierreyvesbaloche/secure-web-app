import { render, screen } from '@testing-library/angular';
import { WelcomeComponent } from './welcome.component';

describe('WelcomeComponent', () => {
  beforeEach(() => {
    localStorage.setItem('username', 'user');
  });

  afterEach(() => {
    localStorage.removeItem('username');
  });

  it('should display a custom greeting with the username', async () => {
    await render(WelcomeComponent);
    expect(screen.getByText('Welcome, user!')).toBeTruthy();
    expect(screen.getByText('You are now logged in.')).toBeTruthy();
  });
});

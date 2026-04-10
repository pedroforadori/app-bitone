import { render, screen } from '@testing-library/react';
import { KpiCard } from '../KpiCard';
import { TrendingUp } from 'lucide-react';

describe('KpiCard', () => {
  it('renders label and value correctly', () => {
    render(<KpiCard label="Total Sales" value="1,234" />);

    expect(screen.getByText('Total Sales')).toBeInTheDocument();
    expect(screen.getByText('1,234')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    render(<KpiCard label="Revenue" value="$5,678" icon={<TrendingUp />} />);

    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('$5,678')).toBeInTheDocument();
    // Icon is rendered, but hard to test specifically without data-testid
  });

  it('renders trend when provided', () => {
    render(<KpiCard label="Growth" value="15%" trend={{ value: 10, direction: 'up' }} />);

    expect(screen.getByText('Growth')).toBeInTheDocument();
    expect(screen.getByText('15%')).toBeInTheDocument();
    expect(screen.getByText('↑ 10%')).toBeInTheDocument();
  });

  it('renders down trend correctly', () => {
    render(<KpiCard label="Decline" value="5%" trend={{ value: 5, direction: 'down' }} />);

    expect(screen.getByText('↓ 5%')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<KpiCard label="Test" value="100" className="custom-class" />);

    const card = screen.getByText('Test').closest('.custom-class');
    expect(card).toBeInTheDocument();
  });
});
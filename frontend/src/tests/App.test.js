import {render, screen, waitFor} from '@testing-library/react';
import App from '../App';
import {fetchOrder} from '../network/api';

jest.mock('../network/api');

const mockOrder = [
    {id: 1, name: 'Order 1', amount: 100, status: 'Pending'},
    {id: 2, name: 'Order 2', amount: 200, status: 'Completed'},
];

describe('App Component', () => {
    beforeEach(() => {
        fetchOrder.mockResolvedValue(mockOrder);
    });

    test('renders logo', async () => {
        render(<App/>);
        const logo = screen.getByAltText('logo');
        expect(logo).toBeInTheDocument();
    });

    test('renders order list', async () => {
        render(<App/>);
        await waitFor(() => {
            const orderItems = screen.getAllByText(/Order/i);
            expect(orderItems.length).toBe(mockOrder.length);
        });
    });
});

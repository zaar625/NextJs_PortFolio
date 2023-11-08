import ProductDesc from '../ProductDesc';
import { render } from '@/utils/test-utils/renderWithContext';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null
    };
  }
}));

jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react');
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { username: 'tester' }
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: 'authenticated' }; // return type is [] in v3 but changed to {} in v4
    })
  };
});

const products = [
  {
    name: 'hello',
    color: ['white']
  }
];

test('상품에 대한 설명', () => {
  render(<ProductDesc product={products} />);
});

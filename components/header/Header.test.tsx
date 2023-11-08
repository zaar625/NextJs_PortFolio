import { render, screen } from '@/utils/test-utils/renderWithContext';
import Header from './Header';

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

test('헤더에 로고가 있는지 확인', async () => {
  render(<Header />);
  const logoText = await screen.findByRole('link', { name: 'BABAN' });

  expect(logoText).toBeInTheDocument();
});

describe('사용자의 로그인 상태 여부 확인', () => {
  it('renders login button when user is not authenticated', () => {
    // 모킹된 useSession 함수의 반환값을 설정합니다.
    const mockUseSession = jest.requireMock('next-auth/react').useSession;
    mockUseSession.mockReturnValueOnce({ data: null });

    render(<Header />);

    expect(screen.getByText('login')).toBeInTheDocument();
  });

  it('renders logout button when user is authenticated', () => {
    const mockUseSession = jest.requireMock('next-auth/react').useSession;
    mockUseSession.mockReturnValueOnce({ data: { user: { name: 'testUser' } } });

    render(<Header />);

    expect(screen.getByText('logout')).toBeInTheDocument();
  });
});

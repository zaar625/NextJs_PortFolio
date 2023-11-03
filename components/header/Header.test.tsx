import {render, screen} from '@/utils/test-utils/renderWithContext'
import Header from './Header'

jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual('next-auth/react');
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { username: "admin" }
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return {data: mockSession, status: 'authenticated'}  // return type is [] in v3 but changed to {} in v4
    }),
  };
});

test('헤더에 로고가 있는지 확인', async() => {
    render(<Header />);
    const logoText = await screen.findByRole('link',{name:'BABAN'});

    expect(logoText).toBeInTheDocument();
});
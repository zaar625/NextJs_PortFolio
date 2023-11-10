import ProductDesc from '../ProductDesc';
import { render, screen } from '@/utils/test-utils/renderWithContext';
import userEvent from '@testing-library/user-event';

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

const mockProducts = [
  {
    name: 'Nicke Chain Shoulder Bag',
    color: ['white', 'black']
  }
];

test('상품에 대한 설명이 있어야합니다.', async () => {
  render(<ProductDesc product={mockProducts} />);

  const productTitle = await screen.findByRole('heading');
  const figcaptionElement = screen.getByTestId('custom-figcaption');

  expect(productTitle).toBeInTheDocument();
  expect(figcaptionElement).toBeInTheDocument();
});

test('사용자가 색상 버튼클 클릭하면 해당 색상이 active됩니다.', async () => {
  const user = userEvent.setup();
  render(<ProductDesc product={mockProducts} />);

  const colorBtnElement = await screen.findByRole('button', { name: 'white' });

  await user.click(colorBtnElement);

  expect(colorBtnElement).toHaveClass('color_active');
});

test('수량의 초기 값은 1입니다.', async () => {
  const initialNum = 1;
  const user = userEvent.setup();
  const { container } = render(<ProductDesc product={mockProducts} />);

  const quantityEl = container.querySelector('.productDetail__des__quan');
  const pElementInsideColor = quantityEl?.querySelector('p');

  expect(pElementInsideColor).toHaveTextContent(`${initialNum}`);
});

test('수량의 마이너스 아이콘을 클릭하면 현재 수량의 -1이됩니다.', async () => {
  const user = userEvent.setup();
  const { container } = render(<ProductDesc product={mockProducts} />);

  const quantityEl = container.querySelector('.productDetail__des__quan');
  const pElementValue = quantityEl?.querySelector('p');
  const minusIcon = container.querySelector('.minus-icon') as Element;

  if (pElementValue?.textContent === '1') {
    await user.click(minusIcon);
    expect(pElementValue).toHaveTextContent('1');

    return;
  }

  if (Number(pElementValue?.textContent) === 2) {
    await user.click(minusIcon);
    expect(pElementValue).toHaveTextContent('1');
  }
});

test('수량의 플러스 아이콘을 클릭하면 현재 수량의 +1이 됩니다.', async () => {
  const user = userEvent.setup();
  const { container } = render(<ProductDesc product={mockProducts} />);

  const quantityEl = container.querySelector('.productDetail__des__quan');
  const pElementValue = quantityEl?.querySelector('p');
  const plusIcon = container.querySelector('.plus-icon') as Element;

  if (pElementValue?.textContent === '1') {
    await user.click(plusIcon);
    expect(pElementValue).toHaveTextContent('2');

    return;
  }
});

test('카트에 담기 버튼과 구매하기 버튼이 있습니다.', () => {});

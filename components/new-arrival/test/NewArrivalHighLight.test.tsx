import { render, screen } from '@/utils/test-utils/renderWithContext';
import NewArrivalHighLight from '../NewArrivalHighLight';

test('대표이미지가 2개가 나타나야 합니다.', async () => {
  render(<NewArrivalHighLight />);
  const images = await screen.findAllByRole('img');

  expect(images).toHaveLength(2);
});

test('신규상품에 대한 설명이 들어와야합니다.', () => {
  render(<NewArrivalHighLight />);
  const paragraphElement = screen.getByTestId('description');
  expect(paragraphElement).toBeInTheDocument();
});

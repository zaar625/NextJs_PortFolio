import HeroSlide from './HeroSlide';
import { render } from '@/utils/test-utils/renderWithContext';

/**
 * import swiper/css -  SyntaxError: Cannot use import statement outside a module
 * @see https://stackoverflow.com/questions/69249400/how-can-i-test-swiper-with-jest

 */

test('배너에는 총 3개의 이미지가 들어가 있습니다.', () => {
  render(<HeroSlide />);
});

test('슬라이드가 자동으로 움직이고 있습니다.', () => {});

test('재생 버튼을 클릭하면 슬라이드가 움직입니다.', () => {});

test('정지 버튼을 클릭하면 슬라이드가 멈춥니다.', () => {});

test('다음 버튼을 클릭하면 다음 슬라이드가 나타납니다.', () => {});

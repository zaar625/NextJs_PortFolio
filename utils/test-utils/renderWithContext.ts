import { render } from "@testing-library/react";
import { ReduxProvider } from "@/redux/ReduxProvider";

const renderWithContext = (ui:React.JSX.Element) =>
  render(ui, { wrapper: ReduxProvider});

// re-export everything
export * from "@testing-library/react";

// override render method
export { renderWithContext as render };
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { TopPage } from ".";

describe("TopPage", () => {
  beforeEach(() => {
    Object.defineProperty(window, "ResizeObserver", {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        disconnect: jest.fn(),
        observe: jest.fn(),
      })),
    });

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    render(
      <TopPage
        prefectures={[
          {
            prefCode: 1,
            prefName: "北海道",
          },
          {
            prefCode: 2,
            prefName: "青森県",
          },
          {
            prefCode: 3,
            prefName: "岩手県",
          },
          {
            prefCode: 4,
            prefName: "宮城県",
          },
          {
            prefCode: 5,
            prefName: "秋田県",
          },
        ]}
      />
    );
  });

  // TODO: コンポーネントの実装が進んだらテストを書く
  it("test", () => {
    expect(true).toBe(true);
  });
});

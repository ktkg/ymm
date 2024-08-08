import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { TopPage } from ".";

describe("TopPage", () => {
  beforeEach(() => {
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      disconnect: jest.fn(),
      observe: jest.fn(),
    }));

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

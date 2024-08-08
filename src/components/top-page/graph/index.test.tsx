import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { Graph } from ".";

describe("Graph", () => {
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

  beforeEach(() => {
    render(
      <Graph
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
        selectedPrefCodes={[2]}
      />
    );
  });

  const handlers = [
    http.get("/api/population/2", () =>
      HttpResponse.json({
        data: {
          message: null,
          result: {
            boundaryYear: 2020,
            data: [
              {
                label: "総人口",
                data: [
                  {
                    year: 2015,
                    value: 1308265,
                  },
                  {
                    year: 2020,
                    value: 1237984,
                  },
                ],
              },
              {
                label: "年少人口",
                data: [
                  {
                    year: 2015,
                    value: 148208,
                    rate: 11.33,
                  },
                  {
                    year: 2020,
                    value: 129112,
                    rate: 10.43,
                  },
                ],
              },
              {
                label: "生産年齢人口",
                data: [
                  {
                    year: 2015,
                    value: 757867,
                    rate: 57.93,
                  },
                  {
                    year: 2020,
                    value: 676167,
                    rate: 54.62,
                  },
                ],
              },
              {
                label: "老年人口",
                data: [
                  {
                    year: 2015,
                    value: 390940,
                    rate: 29.88,
                  },
                  {
                    year: 2020,
                    value: 412943,
                    rate: 33.36,
                  },
                ],
              },
            ],
          },
        },
        prefCode: 2,
      })
    ),
  ];

  const server = setupServer(...handlers);

  beforeAll(() => {
    server.listen();
  });
  afterEach(async () => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });

  it("グラフが表示されること", async () => {
    // グラフ自体がレンダリングされないのでクラス名からグラフの有無を確認している
    const wrapper = await screen.findByTestId("graph-wrapper");
    expect(wrapper.getElementsByClassName("recharts-responsive-container").length).toBe(1);
  });
});

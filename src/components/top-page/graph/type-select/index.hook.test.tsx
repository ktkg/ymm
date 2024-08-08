import { render, renderHook, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { useTypeSelect } from "./index.hook";

describe("useTypeSelect", () => {
  it("totalが初期値として返される", () => {
    const { result } = renderHook(() => useTypeSelect());
    expect(result.current.selectedPopulationType).toBe("total");
  });

  it("render関数によってTypeSelectがレンダリングされる", () => {
    const { result } = renderHook(() => useTypeSelect());
    expect(result.current.render).not.toBeNull();
  });

  describe("TypeSelect", () => {
    const { result } = renderHook(() => useTypeSelect());

    beforeEach(() => {
      render(<>{result.current.render()}</>);
    });

    it("タイトルが表示される", () => {
      expect(screen.getByText("種別")).toBeVisible();
    });

    it("セレクトボックスが表示される", () => {
      expect(screen.getByRole("combobox")).toBeVisible();
    });
  });
});

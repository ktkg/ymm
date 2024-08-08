import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { userEvent } from "@testing-library/user-event";

import { Prefectures } from ".";

describe("Prefectures", () => {
  const onClickCheckboxMock = jest.fn();
  const user = userEvent.setup();

  beforeEach(() => {
    render(
      <Prefectures
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
        selectedPrefCodes={[2, 3]}
        onClickCheckbox={onClickCheckboxMock}
      />,
    );
  });

  it("都道府県が全て表示されること", () => {
    expect(screen.getByText("北海道")).toBeVisible();
    expect(screen.getByText("青森県")).toBeVisible();
    expect(screen.getByText("岩手県")).toBeVisible();
    expect(screen.getByText("宮城県")).toBeVisible();
    expect(screen.getByText("秋田県")).toBeVisible();
  });

  it("選択された都道府県にのみチェックが入っていること", () => {
    expect(screen.getByLabelText("北海道")).not.toBeChecked();
    expect(screen.getByLabelText("青森県")).toBeChecked();
    expect(screen.getByLabelText("岩手県")).toBeChecked();
    expect(screen.getByLabelText("宮城県")).not.toBeChecked();
    expect(screen.getByLabelText("秋田県")).not.toBeChecked();
  });

  it("チェックボックスをクリックするとイベントが発火すること", async () => {
    const checkbox = screen.getByLabelText("北海道");
    await user.click(checkbox);
    expect(onClickCheckboxMock).toHaveBeenCalledWith(1);
  });
});

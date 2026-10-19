import { describe, expect, it } from "vitest";
import { bundle, giftsValue, installmentAmount, perDay, savings, savingsPct, totalValue } from "@/config/site";

describe("bundle pricing", () => {
  it("price is $499", () => expect(bundle.price).toBe(499));
  it("total value is $829", () => expect(totalValue()).toBe(829));
  it("gifts are worth $230", () => expect(giftsValue()).toBe(230));
  it("saves $330 (40%)", () => {
    expect(savings()).toBe(330);
    expect(savingsPct()).toBe(40);
  });
  it("is $0.46/day over 3 years", () => expect(perDay()).toBe("0.46"));
  it("4 payments of $124.75", () => expect(installmentAmount()).toBe("124.75"));
});

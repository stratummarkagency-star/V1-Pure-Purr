import { describe, expect, it } from "vitest";
import { bundle, giftsValue, installmentAmount, perDay, savings, savingsPct, totalValue } from "@/config/site";

describe("bundle pricing", () => {
  it("price is $499", () => expect(bundle.price).toBe(499));
  it("total value is $819", () => expect(totalValue()).toBe(819));
  it("gifts are worth $220", () => expect(giftsValue()).toBe(220));
  it("saves $320 (40%)", () => {
    expect(savings()).toBe(320);
    expect(savingsPct()).toBe(40);
  });
  it("is $0.46/day over 3 years", () => expect(perDay()).toBe("0.46"));
  it("4 payments of $124.75", () => expect(installmentAmount()).toBe("124.75"));
});

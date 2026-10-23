import { describe, expect, it } from "vitest";
import { promo, trust } from "@/config/site";
import { formatCountdown, remainingSeconds } from "@/lib/promotion-timer";

describe("requested store rules", () => {
  it("starts the preview at exactly 18 minutes", () => {
    expect(promo.previewMinutes).toBe(18);
    expect(formatCountdown(remainingSeconds(18 * 60 * 1000, 0))).toBe("18:00");
  });
  it("counts elapsed time and stops at zero", () => {
    expect(remainingSeconds(1080000, 1000)).toBe(1079);
    expect(remainingSeconds(1080000, 1081000)).toBe(0);
  });
  it("has worldwide free shipping in 3 to 7 days", () => {
    expect(trust.shipping.free).toBe(true);
    expect(trust.shipping.worldwide).toBe(true);
    expect(trust.shipping.minDays).toBe(3);
    expect(trust.shipping.maxDays).toBe(7);
  });
  it("has 9000 happy cat parents", () => expect(trust.community.count).toBe(9000));
  it("has over 10 years of product history", () => expect(trust.heritage.years).toBe(10));
  it("states a 4 percent donation", () => expect(trust.giving.percent).toBe(4));
});
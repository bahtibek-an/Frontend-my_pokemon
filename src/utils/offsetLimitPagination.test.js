import offsetLimitPagination from "./offsetLimitPagination";

const existing = { results: [1, 2] };
const incoming = { results: [3, 4] };
const params = { args: { offset: 2 } };

describe("offsetLimitPagination", () => {
  it("Should return correct data after merge", () => {
    const { merge } = offsetLimitPagination();
    const result = merge(existing, incoming, params);

    expect(result).toEqual({ results: [1, 2, 3, 4] });
  });

  it("Should return correct data on mergin with existing null", () => {
    const { merge } = offsetLimitPagination();
    const result = merge(null, incoming);

    expect(result).toEqual(incoming);
  });

  it("Should handle empty incoming by returning existing data", () => {
    const { merge } = offsetLimitPagination();
    const result = merge(existing);

    expect(result).toEqual(existing);
  });
});

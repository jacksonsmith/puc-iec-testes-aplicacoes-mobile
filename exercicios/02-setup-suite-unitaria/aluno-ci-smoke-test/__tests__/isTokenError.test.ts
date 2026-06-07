function isTokenError(status: number): boolean {
  return status === 401 || status === 403;
}

describe("isTokenError", () => {
  it("retorna true pra 401", () => {
    expect(isTokenError(401)).toBe(true);
  });
  it("retorna true pra 403", () => {
    expect(isTokenError(403)).toBe(true);
  });
  it("retorna false pra 200", () => {
    expect(isTokenError(200)).toBe(false);
  });
  it("retorna false pra 404", () => {
    expect(isTokenError(404)).toBe(false);
  });
  it("retorna false pra 500", () => {
    expect(isTokenError(500)).toBe(false);
  });
});

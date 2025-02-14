
import '@testing-library/jest-dom';
const {CompanyValidator} = require("ModelsDTO/Company/CompanyValidator");

describe("CompanyValidator", () => {

    test("isValidName() zwraca true dla prawidłowej nazwy", () => {
        expect(CompanyValidator.isValidName("Google sp. z.o.o")).toBe(true);
    });

    test("isValidEmail() zwraca false dla nie prawidłowej nazwy", () => {
        expect(CompanyValidator.isValidEmail("s@asd .com")).toBe(false);
    });

});
import React from "react";
import { shallow } from "enzyme";
import "../../setupEnzyme";
import { Login } from "./Login";

describe("login component", () => {
  it("renders the login input", () => {
    const wrapper = shallow(<Login />);

    expect(wrapper.contains('input[type="email"]')).toBe(false);
    expect(wrapper.contains('input[type="password"]')).toBe(false);
  });
});

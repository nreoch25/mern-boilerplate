import expect from "expect";
import React from "react";
import { shallow } from "enzyme";
import App from "../App";

describe("App", () => {
  it("App component should render", () => {
    const wrapper = shallow(<App />);
  });
});

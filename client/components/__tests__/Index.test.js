import expect from "expect";
import React from "react";
import { shallow } from "enzyme";
import Index from "../Index";

describe("Index", () => {
  it("Index component should render", () => {
    const wrapper = shallow(<Index />);
  });
});

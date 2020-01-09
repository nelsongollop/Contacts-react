import React from 'react';
import {mockComponent} from "react-dom/test-utils";
import { render } from '@testing-library/react';
import App from './App';

import renderer from 'react-test-renderer';
import {Provider} from 'react-redux'
import Contact from "./components/Contact";
import configureStore from 'redux-mock-store';
import {configure, shallow, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const mockStore = configureStore([]);

test('Test enviroment is working properly', () => {
  expect(true).toBeTruthy();
});

test('Contact renders', () => {
  expect(<Contact/>).toBeTruthy()
})

describe('My Connected React-Redux Component', () => {
  let store;
  let wrapper;
  beforeEach(() => {
    store = mockStore({
      list: {
        selectedIndex: null,
        selected: {},
        updating: false
      }
    });
    wrapper = mount(
        <Provider store={store}>
          <Contact />
        </Provider>
    );
  });
  it('should render a new contact form', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('The button should say create', () => {
    const button = wrapper.find("button");
    expect(button.text()).toBe("Create");
  });
  // it('should dispatch an action on button click', () => {
  // });
});


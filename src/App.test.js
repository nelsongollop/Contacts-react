import React from 'react';
import {mockComponent} from "react-dom/test-utils";
import { render } from '@testing-library/react';
import App from './App';

import renderer from 'react-test-renderer';
import {Provider} from 'react-redux'
import Contact from "./components/Contact";
import configureStore from 'redux-mock-store';
import {configure, shallow} from 'enzyme'
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
  let component;
  beforeEach(() => {
    store = mockStore({
      list: {
        selectedIndex: null,
        selected: {},
        updating: false
      }
    });
    component = renderer.create(
        <Provider store={store}>
          <Contact />
        </Provider>
    );
  });
  it('should render a new contact form', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('The button should say create', () => {
    const instance = component.root;
    const button = instance.findByType("button");
    expect(button.props.children).toHaveValue("Create");
  });
  // it('should dispatch an action on button click', () => {
  // });
});

import Navbar from './components/NavBar'
import {setUpdate, setSelected, filter} from "./actions/listActions";

describe('Navbar', () => {
  let store;
  let wrapper;
  beforeEach(() => {
    store = mockStore();
    store.dispatch = jest.fn();

    wrapper = shallow(
        <Provider store={store}>
          <Navbar />
        </Provider>
    );
  });

  it('should render a Navbar', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('The button should change the state', () => {
    renderer.act(() => {
      component.root.findByType('button').props.onClick();
    });

    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith(
        setSelected(null)
    );
    expect(store.dispatch).toHaveBeenCalledWith(
        setUpdate(false)
    );
  });

  it('The textfield should change the state', () => {
    renderer.act(() => {
      component.root.findByType('button').props.onChange();
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
        filter()
    );
  });
});

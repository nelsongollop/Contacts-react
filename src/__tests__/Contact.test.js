import React from 'react';
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store';
import {configure, shallow, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import Contact from "../components/Contact";

configure({ adapter: new Adapter() });
const mockStore = configureStore([]);

describe('Contact component with no selected contact in reducer state', () => {
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
    it('should render a contact form', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('The button should say create', () => {
        const button = wrapper.find("button");
        expect(button.text()).toBe("Create");
    });

    it('form should be empty because there is no selected contact', () => {
        const inputs = wrapper.find('input').at(0)
        expect(inputs.text()).toBe('')
    });
});

describe('Contact component with a selected contact in reducer state', () => {
    let wrapper;
    let store;
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

    it('The field first name from the form should contain the name', () => {
        wrapper.setProps({state: {list: {
                    selectedIndex: 0,
                    selected: {id: '0', first_name: 'Daenerys', last_name: 'Targaryen', phone: '123', email: 'a@a.com'},
                    updating: true
                }}})
        const input = wrapper.find('input[name="first_name"]')
        expect(input.text()).toBe('Daenerys')
    });
});

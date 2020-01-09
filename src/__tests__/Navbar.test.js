import React from 'react';
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store';
import {configure, shallow, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import Navbar from '../components/NavBar'
import {setUpdate, setSelected, filter} from "../actions/listActions";

configure({ adapter: new Adapter() });
const mockStore = configureStore([]);

describe('Navbar', () => {
    let store;
    let wrapper;
    beforeEach(() => {
        store = mockStore();
        store.dispatch = jest.fn();

        wrapper = mount(
            <Provider store={store}>
                <Navbar />
            </Provider>
        );
    });

    it('should render a Navbar', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('The button should setSelected and setUpdate', () => {
        wrapper.find('button').simulate('click')

        expect(store.dispatch).toHaveBeenCalledTimes(2);
        expect(store.dispatch).toHaveBeenCalledWith(
            setSelected(null)
        );
        expect(store.dispatch).toHaveBeenCalledWith(
            setUpdate(false)
        );
    });

    it('The textfield should trigger filter function', () => {
        let input = wrapper.find('input')
        input.simulate('change');

        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(
            filter(input.text())
        );
    });
});

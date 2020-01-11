import React from 'react';
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store';
import {configure, shallow, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import List from '../components/List'
import * as Actions from "../actions/listActions";

configure({ adapter: new Adapter() });
const mockStore = configureStore([]);

let mockList = [
    {id: '0', first_name: 'Daenerys', last_name: 'Targaryen', phone: '123', email: 'a@a.com'},
    {id: '1', first_name: 'Jhon', last_name: 'Snow', phone: '123', email: 'a@a.com'}
]

describe('List', () => {
    let store;
    let wrapper;
    beforeEach(() => {
        store = mockStore();
        store.dispatch = jest.fn();
        jest.spyOn(Actions, 'getContacts').mockImplementation(() => Promise.resolve(mockList))

        wrapper = mount(
            <Provider store={store}>
                <List />
            </Provider>
        );
    });

    it('should render a List', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('Should call to get the list', () => {
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(
            Actions.getContacts()
        );
    });

    // it('Should populate the list', () => {
    //     expect(wrapper.find('.list-item')).toHaveLength(2)
    // });
    // it('Upon clicking a contact, it should show it', () => {
    //     wrapper.find('.list-item').simulate('click')
    //     expect(store.dispatch).toHaveBeenCalledTimes(2);
    //     expect(store.dispatch).toHaveBeenCalledWith(
    //         Actions.setUpdate(true),
    //         Actions.setSelected(0)
    //     );
    // });
});

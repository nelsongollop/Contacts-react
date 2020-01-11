import reducer from '../../reducers/listReducer'

describe('list reducer', () => {
    let initial_state = {
        list: [],
        filtered: [],
        update: undefined,
        selectedIndex: null,
        selected: null
    }

    let mockList = [
        {id: '0', first_name: 'Daenerys', last_name: 'Targaryen', phone: '123', email: 'a@a.com'},
        {id: '1', first_name: 'Jhon', last_name: 'Snow', phone: '123', email: 'a@a.com'}
    ]

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initial_state)
    })
    it('should handle GET_CONTACTS_FULFILLED', () => {
        expect(
            reducer({}, {
                type: 'GET_CONTACTS_FULFILLED',
                payload: mockList
            })
        ).toEqual(
            {
                list: mockList,
                filtered: mockList
            }
        )
    })
    it('should handle FILTER', () => {
        expect(
            reducer({list: mockList, filtered: mockList}, {
                type: 'FILTER_LIST',
                payload: 'Jhon'
            })
        ).toEqual(
            {
                list: mockList,
                filtered: [{id: '1', first_name: 'Jhon', last_name: 'Snow', phone: '123', email: 'a@a.com'}],
                selectedIndex: null
            }
        )
    })
    it('should handle SET_UPDATE', () => {
        expect(
            reducer({}, {
                type: 'SET_UPDATE',
                payload: true
            })
        ).toEqual(
            {
                update: true
            }
        )
    })
    it('should handle SET_SELECTED with an index', () => {
        expect(
            reducer({list: mockList, filtered: mockList}, {
                type: 'SET_SELECTED',
                payload: 0
            })
        ).toEqual(
            {
                list: mockList,
                filtered: mockList,
                selectedIndex: 0,
                selected: {id: '0', first_name: 'Daenerys', last_name: 'Targaryen', phone: '123', email: 'a@a.com'}
            }
        )
    })
    it('should handle SET_SELECTED without an index', () => {
        expect(
            reducer({list: mockList}, {
                type: 'SET_SELECTED',
                payload: null
            })
        ).toEqual(
            {
                list: mockList,
                selectedIndex: null,
                selected: {}
            }
        )
    })
})
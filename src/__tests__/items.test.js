import React from 'react';
import { shallow, mount } from 'enzyme';
import {configure} from 'enzyme';
import Items  from '../components/items.component';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import toJson,{ shallowToJson } from 'enzyme-to-json';
import LocalStorageMock from '../setupTests';
import ReactDOM from 'react-dom';
configure({ adapter: new Adapter() });
describe('items component', () => {
   
    const props={
        constructor :()=>{},
        render:()=>{},
        fetchItems:()=>{},
        editItem:()=>{},
        DeleteItem:()=>{},
        getLists:()=>{},
        addItem:()=>{},
        match:{
            params:{}
            },
        shoppinglist:{Product:'item',Quantity:'45',Amountspent:'455'}
    }
    const wrapper =  shallow(<Items {...props} />);
     it('should run', () => {
        expect(wrapper.exists(<div></div>)).toBe(true);
    }); 
    it('should render correctly', () => {
        const output = shallow( <Items />);
        expect(shallowToJson(output)).toMatchSnapshot();
        });  
    it('should add item',()=>{
            wrapper.find('#addItem').simulate('click')
            expect(toJson(wrapper)).toMatchSnapshot();    
        });
    it('renders without crashing', () => {
            const div = document.createElement('div');
            ReactDOM.render(<Items />, div);
        });  
    it('should ve the following methods',()=>{
            wrapper.instance().fetchItems();
            wrapper.instance().editItem(props.shoppinglist);
            wrapper.instance().DeleteItem(props.shoppinglist);
            wrapper.instance().getLists();
            wrapper.instance().addItem();
        });
})
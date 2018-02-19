import React from 'react';
import { shallow, mount } from 'enzyme';
import {configure} from 'enzyme';
import EditItem  from '../components/edit.item.component';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import  toJson,{ shallowToJson } from 'enzyme-to-json';
import LocalStorageMock from '../setupTests';
import ReactDOM from 'react-dom';
import {Button,Form} from 'semantic-ui-react';
configure({ adapter: new Adapter() });
describe('edit item component', () => {
    const props={
        getItem:()=>{},
        componentWillMount:()=>{},
        getLists:()=>{},
        onSubmit:()=>{},
       
        match:{
            params:{}
            }
    }
    const wrapper =  shallow(<EditItem {...props} />);
    it('should run', () => {
        expect(wrapper.exists(<div></div>)).toBe(true);
    });
    it('should render correctly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
        });
    it('should edit item',()=>{
            expect(wrapper.find(<Button id='editItem'></Button>));
    
        });
   
    it('should ve the following methods',()=>{
            wrapper.instance().componentWillMount();
            wrapper.instance().getItem();
            wrapper.instance().getLists();
            wrapper.instance().onSubmit();
            
        });
    it('render the two inputs', () =>{
            expect(wrapper.find(<Form.Input id="newamount"/>));
            expect(wrapper.find(<Form.Input id="newquantity"/>));
            expect(shallowToJson(wrapper)).toMatchSnapshot();
        });
})
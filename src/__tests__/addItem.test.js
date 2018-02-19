import React from 'react';
import { shallow, mount } from 'enzyme';
import {configure} from 'enzyme';
import AddItem  from '../components/add.item.component';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import toJson,{ shallowToJson } from 'enzyme-to-json';
import LocalStorageMock from '../setupTests';
import ReactDOM from 'react-dom';
configure({ adapter: new Adapter() });
describe('add item component', () => {
    const props={
        getLists:()=>{},
        componentDidMount:()=>{}
    }
    const wrapper =  shallow(<AddItem />);
    it('should run', () => {
        expect(wrapper.exists(<div></div>)).toBe(true);
    });
    it('should render correctly', () => {
        
        expect(shallowToJson(wrapper)).toMatchSnapshot();
        });
    it('should confirm states',()=>{
        expect(wrapper.state().shoppinglists).toBe(false)
        expect(wrapper.state().item).toBe('')
        expect(wrapper.state().Quantity).toBe('')
        expect(wrapper.state().Amountspent).toBe('')
        expect(wrapper.state().shoplist).toBe('')

    })
    it('render the three inputs', () =>{
            expect(wrapper.find("#item")).toHaveLength(1);
            expect(wrapper.find("#Quantity")).toHaveLength(1);
            expect(wrapper.find("#Amountspent")).toHaveLength(1);
            expect(shallowToJson(wrapper)).toMatchSnapshot();
        }); 
    it('should add item',()=>{
            wrapper.find('#add').simulate('click')
            expect(toJson(wrapper)).toMatchSnapshot();
           
            
        });
    it('should ve the following methods',()=>{
            wrapper.instance().getLists();
            wrapper.instance().componentDidMount();
           
           });
  
})
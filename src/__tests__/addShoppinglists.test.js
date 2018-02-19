import React from 'react';
import { shallow, mount } from 'enzyme';
import {configure} from 'enzyme';
import Addshoppinglist from '../components/add.shoppinglist.component';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import toJson,{ shallowToJson } from 'enzyme-to-json';
import LocalStorageMock from '../setupTests';
import ReactDOM from 'react-dom';
configure({ adapter: new Adapter() });
describe('add shoopinglists component', () => {
    const props={
        getLists:()=>{},
        componentWillMount:()=>{},
        onSubmit :()=>{}
    }
    const wrapper =  shallow(<Addshoppinglist />);
    const preventDefault = jest.fn();
    it('should run', () => {
        expect(wrapper.exists(<div></div>)).toBe(true);
    });
    it('should render correctly', () => {
        const output = shallow( <Addshoppinglist />);
        expect(shallowToJson(output)).toMatchSnapshot();
        });
    it('should confirm states',()=>{
         expect(wrapper.state().shoppinglist).toBe('')
        //  expect(wrapper.state().).toBe('')
        
    
        })
    it('should add list',()=>{
            wrapper.find('#addShoppinglist').simulate('click')
            expect(toJson(wrapper)).toMatchSnapshot();
           
            
        });
    it('render the one input', () =>{
            expect(wrapper.find("#shoppingst")).toHaveLength(0);
            expect(shallowToJson(wrapper)).toMatchSnapshot();
        });
    it('renders without crashing', () => {
            const div = document.createElement('div');
            ReactDOM.render(<Addshoppinglist />, div);
        }); 
    it('should ve the following methods',()=>{
            wrapper.instance().getLists();
            wrapper.instance().componentWillMount();
            wrapper.instance().onSubmit();
           });
})
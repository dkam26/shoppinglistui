import React from 'react';
import { shallow, mount } from 'enzyme';
import {configure} from 'enzyme';
import Register from '../components/register.component';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import toJson,{ shallowToJson } from 'enzyme-to-json';
import ReactDOM from 'react-dom';
configure({ adapter: new Adapter() });

describe('component', () => {
    const props={
        home:()=>{},
        onSubmit :()=>{},
        render:()=>{},
    }
    const wrapper =  shallow(<Register />);
    it('should run', () => {
        expect(wrapper.exists(<div></div>)).toBe(true);
    });
    it('should render correctly', () => {
        const output = shallow( <Register />);
        expect(shallowToJson(output)).toMatchSnapshot();
        });
        it('render the five inputs', () =>{
            expect(wrapper.find("#surname")).toHaveLength(1);
            expect(wrapper.find("#firstname")).toHaveLength(1);
            expect(wrapper.find("#username")).toHaveLength(1);
            expect(wrapper.find("#password")).toHaveLength(1);
            expect(wrapper.find("#email")).toHaveLength(1);
            expect(shallowToJson(wrapper)).toMatchSnapshot();
        });
    it('should create user',()=>{
            wrapper.find('#create').simulate('click')
            expect(toJson(wrapper)).toMatchSnapshot();
           
            
        });
    it('renders without crashing', () => {
            const div = document.createElement('div');
            ReactDOM.render(<Register />, div);
        });
    it('should ve the following methods',()=>{
            wrapper.instance().home();
            wrapper.instance().onSubmit();
            wrapper.instance().render();
           
           });
})




import { shallow, mount } from 'enzyme';
import {configure} from 'enzyme';
import Login from '../components/home.component';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import ReactDOM from 'react-dom';
configure({ adapter: new Adapter() });
describe('login component', () => {
    const props={
        render:()=>{}
    }
    const wrapper =  shallow(<Login/>);
    it('should run', () => {
        expect(wrapper.exists(<div></div>)).toBe(true);
    });
    it('should render correctly', () => {
        const output = shallow( <Login />);
        expect(shallowToJson(output)).toMatchSnapshot();
        });
         it('render the two inputs', () =>{
            
            expect(wrapper.find("#username")).toHaveLength(1);
             expect(wrapper.find("#password")).toHaveLength(1);
         
         });
    it('renders without crashing', () => {
            const div = document.createElement('div');
            ReactDOM.render(<Login />, div);
        }); 
    it('should ve the following methods',()=>{
            wrapper.instance().render();
           
        });
})
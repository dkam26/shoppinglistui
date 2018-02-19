import React from 'react';
import { shallow, mount } from 'enzyme';
import {configure} from 'enzyme';
import App  from '../App';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import  toJson,{ shallowToJson } from 'enzyme-to-json';
import LocalStorageMock from '../setupTests';
import ReactDOM from 'react-dom';
configure({ adapter: new Adapter() });
describe('app component', () => {
    const props={
    
        render:()=>{}
     }
    const wrapper =  shallow(<App  />);
    it('should run', () => {
        expect(wrapper.exists(<div></div>)).toBe(true);
    });
    it('should ve the following method',()=>{
        wrapper.instance().render();
       
       
       });
    it('should render correctly', () => {  
        expect(shallowToJson(wrapper)).toMatchSnapshot();
        });
})
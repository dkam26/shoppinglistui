import React from 'react';
import { shallow, mount } from 'enzyme';
import {configure} from 'enzyme';
import Register from '../components/register.component';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { shallowToJson } from 'enzyme-to-json';
configure({ adapter: new Adapter() });

describe('component', () => {
    const wrapper =  shallow(<Register />);
    it('should run', () => {
        expect(wrapper.exists(<div></div>)).toBe(true);
    });
    it('should render correctly', () => {
        const output = shallow( <Register />);
        expect(shallowToJson(output)).toMatchSnapshot();
        });
        it('render the two inputs', () =>{
            expect(wrapper.find("#surname")).toHaveLength(1);
            expect(wrapper.find("#firstname")).toHaveLength(1);
            expect(wrapper.find("#username")).toHaveLength(1);
            expect(wrapper.find("#password")).toHaveLength(1);
            expect(wrapper.find("#email")).toHaveLength(1);
            expect(shallowToJson(wrapper)).toMatchSnapshot();
        });
})




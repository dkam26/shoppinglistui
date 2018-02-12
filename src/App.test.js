import React from 'react';
import { shallow, mount } from 'enzyme';
import {configure} from 'enzyme';
import Register from '../src/components/register.component';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });
describe('component', () => {
    const wrapper =  shallow(<Register />);
    it('should run', () => {
        expect(wrapper.find('div')).toHaveLength(1);
    });
})




import React from 'react';
import { shallow, mount } from 'enzyme';
import {configure} from 'enzyme-adapter-react-16';
import Register from './register.component';
import Enzyme from 'enzyme';

describe('component', () => {
    const wrapper =  shallow(<Register />);
    it('should run', () => {
        expect(wrapper.find('div')).toHaveLength(1);
    });
})

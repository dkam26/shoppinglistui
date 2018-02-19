import React from 'react';
import { shallow, mount } from 'enzyme';
import {configure} from 'enzyme';
import Editshoppinglist from '../components/edit.shoppinglist.component';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import toJson,{ shallowToJson } from 'enzyme-to-json';
import LocalStorageMock from '../setupTests';
import ReactDOM from 'react-dom';
configure({ adapter: new Adapter() });
describe('edit shoopinglists component', () => {
     const wrapper =  shallow(<Editshoppinglist />);
    it('should run', () => {
        expect(wrapper.exists(<div></div>)).toBe(true);
    });
    it('should render correctly', () => {
        const output = shallow( <Editshoppinglist />);
        expect(shallowToJson(output)).toMatchSnapshot();
        });
        it('should edit shoppinglist',()=>{
            wrapper.find('#EditShoppinglist').simulate('click')
            expect(toJson(wrapper)).toMatchSnapshot();
           
            
        });
    it('renders without crashing', () => {
            const div = document.createElement('div');
            ReactDOM.render(<Editshoppinglist />, div);
        });   
      
})
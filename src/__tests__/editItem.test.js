import React from 'react';
import { shallow, mount } from 'enzyme';
import {configure} from 'enzyme';
import EditItem  from '../components/edit.item.component';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import  toJson,{ shallowToJson } from 'enzyme-to-json';
import LocalStorageMock from '../setupTests';
import ReactDOM from 'react-dom';
configure({ adapter: new Adapter() });
describe('edit item component', () => {
    const props={
        
        componentWillMount:()=>{}
    }
    const wrapper =  shallow(<EditItem  />);
    it('should run', () => {
        expect(wrapper.exists(<div></div>)).toBe(true);
    });
    it('should render correctly', () => {
        const output = shallow( <EditItem  />);
        expect(shallowToJson(output)).toMatchSnapshot();
        });
    it('should edit item',()=>{
            wrapper.find('#editItem').simulate('click')
            expect(toJson(wrapper)).toMatchSnapshot();
           
            
        });
    it('renders without crashing', () => {
            const div = document.createElement('div');
            ReactDOM.render(<EditItem />, div);
        }); 
    it('should ve the following methods',()=>{
            wrapper.instance().componentWillMount();
           
           });
})
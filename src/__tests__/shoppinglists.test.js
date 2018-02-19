import React from 'react';
import { shallow, mount } from 'enzyme';
import {configure} from 'enzyme';
import Shoppinglists  from '../components/shoppinglists.component';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import toJson,{shallowToJson} from 'enzyme-to-json';
import LocalStorageMock from '../setupTests';
import Notifications, {notify} from 'react-notify-toast';
import ReactDOM from 'react-dom';
configure({ adapter: new Adapter() });
describe('shoopinglists component', () => {
    const props={
        addList:()=>{},
        fetchList :()=>{},
        editList:()=>{},
        getItems:()=>{},
        render:()=>{}

    }
    const wrapper =  shallow(<Shoppinglists />);
    it('should run', () => {
        expect(wrapper.exists(<div></div>)).toBe(true);
    });
    it('should render correctly', () => {
        const output = shallow( <Shoppinglists />);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
 it('should add shoppinglist',()=>{
        wrapper.find('#addshoppinglist').simulate('click')
        expect(toJson(wrapper)).toMatchSnapshot();
       
        
    });
 it('shoppinglists should be a header',()=>{
    expect(wrapper.find('h3').length).toBe(1);
    expect(wrapper.find('h3').at(0).text()).toBe('Your Shoppinglists');
    });
    
it('render notifications',()=>{
        expect(wrapper.find('#alert').length).toBe(1);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Shoppinglists />, div);
    });
it('should ve the following methods',()=>{
     wrapper.instance().addList();
     wrapper.instance().fetchList ();
     wrapper.instance().editList();
     wrapper.instance().getItems();
     wrapper.instance().render();
    });
})
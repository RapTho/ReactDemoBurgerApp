import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import Controls from '../../components/Burger/Controls/Controls';

configure({adapter: new Adapter()});

describe('<BurgerBuilder />', () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder initIngredients={() => {}} />);
    });

    it('should render the <Controls /> element if props.ingredients !== null', () => {
        wrapper.setProps({ ingredients: {salad: 1} }) 
        expect(wrapper.find(Controls)).toHaveLength(1);
    });
}); 
import App from './App';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = () => shallow(<App />);
let wrapper;

beforeEach(() => wrapper = setup());

const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`);

test('renders non-empty component without crashing', () => {
 expect(wrapper.exists()).toBe(true);
});

test('renders without error', () => {
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});


test('renders increment button', () => {
  const button = findByTestAttr(wrapper, "increment-button");
  expect(button.length).toBe(1);
});

test('renders counter display', () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.length).toBe(1);
});

test('counter display starts at 0', () => {
  const wrapper = setup();
  const count = findByTestAttr(wrapper, "count").text();
  expect(count).toBe("0");
});

test('clicking button increments counter', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "increment-button");
  button.simulate('click');
  const count = findByTestAttr(wrapper, "count").text();
  expect(count).toBe("1");
});
describe('decrement button', () => {
  test('clicking button decrements counter', () => {
    const button = findByTestAttr(wrapper, "decrement-button");
    button.simulate("click");
    const count = findByTestAttr(wrapper, "count").text();
    expect(count).toBe("0");
  });
  test('clicking decrement button decrements counter display when state is greater than 0', () => {
    const Incbutton = findByTestAttr(wrapper, "increment-button");
    Incbutton.simulate('click');
    const Decbutton = findByTestAttr(wrapper, "decrement-button");
    Decbutton.simulate('click');
    const count = findByTestAttr(wrapper, "count").text();
    expect(count).toBe("0");
  });
});
describe('error when counter goes below 0', () => {
  test('error does not show when not needed', () => {
    const errorDiv = findByTestAttr(wrapper, "error-message");
    expect(errorDiv.length).toBe(0);
  });
  test('error show when needed', () => {
    const Decbutton = findByTestAttr(wrapper, "decrement-button");
    Decbutton.simulate('click');
    const errorDiv = findByTestAttr(wrapper, "error-message");
    expect(errorDiv.length).toBe(1);
  });
  test('counter steel displays zero', () => {
    const Decbutton = findByTestAttr(wrapper, "decrement-button");
    Decbutton.simulate('click');
    const count = findByTestAttr(wrapper, "count").text();
    expect(count).toBe("0");
  });
  test('after clicking increment button clears the error', () => {
    const Decbutton = findByTestAttr(wrapper, "decrement-button");
    Decbutton.simulate('click');
    const Incbutton = findByTestAttr(wrapper, "increment-button");
    Incbutton.simulate('click');
    const errorDiv = findByTestAttr(wrapper, "error-message");
    expect(errorDiv.length).toBe(0);
  });
});


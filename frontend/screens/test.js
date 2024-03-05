import React from 'react';
import { render, fireEvent} from '@testing-library/react-native';
import Landing from './landing';
import LogTab from './logTab.js'



describe('Landing Page', () => {
  it('renders correctly', () => {
    const { toJSON } = render(<Landing />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders "Get Started" button and handles press event', () => {
    const navigation = { navigate: jest.fn() };
    const { getByText } = render(<Landing navigation={navigation} />);
    const getStartedButton = getByText('Get Started');
    fireEvent.press(getStartedButton);
    expect(navigation.navigate).toHaveBeenCalledWith('SignUp');
  });

});

describe("LogTab Component", () => {
    it("renders 'Add Workout' button", () => {
      const { getByText } = render(<LogTab />);
      const addWorkoutButton = getByText("Add a workout");
      expect(addWorkoutButton).toBeTruthy();
    });

    it("renders 'Done' button after pressing 'Add Workout' button", () => {
        const { getByText, queryByText } = render(<LogTab />);
        // 'Done' button should not be visible
        expect(queryByText("Done")).toBeNull();
        // Find and press the 'Add Workout' button
        const addWorkoutButton = getByText("Add a workout");
        fireEvent.press(addWorkoutButton);
        // After pressing the button, the 'Done' button should appear
        expect(getByText("Done")).toBeTruthy();
      });
});
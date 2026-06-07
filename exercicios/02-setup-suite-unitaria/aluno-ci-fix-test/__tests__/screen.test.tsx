import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import { Text, TouchableOpacity, View } from "react-native";

function Btn({ onPress, label }: { onPress: () => void; label: string }) {
  return <TouchableOpacity testID="btn" onPress={onPress}><Text>{label}</Text></TouchableOpacity>;
}

describe("Btn", () => {
  it("renderiza", () => {
    render(<Btn onPress={() => {}} label="OK" />);
    expect(screen.getByTestId("btn")).toBeTruthy();
  });
  it("dispara onPress", () => {
    const fn = jest.fn();
    render(<Btn onPress={fn} label="OK" />);
    fireEvent.press(screen.getByTestId("btn"));
    expect(fn).toHaveBeenCalled();
  });
});

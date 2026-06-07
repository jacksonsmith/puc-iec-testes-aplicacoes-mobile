import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import { Text, TouchableOpacity, View } from "react-native";

// Componente inline simples para o smoke test (não depende do app real)
function MovieCard({
  title,
  onFavorite,
  isFavorite,
}: {
  title: string;
  onFavorite: () => void;
  isFavorite: boolean;
}) {
  return (
    <View testID="movie-card">
      <Text testID="movie-title">{title}</Text>
      <TouchableOpacity testID="favorite-btn" onPress={onFavorite}>
        <Text>{isFavorite ? "❤️" : "🤍"}</Text>
      </TouchableOpacity>
    </View>
  );
}

describe("MovieCard", () => {
  it("renderiza título do filme", () => {
    render(<MovieCard title="Inception" onFavorite={() => {}} isFavorite={false} />);
    expect(screen.getByTestId("movie-title")).toBeTruthy();
    expect(screen.getByText("Inception")).toBeTruthy();
  });

  it("chama onFavorite ao tocar no botão", () => {
    const onFavorite = jest.fn();
    render(<MovieCard title="Inception" onFavorite={onFavorite} isFavorite={false} />);
    fireEvent.press(screen.getByTestId("favorite-btn"));
    expect(onFavorite).toHaveBeenCalledTimes(1);
  });

  it("exibe coração preenchido quando isFavorite=true", () => {
    render(<MovieCard title="Inception" onFavorite={() => {}} isFavorite={true} />);
    expect(screen.getByText("❤️")).toBeTruthy();
  });
});

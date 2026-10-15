import { screen } from '@testing-library/react-native';

export const detailRobot = {
  async verificarDetalheDoFilme(titulo: string) {
    expect(await screen.findByTestId('detail-screen')).toBeTruthy();
    expect(await screen.findByText('Detalhes do filme')).toBeTruthy();
    expect(await screen.findByText(titulo)).toBeTruthy();
  },
};
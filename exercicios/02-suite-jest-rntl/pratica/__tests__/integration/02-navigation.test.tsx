// __tests__/integration/02-navigation.test.tsx
//
// 🔵 PRÁTICA — NÃO conta nota (aquecimento de integração de navegação).
//    Marca por it(): 🧑‍🏫 = a gente faz junto em aula · 🧑‍💻 = o aluno faz sozinho.
//
// Renderiza o app inteiro (AppNavigator) e verifica que tocar num card leva pra
// tela de detalhe. O setup (renderApp + mock + fixture) está em ./_helpers — leia
// pra entender; aqui você foca no comportamento.
//
// Complete o it.todo:
//   render(renderApp());
//   fireEvent.press(await screen.findByText('Matrix'));   // findBy = espera async
//   expect(await screen.findByText('Detalhes do filme')).toBeTruthy();

import { render, screen, fireEvent } from '@testing-library/react-native';
import { useFavoritesStore } from '@/store/favoritesStore';
import { renderApp, mockListaDeFilmes } from './_helpers';

// jest.mock fica AQUI (é hoisted por arquivo) — é assim que a API vira mockada.
jest.mock('@/services/api');

beforeEach(() => {
  useFavoritesStore.setState({ ids: [] });
  mockListaDeFilmes(); // a API mockada devolve os filmes
});

describe('Navegação (integração)', () => {
  it.todo('1. tocar no filme abre a tela de detalhe');   // 🧑‍💻 aluno
});

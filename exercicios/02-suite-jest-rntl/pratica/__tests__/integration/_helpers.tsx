// __tests__/integration/_helpers.tsx
//
// 🧰 SETUP COMPARTILHADO dos testes de integração (padrão Shared Fixture — Meszaros).
// Os testes importam daqui pra NÃO repetir render/mock/fixture e focar no comportamento.
// LEIA este arquivo — é a "montagem" do app pro teste. Não é um teste (não tem it()).

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { api } from '@/services/api';
import AppNavigator from '@/integration/AppNavigator';

// Fixture: filmes falsos (sem rede, sem token TMDB).
export const filmes = [
  { id: 1, title: 'Michael', overview: '', poster_path: '/m.jpg', release_date: '2026', vote_average: 8.7 },
  { id: 2, title: 'Inception', overview: '', poster_path: '/i.jpg', release_date: '2010', vote_average: 8.8 },
];

// Faz a API mockada devolver os filmes. Chame no beforeEach.
// (o `jest.mock('@/services/api')` fica em CADA arquivo de teste — é hoisted por arquivo.)
export const mockListaDeFilmes = (results = filmes) => {
  const get = api.get as jest.Mock;
  get.mockReset();
  get.mockResolvedValue({
    data: { results, page: 1, total_pages: 1, total_results: results.length },
  });
};

// Monta o app num QueryClient novo por teste (cache não vaza). retry:false → um
// erro não fica re-tentando e travando o teste. Use assim: render(renderApp()).
export function renderApp() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return (
    <QueryClientProvider client={client}>
      <AppNavigator />
    </QueryClientProvider>
  );
}

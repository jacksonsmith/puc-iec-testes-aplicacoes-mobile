// src/screens/MovieList.tsx
//
// CAMADA SCREENS — UI pura. Consome queries + components.
// "Screen não deveria saber COMO buscar dados. Só renderiza estados da UI."
//
// Tela JÁ IMPLEMENTADA: busca filmes populares (TanStack Query), mostra um
// contador de favoritos no header e renderiza a lista via MovieCard.
// Nesta disciplina você só ESCREVE OS TESTES — não mexe nesta UI.

import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { usePopularMovies } from '@/queries/movies/get-popular-movies';
import { useFavoritesStore } from '@/store/favoritesStore';
import { isTokenError, isTokenMissing } from '@/services/api';
import TokenMissingScreen from '@/components/TokenMissingScreen';
import MovieCard from '@/components/MovieCard';

export default function MovieList() {
  const { data, isLoading, error, refetch } = usePopularMovies();
  const count = useFavoritesStore((s) => s.ids.length);

  // Tela amigável quando token TMDB não foi configurado ou está inválido.
  if (isTokenMissing || isTokenError(error)) {
    return <TokenMissingScreen />;
  }

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Erro: {String(error)}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Filmes</Text>
        <View style={styles.counter}>
          <Text style={styles.heart}>♥</Text>
          <Text testID="favorites-count" style={styles.count}>
            {count}
          </Text>
        </View>
      </View>
      <FlatList
        data={data?.results ?? []}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <MovieCard movie={item} />}
        onRefresh={refetch}
        refreshing={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  counter: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  heart: { fontSize: 18, color: '#C2410C' },
  count: { fontSize: 18, color: '#C2410C', fontWeight: '600' },
});

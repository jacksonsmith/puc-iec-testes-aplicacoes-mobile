// src/components/MovieCard.tsx
//
// CAMADA COMPONENTS — card de filme JÁ IMPLEMENTADO e integrado ao store
// de favoritos. Nesta disciplina o foco é TESTAR este código (render +
// interação), não implementá-lo. Você só escreve os testes em __tests__/.
//
// Pontos de teste expostos via testID:
//   - movie-card-{id}        → o card inteiro (clicável → navega pro detalhe)
//   - movie-card-heart-{id}  → o botão de favoritar

import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { Movie } from '@/types/movie';
import { posterUrl } from '@/utils/poster-url';
import type { RootStackParamList } from '@/routes/RootStack';
import { useFavoritesStore } from '@/store/favoritesStore';

type Props = { movie: Movie };

export default function MovieCard({ movie }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const poster = posterUrl(movie.poster_path, 'w185');
  const isFav = useFavoritesStore((s) => s.isFavorite(movie.id));
  const toggle = useFavoritesStore((s) => s.toggle);

  return (
    <Pressable
      testID={`movie-card-${movie.id}`}
      onPress={() => navigation.navigate('Detail', { id: movie.id, title: movie.title })}
      style={styles.card}
    >
      {poster && <Image source={{ uri: poster }} style={styles.poster} />}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
        <Text style={styles.meta}>⭐ {movie.vote_average.toFixed(1)}</Text>
      </View>

      <Pressable
        testID={`movie-card-heart-${movie.id}`}
        accessibilityRole="button"
        accessibilityLabel={isFav ? 'Remover favorito' : 'Adicionar favorito'}
        onPress={(e) => {
          e?.stopPropagation?.(); // fireEvent.press não passa evento — proteja
          toggle(movie.id);
        }}
        style={styles.heart}
      >
        <Text style={styles.heartIcon}>{isFav ? '❤️' : '🤍'}</Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 12,
    gap: 12,
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
  },
  poster: { width: 60, height: 90, borderRadius: 4 },
  info: { flex: 1, gap: 4 },
  title: { fontSize: 16, fontWeight: '600' },
  meta: { color: '#666', fontSize: 12 },
  heart: { padding: 8 },
  heartIcon: { fontSize: 24 },
});

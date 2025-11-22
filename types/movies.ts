export interface MovieItem {
  id: number;
  title: string;
  overview: string;
  poster_path?: string | null;
  release_date?: string;
  vote_count?: number;
}

export interface ILocation {
  selectedId: number | null;
  isEditing: boolean;
  searchText: string;
}

export type LocationCache = Map<string, ILocation>;

export interface DbPool {
  query: (sql: string, args: string[]) => Note[];
}

export interface Note {
  id: number;
  title: string;
  updated_at: Date;
}



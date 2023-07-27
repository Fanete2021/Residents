interface Group {
  type: string,
  name: string
}

export interface Resident {
  id: number,
  name: string,
  city_id: number,
  groups: Group[]
}
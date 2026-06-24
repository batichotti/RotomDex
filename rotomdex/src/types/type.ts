export type TypeEffectiveness =
  | {
      attack_type: string
      defense_type: string
      effectiveness: number
    }
  | {
      attack_type: string
      defense_type_1: string
      defense_type_2: string
      effectiveness_1: number
      effectiveness_2: number
      product: number
    }
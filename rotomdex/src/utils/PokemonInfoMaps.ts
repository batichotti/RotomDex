
export const GENERATIONS = [
    { key: 'generation-i',    label: 'Kanto'         }, 
    { key: 'generation-ii',   label: 'Johto'         }, 
    { key: 'generation-iii',  label: 'Hoenn'         },
    { key: 'generation-iv',   label: 'Sinnoh'        }, 
    { key: 'generation-v',    label: 'Unova'         }, 
    { key: 'generation-vi',   label: 'Kalos'         }, 
    { key: 'generation-vii',  label: 'Alola'         }, 
    { key: 'generation-viii', label: 'Galar & Hisui' }, 
    { key: 'generation-ix',   label: 'Paldea'        },
] as const;

export const GENERATION_MAP = {
  "generation-i": "Kanto",
  "generation-ii": "Johto",
  "generation-iii": "Hoenn",
  "generation-iv": "Sinnoh",
  "generation-v": "Unova",
  "generation-vi": "Kalos",
  "generation-vii": "Alola",
  "generation-viii": "Galar & Hisui",
  "generation-ix": "Paldea",
} as const;

export type GenerationKey = keyof typeof GENERATION_MAP;

export const EGG_GROUPS = [
    { key: 'indeterminate', label: 'Amorphous'    },
    { key: 'bug',           label: 'Bug'          }, 
    { key: 'dragon',        label: 'Dragon'       },
    { key: 'fairy',         label: 'Fairy'        },
    { key: 'ground',        label: 'Field'        },
    { key: 'flying',        label: 'Flying'       },
    { key: 'plant',         label: 'Grass'        },
    { key: 'humanshape',    label: 'Human-Like'   },
    { key: 'mineral',       label: 'Mineral'      },
    { key: 'monster',       label: 'Monster'      },
    { key: 'water1',        label: 'Water 1'      },
    { key: 'water2',        label: 'Water 2'      },
    { key: 'water3',        label: 'Water 3'      },
    { key: 'ditto',         label: 'Ditto'        },
    { key: 'no-eggs',       label: 'Undiscovered' }
] as const;

export const BOOL_FILTERS = [
    { key: 'isLegendary',          label: 'Legendary'         },
    { key: 'isMythical',           label: 'Mythical'          },
    { key: 'isBaby',               label: 'Baby'              },
    { key: 'isMega',               label: 'Mega'              },
    { key: 'isGmax',               label: 'G-Max'             },
    { key: 'isRegionalForm',       label: 'Regional'          },
    { key: 'hasGenderDifferences', label: 'Gender Difference' },
    { key: 'formsSwitchable',      label: 'Forms Switchable'  },
] as const;

export const STAT_FIELDS = [
    { key: 'bst',             label: 'BST'             },
    { key: 'hp',              label: 'HP'              },
    { key: 'attack',          label: 'Attack'          },
    { key: 'defense',         label: 'Defense'         },
    { key: 'special_attack',  label: 'Special Attack'  },
    { key: 'special_defense', label: 'Special Defense' },
    { key: 'speed',           label: 'Speed'           },
    { key: 'height',          label: 'Height'          },
    { key: 'weight',          label: 'Weight'          },
    { key: 'base_experience', label: 'Base Experience' },
]
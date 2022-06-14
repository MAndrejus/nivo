export interface Palette {
  title: string;
  colors: PaletteColor[];
  additionalColors?: PaletteColor[];
}

export interface PaletteColor {
  symbol: string;
  value: string;
  note?: string;
  darkText?: boolean;
}

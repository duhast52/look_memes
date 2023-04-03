import React from "react";

type ThemeColor = React.CSSProperties["color"];

interface ProgressBarColors {
  main: ThemeColor;
  grey: ThemeColor;
}

// This module extends Palette with custom colors
// TypeScript module augmentation:
// https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
declare module "@material-ui/core/styles/createPalette" {
  interface TypeBackground {
    yellow: ThemeColor;
    white: ThemeColor;
  }

  interface LinkColors {
    primary: ThemeColor;
  }

  interface LoaderColors {
    overlay: ThemeColor;
  }

  interface PaletteOptions {
    background?: Partial<TypeBackground>;
    progress?: Partial<ProgressBarColors>;
    link: LinkColors;
    loader: LoaderColors;
  }

  interface Palette {
    button: ButtonColors;
    link: LinkColors;
    loader: LoaderColors;
  }
}

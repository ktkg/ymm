/**
 * Type definitions for google-palette
 * @see https://github.com/google/palette.js
 */
declare module "google-palette" {
  function palette(scheme: string, length: number): string[];

  export = palette;
}

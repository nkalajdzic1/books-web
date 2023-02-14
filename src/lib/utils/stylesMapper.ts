import { FunctionComponent, PropsWithChildren } from "react";
import styled from "styled-components";

// custom common types
export type IndexableStyledComponentType = keyof typeof styled;
export type StyledComponentType = typeof styled.div;

/**
 * @description function that maps the object to a css string
 * the function expects a object with the following format
 *
 * {
 *    "font-size": "14px",
 *    "color": "red",
 *    ....
 * }
 *
 * and the function maps the object to a css string like:
 *
 * "font-size: 14px; color: red;"
 *
 * @param {object} obj containing the styles
 * @returns {string} a css string containing the styles
 */
export const mapStyles = (obj: Object): string =>
  Object.entries(obj)
    .map(([key, val]) => `${key}:${val};`)
    .join("");

/**
 * @description function that creates a component with styles
 * the function maps the key and value pairs for the styles and creates a styled component.
 * the styles are given in the following format in the theme:
 * typography: {
 *    [label]: {
 *       "font-size": "14px",
 *       "font-weight": 400,
 *       ...
 *      mediaQueries: [
 *        {
 *           on: "(max-width: 800px)",
 *           styles: {
 *             "max-width": "400px",
 *             "color": "red"
 *           }
 *        }
 *      ]
 *    }
 * }
 * @param {string} element to be created (example value for the function: 'div' or 'label')
 * @param {Object} styleObject the object that contains the styles (example value:
 *                             theme.typography.label -> access the styles from the theme and gives the key/value
 *                             pairs of the css)
 * @returns {StyledComponent} styled component with the provided styles and the provided
 *                            media query style (optional)
 */
export const createStyledComponent = (
  element: string,
  { mediaQueries, ...style }: any
): FunctionComponent<PropsWithChildren> => (styled[
  element as IndexableStyledComponentType
] as StyledComponentType)`
        ${mapStyles(style)}
        ${mediaQueries?.map(
          (media: any) =>
            `@media screen and ${media.on} { ${mapStyles(media.style)} }`
        )}
  `;

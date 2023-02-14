// #region Theme colors

export interface IThemeColors {
  white: string;
  dirtyWhite: string;
  gray: string;
  lightGray: string;
  paperGray: string;
  hoverGray: string;
  black: string;
}

export const colors: IThemeColors = {
  white: "#FFFFFF",
  dirtyWhite: "#F6F9FC",
  gray: "#525F7F",
  lightGray: "#7B7B93",
  paperGray: "#F6F7FA",
  hoverGray: "#D6D6D6",
  black: "#000000",
};

// #endregion

// #region Common theme styles

export interface ICommonThemeStyling {}

export const commonThemeStyling: ICommonThemeStyling = {};

// #endregion

// #region Application theme

export interface IComonButtonStyle {
  color: string;
  background: string;
  outline: string;
}

export interface ICommonTypographyStyle {
  "font-size": string;
  "font-weight": number;
  "line-height": string;
}

export interface IHeadingStyle extends ICommonTypographyStyle {
  color: string;
  margin: string;
}

export interface IStyledTheme extends ICommonThemeStyling, IThemeColors {
  background: string;
  color: string;
  fontFamily: string;
  buttons: {
    primary: IComonButtonStyle;
    outline: IComonButtonStyle;
  };
  typography: {
    h1: IHeadingStyle;
    h2: IHeadingStyle;
    h3: IHeadingStyle;
    h5: IHeadingStyle;
    label: ICommonTypographyStyle;
    text: ICommonTypographyStyle;
  };
}

export const theme: IStyledTheme = {
  ...commonThemeStyling,
  ...colors,
  background: colors.white,
  color: colors.black,
  fontFamily: "Sora",
  buttons: {
    primary: {
      color: colors.white,
      background: colors.black,
      outline: `1.5px solid ${colors.black}`,
    },
    outline: {
      color: colors.black,
      background: colors.white,
      outline: `1.5px solid ${colors.black}`,
    },
  },
  typography: {
    h1: {
      "font-size": "56px",
      "font-weight": 600,
      "line-height": "67.2px",
      color: colors.black,
      margin: "0px",
    },
    h2: {
      "font-size": "40px",
      "font-weight": 700,
      "line-height": "38.4px",
      color: colors.black,
      margin: "0px",
    },
    h3: {
      "font-size": "32px",
      "font-weight": 700,
      "line-height": "44.8px",
      color: colors.black,
      margin: "0px",
    },
    h5: {
      "font-size": "18px",
      "font-weight": 700,
      "line-height": "21.6px",
      color: colors.black,
      margin: "0px",
    },
    label: {
      "font-size": "15px",
      "font-weight": 400,
      "line-height": "18px",
    },
    text: {
      "font-size": "15px",
      "font-weight": 400,
      "line-height": "21px",
    },
  },
};

// #endregion

interface Typography {
  fontSize: number;
  fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
}

interface ThemeColors {
  primary: string;
  primaryDark: string;
  background: string;
  text: string;
  border: string;
  error: string;
  success: string;
  compatibility: {
    high: string;
    medium: string;
    low: string;
  };
}

interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

interface ThemeTypography {
  h1: Typography;
  h2: Typography;
  body: Typography;
  small: Typography;
}

export interface Theme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
}

export const theme: Theme = {
  colors: {
    primary: '#CF1F38',
    primaryDark: '#A51830',
    background: '#FFFFFF',
    text: '#000000',
    border: '#E5E5E5',
    error: '#FF3B30',
    success: '#4CAF50',
    compatibility: {
      high: '#4CAF50',
      medium: '#FFA726',
      low: '#EF5350',
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    h1: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    h2: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    body: {
      fontSize: 16,
    },
    small: {
      fontSize: 14,
    },
  },
};


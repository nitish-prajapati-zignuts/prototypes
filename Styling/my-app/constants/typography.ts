import { RFValue } from "react-native-responsive-fontsize";

export const FontSize = {
  xs: RFValue(12),
  sm: RFValue(14),
  md: RFValue(16),
  lg: RFValue(18),
  xl: RFValue(22),
  hero: RFValue(32),
};
export const FontWeight = {
  regular: "400" as const,
  medium: "500" as const,
  semiBold: "600" as const,
  bold: "700" as const,
};
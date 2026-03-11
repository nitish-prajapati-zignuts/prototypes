import { Dimensions, PixelRatio } from "react-native";

const { width } = Dimensions.get("window");

const guidelineBaseWidth = 375;

export const scale = (size: number) => (width / guidelineBaseWidth) * size;

export const verticalScale = (size: number) => scale(size);

export const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export const responsiveFont = (size: number) =>
  Math.round(PixelRatio.roundToNearestPixel(scale(size)));

export const PRIMARY = "#2563EB";

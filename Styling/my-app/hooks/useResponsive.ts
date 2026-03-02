import { useWindowDimensions, PixelRatio } from "react-native";

export default function useResponsive() {
  const { width, height } = useWindowDimensions();

  const baseWidth = 375;
  const isLandscape = width > height;
  const isTablet = width >= 768;
  const shortDimension = width < height ? width : height;
  const scale = shortDimension / baseWidth;

  const normalize = (size: number) => {
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  };

  return {
    width,
    height,
    isPhone: !isTablet,
    isTablet,
    isLandscape,
    isPortrait: !isLandscape,

    fontSize: (size: number) => normalize(size),
    wp: (percent: number) => (width * percent) / 100,
    hp: (percent: number) => (height * percent) / 100,
    spacing: (size: number) => normalize(size),

    /**
     * getARHeight: Maintains Aspect Ratio
     * @param inputWidth - The width of the element (usually wp(x))
     * @param ratio - The ratio as a decimal (e.g., 16/9 or 1)
     * @returns The calculated height to maintain that ratio
     */
    getARHeight: (inputWidth: number, ratio: number = 16/9) => {
        return inputWidth / ratio;
    },

    scale,
  };
}
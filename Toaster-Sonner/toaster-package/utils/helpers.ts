import { Dimensions, PixelRatio, Platform, ViewStyle } from "react-native";

const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')

export const isAndroid: boolean = Platform.OS === 'android'
export const isIOS: boolean = Platform.OS === 'ios'

export const SCALE = (size: number, androidRatio: number = 1, iOSRatio: number = 1): number => {
    const baseWidth: number = 375
    const scaleFactor: number = Math.min(width / baseWidth, 1.2)
    const platformRatio: number = isAndroid ? androidRatio : iOSRatio
    const pixelDensity: number = PixelRatio.get()

    const desityAdjustment: number = 3 / pixelDensity;

    const newSize: number = size * scaleFactor * platformRatio * desityAdjustment
    const minSize: number = size * (isAndroid ? androidRatio : 0.8)
    const maxSize: number = size * 1.3

    return Math.min(Math.max(newSize, minSize), maxSize)
}

export const getToastPositionStyle = (
    position: string,
    topOffset: number = 40,
    bottomOffset: number = 40,

): ViewStyle => {
    switch (position) {
        case 'top':
            return { top: topOffset }
        case 'center':
            return { top: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }
        case 'bottom':
            return { bottom: bottomOffset }
        default:
            return { top: topOffset }
    }

}
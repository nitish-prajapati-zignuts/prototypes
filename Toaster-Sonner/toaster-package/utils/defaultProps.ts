import { SCALE } from "./helpers";
import { ToastManagerProps } from './interfaces'

const defaultProps: ToastManagerProps = {
    theme: 'light',
    width: '90%',
    minHeight: SCALE(61),
    style: {},
    textStyle: {},
    animationStyle: 'slide',
    position: 'top',
    duration: 3000,
    showCloseIcon: false,
    showProgressBar: true,
    isRTL: false,
    config: {},
    ref: null,
    topOffset: SCALE(40), // Scaling can be changed
    bottomOffset: SCALE(40), // Scaling can be changed
    testID: 'toast',
    iconSize: SCALE(20),
    icons: {
        success: 'checkmark-circle',
        error: 'alert-circle',
        info: 'information-circle',
        warn: 'warning',
        default: 'checkmark-circle',
    },
    iconFamily: 'Ionicons',
    useModal: false,
    closeIcon: 'close-outline',
    closeIconSize: SCALE(22),
    closeIconColor: 'black',
    closeIconFamily: 'Ionicons',
}

export default defaultProps
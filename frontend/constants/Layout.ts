import { Dimensions } from 'react-native';

export const { width, height } = Dimensions.get("window");
export const isSmallDevice = width < 375;
import { NativeModule, requireNativeModule } from 'expo';

import { ToastifySonnerModuleEvents } from './ToastifySonner.types';

declare class ToastifySonnerModule extends NativeModule<ToastifySonnerModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ToastifySonnerModule>('ToastifySonner');

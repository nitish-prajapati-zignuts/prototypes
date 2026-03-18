import { registerWebModule, NativeModule } from 'expo';

import { ToastifySonnerModuleEvents } from './ToastifySonner.types';

class ToastifySonnerModule extends NativeModule<ToastifySonnerModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ToastifySonnerModule, 'ToastifySonnerModule');

import { requireNativeView } from 'expo';
import * as React from 'react';

import { ToastifySonnerViewProps } from './ToastifySonner.types';

const NativeView: React.ComponentType<ToastifySonnerViewProps> =
  requireNativeView('ToastifySonner');

export default function ToastifySonnerView(props: ToastifySonnerViewProps) {
  return <NativeView {...props} />;
}

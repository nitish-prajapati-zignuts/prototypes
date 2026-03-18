import * as React from 'react';

import { ToastifySonnerViewProps } from './ToastifySonner.types';

export default function ToastifySonnerView(props: ToastifySonnerViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}

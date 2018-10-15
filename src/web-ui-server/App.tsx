import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import { GetDoneApp } from '../ui-components/GetDoneApp/GetDoneApp';

export function createGetDoneAppRenderStream() {
    return renderToNodeStream(<GetDoneApp />)
}
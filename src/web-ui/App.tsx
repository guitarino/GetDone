import React from 'react';
import { hydrate } from 'react-dom';
import { GetDoneApp } from '../ui-components/GetDoneApp/GetDoneApp';

export function renderGetDoneApp(element) {
    hydrate(
        <GetDoneApp />,
        element
    );
}
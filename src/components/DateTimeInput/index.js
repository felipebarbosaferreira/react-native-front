import React, { useState } from 'react';
import { Platform } from 'react-native';

import DateTimeInputAndroid from './index.android';
import DateTimeInputIos from './index.ios';

export default function GetInputPlatform() {
    return (
        Platform.OS === 'android'
        ? <DateTimeInputAndroid/>
        : <DateTimeInputIos/>
    )
}
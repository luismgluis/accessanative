package com.mysoftdnd.ingrexapp;
import android.app.Activity;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReactContext;

class MoveAppToBackground extends ReactContextBaseJavaModule {

    @Override
    public String getName() {
        return "MoveAppToBackground";
    }

        private ReactContext mReactContext;

    public MoveAppToBackground(ReactApplicationContext reactContext) {
        super(reactContext);
                mReactContext = reactContext;
    }

    /* React Methods */
   @ReactMethod
    public void MoveToBackground() {
                Activity activity = mReactContext.getCurrentActivity();
                activity.moveTaskToBack(true);
    }
}
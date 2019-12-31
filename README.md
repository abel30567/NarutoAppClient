# Naruto CCG Mobile App

## Running Application in debug mode

### iPhone Application
1. Connect development iphone if available
2. Open Xcode go to `Product > Scheme > Edit Scheme` and select `Debug` mode.
3. Select desired device to run application on
4. Press the Play button
5. Get a drink and let it load

### Android Application
1. Open Android Studio
2. Open AVD Manager and select Android device to run application on
3. 

## Building App for iPhone and Android

### iOS Archive

1. Bundle script below
```react-native bundle --entry-file index.js --platform ios --dev false --bundle-output iosBackup/main.jsbundle --assets-dest iosBackup```

2. Open Xcode go to `Product > Scheme > Edit Scheme` and select `Release` mode.

3. Increase version and build numbers

4. Go to `Product > Archive` and let the Archive be built
 
### Android APK

1. increase version numbers in `android/app/build.gradle`

2. Create Android build Bundle
```react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res```

3. Delete `/NarutoApp/android/app/src/main/res/drawable` folders created and raw folder values

4. Run the following script
```
$ cd android
$ cd android && ./gradlew clean && ./gradlew assembleRelease
```

The generated APK can be found under android/app/build/outputs/apk/release/app-release.apk, and is ready to be distributed.

#Troubleshooting
(cd android && ./gradlew app:installDebug)
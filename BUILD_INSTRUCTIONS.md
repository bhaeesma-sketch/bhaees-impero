# Build Instructions for Android APK and iOS

## Status:
- ✅ **Local Gradle Build**: Running in background (see build.log)
- ✅ **EAS Configuration**: Updated and ready
- ⏳ **EAS Cloud Build**: Ready to deploy

---

## Option 1: Local Android Build (Gradle - Currently Running)

The local Gradle build is running in the background. Once it completes, your APK will be located at:

```
/Users/bhaeesma/Desktop/Luxury-Linkage/mobile/android/app/build/outputs/apk/release/app-release.apk
```

**To check build progress**, run:
```bash
tail -f /tmp/build.log
```

**To find the APK once built**, run:
```bash
find /Users/bhaeesma/Desktop/Luxury-Linkage/mobile/android -name "*.apk" -type f
```

---

## Option 2: EAS Cloud Build (Recommended)

This builds on Expo's servers without using your local disk space.

### Step 1: Login to EAS
```bash
cd /Users/bhaeesma/Desktop/Luxury-Linkage
npx eas login
```

When prompted, you'll need:
- Expo account email
- Password
- Or create a new account at https://expo.dev

### Step 2: Build Android APK
```bash
cd /Users/bhaeesma/Desktop/Luxury-Linkage
npx eas build --platform android
```

### Step 3: Build iOS (requires Mac - you have one!)
```bash
cd /Users/bhaeesma/Desktop/Luxury-Linkage
npx eas build --platform ios
```

---

## Configuration Files

✅ **EAS Configuration**: [eas.json](../eas.json)
- Android: Builds as APK
- iOS: Builds as Archive (for App Store)

✅ **App Configuration**: [mobile/app.json](./app.json)
- App Name: Impero Di Gold
- Android Package: com.imperodgold.app
- iOS Bundle ID: com.imperodgold.app

---

## Next Steps After Build

1. **Android APK**: Install on physical device via USB or Android emulator
2. **iOS IPA**: Upload to TestFlight or App Store Connect

---

## Troubleshooting

If local build fails due to disk space:
```bash
# Clean caches
rm -rf ~/.gradle/caches
rm -rf ~/Library/Caches/CocoaPods
rm -rf ~/Library/Developer/Xcode/DerivedData

# Check disk space
df -h | grep "System/Volumes/Data"
```

---

## Build Status

Check the local build output:
```bash
ps aux | grep gradlew | grep -v grep  # Check if running
tail -100 /tmp/build.log              # View latest output
```

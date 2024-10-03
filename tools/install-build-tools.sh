#!/bin/bash

brew update -y
brew install yarn -y
yarn global add expo-cli --non-interactive
yarn global add eas-cli --non-interactive
yarn global add react-native-cli --non-interactive
yarn global add node-gyp --non-interactive

brew install node watchman -y
brew install rbenv ruby-build -y
brew install --cask adoptopenjdk/openjdk/adoptopenjdk8 -y
brew install --cask android-sdk -y

gem install fastlane -v 2.219.0 --force
gem install cocoapods -v 1.14.3
rbenv install 2.7.0
rbenv global 2.7.0

xcode-select --install

gem install ffi -v 1.16.3 --force
gem install cocoapods --force

echo "Development environment setup completed for Expo and React Native projects."

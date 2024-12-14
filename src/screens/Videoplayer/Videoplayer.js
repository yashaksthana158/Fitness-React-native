import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation-locker';
import YoutubePlayer from 'react-native-youtube-iframe';

const VideoPlayer = ({ videoUri, isYouTube }) => {
  const [clicked, setClicked] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState({ currentTime: 0, seekableDuration: 0 });
  const [fullScreen, setFullScreen] = useState(false);
  const ref = useRef();

  const format = (seconds) => {
    let mins = parseInt(seconds / 60).toString().padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleFullScreenToggle = () => {
    if (fullScreen) {
      StatusBar.setHidden(false);
      Orientation.lockToPortrait();
    } else {
      StatusBar.setHidden(true);
      Orientation.lockToLandscape();
    }
    setFullScreen(!fullScreen);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      {isYouTube ? (
        <View style={{ width: '100%', height: fullScreen ? '100%' : 200 }}>
          <YoutubePlayer
            height={fullScreen ? '100%' : 200}
            play={!paused}
            videoId={videoUri}
            onChangeState={(state) => {
              if (state === 'ended') setPaused(true);
            }}
            onFullScreenChange={handleFullScreenToggle}
          />
        </View>
      ) : (
        <TouchableOpacity
          style={{ width: '100%', height: fullScreen ? '100%' : 200 }}
          onPress={() => setClicked(true)}
        >
          <Video
            paused={paused}
            source={{ uri: videoUri }}
            ref={ref}
            onProgress={(x) => setProgress(x)}
            muted
            style={{ width: '100%', height: fullScreen ? '100%' : 200 }}
            resizeMode="contain"
          />
          {clicked && (
            <TouchableOpacity
              style={styles.overlay}
              onPress={() => setClicked(false)} // Hide controls when tapping outside
            >
              <View style={styles.controlsContainer}>
                <TouchableOpacity
                  onPress={() => {
                    if (progress.currentTime) {
                      ref.current.seek(Math.max(0, parseInt(progress.currentTime) - 10));
                    }
                  }}
                >
                  <Image source={require('./src/backward.png')} style={styles.controlIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPaused(!paused)}>
                  <Image
                    source={
                      paused
                        ? require('./src/play-button.png')
                        : require('./src/pause.png')
                    }
                    style={styles.controlIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (progress.currentTime) {
                      ref.current.seek(Math.min(progress.seekableDuration, parseInt(progress.currentTime) + 10));
                    }
                  }}
                >
                  <Image source={require('./src/forward.png')} style={styles.controlIcon} />
                </TouchableOpacity>
              </View>
              <View style={styles.progressContainer}>
                <Text style={styles.timeText}>{format(progress.currentTime)}</Text>
                <Slider
                  style={{ width: '80%', height: 40 }}
                  minimumValue={0}
                  maximumValue={progress.seekableDuration}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#fff"
                  onValueChange={(x) => ref.current.seek(x)}
                />
                <Text style={styles.timeText}>{format(progress.seekableDuration)}</Text>
              </View>
              <View style={styles.fullScreenContainer}>
                <TouchableOpacity onPress={handleFullScreenToggle}>
                  <Image
                    source={fullScreen ? require('./src/minimize.png') : require('./src/full-size.png')}
                    style={styles.fullScreenIcon}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlsContainer: {
    flexDirection: 'row',
  },
  controlIcon: {
    width: 30,
    height: 30,
    tintColor: 'white',
    marginHorizontal: 25,
  },
  progressContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
  },
  timeText: {
    color: 'white',
  },
  fullScreenContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 10,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
  },
  fullScreenIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
});

export default VideoPlayer;

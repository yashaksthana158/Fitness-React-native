import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import VideoPlayer from './Videoplayer';
import videoData from './VideoData.json';

const VideoList = () => {
  const [selectedVideo, setSelectedVideo] = useState(videoData[0]); // Initialize with the first video

  return (
    <View style={styles.container}>
      {/* Video Player at the top */}
      <View style={styles.videoPlayerContainer}>
        <VideoPlayer videoUri={selectedVideo.uri} />
      </View>

      {/* Video List below the Video Player */}
      <FlatList
        data={videoData} // Use the JSON data directly
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.videoItem}
            onPress={() => setSelectedVideo(item)}
          >
            <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
            <View style={styles.textContainer}>
              <Text style={styles.videoTitle}>{item.title}</Text>
              <Text style={styles.videoDescription}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoPlayerContainer: {
    height: 200,  // You can adjust the height based on your needs
    backgroundColor: 'black',
    marginBottom:15,  // Optional: to differentiate the video player area
  },
  videoItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  thumbnail: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  videoDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default VideoList;

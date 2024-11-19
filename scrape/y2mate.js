import fetch from 'node-fetch';
import { ytmp3, ytmp4 } from 'ruhend-scraper';

export const yt = async (url) => {
  try {
    const audioData = await ytmp3(url);
    const videoData = await ytmp4(url);

    return {
      status: 200,
      creator: 'KeiLaSenpai',
      result: {
        title: audioData.title,
        thumbnail: audioData.thumbnail,
        videoUrl: url,
        mediaUrl: {
          video: videoData.video,
          audio: audioData.audio,
        },
        size: {
          video: videoData.size || 'Tidak tersedia',
          audio: audioData.size || 'Tidak tersedia',
        },
        quality: videoData.quality || 'Tidak disebutkan',
      },
    };
  } catch (error) {
    console.error('Terjadi kesalahan:', error.message);
    throw new Error('Terjadi kesalahan: ' + error.message);
  }
};

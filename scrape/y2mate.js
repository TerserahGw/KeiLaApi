const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const tar = require('tar');
const got = require('got');
const ytdl = require('ytdl-core');
const { ytsearch } = require('yt-search');
const { z } = require('zod');
const { ytmp3, ytmp4 } = require('ruhend-scraper');

async function yt(url) {
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
}

module.exports = { yt };

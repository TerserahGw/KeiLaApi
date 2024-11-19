const axios = require("axios");

const pixiv = async (query) => {
  try {
    const headers = {
      'Cookie': 'first_visit_datetime=2022-06-13+21%3A32%3A20; p_ab_id=2; p_ab_id_2=2; p_ab_d_id=1302641430; yuid_b=NwWBhkg;webp_available=1;PHPSESSID=038h1e93584nbi0cmk4ecbj0feoi3hi6; cc1=2023-12-26%2010%3A51%3A10;_cf_bm=ADzxrZZZD5CSkidgBgz67hd7LNVfIfcsulkNfUjPoC0-1703555470-1-AS/wlRn1Y006HTh3gmmuhXRPWB5y3fLZ/pSjPk1jVuVmNfle0efjmZVBqLe+gRfzlg8b7bZeCJk+9WIOAI5cLFhh+zbULqZT21b/5 LH3ne9F;cf_clearance=.4v0UhELeGS1Zj2CkSWkjHZI3G6vFqj4qOQXeZCWFh0-1703555479-0-2-6367f888.f80ea3e1.61e7cc40- 0.2.1703555479',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36',
      'Pragma': 'akamai-x-cache-on, akamai-x-cache-remote-on, akamai-x-cache-remote-on, akamai-x-check-cacheable, akamai-x-get-cache-key, akamai-x-get-extracted-values, akamai-x-get-ssl-client-session-id, akamai-x-get-true-cache-key, akamai-x-serial-no, akamai-x-get-request-id, akamai-x-get-nonces, akamai-x-get-client-ip, akamai-x-feo-trace',
    };

    let attempt = 0;
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`https://www.pixiv.net/touch/ajax/tag_portal?word=${query}&lang=en&version=494a080e44a93243958a09ee2497d9b02d6ec6d9`, {
          headers: headers,
        });

        const result = [];
        const popularWorks = data.body.illusts;

        if (popularWorks && popularWorks.length > 0) {
          popularWorks.forEach(work => {
            const modifiedUrl = work.url.replace(/https:\/\/i\.pximg\.net\/c\/\d+x\d+_\d+_\w+/, 'https://i.pixiv.re');
            result.push({
              alt: work.alt,
              title: work.title,
              author: work.author_details.user_name,
              image: modifiedUrl
            });
          });
        }

        if (result.length === 0) {
          attempt++;
          if (attempt < 5) {
            console.log('Array kosong, menjalankan ulang...');
            return await fetchData();  // Gunakan await untuk memastikan rekursi selesai
          } else {
            return { status: false, author: 'KeiLaSenpai', result: ["Maaf Yang Anda Cari Tidak Dapat Ditemukan Silahkan Masukan Query Lain!"] };
          }
        } else {
          return { status: true, author: 'KeiLaSenpai', result: result };
        }
      } catch (error) {
        throw new Error("Error fetching Pixiv data");
      }
    };

    return await fetchData();
  } catch (error) {
    throw new Error("Error fetching Pixiv data");
  }
};

module.exports = { pixiv };  // Ekspor dengan module.exports

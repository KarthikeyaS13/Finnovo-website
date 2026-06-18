const fs = require('fs');
const https = require('https');

const urls = {
  home: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sX2M3MDYxZjkwZDBlODRkYjk4OTFhOTUwYjQ3YmE0MDkwEgsSBxC8i-fdnAsYAZIBIgoKcHJvamVjdF9pZBIUQhI1ODg0MzI4NzI3MTI1MTM4ODc&filename=&opi=89354086',
  products: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sXzg5Mzc5Mzc5N2JiZDQ5YTZhOTQ0YmI5N2IxYTZkOGFmEgsSBxC8i-fdnAsYAZIBIgoKcHJvamVjdF9pZBIUQhI1ODg0MzI4NzI3MTI1MTM4ODc&filename=&opi=89354086',
  about: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sXzE4NDFjN2Q3MDhkZjRiNGU5YTM4ZTRlNWU4Y2NlNWJlEgsSBxC8i-fdnAsYAZIBIgoKcHJvamVjdF9pZBIUQhI1ODg0MzI4NzI3MTI1MTM4ODc&filename=&opi=89354086',
  contact: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sXzI2NDc3MDY4ZjJiZDQyMTQ4MDViZDhhMjZhMjU1Nzk5EgsSBxC8i-fdnAsYAZIBIgoKcHJvamVjdF9pZBIUQhI1ODg0MzI4NzI3MTI1MTM4ODc&filename=&opi=89354086',
  navigation: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sXzhhYjlhNzhhOGMxMzQ1OGQ4YTRkZTE3OTQyZmRhZDViEgsSBxC8i-fdnAsYAZIBIgoKcHJvamVjdF9pZBIUQhI1ODg0MzI4NzI3MTI1MTM4ODc&filename=&opi=89354086'
};

fs.mkdirSync('temp_html', { recursive: true });

Object.entries(urls).forEach(([name, url]) => {
  https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      fs.writeFileSync(`temp_html/${name}.html`, data);
      console.log(`Downloaded ${name}.html: ${data.length} bytes`);
    });
  }).on('error', (err) => {
    console.error(`Error downloading ${name}:`, err.message);
  });
});

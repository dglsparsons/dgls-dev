import { getAllPosts } from './posts'

const posts = getAllPosts()

console.log(`<?xml version="1.0" encoding="utf-8"?>
  <feed xmlns="http://www.w3.org/2005/Atom">
    <title>Douglas Parsons' Blog</title>
    <subtitle>Feed</subtitle>
    <link href="https://dgls.dev/feed.xml" rel="self"/>
    <link href="https://dgls.dev"/>
    <updated>${posts[0].date}</updated>
    <id>https://rauchg.com/</id>
    <author>
      <name>Guillermo Rauch</name>
      <email>rauchg@gmail.com</email>
    </author>
    ${posts.reduce((acc, post) => {
  return `${acc}
        <entry>
          <id>${post.id}</id>
          <title>${post.title}</title>
          <link href="https://dgls.dev/posts/${post.id}"/>
          <updated>${post.isoDate}</updated>
          <content type="html">${post.content}</content>
        </entry>`;
}, "")}
  </feed>
`)

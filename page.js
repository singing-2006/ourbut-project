const root = document.getElementById("root");

// 初始化 Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
const supabaseUrl = 'https://licxscfugsrfwaamzcep.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpY3hzY2Z1Z3NyZndhYW16Y2VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5MTUyNTcsImV4cCI6MjA4OTQ5MTI1N30.lwx48fEX5UJn7P5KDNvouVRm3iJQPid6KvDZU6ZSSLA' 
window.supabase = createClient(supabaseUrl, supabaseKey)

// 页面HTML
root.innerHTML = `
  <h1>📄 论文展示</h1>
  <p>这里放你的论文内容</p >

  <h2>💬 评论区</h2>

  <input id="name" placeholder="名字" />
  <br />
  <input id="text" placeholder="评论" />
  <button id="submit">发布</button>

  <ul id="list"></ul>
`;

// 获取评论
async function fetchComments() {
  const { data } = await supabase.from("comments").select("*");
  const list = document.getElementById("list");

  list.innerHTML = "";
  data.forEach(c => {
    const li = document.createElement("li");
    li.innerHTML = `
      <b>${c.name}</b>: ${c.text}
      <button onclick="likeComment(${c.id}, ${c.likes})">👍 ${c.likes}</button>
    `;
    list.appendChild(li);
  });
}

// 添加评论
document.getElementById("submit").onclick = async () => {
  const name = document.getElementById("name").value;
  const text = document.getElementById("text").value;

  if (!name || !text) return;

  await supabase.from("comments").insert([
    { name, text, likes: 0 }
  ]);

  fetchComments();
};

// 点赞
window.likeComment = async (id, likes) => {
  await supabase
    .from("comments")
    .update({ likes: likes + 1 })
    .eq("id", id);

  fetchComments();
};

// 初始化加载
fetchComments();

const root = document.getElementById("root");

// 初始化 Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
const supabaseUrl = 'https://licxscfugsrfwaamzcep.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpY3hzY2Z1Z3NyZndhYW16Y2VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5MTUyNTcsImV4cCI6MjA4OTQ5MTI1N30.lwx48fEX5UJn7P5KDNvouVRm3iJQPid6KvDZU6ZSSLA' 
window.supabase = createClient(supabaseUrl, supabaseKey)

// 页面HTML
root.innerHTML = `
  <style>
    .paper-viewer {
      background: #f9f9f9;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
      border: 1px solid #e0e0e0;
    }
    .btn-group {
      margin: 20px 0;
      display: flex;
      gap: 10px;
    }
    .btn {
      display: inline-block;
      padding: 10px 20px;
      background: #4CAF50;
      color: white;
      text-decoration: none;
      border-radius: 5px;
    }
    .btn:hover {
      background: #45a049;
    }
    .abstract {
      margin-top: 20px;
      padding: 15px;
      background: #f5f5f5;
      border-radius: 5px;
    }
  </style>
  
  <h1>📄 论文展示</h1>
  
  <div class="paper-viewer">
    <h2>论文：Human-Algorithm Collaboration with Private Information: 
Naïve Advice-Weighting Behavior and Mitigation</h2>
    <p><strong>作者：Maya Balakrishnan,a,* Kris Johnson Ferreira,b Jordan Tongc</p>
    <p><strong>发布日期：</strong>2026年3月21日</p>
    
    <div class="btn-group">
      <a href="paper.pdf" target="_blank" class="btn">📄 在线阅读</a>
      <a href="paper.pdf" download class="btn">💾 下载 PDF</a>
    </div>
    
    <div class="abstract">
      <h3>📝 摘要</h3>
      <p>Abstract. Even if algorithms make better predictions than humans on average, humans 
may sometimes have private information that an algorithm does not have access to that can 
improve performance. How can we help humans effectively use and adjust recommendations made by algorithms in such situations? When deciding whether and how to override 
an algorithm’s recommendations, we hypothesize that people are biased toward following 
naïve advice-weighting (NAW) behavior; they take a weighted average between their own 
prediction and the algorithm’s prediction, with a constant weight across prediction instances 
regardless of whether they have valuable private information. This leads to humans overadhering to the algorithm’s predictions when their private information is valuable and underadhering when it is not. In an online experiment where participants were tasked with 
making demand predictions for 20 products while having access to an algorithm’s predictions, we confirm this bias toward NAW and find that it leads to a 20%–61% increase in prediction error. In a second experiment, we find that feature transparency—even when the 
underlying algorithm is a black box—helps users more effectively discriminate how to deviate from algorithms, resulting in a 25% reduction in prediction error. We make further 
improvements in a third experiment via an intervention designed to move users away from 
advice weighting and instead, use only their private information to inform deviations, leading to a 34% reduction in prediction error.</p>
    </div>
  </div>

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

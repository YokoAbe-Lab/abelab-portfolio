// main.js
// AbeLab ポートフォリオ用 JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // -----------------------------
  // 要素の取得
  // -----------------------------
  const projectCards = document.querySelectorAll(".project-card");

  // Bの黒帯（詳細パネル）：class を取得
  const detailSection = document.querySelector(".project-detail-panel");
  const detailContent = document.getElementById("detail-content");
  const backBtn = document.getElementById("detail-close");

  // テーマ切替ボタン（なければ null のまま）
  const themeToggle = document.getElementById("themeToggle");

  // CのRPAセクション
  const rpaSection = document.getElementById("rpa-detail");

  // -----------------------------
  // ★ 追加：詳細パネル内の動画を止める（戻る/切替時の暴走防止）
  // -----------------------------
  function stopDetailVideoIfAny() {
    if (!detailContent) return;

    // detailContent の中に video があれば停止して先頭へ戻す
    const video = detailContent.querySelector("video");
    if (video) {
      try {
        video.pause();
        video.currentTime = 0;
      } catch (e) {
        // ここは環境差が出るので、失敗しても処理は止めない
      }
    }
  }

  // -----------------------------
  // プロジェクト詳細テキスト（B用）
  // -----------------------------
  const projectDetails = {
    bucket: `
      <h2>ブロック型 ACCESS｜BucketBlocks</h2>
      <p>
        「項目が増え続ける」「システム化するほどでもない」現場向けの
        ACCESS データベースです。<br>
        文字列・数値・日付などの項目をあとから追加しやすく、
        小規模なマスタ管理やログ保管に向いています。
      </p>
      <ul>
        <li>Excelで管理していた表を、そのままACCESSに移行しやすい設計</li>
        <li>後から列を増やしても既存データを壊さないテーブル構成</li>
        <li>フィルタ・ソート・検索など、現場でよく使う操作を前提に設計</li>
      </ul>
    `,
    invoice: `
      <h2>請求書自動作成ツール</h2>
      <p>
        ACCESS の売上データから、Excel の請求書フォームに
        明細を自動転記するマクロです。<br>
        PDF 出力とログ記録まで一気通貫で処理し、
        「どの請求書をいつ発行したか」を後から追えるようにしています。
      </p>
      <ul>
        <li>得意先ごとに請求書シートを自動作成</li>
        <li>Excel フォーマットを変えずに中身だけ差し替え</li>
        <li>発行履歴をログに残し、チェックリストも自動作成</li>
      </ul>

      <!-- ★ 追加：動画を「ページ内」で再生（直接mp4を開かない） -->
      <div style="margin: 1rem 0 0.2rem;">
        <video
          id="invoiceDemoVideo"
          controls
          preload="metadata"
          style="width: 100%; max-width: 980px; border-radius: 0.9rem; display: block;"
        >
          <source src="img/invoice-form-demo.mp4" type="video/mp4">
          お使いのブラウザは video タグに対応していません。
        </video>

        <p style="margin: 0.45rem 0 0; font-size: 0.82rem; color: #cbd5f5;">
          ※ 全画面は右下の「⛶」。閉じるときは下の「Projectsへ戻る」を押します。
        </p>
      </div>
    `
    // pdf は C に飛ばすので、ここには入れない
  };

  // -----------------------------
  // 詳細表示処理（B に表示）
  // -----------------------------
  function showProjectDetail(projectId) {
    if (!detailSection || !detailContent) return;

    // ★ 追加：表示を切り替える前に、前の動画が再生中なら止める
    stopDetailVideoIfAny();

    const html = projectDetails[projectId];

    if (!html) {
      detailContent.innerHTML = `<p>このプロジェクトの詳細は、準備中です。</p>`;
    } else {
      detailContent.innerHTML = html;
    }

    detailSection.classList.remove("hidden");
    detailSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // -----------------------------
  // カードのクリックイベント
  // -----------------------------
  projectCards.forEach((card) => {
    // ★ HTMLに合わせて class 名を変更
    const btn = card.querySelector(".project-detail-button");
    const projectId = card.dataset.projectId; // data-project-id="bucket" など

    if (!btn || !projectId) return;

    btn.addEventListener("click", () => {
      // ★ pdf カードだけ C セクションへスクロール
      if (projectId === "pdf" && rpaSection) {
        if (detailSection) {
          detailSection.classList.add("hidden");
        }
        rpaSection.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      // それ以外（bucket / invoice）はBに詳細表示
      showProjectDetail(projectId);
    });
  });

  // -----------------------------
  // 戻るボタン（B を閉じる）
  // -----------------------------
  if (backBtn && detailSection) {
    backBtn.addEventListener("click", () => {
      // ★ 追加：戻る時に動画を停止（音が残らないように）
      stopDetailVideoIfAny();

      detailSection.classList.add("hidden");

      const projectsSection = document.getElementById("projects");
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  // -----------------------------
  // テーマ切替（Dark / Light）
  // ※ ボタンが無ければ何もしない
  // -----------------------------
  if (themeToggle) {
    const savedTheme = localStorage.getItem("abelab-theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-theme");
    }

    themeToggle.addEventListener("click", () => {
      const isDark = document.body.classList.toggle("dark-theme");
      localStorage.setItem("abelab-theme", isDark ? "dark" : "light");
    });
  }
});

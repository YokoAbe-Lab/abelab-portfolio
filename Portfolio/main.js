// ==============================
// AbeLab Home main.js
// ・モバイルメニュー開閉
// ・スクロールトップボタン
// ・Projects 詳細表示切り替え
// ==============================

// DOM取得のヘルパー
function $(selector) {
    return document.querySelector(selector);
}

function $all(selector) {
    return document.querySelectorAll(selector);
}

// ------------------------------
// モバイルナビ開閉
// ------------------------------
const navToggle = $(".nav-toggle");
const mobileNav = $(".mobile-nav");

if (navToggle && mobileNav) {
    navToggle.addEventListener("click", () => {
        // display の ON/OFF を直接切り替える
        const isShown = mobileNav.style.display === "block";
        mobileNav.style.display = isShown ? "none" : "block";
    });

    // モバイルメニュー内リンククリックで閉じる
    $all(".mobile-link").forEach((link) => {
        link.addEventListener("click", () => {
            mobileNav.style.display = "none";
        });
    });
}

// ------------------------------
// スクロールトップボタン
// ------------------------------
const scrollTopBtn = $(".scroll-top-button");

if (scrollTopBtn) {
    // 初期状態は非表示
    scrollTopBtn.style.display = "none";

    window.addEventListener("scroll", () => {
        const y = window.scrollY || document.documentElement.scrollTop;
        if (y > 200) {
            scrollTopBtn.style.display = "flex";
        } else {
            scrollTopBtn.style.display = "none";
        }
    });

    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
}

// ------------------------------
// Projects 詳細表示
// ------------------------------
const detailPanel = $(".project-detail-panel");
const detailContent = $("#project-detail-content");
const detailCloseBtn = $(".detail-close-button");

// プロジェクトごとの説明データ
const projectDetails = {
    bucket: {
        title: "ブロック型 ACCESS｜BucketBlocks",
        body: `
<p>
テキスト／数値／日付を「バケツ」に追加していくように
柔軟に項目を増やせる汎用データストアです。
中小企業の「まずは Excel で管理していた情報」を
段階的にデータベース化することを想定しています。
</p>
<p>
・項目追加にスキーマ変更が不要<br>
・CSVインポート／エクスポート連携<br>
・後から集計やグラフ化に展開しやすい構造
</p>
        `,
    },
    invoice: {
        title: "請求書自動作成ツール",
        body: `
<p>
ACCESS に蓄積した売上データをもとに、
請求先ごとの明細を Excel 請求書フォームへ自動転記し、
PDF出力とログ記録まで一気通貫で行うツールです。
</p>
<p>
・請求書番号ごとにシート自動生成<br>
・明細行の書式保持と空行処理<br>
・「いつ／誰に／いくら請求したか」をログで追跡可能
</p>
        `,
    },
    pdf: {
        title: "PDFテキスト化チェックツール",
        body: `
<p>
PDFファイルからテキストを抽出し、
チェック用 Excel シートに自動貼り付けするツールです。
</p>
<p>
・PDF単位で処理結果とエラーを記録<br>
・「どのファイルを、いつ変換したか」をログ管理<br>
・監査やダブルチェック用途を想定した設計
</p>
        `,
    },
};

// 詳細パネルを表示する関数
function showProjectDetail(projectId) {
    if (!detailPanel || !detailContent) return;

    const data = projectDetails[projectId];
    if (!data) {
        detailContent.innerHTML = "<p>詳細データが見つかりませんでした。</p>";
    } else {
        const titleEl = $(".detail-title");
        if (titleEl) {
            titleEl.textContent = data.title;
        }
        detailContent.innerHTML = data.body;
    }

    // パネルを表示
    detailPanel.style.display = "block";

    // 詳細エリアまで自動スクロール
    detailPanel.scrollIntoView({
        behavior: "smooth",
        block: "start",
    });
}

// 詳細パネルを閉じる関数
function hideProjectDetail() {
    if (detailPanel) {
        detailPanel.style.display = "none";
    }
}

// イベント登録
$all(".project-detail-button").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const target = e.currentTarget;
        const projectId = target.getAttribute("data-project-target");
        if (projectId) {
            showProjectDetail(projectId);
        }
    });
});

if (detailCloseBtn) {
    detailCloseBtn.addEventListener("click", hideProjectDetail);
}

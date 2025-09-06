// 診断データと状態管理
class DiagnosisApp {
    constructor() {
        this.currentQuestionIndex = 0;
        this.answers = [];
        this.totalScore = 0;
        this.result = null;
        
        // 質問データ
        this.questions = [
            {
                id: 1,
                text: "鏡に映る自分を見たとき、最初にどう思う？",
                icon: "🪞",
                options: [
                    { text: "ため息が出る、目をそむけたい", score: 1 },
                    { text: "「まあ、悪くはないかな」とチェックする", score: 3 },
                    { text: "「今日の私もいい感じ！」と笑顔になる", score: 5 }
                ]
            },
            {
                id: 2,
                text: "人から褒められたとき、あなたの反応は？",
                icon: "💕",
                options: [
                    { text: "「そんなことないです！」と全力で否定する", score: 1 },
                    { text: "「ありがとうございます」と受け止めつつも少し照れる", score: 3 },
                    { text: "「嬉しい！ありがとう！〇〇を意識したの」と素直に喜ぶ", score: 5 }
                ]
            },
            {
                id: 3,
                text: "やってみたい新しいこと（勉強、習い事など）が見つかったら？",
                icon: "✨",
                options: [
                    { text: "「でも時間もお金もないし…」と諦める理由を探す", score: 1 },
                    { text: "しばらく情報収集したり、悩んだりする", score: 3 },
                    { text: "「面白そう！」と、まずは体験するなど行動してみる", score: 5 }
                ]
            },
            {
                id: 4,
                text: "あなたのクローゼットはどんな状態？",
                icon: "👗",
                options: [
                    { text: "着ていない服で溢れている。何があるか把握できていない", score: 1 },
                    { text: "定番の服が多いが、少しマンネリ気味", score: 3 },
                    { text: "「なりたい自分」を意識したお気に入りの服が揃っている", score: 5 }
                ]
            },
            {
                id: 5,
                text: "自分のために時間やお金を使うことに、どんな感覚がある？",
                icon: "💎",
                options: [
                    { text: "罪悪感がある、もったいないと感じる", score: 1 },
                    { text: "必要最低限ならOK。でも少し躊躇する", score: 3 },
                    { text: "未来の自分への投資だと考え、楽しんで使える", score: 5 }
                ]
            }
        ];
        
        // 結果データ
        this.results = {
            level1: {
                title: "まだ固いつぼみ",
                subtitle: "たくさんの可能性を秘めた、固いつぼみタイプ",
                icon: "🌱",
                color: "from-green-400 to-green-600",
                scoreRange: [5, 10],
                description: "あなたの中には、美しい花を咲かせる素晴らしい可能性が眠っています。ただ、今はまだ自分に自信が持てなかったり、周りの目を気にしすぎたりして、そのつぼみは固く閉ざされている状態かも。まずは自分の中に眠る力に気づくことが、開花の第一歩です。",
                nextSteps: {
                    mindset: "1日1つ、自分の「できたこと」を見つけて褒めてみましょう。「朝起きられた」「仕事を頑張った」など、小さなことでOKです。",
                    appearance: "まずはリップの色を変えてみるなど、一番簡単なパーツから新しい自分に挑戦。鏡を見て「似合うかも？」と思えたら大成功です。"
                }
            },
            level2: {
                title: "ほころびかけのつぼみ",
                subtitle: "あともう少しの光で花開く、ほころびかけのつぼみタイプ",
                icon: "🌸",
                color: "from-pink-400 to-pink-600",
                scoreRange: [11, 17],
                description: "あなたは自分の魅力や「こうなりたい」という想いに気づき始めていますね。つぼみの先端が少しずつ開き、美しい色が見え始めている状態です。ただ、時々不安になったり、過去の自分に引っ張られたりして、あと一歩が踏み出せないことも。少しの勇気と行動が、あなたを大きく開花させます。",
                nextSteps: {
                    mindset: "「どうせ私なんて」という言葉を、「私ならできるかも」に意識的に言い換えてみましょう。言葉があなたの思考を作ります。",
                    appearance: "「憧れるけど自分には似合わない」と思っていたファッションや髪型に挑戦してみましょう。プロの力を借りるのもおすすめです。"
                }
            },
            level3: {
                title: "七分咲き",
                subtitle: "周囲を魅了し始める、美しい七分咲きタイプ",
                icon: "🌺",
                color: "from-purple-400 to-purple-600",
                scoreRange: [18, 24],
                description: "あなたはすでに自分の魅力を理解し、それを表現することができています。その姿は周りの人からも魅力的に映っているはず。自信と謙虚さのバランスが取れており、夢に向かって着実に行動できています。満開まではあと一歩。最後のひと押しで、誰もが見惚れるような圧倒的な存在感を放つでしょう。",
                nextSteps: {
                    mindset: "あなたが「理想とする人」なら、この場面でどう考え、どう行動するか？をイメージしてみましょう。視座が一段上がり、ブレない自分軸が確立されます。",
                    appearance: "TPOに合わせるだけでなく、「今日の自分をどう演出するか」という視点でファッションやメイクを選んでみましょう。あなたの魅力がさらに輝き出します。"
                }
            },
            level4: {
                title: "満開",
                subtitle: "自分らしく輝き、周囲に希望を与える満開タイプ",
                icon: "🌻",
                color: "from-yellow-400 to-orange-500",
                scoreRange: [25, 25],
                description: "素晴らしい！あなたは自分自身の魅力を完全に理解し、自信を持って表現できています。マインドと見た目が一致し、あなたの存在そのものが輝きを放っている状態です。その姿は、周りの人々に勇気や希望を与えているはず。これからも自分らしさを大切に、さらに大きな夢を叶えていってください。",
                nextSteps: {
                    mindset: "あなたがこれまでに培ってきた経験やマインドを、今度は誰かのために役立てることを意識してみましょう。あなたの影響力はさらに高まります。",
                    appearance: "あなたの輝きは、もはや内面から溢れ出ています。今のあなたに似合う、ワンランク上のアイテム（小物、アクセサリーなど）を身につけると、ステージがさらに上がります。"
                }
            }
        };
    }
    
    // レベル判定
    calculateLevel(score) {
        if (score >= 5 && score <= 10) return 'level1';
        if (score >= 11 && score <= 17) return 'level2';
        if (score >= 18 && score <= 24) return 'level3';
        if (score === 25) return 'level4';
        return 'level1'; // デフォルト
    }
    
    // 画面遷移
    showScreen(screenId) {
        // すべての画面を非表示
        const screens = ['start-screen', 'quiz-screen', 'loading-screen', 'result-screen'];
        screens.forEach(id => {
            document.getElementById(id).classList.add('hidden');
        });
        
        // 指定した画面を表示
        document.getElementById(screenId).classList.remove('hidden');
    }
    
    // 診断開始
    startDiagnosis() {
        this.currentQuestionIndex = 0;
        this.answers = [];
        this.totalScore = 0;
        this.showScreen('quiz-screen');
        this.displayQuestion();
    }
    
    // 質問表示
    displayQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        const progressPercentage = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        
        // プログレスバー更新
        document.getElementById('current-question').textContent = this.currentQuestionIndex + 1;
        document.getElementById('progress-percentage').textContent = Math.round(progressPercentage);
        document.getElementById('progress-bar').style.width = progressPercentage + '%';
        
        // 質問内容更新
        document.getElementById('question-icon').textContent = question.icon;
        document.getElementById('question-text').textContent = question.text;
        
        // 選択肢生成
        const optionsContainer = document.getElementById('answer-options');
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const optionButton = document.createElement('button');
            optionButton.className = 'w-full p-4 text-left border-2 border-gray-200 rounded-lg hover:border-pink-300 hover:bg-pink-50 transition-all duration-200 focus:outline-none focus:border-pink-400';
            optionButton.innerHTML = `
                <div class="flex items-start">
                    <span class="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-1">
                        ${String.fromCharCode(65 + index)}
                    </span>
                    <span class="text-gray-800 leading-relaxed">${option.text}</span>
                </div>
            `;
            
            optionButton.onclick = () => this.selectAnswer(index);
            optionsContainer.appendChild(optionButton);
        });
        
        // 前に戻るボタン表示制御
        const prevBtn = document.getElementById('prev-btn');
        if (this.currentQuestionIndex > 0) {
            prevBtn.classList.remove('hidden');
        } else {
            prevBtn.classList.add('hidden');
        }
    }
    
    // 回答選択
    selectAnswer(optionIndex) {
        const question = this.questions[this.currentQuestionIndex];
        const selectedOption = question.options[optionIndex];
        
        // 回答を保存
        this.answers[this.currentQuestionIndex] = {
            questionId: question.id,
            selectedOption: optionIndex,
            score: selectedOption.score
        };
        
        // 選択された選択肢をハイライト
        const optionButtons = document.querySelectorAll('#answer-options button');
        optionButtons.forEach((btn, index) => {
            if (index === optionIndex) {
                btn.classList.add('border-pink-400', 'bg-pink-50');
                btn.classList.remove('border-gray-200');
            } else {
                btn.classList.remove('border-pink-400', 'bg-pink-50');
                btn.classList.add('border-gray-200');
            }
        });
        
        // 少し待ってから次の質問へ
        setTimeout(() => {
            this.nextQuestion();
        }, 500);
    }
    
    // 次の質問へ
    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.displayQuestion();
        } else {
            this.calculateResult();
        }
    }
    
    // 前の質問に戻る
    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.displayQuestion();
        }
    }
    
    // 結果計算
    calculateResult() {
        // ローディング画面表示
        this.showScreen('loading-screen');
        
        // スコア計算
        this.totalScore = this.answers.reduce((total, answer) => total + answer.score, 0);
        
        // レベル判定
        const levelKey = this.calculateLevel(this.totalScore);
        this.result = this.results[levelKey];
        
        // 2秒後に結果表示
        setTimeout(() => {
            this.displayResult();
        }, 2000);
    }
    
    // 結果表示
    displayResult() {
        const resultScreen = document.getElementById('result-screen');
        
        resultScreen.innerHTML = `
            <div class="card rounded-2xl shadow-xl p-6 md:p-8 mb-6">
                <!-- 結果ヘッダー -->
                <div class="text-center mb-8">
                    <div class="text-6xl mb-4">${this.result.icon}</div>
                    <div class="inline-block bg-gradient-to-r ${this.result.color} text-white px-6 py-2 rounded-full text-sm font-medium mb-3">
                        あなたの診断結果
                    </div>
                    <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                        ${this.result.title}
                    </h1>
                    <p class="text-lg text-gray-600 font-medium">
                        ${this.result.subtitle}
                    </p>
                    <div class="mt-4 text-sm text-gray-500">
                        あなたのスコア: <span class="font-semibold text-gray-700">${this.totalScore}点 / 25点</span>
                    </div>
                </div>
                
                <!-- 総合解説 -->
                <div class="mb-8">
                    <h2 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                        <i class="fas fa-heart text-pink-500 mr-2"></i>
                        あなたの現在地
                    </h2>
                    <p class="text-gray-700 leading-relaxed bg-gray-50 p-6 rounded-lg">
                        ${this.result.description}
                    </p>
                </div>
                
                <!-- Next Step -->
                <div class="mb-8">
                    <h2 class="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                        <i class="fas fa-seedling text-green-500 mr-2"></i>
                        魅力満開へのNext Step
                    </h2>
                    
                    <div class="grid md:grid-cols-2 gap-6">
                        <!-- マインド編 -->
                        <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
                            <h3 class="text-lg font-semibold text-purple-800 mb-3 flex items-center">
                                <i class="fas fa-brain text-purple-600 mr-2"></i>
                                マインド編
                            </h3>
                            <p class="text-purple-700 leading-relaxed text-sm">
                                ${this.result.nextSteps.mindset}
                            </p>
                        </div>
                        
                        <!-- 見た目編 -->
                        <div class="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-lg border border-pink-200">
                            <h3 class="text-lg font-semibold text-pink-800 mb-3 flex items-center">
                                <i class="fas fa-sparkles text-pink-600 mr-2"></i>
                                見た目編
                            </h3>
                            <p class="text-pink-700 leading-relaxed text-sm">
                                ${this.result.nextSteps.appearance}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- CTA セクション -->
            <div class="card rounded-2xl shadow-xl p-6 md:p-8 text-center">
                <div class="mb-6">
                    <h2 class="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                        あなたの魅力を<span class="text-pink-600">"最速・最短"</span>で満開にするために
                    </h2>
                    <div class="text-gray-700 leading-relaxed space-y-4 text-left md:text-center">
                        <p>
                            この診断で、あなたの現在地と可能性に気づけたはずです。<br>
                            しかし、自己流で魅力を開花させるには、時間がかかったり、間違った方向に進んでしまったりすることも。
                        </p>
                        <p>
                            <strong class="text-gray-800">マインドと見た目の両方からアプローチするプロのコーチング</strong>は、<br>
                            あなたの魅力を最速・最短で開花させるための<span class="text-pink-600 font-semibold">『羅針盤』</span>であり<span class="text-pink-600 font-semibold">『ブースター』</span>です。
                        </p>
                        <p>
                            継続講座では、あなた一人ひとりの『つぼみ』に合わせた光と水の与え方をお伝えし、<br>
                            <strong class="text-pink-600">"満開のあなた"</strong>になるまで完全サポートします。
                        </p>
                    </div>
                </div>
                
                <!-- CTAボタン -->
                <div class="space-y-4">
                    <a href="#" class="btn-primary inline-block text-white font-semibold py-4 px-8 rounded-full text-lg shadow-lg w-full md:w-auto">
                        <i class="fas fa-star mr-2"></i>
                        継続講座の詳細を見てみる
                    </a>
                    <div class="text-sm text-gray-600">
                        または
                    </div>
                    <a href="#" class="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full text-base shadow-lg transition-all duration-300 w-full md:w-auto">
                        <i class="fab fa-line mr-2"></i>
                        LINE登録でさらに詳しい情報を受け取る
                    </a>
                </div>
                
                <div class="mt-6 text-xs text-gray-500">
                    ※ 診断結果は個人の成長のためのガイダンスです
                </div>
            </div>
            
            <!-- 再診断ボタン -->
            <div class="text-center mt-8">
                <button onclick="app.showScreen('start-screen')" class="text-gray-500 hover:text-gray-700 text-sm underline">
                    <i class="fas fa-redo mr-1"></i>
                    もう一度診断する
                </button>
            </div>
        `;
        
        this.showScreen('result-screen');
        
        // 結果画面のトップにスムーズスクロール
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// アプリケーション初期化
const app = new DiagnosisApp();

// グローバル関数
function startDiagnosis() {
    app.startDiagnosis();
}

function previousQuestion() {
    app.previousQuestion();
}

// ページ読み込み完了後の初期化
document.addEventListener('DOMContentLoaded', function() {
    // 初期表示はスタート画面
    app.showScreen('start-screen');
    
    // スムーズスクロールの設定
    document.documentElement.style.scrollBehavior = 'smooth';
});
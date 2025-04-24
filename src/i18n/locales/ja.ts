export const ja = {
  common: {
    search: '検索...',
    actions: 'アクション',
    cancel: 'キャンセル',
    save: '保存',
    create: '作成',
    update: '更新',
    add: '追加',
    edit: '編集',
    delete: '削除',
    close: '閉じる',
    learnMore: '詳細を見る',
    getStarted: '始める',
  },
  carousel: {
    slides: {
      hsa: {
        title: 'HSAベネフィットを最大限に活用',
        description: '専門家のヒントと戦略で健康貯蓄口座を最大限に活用する方法を学びましょう。',
      },
      dental: {
        title: '新しい歯科保険オプション',
        description: 'より良い給付とより低い保険料で強化された歯科保険プランをご覧ください。',
      },
      family: {
        title: '家族の保険が簡単に',
        description: '統合プラットフォームで、家族の医療管理がこれまでになく簡単になりました。',
      },
      vision: {
        title: 'ビジョンベネフィットのスポットライト',
        description: '視力検査、眼鏡、コンタクトレンズを含む包括的なビジョン保険をご利用ください。',
      },
    },
    cta: {
      viewPlans: 'プランを見る',
      exploreCoverage: '保険を探す',
    },
  },
  header: {
    appName: 'Benefits One',
    logoAlt: 'WEXロゴ',
  },
  navigation: {
    home: {
      title: 'マイホーム',
    },
    benefits: {
      title: '福利厚生',
      medical: '医療',
      dental: '歯科',
      vision: '視覚',
      lifeInsurance: '生命保険',
      disability: '障害',
      fsaHsa: 'FSA/HSA',
    },
    dependents: {
      title: '扶養家族',
    },
    theme: {
      title: 'テーマ',
      colors: '色',
      typography: '文字体裁',
      logo: 'ロゴ',
    },
    releases: {
      title: 'リリース管理',
    },
    userManagement: {
      title: 'ユーザー管理',
      users: 'ユーザー',
      roles: '役割',
    },
    settings: {
      title: '設定',
    },
  },
  dashboard: {
    title: 'マイダッシュボード',
    lastUpdated: '最終更新: {{date}}',
    metrics: {
      healthScore: {
        title: '健康スコア',
        value: '{{score}}/100',
      },
      activeBenefits: {
        title: 'アクティブな給付',
        value: '{{count}}',
      },
      healthClaims: {
        title: '健康保険請求',
        value: '{{count}}件 保留中',
      },
      fsaBalance: {
        title: 'FSA残高',
        value: '${{amount}}',
      },
    },
  },
  theme: {
    colors: {
      title: 'テーマカラー',
      opacity: '不透明度',
      navy: 'ネイビー',
      teal: 'ティール',
      lightBlue: 'ライトブルー',
      yellow: 'イエロー',
      red: 'レッド',
      white: 'ホワイト',
    },
    typography: {
      title: '文字体裁',
      preview: 'いろはにほへと ちりぬるを わかよたれそ つねならむ',
      fonts: {
        interLight: 'Inter ライト',
        interRegular: 'Inter レギュラー',
        interBold: 'Inter ボールド',
        interBlack: 'Inter ブラック',
        robotoCondensed: 'Roboto Condensed レギュラー',
      },
    },
    logo: {
      title: '企業ロゴ',
      logoUrl: 'ロゴURL',
      urlPlaceholder: 'https://example.jp/logo.png',
      preview: 'ロゴプレビュー',
      dropzone: 'ロゴを表示するには上記にURLを入力してください',
      invalidUrl: '無効な画像URL',
      updateLogo: 'ロゴを更新',
    },
  },
  users: {
    title: 'ユーザー',
    addUser: 'ユーザーを追加',
    searchPlaceholder: 'ユーザーを検索...',
    table: {
      name: '名前',
      email: 'メール',
      roles: '役割',
      created: '作成日',
      lastLogin: '最終ログイン',
      status: 'ステータス',
      never: '未ログイン',
      active: 'アクティブ',
      inactive: '非アクティブ',
    },
  },
  roles: {
    title: '役割',
    addRole: '役割を追加',
    searchPlaceholder: '役割を検索...',
    table: {
      roleName: '役割名',
      description: '説明',
      created: '作成日',
      users: 'ユーザー',
    },
    modal: {
      createTitle: '新しい役割を作成',
      editTitle: '役割を編集',
      nameLabel: '役割名',
      namePlaceholder: '役割名を入力',
      descriptionLabel: '説明',
      descriptionPlaceholder: '役割の説明を入力',
      permissionsLabel: '権限',
    },
  },
  releases: {
    title: 'リリース管理',
    table: {
      module: 'モジュール',
      currentVersion: '現在のバージョン',
      newVersion: '新しいバージョン',
      releaseDate: 'リリース日',
      status: 'ステータス',
      scheduled: '予定済み',
      available: '利用可能',
      current: '現在',
    },
    actions: {
      activateNow: '今すぐ有効化',
      schedule: 'スケジュール',
      viewNotes: 'リリースノートを表示',
    },
    notes: {
      title: 'リリースノート v{{version}}',
      sections: {
        features: '新機能',
        bugFixes: 'バグ修正',
        improvements: '改善点',
      },
    },
  },
  notifications: {
    title: '通知',
    unreadCount: '未読{{count}}件',
    viewAll: 'すべての通知を表示',
    enrollment: {
      deadline: '福利厚生登録期限',
      deadlineMessage: 'オープン登録期間は5日後に終了します。選択を早めに完了してください。',
    },
    hsa: {
      contribution: '新規HSA拠出金',
      contributionMessage: '雇用主があなたのHSAに$250の拠出を行いました。',
    },
    claims: {
      approved: '請求承認',
      approvedMessage: 'あなたの最近の医療費請求が承認され、処理されました。',
    },
    wellness: {
      update: 'ウェルネスプログラム更新',
      updateMessage: '新しいウェルネスチャレンジが利用可能です。参加して報酬を獲得しましょう。',
    },
  },
};
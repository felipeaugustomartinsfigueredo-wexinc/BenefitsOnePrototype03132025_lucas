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
};
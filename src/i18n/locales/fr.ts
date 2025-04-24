export const fr = {
  common: {
    search: 'Rechercher...',
    actions: 'Actions',
    cancel: 'Annuler',
    save: 'Enregistrer',
    create: 'Créer',
    update: 'Mettre à jour',
    add: 'Ajouter',
    edit: 'Modifier',
    delete: 'Supprimer',
    close: 'Fermer',
    learnMore: 'En savoir plus',
    getStarted: 'Commencer',
  },
  carousel: {
    slides: {
      hsa: {
        title: 'Maximisez vos avantages HSA',
        description: 'Apprenez à tirer le meilleur parti de votre compte d\'épargne santé grâce à nos conseils et stratégies d\'experts.',
      },
      dental: {
        title: 'Nouvelles options de couverture dentaire',
        description: 'Découvrez nos plans de couverture dentaire améliorés avec de meilleurs avantages et des primes plus basses.',
      },
      family: {
        title: 'Couverture familiale simplifiée',
        description: 'La gestion des soins de santé de votre famille n\'a jamais été aussi simple avec notre plateforme intégrée.',
      },
      vision: {
        title: 'Focus sur les avantages vision',
        description: 'Obtenez une couverture vision complète incluant examens de la vue, lunettes et lentilles de contact.',
      },
    },
    cta: {
      viewPlans: 'Voir les plans',
      exploreCoverage: 'Explorer la couverture',
    },
  },
  header: {
    appName: 'Benefits One',
    logoAlt: 'Logo WEX',
  },
  navigation: {
    home: {
      title: 'Mon Accueil',
    },
    benefits: {
      title: 'Mes Avantages',
      medical: 'Médical',
      dental: 'Dentaire',
      vision: 'Vision',
      lifeInsurance: 'Assurance Vie',
      disability: 'Invalidité',
      fsaHsa: 'FSA/HSA',
    },
    dependents: {
      title: 'Mes Personnes à Charge',
    },
    theme: {
      title: 'Thème',
      colors: 'Couleurs',
      typography: 'Typographie',
      logo: 'Logo',
    },
    releases: {
      title: 'Gestion des Versions',
    },
    userManagement: {
      title: 'Gestion des Utilisateurs',
      users: 'Utilisateurs',
      roles: 'Rôles',
    },
    settings: {
      title: 'Paramètres',
    },
  },
  dashboard: {
    title: 'Mon Tableau de Bord',
    lastUpdated: 'Dernière mise à jour : {{date}}',
    metrics: {
      healthScore: {
        title: 'Score de Santé',
        value: '{{score}}/100',
      },
      activeBenefits: {
        title: 'Avantages Actifs',
        value: '{{count}}',
      },
      healthClaims: {
        title: 'Demandes de Santé',
        value: '{{count}} En attente',
      },
      fsaBalance: {
        title: 'Solde FSA',
        value: '${{amount}}',
      },
    },
  },
  theme: {
    colors: {
      title: 'Couleurs du Thème',
      opacity: 'Opacité',
      navy: 'Bleu Marine',
      teal: 'Turquoise',
      lightBlue: 'Bleu Clair',
      yellow: 'Jaune',
      red: 'Rouge',
      white: 'Blanc',
    },
    typography: {
      title: 'Typographie',
      preview: 'Portez ce vieux whisky au juge blond qui fume',
      fonts: {
        interLight: 'Inter Light',
        interRegular: 'Inter Regular',
        interBold: 'Inter Bold',
        interBlack: 'Inter Black',
        robotoCondensed: 'Roboto Condensed Regular',
      },
    },
    logo: {
      title: 'Logo de l\'Entreprise',
      logoUrl: 'URL du Logo',
      urlPlaceholder: 'https://exemple.fr/logo.png',
      preview: 'Aperçu de votre logo',
      dropzone: 'Entrez une URL ci-dessus pour prévisualiser votre logo',
      invalidUrl: 'URL d\'image invalide',
      updateLogo: 'Mettre à jour le Logo',
    },
  },
  users: {
    title: 'Utilisateurs',
    addUser: 'Ajouter un Utilisateur',
    searchPlaceholder: 'Rechercher des utilisateurs...',
    table: {
      name: 'Nom',
      email: 'Email',
      roles: 'Rôles',
      created: 'Créé le',
      lastLogin: 'Dernière Connexion',
      status: 'Statut',
      never: 'Jamais',
      active: 'Actif',
      inactive: 'Inactif',
    },
  },
  roles: {
    title: 'Rôles',
    addRole: 'Ajouter un Rôle',
    searchPlaceholder: 'Rechercher des rôles...',
    table: {
      roleName: 'Nom du Rôle',
      description: 'Description',
      created: 'Créé le',
      users: 'Utilisateurs',
    },
    modal: {
      createTitle: 'Créer un Nouveau Rôle',
      editTitle: 'Modifier le Rôle',
      nameLabel: 'Nom du Rôle',
      namePlaceholder: 'Entrez le nom du rôle',
      descriptionLabel: 'Description',
      descriptionPlaceholder: 'Entrez la description du rôle',
      permissionsLabel: 'Permissions',
    },
  },
  releases: {
    title: 'Gestion des Versions',
    table: {
      module: 'Module',
      currentVersion: 'Version Actuelle',
      newVersion: 'Nouvelle Version',
      releaseDate: 'Date de Publication',
      status: 'Statut',
      scheduled: 'Planifié',
      available: 'Disponible',
      current: 'Actuel',
    },
    actions: {
      activateNow: 'Activer Maintenant',
      schedule: 'Planifier',
      viewNotes: 'Voir les Notes de Version',
    },
    notes: {
      title: 'Notes de Version v{{version}}',
      sections: {
        features: 'Nouvelles Fonctionnalités',
        bugFixes: 'Corrections de Bugs',
        improvements: 'Améliorations',
      },
    },
  },
  notifications: {
    title: 'Notifications',
    unreadCount: '{{count}} non lues',
    viewAll: 'Voir Toutes les Notifications',
    enrollment: {
      deadline: "Date Limite d'Inscription aux Avantages",
      deadlineMessage: "La période d'inscription ouverte se termine dans 5 jours. Complétez vos sélections bientôt.",
    },
    hsa: {
      contribution: 'Nouvelle Contribution HSA',
      contributionMessage: 'Votre employeur a effectué une contribution de 250$ à votre HSA.',
    },
    claims: {
      approved: 'Demande Approuvée',
      approvedMessage: 'Votre récente demande médicale a été approuvée et traitée.',
    },
    wellness: {
      update: 'Mise à Jour du Programme de Bien-être',
      updateMessage: 'De nouveaux défis bien-être sont disponibles. Participez pour gagner des récompenses.',
    },
  },
};
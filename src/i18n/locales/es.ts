export const es = {
  common: {
    search: 'Buscar...',
    actions: 'Acciones',
    cancel: 'Cancelar',
    save: 'Guardar',
    create: 'Crear',
    update: 'Actualizar',
    add: 'Añadir',
    edit: 'Editar',
    delete: 'Eliminar',
    close: 'Cerrar',
  },
  header: {
    appName: 'Benefits One',
    logoAlt: 'Logo de WEX',
  },
  navigation: {
    home: {
      title: 'Mi Inicio',
    },
    benefits: {
      title: 'Mis Beneficios',
      medical: 'Médico',
      dental: 'Dental',
      vision: 'Visión',
      lifeInsurance: 'Seguro de Vida',
      disability: 'Discapacidad',
      fsaHsa: 'FSA/HSA',
    },
    dependents: {
      title: 'Mis Dependientes',
    },
    theme: {
      title: 'Tema',
      colors: 'Colores',
      typography: 'Tipografía',
      logo: 'Logo',
    },
    releases: {
      title: 'Gestión de Versiones',
    },
    userManagement: {
      title: 'Gestión de Usuarios',
      users: 'Usuarios',
      roles: 'Roles',
    },
    settings: {
      title: 'Configuración',
    },
  },
  dashboard: {
    title: 'Mi Panel',
    lastUpdated: 'Última actualización: {{date}}',
    metrics: {
      healthScore: {
        title: 'Puntuación de Salud',
        value: '{{score}}/100',
      },
      activeBenefits: {
        title: 'Beneficios Activos',
        value: '{{count}}',
      },
      healthClaims: {
        title: 'Reclamaciones de Salud',
        value: '{{count}} Pendientes',
      },
      fsaBalance: {
        title: 'Saldo FSA',
        value: '${{amount}}',
      },
    },
  },
  theme: {
    colors: {
      title: 'Colores del Tema',
      opacity: 'Opacidad',
      navy: 'Azul Marino',
      teal: 'Verde Azulado',
      lightBlue: 'Azul Claro',
      yellow: 'Amarillo',
      red: 'Rojo',
      white: 'Blanco',
    },
    typography: {
      title: 'Tipografía',
      preview: 'El zorro marrón rápido salta sobre el perro perezoso',
      fonts: {
        interLight: 'Inter Ligera',
        interRegular: 'Inter Regular',
        interBold: 'Inter Negrita',
        interBlack: 'Inter Black',
        robotoCondensed: 'Roboto Condensed Regular',
      },
    },
    logo: {
      title: 'Logo de la Empresa',
      logoUrl: 'URL del Logo',
      urlPlaceholder: 'https://ejemplo.com/logo.png',
      preview: 'Vista previa de tu logo',
      dropzone: 'Ingresa una URL arriba para previsualizar tu logo',
      invalidUrl: 'URL de imagen inválida',
      updateLogo: 'Actualizar Logo',
    },
  },
  users: {
    title: 'Usuarios',
    addUser: 'Añadir Usuario',
    searchPlaceholder: 'Buscar usuarios...',
    table: {
      name: 'Nombre',
      email: 'Correo',
      roles: 'Roles',
      created: 'Creado',
      lastLogin: 'Último Acceso',
      status: 'Estado',
      never: 'Nunca',
      active: 'Activo',
      inactive: 'Inactivo',
    },
  },
  roles: {
    title: 'Roles',
    addRole: 'Añadir Rol',
    searchPlaceholder: 'Buscar roles...',
    table: {
      roleName: 'Nombre del Rol',
      description: 'Descripción',
      created: 'Creado',
      users: 'Usuarios',
    },
    modal: {
      createTitle: 'Crear Nuevo Rol',
      editTitle: 'Editar Rol',
      nameLabel: 'Nombre del Rol',
      namePlaceholder: 'Ingresa el nombre del rol',
      descriptionLabel: 'Descripción',
      descriptionPlaceholder: 'Ingresa la descripción del rol',
      permissionsLabel: 'Permisos',
    },
  },
  releases: {
    title: 'Gestión de Versiones',
    table: {
      module: 'Módulo',
      currentVersion: 'Versión Actual',
      newVersion: 'Nueva Versión',
      releaseDate: 'Fecha de Lanzamiento',
      status: 'Estado',
      scheduled: 'Programado',
      available: 'Disponible',
      current: 'Actual',
    },
    actions: {
      activateNow: 'Activar Ahora',
      schedule: 'Programar',
      viewNotes: 'Ver Notas de Versión',
    },
    notes: {
      title: 'Notas de Versión v{{version}}',
      sections: {
        features: 'Nuevas Características',
        bugFixes: 'Correcciones de Errores',
        improvements: 'Mejoras',
      },
    },
  },
};
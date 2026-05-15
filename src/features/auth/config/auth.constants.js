export const PATH = "/usuarios";
export const TITLE = "Usuarios";
export const PERMISSIONS = {
  VIEW: "usuarios.ver",
  CREATE: "usuarios.crear",
  EDIT: "usuarios.editar",
  DELETE: "usuarios.eliminar",
};
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50],
};

export const ERRORS = {
  INVALID_CREDENTIALS: "Correo o contraseña inválidos.",
  SESSION_EXPIRED: "Tu sesión ha expirado. Inicia sesión nuevamente.",
  UNAUTHORIZED: "No tienes permisos para realizar esta acción.",
  USER_NOT_FOUND: "Usuario no encontrado.",
  USER_INACTIVE: "Tu cuenta está desactivada.",
  EMAIL_ALREADY_EXISTS: "Ya existe un usuario con ese correo.",
  ID_NUMBER_ALREADY_EXISTS: "Ya existe un usuario con esa cédula.",
};

export const UI = {
  LABELS: {
    FORM: {
      TITLE: "Iniciar Sesión",
      DESCRIPTION: "Ingresa tus credenciales para acceder al sistema.",
      EMAIL: "Correo electrónico",
      EMAIL_PLACEHOLDER: "correo@ejemplo.com",
      PASSWORD: "Contraseña",
      PASSWORD_PLACEHOLDER: "••••••••",
      SUBMIT: "Ingresar",
      SUBMITTING: "Ingresando...",
      FIRST_NAME: "Nombre",
      FIRST_NAME_PLACEHOLDER: "Nombre del usuario",
      LAST_NAME: "Apellido",
      LAST_NAME_PLACEHOLDER: "Apellido del usuario",
      ID_NUMBER: "Cédula",
      ID_NUMBER_PLACEHOLDER: "V-12345678",
      ROLE: "Rol",
      ROLE_PLACEHOLDER: "Seleccionar rol",
      AREA: "Área",
      AREA_PLACEHOLDER: "Seleccionar área",
      IS_ACTIVE: "Activo",
      SAVE: "Guardar",
      SAVING: "Guardando...",
      CREATE_TITLE: "Nuevo Usuario",
      EDIT_TITLE: "Editar Usuario",
    },
    TABLE: {
      FIRST_NAME: "Nombre",
      LAST_NAME: "Apellido",
      EMAIL: "Correo",
      ID_NUMBER: "Cédula",
      ROLE: "Rol",
      IS_ACTIVE: "Activo",
      CREATED_AT: "Creado",
      ACTIONS: "Acciones",
      EMPTY: "No hay usuarios registrados.",
      ENTITY_NAME: "usuario",
      ENTITY_NAME_PLURAL: "usuarios",
    },
    TOOLBAR: {
      SEARCH_PLACEHOLDER: "Buscar usuarios...",
      FILTER_ROLE: "Rol",
      FILTER_STATUS: "Estado",
      NEW_BUTTON: "Nuevo Usuario",
    },
    DELETE_DIALOG: {
      TITLE: "¿Eliminar usuario?",
      DESCRIPTION: "El usuario {name} será desactivado. Esta acción se puede revertir.",
      CONFIRM: "Desactivar",
      CANCEL: "Cancelar",
    },
  },
};

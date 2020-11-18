const RoutesConfig = {
  home: {
    title: 'Home',
    route: '/',
    state: 'dwgs.home',
    icon: ['fas', 'dice-d6'],
  },
  login: {
    title: 'Login',
    route: '/login',
    state: 'dwgs.login',
    icon: ['fas', 'drafting-compass'],
  },
  register: {
    title: 'Register',
    route: '/register',
    state: 'dwgs.register',
    icon: ['fas', 'drafting-compass'],
  },
  createDrawing: {
    title: 'Create a Drawing',
    route: '/create-drawing',
    state: 'dwgs.create-drawing',
    icon: ['fas', 'pencil-ruler'],
  },
  drawingList: {
    title: 'Drawing List',
    route: '/drawing-list',
    state: 'dwgs.drawing-list',
    icon: ['fas', 'dice-d6'],
  },
  singleImage: {
    title: 'Single Image',
    route: '/image/:id',
    state: 'dwgs.image',
    icon: ['fas', 'image'],
  },
}

export default RoutesConfig

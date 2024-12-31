// Defines a Nuxt.js route middleware that checks the user's authentication status and redirects the user accordingly

export default defineNuxtRouteMiddleware((to) => {
  // Get the authentication status
  const { isAuthenticated } = useAuth()

  // Define an array of public routes that do not require authentication
  const publicRoutes = ['/', '/login', '/register']

  // If the user is not authenticated and the target route is not public,
  // redirect to the login page
  if (!isAuthenticated() && !publicRoutes.includes(to.path)) {
    return navigateTo('/login')
  }

  // If the user is authenticated and is trying to access a public route,
  // redirect to the objects page
  if (isAuthenticated() && publicRoutes.includes(to.path)) {
    return navigateTo('/objects')
  }
})

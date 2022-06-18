import { Plugin } from '@nuxt/types'
import { Loader } from '@googlemaps/js-api-loader'

declare module 'vue/types/vue' {
  interface Vue {
    $google: typeof google
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $google: typeof google
  }
}

declare module 'vuex/types/index' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $google: typeof google
  }
}

const googleMap: Plugin = async (_context, inject) => {
  const loader = new Loader({
    apiKey: 'AIzaSyDETWSnteRCD0Syh9ylvzwCdFwVUbykDbQ',
    version: 'weekly',
    libraries: [
      'drawing',
      'geometry',
      'localContext',
      'places',
      'visualization',
    ],
  })
  const google = await loader.load()
  inject('google', google)
}

export default googleMap

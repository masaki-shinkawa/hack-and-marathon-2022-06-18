import { Plugin } from '@nuxt/types'

declare module 'vue/types/vue' {
  interface Vue {
    $geolocation: () => Promise<GeolocationPosition>
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $geolocation: () => Promise<GeolocationPosition>
  }
}

declare module 'vuex/types/index' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $geolocation: () => Promise<GeolocationPosition>
  }
}

const geolocation: Plugin = (_context, inject) => {
  inject('geolocation', () => {
    return new Promise((resolve, reject) => {
      const success = (position: GeolocationPosition) => resolve(position)
      navigator.geolocation.getCurrentPosition(success, reject)
    })
  })
}

export default geolocation

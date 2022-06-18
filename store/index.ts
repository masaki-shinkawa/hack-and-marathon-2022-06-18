import { GetterTree, ActionTree, MutationTree } from 'vuex'
import {
  AchievementMissionRequest,
  AchievementMissionResponse,
  CurrentMissionResponse,
  DailyMissionResponse,
  GiveUpResponse,
  MissionReturnRequest,
  MissionReturnResponse,
  MissionStartRequest,
  MissionStartResponse,
  MonthlyMissionResponse,
} from '~/types/apiTypes'

export const state = () => ({
  bearer: '',
  isEnd: false,
  isMissionStarted: false,
  isMissionReturn: false,
  geolocation: null,
  missionId: 0,
  destination: {
    latitude: 0,
    longitude: 0,
  },
  dailyMission: {},
  monthlyMission: {},
  isComplete: false,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  // name: (state) => state.name,
}

export const mutations: MutationTree<RootState> = {
  setInitialize: (state) => {
    state.isEnd = false
    state.isMissionStarted = false
    state.isMissionReturn = false
    state.isComplete = false
    state.geolocation = null
    state.missionId = 0
    state.destination = {
      latitude: 0,
      longitude: 0,
    }
    state.dailyMission = {}
    state.monthlyMission = {}
  },
  setBearer: (state, bearer) => (state.bearer = bearer),
  setIsEnd: (state, isEnd) => (state.isEnd = isEnd),
  setIsMissionStarted: (state, isMissionStarted) =>
    (state.isMissionStarted = isMissionStarted),
  setIsMissionReturn: (state, isMissionReturn) =>
    (state.isMissionReturn = isMissionReturn),
  setGeolocation: (state, geolocation) => (state.geolocation = geolocation),
  setMissionId: (state, missionId) => (state.missionId = missionId),
  setDestination: (state, destination) => (state.destination = destination),
  setDailyMission: (state, dailyMission) => (state.dailyMission = dailyMission),
  setMonthlyMission: (state, monthlyMission) =>
    (state.monthlyMission = monthlyMission),
  setIsComplete: (state, isComplete) => (state.isComplete = isComplete),
}

export const actions: ActionTree<RootState, RootState> = {
  initialize({ commit }) {
    // const response = await this.$axios.$post<CurrentMissionResponse>("/current_mission")
    const response: CurrentMissionResponse = {
      status: 1,
      response: {
        missionId: 0,
        missionType: 1,
        destinationLocation: {
          name: 'aaaa',
          latitude: 35.65406394796199,
          longitude: 139.7089890261585,
        },
      },
    }

    if (response.response.missionId === 0) return

    commit('setIsMissionStarted', true)
    commit('setMissionId', response.response.missionId)
    commit('setIsMissionReturn', response.response.missionType === 2)
    commit('setDestination', response.response.destinationLocation)
    commit('setDailyMission', {})
    commit('setMonthlyMission', {})
    commit('setIsComplete', false)
  },

  async monthlyMission({ commit }) {
    const response = await this.$axios.$post<MonthlyMissionResponse>(
      '/monthly_mission'
    )
    commit('setMonthlyMission', response)
  },

  async dailyMission({ commit }) {
    const response = await this.$axios.$post<DailyMissionResponse>(
      '/daily_mission'
    )
    commit('setDailyMission', response)
  },

  async missionStart({ commit }, distance) {
    if (!this.state.geolocation) return
    const request: MissionStartRequest = {
      latitude: (this.state.geolocation as any as GeolocationPosition).coords
        .latitude,
      longitude: (this.state.geolocation as any as GeolocationPosition).coords
        .longitude,
      distance,
    }
    const response = await this.$axios.$post<MissionStartResponse>(
      '/mission_start',
      request
    )
    commit('setDestination', response.response.destinationLocation)
    commit('setMissionId', response.response.missionId)
    commit('setIsMissionReturn', response.response.missionType === 2)
  },

  async achievementMission({ commit }) {
    if (!this.state.geolocation) return
    const request: AchievementMissionRequest = {
      missionId: this.state.missionId,
      latitude: (this.state.geolocation as any as GeolocationPosition).coords
        .latitude,
      longitude: (this.state.geolocation as any as GeolocationPosition).coords
        .longitude,
    }
    const response = await this.$axios.$post<AchievementMissionResponse>(
      '/achievement_mission',
      request
    )

    commit('setIsComplete', response.response.isSuccess)
  },

  async giveUp({ commit }) {
    await this.$axios.$post<GiveUpResponse>('/give_up')
    commit('setInitialize')
  },

  async missionReturn({ commit }) {
    const request: MissionReturnRequest = {
      missionId: this.state.missionId,
    }
    const response = await this.$axios.$post<MissionReturnResponse>(
      '/mission_return',
      request
    )
    commit('setDestination', response.response.destinationLocation)
    commit('setMissionId', response.response.missionId)
    commit('setIsMissionReturn', true)
    commit('setIsComplete', false)
  },
}

export interface LoginRequest {
  userId: number
  password: string
}
export interface LoginResponse {
  status: number
  response: {
    token: string
  }
}
export interface MonthlyMissionRequest {}
export interface MonthlyMissionResponse {
  status: number
  response: {
    targetDistance: number
    currentDistance: number
  }
}

export interface DailyMissionRequest {}
export interface DailyMissionResponse {
  status: number
  response: {
    targetDistance: number
    currentDistance: number
    memberStatus: {
      userId: number
      name: string
      currentDistance: number
      status: number
      sort: number
    }[]
  }
}

export interface MissionStartRequest {
  latitude: number
  longitude: number
  distance: number
}
export interface MissionStartResponse {
  status: number
  response: {
    missionId: number
    missionType: 0 | 1 | 2
    destinationLocation: {
      name: string
      latitude: number
      longitude: number
    }
  }
}

export interface CurrentMissionRequest {}
export interface CurrentMissionResponse {
  status: number
  response: {
    missionId: number
    missionType: 0 | 1 | 2
    destinationLocation: {
      name: string
      latitude: number
      longitude: number
    }
  }
}

export interface AchievementMissionRequest {
  missionId: number
  latitude: number
  longitude: number
}
export interface AchievementMissionResponse {
  status: number
  response: {
    isSuccess: boolean
  }
}

export interface GiveUpRequest {
  missionId: number
}
export interface GiveUpResponse {
  status: number
  response: {
    isSuccess: boolean
  }
}

export interface EndRequest {}
export interface EndResponse {
  status: number
  response: {
    isSuccess: boolean
  }
}

export interface MissionReturnRequest {
  missionId: number
}
export interface MissionReturnResponse {
  status: number
  response: {
    missionId: number
    missionType: 0 | 1 | 2
    destinationLocation: {
      name: string
      latitude: number
      longitude: number
    }
  }
}

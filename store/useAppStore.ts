import createStore from './createStore'

export enum PriorityLevel {
  Fast,
  Turbo,
  Ultra
}

export enum PriorityMode {
  MaxCap,
  Exact
}

interface AppState {
  explorerUrl: string
  isMobile: boolean
  isLaptop: boolean
  aprMode: 'M' | 'D'

  priorityLevel: PriorityLevel
  priorityMode: PriorityMode
  transactionFee?: string
  feeConfig: Partial<Record<PriorityLevel, number>>

  getPriorityFee: () => string | undefined
  reset: () => void
}

const appInitState: AppState = {
  explorerUrl: '',
  isMobile: false,
  isLaptop: false,
  aprMode: 'M',
  priorityLevel: PriorityLevel.Turbo,
  priorityMode: PriorityMode.MaxCap,
  transactionFee: undefined,
  feeConfig: {},
  getPriorityFee: () => undefined,
  reset: () => {}
}

export const useAppStore = createStore<AppState>(
  (set, get) => ({
    ...appInitState,
    getPriorityFee: () => {
      const { priorityMode, priorityLevel, transactionFee, feeConfig } = get()
      if (priorityMode === PriorityMode.Exact) return transactionFee
      return String(feeConfig[priorityLevel] ?? 0)
    },
    reset: () => set(appInitState)
  }),
  'useAppStore'
)

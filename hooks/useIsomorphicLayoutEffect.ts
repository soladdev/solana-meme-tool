import { useLayoutEffect, useEffect } from 'react';

export const isClient = () => typeof window !== 'undefined'
export const useIsomorphicLayoutEffect = isClient() ? useLayoutEffect : useEffect

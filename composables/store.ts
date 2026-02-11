export const useStoreHeaderStack = () => useState<string[]>('storeHeaderStack', () => [])

export const useStoreShowMenu = () => useState<boolean>('storeShowMenu', () => false)

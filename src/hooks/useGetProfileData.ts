import { useState } from 'react'
import { useAppStore } from '@store'
import { apis } from '@services'

export function useGetProfileData() {
  const [profileLoading, setProfileLoading] = useState<boolean>(false)

  const updateProfileData = () =>
    new Promise((resolve, reject) => {
      setProfileLoading(true)

      apis.auth
        .profile()
        .then((res) => {
          resolve(null)
        })
        .catch((e) => {
          reject(e)
        })
        .finally(() => {
          setProfileLoading(false)
        })
    })

  return {
    profileLoading,
    updateProfileData
  }
}

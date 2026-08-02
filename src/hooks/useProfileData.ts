import { useState } from 'react'
import { useAppStore } from '@store'
import { apis } from '@services'

export function useProfileData() {
  const { setLoading, setProfile } = useAppStore()

  const updateProfileData = () =>
    new Promise((resolve, reject) => {
      setLoading(true)

      apis.auth
        .profile()
        .then((res) => {
          resolve(null)
          if (res?.data?.payload?.data) { 

            setProfile(res?.data?.payload?.data)
          }
        })
        .catch((e) => {
          reject(e)
        })
        .finally(() => {
          setLoading(false)
        })
    })

  return {
    updateProfileData
  }
}

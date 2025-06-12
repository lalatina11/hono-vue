import { useSessionStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref } from "vue";

export type AdminType = {
    id: string;
    name: string;
    username: string;
    password: string;
    avatar: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
}


export const useAdminStore = defineStore('admin', () => {
    const admin = useSessionStorage<AdminType | null>('admin', null)
    const setAdmin = (loggedInAdmin: AdminType) => {
        admin.value = loggedInAdmin
    }
    const removeAdmin = () => {
        admin.value = null
    }
    return { admin, setAdmin, removeAdmin }
})

export const useToasterStore = defineStore('toast', () => {
    const toastMessage = ref("")
    const setToast = (msg: string) => {
        toastMessage.value = msg
    }
    const clearToast = () => {
        toastMessage.value = ""
    }
    return { toastMessage, setToast, clearToast }
})

export const useAdminAuthority = defineStore('authority', () => {
    const isAdminAuthority = useSessionStorage<boolean>('adminAuthority', false)
    const createAdminAuthority = () => {
        isAdminAuthority.value = true
    }
    const removeCreateAdminAuthority = () => {
        isAdminAuthority.value = false
    }
    return { isAdminAuthority, createAdminAuthority, removeCreateAdminAuthority }
})
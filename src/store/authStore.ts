import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from 'axios';

type User = {
  id?: number;
  avatar?: string; // 头像链接
  displayName?: string; // 显示名称
  division?: string; // 部门信息
  identifier?: string; // 用户唯一标识
  nickName?: string; // 昵称
  organizationUserInfo?: string; // 企业信息
  realName?: string; // 真实姓名
  roleName?: string; // 角色名称
  tbRoleId?: string; // 角色ID
  project?: string; // 项目
  userid?: string; // 用户ID
}

interface LoginDTO {
  username: string;
  password: string;
  captcha?: string;
}

type AuthState = {
  user: User | null
  token: string | null
  login: (credentials: LoginDTO) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: async (credentials) => {
        const { data } = await axios.post('/auth/login', credentials)
        set({ user: data.user, token: data.token })
      },
      logout: () => set({ user: null, token: null })
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)
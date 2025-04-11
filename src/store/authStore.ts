import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { userLogin } from '../api';


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
  userInfo: User | null
  token: string | null
  login: (credentials: LoginDTO, onSuccess?: () => void) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userInfo: null,
      token: null,
      login: async (credentials: LoginDTO, onSuccess?: () => void) => {
        // const { data } = await axios.post('/auth/login', credentials)
        // set({ user: data.user, token: data.token })
        const res = await userLogin(credentials);
        console.log('res', res);
        const { data, message, success } = res.data;
        if (!success) {
          console.log('登录失败', message);
          return;
        } else {
          onSuccess?.();
        }
        // messageApi.info('Hello, Ant Design!');

        set({ userInfo: res.data, token: data?.token })
      },
      logout: () => set({ userInfo: null, token: null })
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)
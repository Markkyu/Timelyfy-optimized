import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  profile: null,
  loading: true,
}));

export default useAuthStore;

// import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";
// import supabase from "@config/supabase";

// const useAuthStore = create(
//   persist(
//     (set) => ({
//       user: null, // auth user from supabase
//       profile: null, // extra data from the `profiles` table
//       loading: true,

//       // Fetch current session and profile
//       fetchUser: async () => {
//         const {
//           data: { user },
//           error,
//         } = await supabase.auth.getUser();

//         if (error || !user) {
//           set({ user: null, profile: null, loading: false });
//           return;
//         }

//         // fetch role and other data from profiles
//         const { data: profile } = await supabase
//           .from("profiles")
//           .select(`*, colleges(college_name)`)
//           .eq("id", user.id)
//           .single();

//         set({
//           user,
//           profile,
//           loading: false,
//         });
//       },

//       // Login with Supabase Auth
//       login: async (email, password) => {
//         const { data, error } = await supabase.auth.signInWithPassword({
//           email,
//           password,
//         });

//         if (error) {
//           // console.error("Error signing in:", error.message);
//           // return null;
//           throw new Error(error.message);
//         }

//         const user = data.user;

//         // fetch profile after login
//         const { data: profile } = await supabase
//           .from("profiles")
//           .select(`*, colleges(college_name)`)
//           .eq("id", user.id)
//           .single();

//         set({ user, profile });
//         return { user, profile };
//       },

//       // Logout
//       logout: async () => {
//         await supabase.auth.signOut();
//         set({ user: null, profile: null });
//       },
//     }),
//     {
//       name: "auth-storage",
//       storage: createJSONStorage(() => sessionStorage),
//       partialize: (state) => ({
//         user: state.user,
//         profile: state.profile,
//       }),
//     }
//   )
// );

// export default useAuthStore;

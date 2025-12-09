import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const createInitialProfile = () => ({
    fullName: '',
    displayName: '',
    phone: '',
    avatarUrl: '',
    preferredLanguage: '',
    timezone: '',

    // client
    address: '',

    // lawyer
    barRegistrationNumber: '',
    barCouncilName: '',
    yearsOfExperience: 0,
    primaryPracticeArea: '',

    // judge
    courtName: '',
    designation: '',
});

export const useOnboardingStore = create(
    persist(
        (set, get) => ({
            role: null,
            profile: createInitialProfile(),
            // 👇 start from step 1 so Preferred Language shows first
            step: 1,

            setRole: (role) => {
                console.log('%c[Onboarding] Setting Role:', 'color: #3b82f6; font-weight: bold;', role);
                set((state) => ({
                    role,
                    profile: {
                        ...state.profile,
                        // reset irrelevant fields
                        barRegistrationNumber: '',
                        barCouncilName: '',
                        yearsOfExperience: 0,
                        primaryPracticeArea: '',
                        courtName: '',
                        designation: '',
                    },
                }));
            },

            updateProfile: (data) => {
                console.log('%c[Onboarding] Updating Profile:', 'color: #10b981; font-weight: bold;', data);
                set((state) => ({
                    profile: {
                        ...state.profile,
                        ...data,
                    },
                }));
                console.log('%c[Onboarding] New Profile State:', 'color: #10b981;', get().profile);
            },

            setStep: (step) => {
                console.log('%c[Onboarding] Changing Step:', 'color: #8b5cf6; font-weight: bold;', step);
                set({ step });
            },

            resetOnboarding: () => {
                console.log('%c[Onboarding] Resetting Store', 'color: #ef4444; font-weight: bold;');
                set({
                    role: null,
                    profile: createInitialProfile(),
                    // 👇 reset back to step 1 as well
                    step: 1,
                });
                // Optional: clear storage manually if needed, but set will update it
                // localStorage.removeItem('advyon-onboarding-storage'); 
            },
        }),
        {
            name: 'advyon-onboarding-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
            onRehydrateStorage: () => (state) => {
                console.log('%c[Onboarding] Hydration Start', 'color: #f59e0b; font-weight: bold;');
                if (state) {
                    console.log('%c[Onboarding] Hydration Finished:', 'color: #f59e0b; font-weight: bold;', state);
                } else {
                    console.log('%c[Onboarding] Hydration Failed or Empty', 'color: #ef4444; font-weight: bold;');
                }
            },
        }
    )
);

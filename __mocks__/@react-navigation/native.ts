export const mockNavigate = jest.fn();
export const mockReset = jest.fn();

export const useNavigation=jest.fn(()=>({
    navigate: mockNavigate,
    dispatch: jest.fn(),
    reset:mockReset,
   
}))
export const useRoute=jest.fn()

export const NavigationContainer = ({ children }: { children?: React.ReactNode }) => {children};

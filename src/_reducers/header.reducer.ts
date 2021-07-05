export interface HeaderState {
    menuId: string;
    menuIsOpen: boolean;
    mobileMenuId: string;
    profileMoreAnchor: null | HTMLElement;
    mobileMoreAnchor: null | HTMLElement;
}

export const initialState: HeaderState = {
    menuId: "primary-search-account-menu",
    mobileMenuId: "primary-search-account-menu-mobile",
    profileMoreAnchor: null,
    mobileMoreAnchor: null,
    menuIsOpen: false,
};

export type HeaderAction =
    | { type: "menu-toggle" | "profile-close" | "mobile-close" }
    | { type: "field"; fieldName: string; payload: string }
    | { type: "loggedIn"; payload: boolean }
    | { type: "profile-anchor"; payload: null | HTMLElement }
    | { type: "mobile-anchor"; payload: null | HTMLElement };

export default function HeaderReducer(state: HeaderState, action: HeaderAction) {
    switch (action.type) {
        case "field":
            return {
                ...state,
                [action.fieldName]: action.payload,
            };
        case "menu-toggle":
            return {
                ...state,
                menuIsOpen: !state.menuIsOpen,
            };
        case "profile-close":
            return {
                ...state,
                profileMoreAnchor: null,
            };
        case "mobile-close":
            return {
                ...state,
                mobileMoreAnchor: null,
            };
        case "mobile-anchor":
            return {
                ...state,
                mobileMoreAnchor: action.payload,
            };
        case "profile-anchor":
            return {
                ...state,
                profileMoreAnchor: action.payload,
            };
        default:
            return state;
    }
}

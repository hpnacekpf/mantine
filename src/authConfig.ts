import { User } from "oidc-client-ts";

export const authConfig = {
    authority: "https://id.local.bpovietnam.net",
    client_id: "spa",
    client_secret: "uyyJeIhymyJaVAEmiJzkEA==",
    redirect_uri: "http://localhost:3000",
    scope: 'openid profile offline_access api',
    post_logout_redirect_uri: "http://localhost:3000",
    loadUserInfo: true,
    onSigninCallback: (user: User | void): void => {
        window.history.replaceState(
            {},
            document.title,
            window.location.pathname
        );
    }
}

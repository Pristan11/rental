// eslint-disable-next-line no-undef
import OAuthCredential = firebase.auth.OAuthCredential;

export type AuthResponse ={
    type: 'success'|'fail';
    credential?: OAuthCredential | null;
}
